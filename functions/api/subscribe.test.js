import { describe, it, expect, vi, afterEach } from "vitest";
import { onRequestPost, onRequestOptions } from "./subscribe.js";

afterEach(() => {
  vi.restoreAllMocks();
});

function makeContext({ body, headers = {}, env = {} } = {}) {
  const reqHeaders = new Headers({
    "Content-Type": "application/json",
    ...headers,
  });
  const request = new Request("https://www.legendary-arena.com/api/subscribe", {
    method: "POST",
    headers: reqHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  return {
    request,
    env: {
      BREVO_API_KEY: "test-key",
      BREVO_LIST_ID: "3",
      ...env,
    },
  };
}

function makeOptionsContext(origin) {
  const headers = new Headers();
  if (origin) headers.set("Origin", origin);
  const request = new Request("https://www.legendary-arena.com/api/subscribe", {
    method: "OPTIONS",
    headers,
  });
  return { request };
}

describe("onRequestPost", () => {
  it("returns ok for a valid email (Brevo 201)", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 201,
      json: async () => ({}),
    });

    const ctx = makeContext({ body: { email: "test@example.com" } });
    const res = await onRequestPost(ctx);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual({ ok: true });
    expect(fetch).toHaveBeenCalledOnce();
  });

  it("returns ok with message for duplicate contact", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 400,
      json: async () => ({ code: "duplicate_parameter" }),
    });

    const ctx = makeContext({ body: { email: "dupe@example.com" } });
    const res = await onRequestPost(ctx);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual({ ok: true, message: "Already subscribed." });
  });

  it("returns 400 for missing email", async () => {
    const ctx = makeContext({ body: {} });
    const res = await onRequestPost(ctx);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("Email is required.");
  });

  it("returns 400 for invalid email format", async () => {
    const ctx = makeContext({ body: { email: "not-an-email" } });
    const res = await onRequestPost(ctx);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("Invalid email address.");
  });

  it("silently accepts and skips Brevo when the honeypot is filled", async () => {
    global.fetch = vi.fn();

    const ctx = makeContext({
      body: { email: "bot@example.com", company: "Acme Spam Co" },
    });
    const res = await onRequestPost(ctx);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual({ ok: true });
    expect(fetch).not.toHaveBeenCalled();
  });

  it("returns 415 for wrong content type", async () => {
    const reqHeaders = new Headers({ "Content-Type": "text/plain" });
    const request = new Request("https://www.legendary-arena.com/api/subscribe", {
      method: "POST",
      headers: reqHeaders,
      body: "email=test@example.com",
    });
    const ctx = {
      request,
      env: { BREVO_API_KEY: "test-key", BREVO_LIST_ID: "3" },
    };

    const res = await onRequestPost(ctx);
    const data = await res.json();

    expect(res.status).toBe(415);
    expect(data.error).toBe("Invalid content type.");
  });

  it("returns 502 for Brevo error", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 500,
      json: async () => ({ code: "some_error" }),
    });

    const ctx = makeContext({ body: { email: "test@example.com" } });
    const res = await onRequestPost(ctx);
    const data = await res.json();

    expect(res.status).toBe(502);
    expect(data.error).toBe("Subscription failed.");
  });

  it("sets CORS header to allowed origin", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 201,
      json: async () => ({}),
    });

    const ctx = makeContext({
      body: { email: "test@example.com" },
      headers: { Origin: "https://www.legendary-arena.com" },
    });
    const res = await onRequestPost(ctx);

    expect(res.headers.get("Access-Control-Allow-Origin")).toBe(
      "https://www.legendary-arena.com"
    );
  });

  it("sets CORS header to localhost origin", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 201,
      json: async () => ({}),
    });

    const ctx = makeContext({
      body: { email: "test@example.com" },
      headers: { Origin: "http://localhost:8788" },
    });
    const res = await onRequestPost(ctx);

    expect(res.headers.get("Access-Control-Allow-Origin")).toBe(
      "http://localhost:8788"
    );
  });

  it("falls back to production origin for unknown origin", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 201,
      json: async () => ({}),
    });

    const ctx = makeContext({
      body: { email: "test@example.com" },
      headers: { Origin: "https://evil.example.com" },
    });
    const res = await onRequestPost(ctx);

    expect(res.headers.get("Access-Control-Allow-Origin")).toBe(
      "https://www.legendary-arena.com"
    );
  });
});

describe("onRequestOptions", () => {
  it("returns 204 with correct CORS headers for allowed origin", async () => {
    const ctx = makeOptionsContext("https://www.legendary-arena.com");
    const res = await onRequestOptions(ctx);

    expect(res.status).toBe(204);
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe(
      "https://www.legendary-arena.com"
    );
    expect(res.headers.get("Access-Control-Allow-Methods")).toBe("POST");
    expect(res.headers.get("Access-Control-Allow-Headers")).toBe("Content-Type");
  });

  it("returns production fallback for unknown origin on preflight", async () => {
    const ctx = makeOptionsContext("https://evil.example.com");
    const res = await onRequestOptions(ctx);

    expect(res.status).toBe(204);
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe(
      "https://www.legendary-arena.com"
    );
  });

  it("returns localhost origin on preflight", async () => {
    const ctx = makeOptionsContext("http://localhost:8788");
    const res = await onRequestOptions(ctx);

    expect(res.status).toBe(204);
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe(
      "http://localhost:8788"
    );
  });
});
