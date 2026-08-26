"use strict";

/*
 * Snipcart loader (WP-044).
 *
 * This one script runs on EVERY page and decides at runtime how to load the
 * Snipcart runtime (~212 KiB of JavaScript plus a stylesheet). It must be
 * cache-safe: the footer partial that emits it is rendered with
 * `partialCached` keyed on .Kind/.Layout (NOT .Section), so the emitted markup
 * is shared across pages of the same kind. The load decision therefore CANNOT
 * depend on Hugo's `.Section` — it is made here from the DOM instead:
 *
 *   - Commerce pages have add-to-cart buttons (`.snipcart-add-item`). When any
 *     are present we load the SDK eagerly (as soon as this deferred script
 *     runs) so the buy buttons are armed, and also on add-to-cart intent as a
 *     race guard.
 *   - Every page has the header cart button (`.snipcart-checkout`). On pages
 *     with no add-to-cart buttons the SDK loads only on cart-button intent —
 *     most sessions never open the cart, so most pages never pay for Snipcart.
 *
 * Snipcart v3 auto-initializes once its script runs and finds the
 * `#snipcart[data-api-key]` mount (rendered site-wide in `extend_footer.html`).
 */

/** Snipcart CDN version — matches the mount/docs in the layouts. */
var SNIPCART_VERSION = "v3.7.1";
var SNIPCART_STYLESHEET_URL =
  "https://cdn.snipcart.com/themes/" + SNIPCART_VERSION + "/default/snipcart.css";
var SNIPCART_SCRIPT_URL =
  "https://cdn.snipcart.com/themes/" + SNIPCART_VERSION + "/default/snipcart.js";

/** Guard so the runtime is injected at most once per page. */
var snipcartLoadStarted = false;

/**
 * Whether a visitor click on the header cart button (not a mere hover/focus)
 * requested the cart be opened. Honored once Snipcart initializes, so a click
 * that lands before the SDK is ready is not lost.
 */
var openCartWhenReady = false;

/**
 * Inject the Snipcart stylesheet (if not already present) and script into the
 * document head. Safe to call more than once; only the first call does work.
 * @returns {void}
 */
function loadSnipcartRuntime() {
  if (snipcartLoadStarted) {
    return;
  }
  snipcartLoadStarted = true;

  if (!document.querySelector('link[href="' + SNIPCART_STYLESHEET_URL + '"]')) {
    var stylesheetLink = document.createElement("link");
    stylesheetLink.rel = "stylesheet";
    stylesheetLink.href = SNIPCART_STYLESHEET_URL;
    document.head.appendChild(stylesheetLink);
  }

  var runtimeScript = document.createElement("script");
  runtimeScript.src = SNIPCART_SCRIPT_URL;
  runtimeScript.async = true;
  document.head.appendChild(runtimeScript);
}

/**
 * Open the Snipcart cart panel if the SDK exposes its theme API. Used to honor
 * a cart-button click that arrived before Snipcart had finished initializing.
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
 * Whether Snipcart has booted far enough to handle its own DOM clicks.
 * @returns {boolean}
 */
function isSnipcartLive() {
  return typeof window.Snipcart !== "undefined" && Boolean(window.Snipcart.api);
}

/**
 * Warm the runtime on intent (hover / focus / add-to-cart), so the SDK is
 * usually ready by the time the visitor commits to a click.
 * @returns {void}
 */
function handleIntent() {
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
  if (isSnipcartLive()) {
    return;
  }
  event.preventDefault();
  openCartWhenReady = true;
  loadSnipcartRuntime();
}

/**
 * Decide how to load Snipcart based on the page's DOM (cache-safe). Wires cart
 * and add-to-cart intent; eagerly loads the SDK when the page has add-to-cart
 * buttons so commerce works on first paint.
 * @returns {void}
 */
function initializeSnipcart() {
  var cartButton = document.querySelector(".snipcart-checkout");
  if (cartButton) {
    cartButton.addEventListener("pointerenter", handleIntent, { once: true });
    cartButton.addEventListener("focus", handleIntent, { once: true });
    cartButton.addEventListener("click", handleCartClick);
  }

  var addButtons = document.querySelectorAll(".snipcart-add-item");
  for (var index = 0; index < addButtons.length; index += 1) {
    addButtons[index].addEventListener("pointerenter", handleIntent, { once: true });
    addButtons[index].addEventListener("focus", handleIntent, { once: true });
  }

  document.addEventListener("snipcart.ready", function () {
    if (openCartWhenReady) {
      openCartWhenReady = false;
      openSnipcartCart();
    }
  });

  // Commerce page (has add-to-cart buttons): load the SDK now so the buttons
  // are armed. This deferred script already runs after HTML parse, so the SDK
  // parse stays off the initial render path.
  if (addButtons.length > 0) {
    loadSnipcartRuntime();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSnipcart);
} else {
  initializeSnipcart();
}
