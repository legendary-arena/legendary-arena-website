/**
 * Header auth-awareness (WP-033): greet a signed-in visitor by name.
 *
 * Progressive enhancement. The server-rendered header shows the static
 * "Account" link (WP-032); this script OPTIONALLY replaces that text with the
 * player's name when a Hanko session exists, then stops. Nothing here blocks
 * paint (loaded `defer`) and every failure path is silent — the "Account" text
 * simply stays.
 *
 * How it reads the session WITHOUT a Hanko SDK: the broker session token is a
 * JS-accessible cookie named `hanko` (engine D-16002), and engine WP-347 /
 * D-24137 scopes that cookie to `.legendary-arena.com` so it is shared across
 * subdomains — a sign-in on `play.` is readable here on `www.`. The cookie
 * value IS the bearer JWT, so we read it directly and call the same
 * `GET /api/me/profile` the arena-client SPA uses. No SDK bundle is loaded, so
 * the static Lighthouse baseline is untouched.
 *
 * Boundary (D-24084 as amended): `www` stays auth-AWARE, not auth-OWNING. It
 * only READS an existing session to personalize the header label; sign-in and
 * profile editing live entirely on `play`. The link still points at
 * `?route=me`.
 */
(function () {
  'use strict';

  // why: single-environment static site (production only), so the API origin is
  // a documented constant rather than a build-time variable like the SPA's
  // VITE_API_BASE_URL. This is the same origin the arena-client SPA calls, and
  // it is already in the server CORS allowlist for the www origin.
  var API_BASE = 'https://api.legendary-arena.com';

  /**
   * Read the value of the JS-accessible `hanko` session cookie (the bearer
   * JWT), or null when no session cookie is present.
   */
  function readHankoToken() {
    var cookies = document.cookie ? document.cookie.split(';') : [];
    for (var i = 0; i < cookies.length; i++) {
      var separatorIndex = cookies[i].indexOf('=');
      if (separatorIndex === -1) {
        continue;
      }
      var name = cookies[i].slice(0, separatorIndex).trim();
      if (name === 'hanko') {
        var rawValue = cookies[i].slice(separatorIndex + 1).trim();
        return rawValue.length > 0 ? decodeURIComponent(rawValue) : null;
      }
    }
    return null;
  }

  /**
   * Resolve the header label from an owner profile, mirroring the play app's
   * chain (WP-330): trimmed displayName, else @handleCanonical, else null
   * (which leaves the static "Account" label untouched).
   */
  function resolveLabel(profile) {
    if (profile && typeof profile.displayName === 'string') {
      var name = profile.displayName.trim();
      if (name.length > 0) {
        return name;
      }
    }
    if (profile && typeof profile.handleCanonical === 'string') {
      var handle = profile.handleCanonical.trim();
      if (handle.length > 0) {
        return '@' + handle;
      }
    }
    return null;
  }

  /**
   * Find the text-bearing element of the Account header link. The Account entry
   * is the only header link targeting `?route=me` (WP-032), so we target it by
   * href — no template hook required. The visible label sits in an inner
   * `<span>` (the header partial wraps the menu name), so we prefer that to
   * preserve the outbound-link icon on the anchor.
   */
  function findAccountLabelElement() {
    var link = document.querySelector('a[href*="?route=me"]');
    if (link === null) {
      return null;
    }
    return link.querySelector('span') || link;
  }

  function enhanceHeader() {
    var labelElement = findAccountLabelElement();
    if (labelElement === null) {
      return;
    }
    var token = readHankoToken();
    if (token === null) {
      return;
    }
    fetch(API_BASE + '/api/me/profile', {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token },
    })
      .then(function (response) {
        return response.status === 200 ? response.json() : null;
      })
      .then(function (profile) {
        var label = profile === null ? null : resolveLabel(profile);
        if (label !== null) {
          labelElement.textContent = label;
        }
      })
      .catch(function () {
        // why: any failure (network, CORS, non-200, JSON parse) leaves the
        // static "Account" label in place. www never surfaces an auth error to
        // the visitor — a failed personalization is invisible, not broken.
      });
  }

  enhanceHeader();
})();
