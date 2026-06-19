document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".newsletter-form").forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn = form.querySelector('button[type="submit"]');
      const status = form.querySelector(".newsletter-status");
      const sourceInput = form.querySelector('input[name="source"]');
      const honeypotInput = form.querySelector('input[name="company"]');
      const email = input.value.trim();
      const source = sourceInput ? sourceInput.value : "";
      const honeypot = honeypotInput ? honeypotInput.value : "";

      if (!email) return;

      status.textContent = "";
      status.className = "newsletter-status";
      status.hidden = true;
      btn.disabled = true;
      btn.textContent = "Sending…";

      try {
        const payload = { email };
        if (source) payload.source = source;
        // Honeypot: forwarded only if a (JS-running) bot filled the
        // off-screen `company` field. Empty for real users; the server
        // treats a non-empty value as spam. See functions/api/subscribe.js.
        if (honeypot) payload.company = honeypot;

        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();

        if (res.ok) {
          status.textContent = data.message || "You’re subscribed! Check your inbox to confirm.";
          status.className = "newsletter-status success";
          input.value = "";
        } else {
          status.textContent = data.error || "Something went wrong. Please try again.";
          status.className = "newsletter-status error";
        }
      } catch {
        status.textContent = "Network error. Please try again.";
        status.className = "newsletter-status error";
      }

      status.hidden = false;
      btn.disabled = false;
      btn.textContent = "Subscribe";
    });
  });
});
