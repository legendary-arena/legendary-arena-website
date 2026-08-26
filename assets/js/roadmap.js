// @ts-nocheck
"use strict";

// why: read-only projection of the engine feedback/roadmap system (engine
// WP-604 / D-24414). The endpoint is guest-readable, so this fetch sends NO
// credentials and NO Authorization header — the www origin is already in the
// server CORS allowlist for guest endpoints (see assets/js/header-auth.js).
// The engine owns the data and status; nothing about the roadmap is authored or
// cached here. If the API is unreachable, the page shows a full-sentence error,
// never a stale hardcoded board.
const API_BASE = "https://api.legendary-arena.com/api/feedback";

const ERROR_PREFIX = "Unable to load the roadmap: ";
const LOADING_TEXT = "Loading the roadmap…";
const EMPTY_BOARD_TEXT =
  "The roadmap is empty for now — no enhancements have been posted yet. Check back soon.";
const EMPTY_COLUMN_TEXT = "Nothing here yet.";

// why: the three public roadmap statuses, in display order (Planned → In
// progress → Shipped). These are exactly the statuses the API returns by
// default; `under_review` / `declined` are hidden server-side. Each entry maps a
// status to its server-rendered column container id (the DOM contract from
// layouts/roadmap/list.html).
const STATUS_COLUMNS = [
  { status: "planned", containerId: "roadmap-col-planned" },
  { status: "in_progress", containerId: "roadmap-col-in_progress" },
  { status: "shipped", containerId: "roadmap-col-shipped" },
];

let activeController = null;

/**
 * Render a status message into the status region.
 * @param {string} message
 */
function renderStatus(message) {
  const statusElement = document.getElementById("roadmap-status");
  if (statusElement) {
    statusElement.textContent = message;
  }
}

/**
 * Clear the status region.
 */
function clearStatus() {
  const statusElement = document.getElementById("roadmap-status");
  if (statusElement) {
    statusElement.textContent = "";
  }
}

/**
 * Render an error message with the locked prefix into the status region.
 * // why: consumer-facing surface requires full-sentence error messages — no
 * // terse "Error" or "Failed". Mirrors leaderboard.js renderError.
 * @param {string} detail
 */
function renderError(detail) {
  renderStatus(ERROR_PREFIX + detail);
}

/**
 * Empty every status column container so a re-fetch never stacks cards.
 */
function clearAllColumns() {
  for (const column of STATUS_COLUMNS) {
    const container = document.getElementById(column.containerId);
    if (container) {
      container.innerHTML = "";
    }
  }
}

/**
 * Format a vote count as a full, pluralized label ("1 vote" / "12 votes").
 * A missing or non-numeric count is treated as zero rather than shown blank.
 * @param {number} voteCount
 * @returns {string}
 */
function formatVoteCount(voteCount) {
  const count = Number.isFinite(voteCount) ? voteCount : 0;
  const suffix = count === 1 ? "vote" : "votes";
  return count + " " + suffix;
}

/**
 * Partition feedback items into the three public status buckets via a `for...of`
 * loop (no `.reduce`). Items whose status is not one of the three public
 * statuses (or malformed items) are ignored.
 * @param {Array<Object>} items
 * @returns {{ planned: Array<Object>, in_progress: Array<Object>, shipped: Array<Object> }}
 */
function partitionItemsByStatus(items) {
  const buckets = { planned: [], in_progress: [], shipped: [] };
  for (const item of items) {
    if (item && Object.prototype.hasOwnProperty.call(buckets, item.status)) {
      buckets[item.status].push(item);
    }
  }
  return buckets;
}

/**
 * Build one roadmap card element for an enhancement item. Title, an optional
 * description, and a read-only vote-count badge — all via `document.createElement`
 * so untrusted API strings are inserted as text, never HTML.
 * @param {Object} item
 * @param {string} status
 * @returns {HTMLElement}
 */
function createRoadmapCard(item, status) {
  const card = document.createElement("article");
  card.className = "roadmap-card roadmap-card--" + status;

  const title = document.createElement("h3");
  title.className = "roadmap-card-title";
  title.textContent =
    typeof item.title === "string" && item.title.trim().length > 0
      ? item.title
      : "Untitled enhancement";
  card.appendChild(title);

  if (typeof item.description === "string" && item.description.trim().length > 0) {
    const description = document.createElement("p");
    description.className = "roadmap-card-description";
    description.textContent = item.description;
    card.appendChild(description);
  }

  // why: vote count is a display-only priority signal (engine D-24414 — voting
  // informs priority, it is not a referendum). Voting from this board is a
  // deferred follow-on WP (authenticated cross-origin write); this WP shows the
  // count read-only.
  const votes = document.createElement("span");
  votes.className = "roadmap-card-votes";
  votes.textContent = formatVoteCount(item.voteCount);
  card.appendChild(votes);

  return card;
}

/**
 * Render a quiet empty-state line into a column that has no items. Until an
 * operator triages feedback into the public statuses (engine dashboard, a
 * separate WP), columns may legitimately be empty; this must read as
 * intentional, not broken.
 * @param {HTMLElement} container
 */
function renderEmptyColumn(container) {
  const emptyLine = document.createElement("p");
  emptyLine.className = "roadmap-empty";
  emptyLine.textContent = EMPTY_COLUMN_TEXT;
  container.appendChild(emptyLine);
}

/**
 * Render the full board: partition items by status, then fill each column with
 * cards or the quiet empty-state line.
 * @param {Array<Object>} items
 */
function renderBoard(items) {
  const itemsByStatus = partitionItemsByStatus(items);
  for (const column of STATUS_COLUMNS) {
    const container = document.getElementById(column.containerId);
    if (!container) continue;

    container.innerHTML = "";
    const columnItems = itemsByStatus[column.status];

    if (columnItems.length === 0) {
      renderEmptyColumn(container);
      continue;
    }

    for (const item of columnItems) {
      container.appendChild(createRoadmapCard(item, column.status));
    }
  }
}

/**
 * Fetch the public feedback/roadmap data and render the board. One in-flight
 * request at a time; a superseding call abandons the previous via AbortController.
 */
async function loadRoadmap() {
  if (activeController) {
    activeController.abort();
  }
  activeController = new AbortController();

  renderStatus(LOADING_TEXT);
  clearAllColumns();

  try {
    const response = await fetch(API_BASE, {
      headers: { Accept: "application/json" },
      signal: activeController.signal,
    });

    if (!response.ok) {
      let detail = "the server responded with status " + response.status + ".";
      try {
        const errorBody = await response.json();
        if (errorBody && errorBody.message) {
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

    const items = Array.isArray(data.items) ? data.items : [];
    renderBoard(items);

    if (items.length === 0) {
      renderStatus(EMPTY_BOARD_TEXT);
    } else {
      clearStatus();
    }
  } catch (error) {
    if (error.name === "AbortError") return;
    renderError(
      "a network error occurred. Please check your connection and try again."
    );
  }
}

/**
 * Entry point — trigger the initial load.
 */
function initialize() {
  loadRoadmap();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize);
} else {
  initialize();
}
