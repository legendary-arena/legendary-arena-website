/**
 * Create or update a Brevo contact on the newsletter list.
 *
 * @param {string} apiKey - Brevo API key (from CF Pages env).
 * @param {string} email - Normalized subscriber email.
 * @param {number} listId - Brevo newsletter list ID.
 * @param {object|null} attributes - Optional Brevo contact attributes,
 *   or null to send none.
 * @returns {Promise<Response>} The raw Brevo API response.
 */
async function createBrevoContact(apiKey, email, listId, attributes) {
  const requestBody = {
    email,
    listIds: [listId],
    updateEnabled: true,
  };
  if (attributes) {
    requestBody.attributes = attributes;
  }
  return fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
}

/**
 * Validate an optional signup-source label.
 *
 * Source is best-effort provenance for future segmentation. It must be a
 * short kebab-case token; anything else is dropped rather than stored, so
 * a malformed value never blocks the subscription.
 *
 * @param {unknown} source - Raw source value from the request body.
 * @returns {string|null} The validated source, or null if absent/invalid.
 */
function validateSignupSource(source) {
  if (typeof source !== "string") {
    return null;
  }
  const sourcePattern = /^[a-z0-9-]{1,40}$/;
  return sourcePattern.test(source) ? source : null;
}

export async function onRequestPost(context) {
  const allowedOrigins = [
    "https://www.legendary-arena.com",
    "http://localhost:8788",
    "http://127.0.0.1:8788",
  ];
  const origin = context.request.headers.get("Origin");
  const allowOrigin = allowedOrigins.includes(origin)
    ? origin
    : "https://www.legendary-arena.com";

  const corsHeaders = {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    const contentType = context.request.headers.get("Content-Type") || "";
    if (!contentType.includes("application/json")) {
      return new Response(
        JSON.stringify({ error: "Invalid content type." }),
        { status: 415, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { email, source } = await context.request.json();

    if (!email || typeof email !== "string") {
      return new Response(
        JSON.stringify({ error: "Email is required." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const listId = parseInt(context.env.BREVO_LIST_ID, 10);
    const normalizedEmail = email.trim().toLowerCase();

    // Signup source is best-effort provenance for future segmentation.
    // When present and valid, it is sent as the SIGNUP_SOURCE attribute.
    const signupSource = validateSignupSource(source);
    const attributes = signupSource ? { SIGNUP_SOURCE: signupSource } : null;

    let brevoRes = await createBrevoContact(
      context.env.BREVO_API_KEY,
      normalizedEmail,
      listId,
      attributes,
    );

    // why: Brevo rejects a contact create (HTTP 400) that carries an
    // attribute not yet provisioned in the dashboard. If SIGNUP_SOURCE
    // does not exist yet, retry once WITHOUT attributes so the signup
    // still succeeds — source capture is best-effort, lead capture is
    // not. Duplicates are excluded because updateEnabled handles
    // re-subscribes without a 400.
    if (attributes && brevoRes.status === 400) {
      const failedBody = await brevoRes.clone().json().catch(() => ({}));
      if (failedBody.code !== "duplicate_parameter") {
        brevoRes = await createBrevoContact(
          context.env.BREVO_API_KEY,
          normalizedEmail,
          listId,
          null,
        );
      }
    }

    if (brevoRes.status === 201 || brevoRes.status === 204) {
      return new Response(
        JSON.stringify({ ok: true }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const brevoBody = await brevoRes.json().catch(() => ({}));

    if (brevoBody.code === "duplicate_parameter") {
      return new Response(
        JSON.stringify({ ok: true, message: "Already subscribed." }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.error("Brevo error:", brevoBody);

    if (brevoBody?.code) {
      return new Response(
        JSON.stringify({ error: "Subscription failed.", detail: brevoBody.code }),
        { status: 502, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Subscription failed. Please try again." }),
      { status: 502, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Server error. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
}

export async function onRequestOptions(context) {
  const allowedOrigins = [
    "https://www.legendary-arena.com",
    "http://localhost:8788",
    "http://127.0.0.1:8788",
  ];
  const origin = context.request.headers.get("Origin");
  const allowOrigin = allowedOrigins.includes(origin)
    ? origin
    : "https://www.legendary-arena.com";

  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": allowOrigin,
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
