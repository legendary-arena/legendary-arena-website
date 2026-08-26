// @ts-nocheck
"use strict";

// why: projection of the engine feedback/roadmap system (engine WP-604 /
// D-24414). The board GET is guest-readable; interactive voting (WP-045) adds
// an authenticated write for signed-in visitors. The engine owns the tally —
// this page only sends the vote and reflects the authoritative result. Nothing
// about the roadmap is authored or cached here; on API failure the page shows a
// full-sentence message, never a stale hardcoded board.
const API_BASE = "https://api.legendary-arena.com/api/feedback";

// why: the canonical sign-in destination (hugo.toml [[menu.main]] "Account",
// engine D-24084 as amended). A signed-out visitor sent to ?route=me is
// auto-bounced to ?route=login by the play client, so this one URL covers both
// states. Matches the header Account link that header-auth.js personalizes.
const SIGN_IN_URL = "https://play.legendary-arena.com/?route=me";

const ERROR_PREFIX = "Unable to load the roadmap: ";
const LOADING_TEXT = "Loading the roadmap…";
const EMPTY_BOARD_TEXT =
  "The roadmap is empty for now — no enhancements have been posted yet. Check back soon.";
const EMPTY_COLUMN_TEXT = "Nothing here yet.";
const SESSION_EXPIRED_TEXT =
  "Your session expired — sign in again to vote.";
const VOTE_ERROR_TEXT =
  "Your vote could not be saved. Please check your connection and try again.";

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
 * Read the value of the JS-accessible `hanko` session cookie (the bearer JWT),
 * or null when no session cookie is present.
 * // why: duplicated verbatim from assets/js/header-auth.js (second use of the
 * // helper). The `hanko` cookie is the broker session token (engine D-16002),
 * // scoped to `.legendary-arena.com` (engine WP-347 / D-24137) so a sign-in on
 * // play.* is readable here on www.*. The cookie value IS the bearer JWT, sent
 * // as `Authorization: Bearer <token>` — no Hanko SDK, no cookies/credentials
 * // mode. Extract a shared assets/js/hanko-token.js on the third use
 * // (duplicate-first). Do not edit header-auth.js.
 * @returns {string|null}
 */
function readHankoToken() {
  const cookies = document.cookie ? document.cookie.split(";") : [];
  for (const cookie of cookies) {
    const separatorIndex = cookie.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }
    const name = cookie.slice(0, separatorIndex).trim();
    if (name === "hanko") {
      const rawValue = cookie.slice(separatorIndex + 1).trim();
      return rawValue.length > 0 ? decodeURIComponent(rawValue) : null;
    }
  }
  return null;
}

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
 * Render a full-sentence "session expired" message plus a sign-in link into the
 * status region (built via createElement, never innerHTML). Used when a vote is
 * rejected with 401 so the visitor gets a live re-auth path, not a dead button.
 */
