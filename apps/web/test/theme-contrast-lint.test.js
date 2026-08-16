/**
 * Automated Theme Contrast & Design Token Integrity Linter
 * Ensures no UI components use hardcoded monochrome text colors that break light/dark mode.
 */

const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules' && file !== '.next') {
        getAllFiles(fullPath, arrayOfFiles);
      }
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

test('Theme Tokens: Disallow hardcoded monochrome text colors in headings and blockquotes', () => {
  const webAppDir = path.join(__dirname, '../app');
  const componentsDir = path.join(__dirname, '../components');
  
  const files = [
    ...getAllFiles(webAppDir),
    ...getAllFiles(componentsDir)
  ];

  const violations = [];

  for (const filePath of files) {
    const relative = path.relative(path.join(__dirname, '../../..'), filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, idx) => {
      // Check for <h1..h6, <blockquote, <p with hardcoded #FFFFFF or #ffffff or #000000
      if (/<(h[1-6]|blockquote|p)\b[^>]*style=\{\{[^}]*color:\s*['"]#(?:ffffff|fff|000000|000)['"]/i.test(line)) {
        violations.push(`${relative}:${idx + 1} -> ${line.trim()}`);
      }
    });
  }

  assert.strictEqual(
    violations.length,
    0,
    `Found ${violations.length} hardcoded monochrome color violations:\n${violations.join('\n')}`
  );
});
