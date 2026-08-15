/**
 * VeriLens Zero-Dependency Dev Watcher & Auto-Reloader
 * Uses built-in Node.js 'http' and 'fs' modules.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8890;
const WATCH_DIR = path.resolve(__dirname, '..');

let clients = [];
let reloadTimeout = null;

// Create lightweight SSE (Server-Sent Events) server
const server = http.createServer((req, res) => {
  if (req.url === '/hot-reload') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });
    res.write('\n');
    clients.push(res);

    req.on('close', () => {
      clients = clients.filter(c => c !== res);
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`\n⚡ VeriLens Hot-Reloader active on http://localhost:${PORT}`);
  console.log(`👀 Watching for file changes in: ${WATCH_DIR}`);
  console.log(`Press Ctrl+C to stop.\n`);
});

// Watch directory recursively for changes
fs.watch(WATCH_DIR, { recursive: true }, (eventType, filename) => {
  if (!filename) return;
  // Ignore git, demo output, or temporary files
  if (filename.includes('.git') || filename.includes('node_modules') || filename.startsWith('.')) {
    return;
  }

  clearTimeout(reloadTimeout);
  reloadTimeout = setTimeout(() => {
    console.log(`🔄 [${new Date().toLocaleTimeString()}] File changed: ${filename} -> Triggering reload...`);
    clients.forEach(res => {
      res.write('data: reload\n\n');
    });
  }, 100);
});