function renderSessionExpired() {
  const statusElement = document.getElementById("roadmap-status");
  if (!statusElement) {
    return;
  }
  statusElement.textContent = SESSION_EXPIRED_TEXT + " ";
  const link = document.createElement("a");
  link.href = SIGN_IN_URL;
  link.textContent = "Sign in";
  statusElement.appendChild(link);
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
 * Coerce an API vote count to a non-negative finite number (defaults to 0).
 * @param {number} voteCount
 * @returns {number}
 */
function normalizeVoteCount(voteCount) {
  return Number.isFinite(voteCount) && voteCount >= 0 ? voteCount : 0;
}

/**
 * Format a vote count as a full, pluralized label ("1 vote" / "12 votes").
 * A missing or non-numeric count is treated as zero rather than shown blank.
 * @param {number} voteCount
 * @returns {string}
 */
function formatVoteCount(voteCount) {
  const count = normalizeVoteCount(voteCount);
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
 * Reflect the current vote state onto a vote button: visible "▲ N votes" label,
 * aria-pressed, an explicit aria-label for assistive tech, and the count cached
 * on the dataset so the toggle handler can roll back an optimistic update.
 * @param {HTMLButtonElement} button
 * @param {number} voteCount
 * @param {boolean} hasVoted
 */
function applyVoteState(button, voteCount, hasVoted) {
  const count = normalizeVoteCount(voteCount);
  button.dataset.voteCount = String(count);
  button.dataset.hasVoted = hasVoted ? "1" : "0";
  button.setAttribute("aria-pressed", hasVoted ? "true" : "false");
  button.setAttribute(
    "aria-label",
    (hasVoted ? "Remove your vote from this enhancement" : "Upvote this enhancement") +
      " (" + formatVoteCount(count) + ")"
  );
  button.textContent = "▲ " + formatVoteCount(count);
}

/**
 * Send the vote (POST) or un-vote (DELETE) for one enhancement and return the
 * authoritative response. Auth is the `hanko` bearer token in the Authorization
 * header — no cookies/credentials mode (server CORS allows POST/DELETE +
 * Authorization from www; verified WP-045).
 * @param {string} feedbackId
 * @param {boolean} shouldVote - true to cast a vote (POST), false to remove it (DELETE).
 * @param {string} token
 * @returns {Promise<Response>}
 */
function sendVote(feedbackId, shouldVote, token) {
  return fetch(API_BASE + "/" + encodeURIComponent(feedbackId) + "/vote", {
    method: shouldVote ? "POST" : "DELETE",
    headers: { Accept: "application/json", Authorization: "Bearer " + token },
  });
}

/**
 * Toggle the vote for one enhancement with optimistic UI. Flip the state and
 * count immediately and disable the button while the request is in flight, then
 * reconcile to the authoritative `voteCount` in the response. On 401 surface a
 * re-auth prompt; on any other failure roll the optimistic change back and show
 * a full-sentence message. The button is always re-enabled.
 * @param {HTMLButtonElement} button
 * @param {string} feedbackId
 * @param {string} token
 * @returns {Promise<void>}
 */
async function handleVoteToggle(button, feedbackId, token) {
  if (button.disabled) {
    return;
  }
  const previousCount = normalizeVoteCount(Number(button.dataset.voteCount));
  const previouslyVoted = button.dataset.hasVoted === "1";
  const shouldVote = !previouslyVoted;

  // Optimistic: flip state + adjust count, then lock the button.
  const optimisticCount = shouldVote ? previousCount + 1 : Math.max(0, previousCount - 1);
  applyVoteState(button, optimisticCount, shouldVote);
  button.disabled = true;
  clearStatus();

  try {
    const response = await sendVote(feedbackId, shouldVote, token);

    if (response.status === 401) {
      applyVoteState(button, previousCount, previouslyVoted);
      renderSessionExpired();
      return;
    }
    if (!response.ok) {
      applyVoteState(button, previousCount, previouslyVoted);
      renderStatus(VOTE_ERROR_TEXT);
      return;
    }

    // Reconcile to the authoritative response — never trust the local increment.
    let body = null;
    try {
      body = await response.json();
    } catch (_ignored) {
      body = null;
    }
    const authoritativeCount =
      body && Number.isFinite(body.voteCount) ? body.voteCount : optimisticCount;
    const authoritativeVoted =
      body && typeof body.voted === "boolean" ? body.voted : shouldVote;
    applyVoteState(button, authoritativeCount, authoritativeVoted);
  } catch (_error) {
    applyVoteState(button, previousCount, previouslyVoted);
    renderStatus(VOTE_ERROR_TEXT);
  } finally {
    button.disabled = false;
  }
}

/**
 * Build the interactive upvote button for a signed-in visitor. Reflects
 * `viewerHasVoted` via aria-pressed and toggles vote/un-vote on click.
 * @param {Object} item
 * @param {string} token
 * @returns {HTMLButtonElement}
 */
function createVoteButton(item, token) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "roadmap-vote";
  button.dataset.feedbackId = String(item.id);
  applyVoteState(button, item.voteCount, item.viewerHasVoted === true);
  button.addEventListener("click", function () {
    handleVoteToggle(button, item.id, token);
  });
  return button;
}

/**
 * Build the signed-out vote affordance: the read-only count badge (guests still
 * see the priority signal) plus a "Sign in to vote" link. Returns a fragment so
 * both nodes are appended together.
 * @param {Object} item
 * @returns {DocumentFragment}
 */
function createSignedOutVoteControl(item) {
  const fragment = document.createDocumentFragment();

  const votes = document.createElement("span");
  votes.className = "roadmap-card-votes";
  votes.textContent = formatVoteCount(item.voteCount);
  fragment.appendChild(votes);

  const signIn = document.createElement("a");
  signIn.className = "roadmap-vote-signin";
  signIn.href = SIGN_IN_URL;
  signIn.textContent = "Sign in to vote";
  fragment.appendChild(signIn);

  return fragment;
}

/**
 * Build one roadmap card element for an enhancement item. Title, an optional
 * description, and the vote control — an interactive upvote button when a
 * session token is present, else the read-only count plus a sign-in link. All
 * via `document.createElement` so untrusted API strings are inserted as text,
 * never HTML.
 * @param {Object} item
 * @param {string} status
 * @param {string|null} token
 * @returns {HTMLElement}
 */
function createRoadmapCard(item, status, token) {
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

  // why: vote count is a priority signal (engine D-24414 — voting informs
  // priority, it is not a referendum). Signed-in visitors get a one-click
  // vote/un-vote toggle; signed-out visitors see the count and an invitation to
  // sign in. A valid id is required to vote, so a malformed item falls back to
  // the read-only control.
  const hasVotableId =
    token && (typeof item.id === "string" || typeof item.id === "number") &&
    String(item.id).length > 0;
  card.appendChild(
    hasVotableId ? createVoteButton(item, token) : createSignedOutVoteControl(item)
  );

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
 * @param {string|null} token
 */
function renderBoard(items, token) {
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
      container.appendChild(createRoadmapCard(item, column.status, token));
    }
  }
}

/**
 * Fetch the feedback/roadmap data and render the board. When a session token is
 * present it is sent as `Authorization: Bearer <token>` so the response carries
 * an accurate `viewerHasVoted` per item (and signed-in counts); a guest omits
 * the header and gets the working read-only board. One in-flight request at a
 * time; a superseding call abandons the previous via AbortController.
 */
async function loadRoadmap() {
  if (activeController) {
    activeController.abort();
  }
  activeController = new AbortController();

  renderStatus(LOADING_TEXT);
  clearAllColumns();

  const token = readHankoToken();
  const headers = { Accept: "application/json" };
  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  try {
    const response = await fetch(API_BASE, {
      headers: headers,
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
    renderBoard(items, token);

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
