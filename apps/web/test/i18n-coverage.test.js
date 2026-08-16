const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const { TRANSLATIONS, getLocalizedFallacy, SUPPORTED_LANGUAGES } = require('../lib/i18n.js');
const { fallacies } = require('@verilens/shared');

function collectSourceFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    if (entry === 'node_modules' || entry === '.next' || entry === 'test') continue;
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(collectSourceFiles(fullPath));
    } else if (entry.endsWith('.js') || entry.endsWith('.jsx')) {
      results.push(fullPath);
    }
  }
  return results;
}

test('i18n: All t() keys referenced in web app source code exist in every language dictionary', () => {
  const webDir = path.resolve(__dirname, '..');
  const sourceFiles = collectSourceFiles(webDir);

  const usedKeys = new Map();
  const tCallRegex = /(?:^|[^a-zA-Z0-9_$])t\(\s*['"]([a-zA-Z0-9_-]+)['"]\s*\)/g;

  for (const file of sourceFiles) {
    if (file.endsWith('i18n.js')) continue;
    const content = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = tCallRegex.exec(content)) !== null) {
      const key = match[1];
      if (!usedKeys.has(key)) {
        usedKeys.set(key, []);
      }
      usedKeys.get(key).push(path.relative(webDir, file));
    }
  }

  const supportedCodes = SUPPORTED_LANGUAGES.map((l) => l.code);
  const errors = [];

  for (const [key, files] of usedKeys.entries()) {
    for (const code of supportedCodes) {
      const dict = TRANSLATIONS[code];
      if (!dict || !dict[key] || typeof dict[key] !== 'string' || dict[key].trim() === '') {
        errors.push(`Missing key "${key}" in language "${code}" (Used in: ${files.join(', ')})`);
      }
    }
  }

  assert.strictEqual(
    errors.length,
    0,
    `Found ${errors.length} missing translation keys in source code:\n` + errors.join('\n')
  );
});

test('i18n: All fallacy taxonomy categories in @verilens/shared have valid translated category keys', () => {
  const uniqueCategories = [...new Set(fallacies.map((f) => f.category))];
  const supportedCodes = SUPPORTED_LANGUAGES.map((l) => l.code);
  const missingCatKeys = [];

  for (const cat of uniqueCategories) {
    const key = `cat_${cat.toLowerCase()}`;
    for (const code of supportedCodes) {
      const dict = TRANSLATIONS[code];
      if (!dict || !dict[key]) {
        missingCatKeys.push(`Category "${cat}" requires key "${key}" in language "${code}"`);
      }
    }
  }

  for (const code of supportedCodes) {
    if (!TRANSLATIONS[code] || !TRANSLATIONS[code].cat_all) {
      missingCatKeys.push(`Global category key "cat_all" is missing in language "${code}"`);
    }
  }

  assert.strictEqual(
    missingCatKeys.length,
    0,
    `Found missing category translation keys:\n` + missingCatKeys.join('\n')
  );
});

test('i18n: Dictionary parity across all supported languages (EN is benchmark)', () => {
  const enKeys = Object.keys(TRANSLATIONS.en || {});
  const otherLanguages = SUPPORTED_LANGUAGES.map((l) => l.code).filter((c) => c !== 'en');
  const discrepancies = [];

  for (const code of otherLanguages) {
    const targetDict = TRANSLATIONS[code] || {};
    for (const key of enKeys) {
      if (!targetDict[key]) {
        discrepancies.push(`Language "${code}" is missing key "${key}" present in EN benchmark`);
      }
    }
  }

  assert.strictEqual(
    discrepancies.length,
    0,
    `Found dictionary key discrepancies:\n` + discrepancies.join('\n')
  );
});

test('i18n: getLocalizedFallacy returns valid localized metadata for all 24 archetypes across 5 languages', () => {
  const supportedCodes = SUPPORTED_LANGUAGES.map((l) => l.code);
  const requiredFields = ['name', 'subtitle', 'description', 'viral_example', 'reflection_prompt'];

  for (const item of fallacies) {
    for (const code of supportedCodes) {
      const localized = getLocalizedFallacy(item, code);
      assert.ok(localized, `Localized output for ${item.id} in ${code} must be defined`);

      for (const field of requiredFields) {
        assert.ok(
          localized[field] && typeof localized[field] === 'string' && localized[field].trim().length > 0,
          `Fallacy "${item.id}" missing localized field "${field}" in language "${code}"`
        );
      }
    }
  }
});
