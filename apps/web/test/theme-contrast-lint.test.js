/**
 * Automated Theme Contrast & Design Token Integrity Linter
 * Ensures no UI components use hardcoded monochrome text colors that break light/dark mode.
 */

import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules' && file !== '.next') {
        getAllFiles(fullPath, arrayOfFiles);
      }
    } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx')) {
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

    // Rule 1: Check for hardcoded color: '#000000' or '#111827' in h1, h2, h3, or p
    const hardcodedBlackMatches = content.match(/color:\s*['"](?:#000(?:000)?|#111827|#0f172a|#1e293b)['"]/gi);
    if (hardcodedBlackMatches) {
      violations.push(`${relative}: Uses hardcoded black text color (${hardcodedBlackMatches.join(', ')}). Use var(--text-main) or var(--text-secondary) instead.`);
    }

    // Rule 2: Check for hardcoded color: '#ffffff' on headings (outside of explicitly branded button containers)
    const hardcodedWhiteMatches = content.match(/<(?:h[1-6]|p|blockquote)[^>]*style=\{[^}]*color:\s*['"](?:#fff(?:fff)?|white)['"][^}]*\}/gi);
    if (hardcodedWhiteMatches) {
      violations.push(`${relative}: Uses hardcoded white heading/text (${hardcodedWhiteMatches.join(', ')}). Use theme token variables.`);
    }
  }

  assert.strictEqual(
    violations.length,
    0,
    `Found ${violations.length} theme token contrast violations:\n` + violations.join('\n')
  );
});
