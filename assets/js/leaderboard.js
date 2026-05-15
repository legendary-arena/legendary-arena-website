// @ts-nocheck
"use strict";

const API_BASE = "https://api.legendary-arena.com/api/leaderboards";
const ERROR_PREFIX = "Unable to load leaderboard: ";
const LOADING_TEXT = "Loading leaderboard…";
const PLACEHOLDER_TEXT = "The scheme-mastermind leaderboard view is coming soon.";
const DEFAULT_LIMIT = 25;
const MIN_LIMIT = 1;
const MAX_LIMIT = 100;
const MIN_OFFSET = 0;
const MAX_OFFSET = 10000;

const COLUMN_HEADERS = [
  "Rank",
  "Player",
  "Final Score",
  "Raw Score",
  "Scenario",
  "PAR Version",
  "Scoring Config Version",
  "Created At",
  "Replay",
];

const COLUMN_KEYS = [
  "rank",
  "playerDisplayName",
  "finalScore",
  "rawScore",
  "scenarioKey",
  "parVersion",
  "scoringConfigVersion",
  "createdAt",
  "replayHash",
];

let activeController = null;

/**
 * Clamp a numeric value to a bounded range.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function clampValue(value, min, max) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

/**
 * Parse query parameters from the current URL and resolve the active view,
 * themeId, limit, and offset with precedence rules and clamping applied.
 * @returns {{ view: string, themeId: string|null, limit: number, offset: number }}
 */
function parseQueryParameters() {
  const parameters = new URLSearchParams(window.location.search);

  const rawLimit = parseInt(parameters.get("limit"), 10);
  const rawOffset = parseInt(parameters.get("offset"), 10);

  const limit = clampValue(
    Number.isFinite(rawLimit) ? rawLimit : DEFAULT_LIMIT,
    MIN_LIMIT,
    MAX_LIMIT
  );
  const offset = clampValue(
    Number.isFinite(rawOffset) ? rawOffset : MIN_OFFSET,
    MIN_OFFSET,
    MAX_OFFSET
  );

  // why: URL precedence is locked by WP-149 — scheme-mastermind overrides all,
  // then themeId, then global fallback. This order is contractual.
  const rawView = parameters.get("view");
  if (rawView === "scheme-mastermind") {
    return { view: "scheme-mastermind", themeId: null, limit, offset };
  }

  const themeId = parameters.get("themeId");
  if (themeId) {
    return { view: "theme", themeId, limit, offset };
  }

  return { view: "global", themeId: null, limit, offset };
}

/**
 * Build the API URL for the resolved view.
 * @param {{ view: string, themeId: string|null, limit: number, offset: number }} parameters
 * @returns {string}
 */
function buildEndpointUrl(parameters) {
  if (parameters.view === "theme" && parameters.themeId) {
    return `${API_BASE}/themes/${encodeURIComponent(parameters.themeId)}?limit=${parameters.limit}&offset=${parameters.offset}`;
  }
  return `${API_BASE}/top?limit=${parameters.limit}&offset=${parameters.offset}`;
}

/**
 * Render the status message into the status element.
 * @param {string} message
 */
function renderStatus(message) {
  const statusElement = document.getElementById("leaderboard-status");
  if (statusElement) {
    statusElement.textContent = message;
  }
}

/**
 * Clear the status element.
 */
function clearStatus() {
  const statusElement = document.getElementById("leaderboard-status");
  if (statusElement) {
    statusElement.textContent = "";
  }
}

/**
 * Render an error message with the locked prefix into the status element.
 * // why: consumer-facing surface requires full-sentence error messages
 * // (00.6 Rule 11 / Rule 15). No terse "Error" or "Failed" allowed.
 * @param {string} detail
 */
function renderError(detail) {
  renderStatus(ERROR_PREFIX + detail);
}

/**
 * Render a table of leaderboard entries into the table container.
 * @param {Array<Object>} entries
 */
