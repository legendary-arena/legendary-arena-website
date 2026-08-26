#!/usr/bin/env node
/*
 * Legendary Arena — compressed static server for the Lighthouse CI gate (WP-046).
 *
 * Serves the built `public/` directory over HTTP with on-the-fly Brotli/Gzip
 * for text assets. Compression is REQUIRED, not cosmetic: an uncompressed
 * server understates every Lighthouse score by ~5-8 points (the "Enable text
 * compression" opportunity, worth ~600 ms), which WP-044 measured directly.
 * Production (Cloudflare) serves Brotli, so measuring against an uncompressed
 * server would make a genuinely ≥90 page read as ~85 and red the gate falsely.
 *
 * Used only by the CI Lighthouse job (lighthouserc.json `startServerCommand`)
 * and for local gate runs — never part of the production build.
 *
 * Usage: node scripts/lighthouse-serve.mjs <dir> <port>
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize } from "node:path";
import { brotliCompressSync, gzipSync } from "node:zlib";

const ROOT = normalize(process.argv[2] || "public");
const PORT = Number(process.argv[3] || 4173);

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".map": "application/json",
  ".wasm": "application/wasm",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

// Text types worth compressing (mirrors Cloudflare's compressible set).
const COMPRESSIBLE = new Set([
  ".html", ".css", ".js", ".json", ".svg", ".xml", ".txt", ".map", ".wasm",
]);

createServer(async (request, response) => {
  try {
    const requestPath = decodeURIComponent(new URL(request.url, "http://x").pathname);
    let filePath = normalize(join(ROOT, requestPath));

    // Contain the resolved path inside ROOT (no traversal).
    if (!filePath.startsWith(ROOT)) {
      response.writeHead(403).end("Forbidden");
      return;
    }

    let fileStat = await stat(filePath).catch(() => null);
    if (fileStat && fileStat.isDirectory()) {
      filePath = join(filePath, "index.html");
      fileStat = await stat(filePath).catch(() => null);
    }
    if (!fileStat) {
      response.writeHead(404).end("Not found");
      return;
    }

    let body = await readFile(filePath);
    const extension = extname(filePath);
    const headers = {
      "Content-Type": CONTENT_TYPES[extension] || "application/octet-stream",
    };

    const acceptEncoding = String(request.headers["accept-encoding"] || "");
    if (COMPRESSIBLE.has(extension)) {
      if (acceptEncoding.includes("br")) {
        body = brotliCompressSync(body);
        headers["Content-Encoding"] = "br";
        headers["Vary"] = "Accept-Encoding";
      } else if (acceptEncoding.includes("gzip")) {
        body = gzipSync(body);
        headers["Content-Encoding"] = "gzip";
        headers["Vary"] = "Accept-Encoding";
      }
    }

    response.writeHead(200, headers);
    response.end(body);
  } catch (error) {
    response.writeHead(500).end(String(error));
  }
}).listen(PORT, "127.0.0.1", () => {
  // The literal token below is the LHCI `startServerReadyPattern`.
  console.log("lighthouse-serve listening on http://127.0.0.1:" + PORT + " (root: " + ROOT + ")");
});
