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

    const { email } = await context.request.json();

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

    const brevoRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": context.env.BREVO_API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        listIds: [listId],
        updateEnabled: true,
      }),
    });

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
