"use strict";

/*
 * Lazy Snipcart loader (WP-044).
 *
 * On non-commerce pages the Snipcart runtime (~212 KiB of JavaScript plus a
 * stylesheet) is NOT loaded at first paint. It is fetched only when the visitor
 * signals intent to use the cart — hovering, focusing, or clicking the header
 * cart button (`.snipcart-checkout`). Most sessions never touch the cart, so
 * most pages never pay for Snipcart at all. This mirrors the lazy-load posture
 * already used for Pagefind search in `extend_head.html`: keep the critical
 * render path clean, but preserve an immediate affordance.
 *
 * Commerce pages (the `shop` section) load Snipcart eagerly instead — see
 * `extend_head.html` §5 and `extend_footer.html` — because their add-to-cart
 * buttons must be armed at first paint. This loader is emitted only on pages
 * that do NOT load Snipcart eagerly. Snipcart v3 auto-initializes once its
 * script runs and finds the `#snipcart[data-api-key]` mount (rendered
 * site-wide in `extend_footer.html`).
 */

/** Snipcart CDN version — kept in lockstep with the tags in the layouts. */
var SNIPCART_VERSION = "v3.7.1";
var SNIPCART_STYLESHEET_URL =
  "https://cdn.snipcart.com/themes/" + SNIPCART_VERSION + "/default/snipcart.css";
var SNIPCART_SCRIPT_URL =
  "https://cdn.snipcart.com/themes/" + SNIPCART_VERSION + "/default/snipcart.js";

/** Guard so the runtime is injected at most once per page. */
var snipcartLoadStarted = false;

/**
 * Whether a visitor click on the cart button (not a mere hover/focus) requested
 * the cart be opened. When Snipcart finishes initializing we honor this by
 * opening the cart, so a click that lands before the SDK is ready is not lost.
 */
var openCartWhenReady = false;

/**
 * Inject the Snipcart stylesheet and script into the document head. Snipcart v3
 * auto-initializes once its script runs and finds the `#snipcart[data-api-key]`
 * mount element. Safe to call more than once; only the first call does work.
 * @returns {void}
 */
function loadSnipcartRuntime() {
  if (snipcartLoadStarted) {
    return;
  }
  snipcartLoadStarted = true;

  var stylesheetLink = document.createElement("link");
  stylesheetLink.rel = "stylesheet";
  stylesheetLink.href = SNIPCART_STYLESHEET_URL;
  document.head.appendChild(stylesheetLink);

  var runtimeScript = document.createElement("script");
  runtimeScript.src = SNIPCART_SCRIPT_URL;
  runtimeScript.async = true;
  document.head.appendChild(runtimeScript);
}

/**
 * Open the Snipcart cart panel if the SDK exposes its theme API. Used to honor
 * a click that arrived before Snipcart had finished initializing.
 * @returns {void}
 */
function openSnipcartCart() {
  if (
    typeof window.Snipcart !== "undefined" &&
    window.Snipcart.api &&
    window.Snipcart.api.theme &&
    window.Snipcart.api.theme.cart
  ) {
    window.Snipcart.api.theme.cart.open();
  }
}

/**
 * Handle a hover or focus on the cart button: warm the runtime so that, by the
 * time the visitor actually clicks, Snipcart is usually already initialized.
 * @returns {void}
 */
function handleCartIntent() {
  loadSnipcartRuntime();
}

/**
 * Handle a click on the header cart button. If Snipcart is already live it
 * handles the click itself (via its reserved `.snipcart-checkout` class). If it
 * is still loading, start the load and remember to open the cart as soon as
 * `snipcart.ready` fires, so the first click is not lost.
 * @param {Event} event - the originating click event.
 * @returns {void}
 */
function handleCartClick(event) {
  if (typeof window.Snipcart !== "undefined" && window.Snipcart.api) {
    return;
  }
  event.preventDefault();
  openCartWhenReady = true;
  loadSnipcartRuntime();
}

/**
 * Wire up the header cart button. Hover and focus warm the runtime; click both
 * warms it and (if needed) queues the cart to open once the SDK is ready.
 * @returns {void}
 */
function initializeLazySnipcart() {
  var cartButton = document.querySelector(".snipcart-checkout");
  if (!cartButton) {
    return;
  }

  cartButton.addEventListener("pointerenter", handleCartIntent, { once: true });
  cartButton.addEventListener("focus", handleCartIntent, { once: true });
  cartButton.addEventListener("click", handleCartClick);

  // Snipcart emits `snipcart.ready` on `document` once initialization completes.
  document.addEventListener("snipcart.ready", function () {
    if (openCartWhenReady) {
      openCartWhenReady = false;
      openSnipcartCart();
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeLazySnipcart);
} else {
  initializeLazySnipcart();
}