function renderTable(entries) {
  const tableContainer = document.getElementById("leaderboard-table");
  if (!tableContainer) return;

  if (entries.length === 0) {
    tableContainer.innerHTML = "";
    renderStatus("No leaderboard entries found.");
    return;
  }

  const table = document.createElement("table");
  table.className = "leaderboard-data-table";

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  for (const header of COLUMN_HEADERS) {
    const th = document.createElement("th");
    th.scope = "col";
    th.textContent = header;
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  for (const entry of entries) {
    const row = document.createElement("tr");
    for (const key of COLUMN_KEYS) {
      const cell = document.createElement("td");
      const value = entry[key];
      cell.textContent = value != null ? String(value) : "";
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }
  table.appendChild(tbody);

  tableContainer.innerHTML = "";
  tableContainer.appendChild(table);
}

// why: WP-115 pagination-bound reuse (1..100 limit, 0..10000 offset) rather
// than client-side re-derivation. The bounds are contractual from the API layer.
/**
 * Render pagination controls (previous / next) into the pagination container.
 * @param {{ limit: number, offset: number, totalEligibleEntries: number, view: string, themeId: string|null }} parameters
 */
function renderPagination(parameters) {
  const paginationContainer = document.getElementById("leaderboard-pagination");
  if (!paginationContainer) return;

  paginationContainer.innerHTML = "";

  const { limit, offset, totalEligibleEntries, view, themeId } = parameters;
  const hasPrevious = offset > 0;
  const hasNext = offset + limit < totalEligibleEntries;

  if (!hasPrevious && !hasNext) return;

  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(totalEligibleEntries / limit);

  /**
   * Build a query string for a pagination link.
   * @param {number} newOffset
   * @returns {string}
   */
  function buildPaginationQuery(newOffset) {
    const clampedOffset = clampValue(newOffset, MIN_OFFSET, MAX_OFFSET);
    const params = new URLSearchParams();
    if (view === "scheme-mastermind") {
      params.set("view", "scheme-mastermind");
    } else if (view === "theme" && themeId) {
      params.set("themeId", themeId);
    }
    params.set("limit", String(limit));
    params.set("offset", String(clampedOffset));
    return "?" + params.toString();
  }

  if (hasPrevious) {
    const previousButton = document.createElement("button");
    previousButton.type = "button";
    previousButton.textContent = "Previous";
    previousButton.addEventListener("click", function () {
      const newOffset = clampValue(offset - limit, MIN_OFFSET, MAX_OFFSET);
      history.pushState(null, "", buildPaginationQuery(newOffset));
      loadLeaderboard();
    });
    paginationContainer.appendChild(previousButton);
  }

  const pageIndicator = document.createElement("span");
  pageIndicator.className = "leaderboard-page-indicator";
  pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
  paginationContainer.appendChild(pageIndicator);

  if (hasNext) {
    const nextButton = document.createElement("button");
    nextButton.type = "button";
    nextButton.textContent = "Next";
    nextButton.addEventListener("click", function () {
      const newOffset = clampValue(offset + limit, MIN_OFFSET, MAX_OFFSET);
      history.pushState(null, "", buildPaginationQuery(newOffset));
      loadLeaderboard();
    });
    paginationContainer.appendChild(nextButton);
  }
}

/**
 * Update the active state of view tabs to reflect the resolved view.
 * @param {string} activeView
 */
function updateViewTabs(activeView) {
  const tabs = document.querySelectorAll("#leaderboard-view-tabs .leaderboard-tab");
  for (const tab of tabs) {
    const isActive = tab.dataset.view === activeView;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-pressed", String(isActive));
  }
}

// why: cross-origin contract — CORS allowlist from WP-148 permits
// www.legendary-arena.com; endpoints from WP-150 serve the leaderboard data.
// One fetch per resolved view; in-flight request abandoned via AbortController
// if a new view change triggers.
/**
 * Fetch leaderboard data for the current URL state and render the result.
 */
async function loadLeaderboard() {
  const parameters = parseQueryParameters();
  updateViewTabs(parameters.view);

  // why: URL-contract reservation — scheme-mastermind has no implementation
  // in v1. A future WP flips this placeholder to live.
  if (parameters.view === "scheme-mastermind") {
    clearStatus();
    renderStatus(PLACEHOLDER_TEXT);
    document.getElementById("leaderboard-table").innerHTML = "";
    document.getElementById("leaderboard-pagination").innerHTML = "";
    return;
  }

  if (activeController) {
    activeController.abort();
  }
  activeController = new AbortController();

  renderStatus(LOADING_TEXT);
  document.getElementById("leaderboard-table").innerHTML = "";
  document.getElementById("leaderboard-pagination").innerHTML = "";

  const url = buildEndpointUrl(parameters);

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: activeController.signal,
    });

    if (!response.ok) {
      let detail = `the server responded with status ${response.status}.`;
      try {
        const errorBody = await response.json();
        if (errorBody.message) {
          detail = errorBody.message;
        }
      } catch (_ignored) {
        // Non-JSON error body; use the status-based message.
      }
      renderError(detail);
      return;
    }

    let data;
    try {
      data = await response.json();
    } catch (_ignored) {
      renderError("the server returned an invalid response.");
      return;
    }

    clearStatus();
    renderTable(data.entries || []);
    renderPagination({
      limit: parameters.limit,
      offset: parameters.offset,
      totalEligibleEntries: data.totalEligibleEntries || 0,
      view: parameters.view,
      themeId: parameters.themeId,
    });
  } catch (error) {
    if (error.name === "AbortError") return;
    renderError("a network error occurred. Please check your connection and try again.");
  }
}

/**
 * Set up view-tab click handlers to navigate between leaderboard views.
 */
function initializeViewTabs() {
  const tabContainer = document.getElementById("leaderboard-view-tabs");
  if (!tabContainer) return;

  tabContainer.addEventListener("click", function (event) {
    const tab = event.target.closest(".leaderboard-tab");
    if (!tab) return;

    const view = tab.dataset.view;
    const params = new URLSearchParams();

    if (view === "scheme-mastermind") {
      params.set("view", "scheme-mastermind");
    } else if (view === "theme") {
      params.set("themeId", "dark-city");
    }

    const query = params.toString();
    history.pushState(null, "", query ? "?" + query : window.location.pathname);
    loadLeaderboard();
  });
}

/**
 * Handle browser back/forward navigation to re-render the correct view.
 */
function initializePopStateHandler() {
  window.addEventListener("popstate", function () {
    loadLeaderboard();
  });
}

/**
 * Entry point — wire up tabs, popstate, and trigger the initial load.
 */
function initialize() {
  initializeViewTabs();
  initializePopStateHandler();
  loadLeaderboard();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize);
} else {
  initialize();
}
