document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".newsletter-form").forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn = form.querySelector('button[type="submit"]');
      const status = form.querySelector(".newsletter-status");
      const email = input.value.trim();

      if (!email) return;

      status.textContent = "";
      status.className = "newsletter-status";
      status.hidden = true;
      btn.disabled = true;
      btn.textContent = "Sending…";

      try {
        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
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
