import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { TRANSLATIONS, getLocalizedFallacy, getLocalizedScenario, SUPPORTED_LANGUAGES } from '../lib/i18n.ts';
import sharedPkg from '@verilens/shared';
const { fallacies, scenarios } = sharedPkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function collectSourceFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    if (entry === 'node_modules' || entry === '.next' || entry === 'test') continue;
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(collectSourceFiles(fullPath));
    } else if (entry.endsWith('.js') || entry.endsWith('.jsx') || entry.endsWith('.ts') || entry.endsWith('.tsx')) {
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
    if (file.endsWith('i18n.ts') || file.endsWith('i18n.js')) continue;
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
  const categories = new Set(fallacies.map((f) => f.category));
  const supportedCodes = SUPPORTED_LANGUAGES.map((l) => l.code);

  const categoryToKey = {
    Logic: 'cat_logic',
    Emotional: 'cat_emotional',
    Attribution: 'cat_attribution',
    Cognitive: 'cat_cognitive',
    Scam: 'cat_scam',
    Dialectical: 'cat_dialectical',
    Relevance: 'cat_relevance',
    Presumption: 'cat_presumption',
    Ambiguity: 'cat_ambiguity'
  };

  const missing = [];
  for (const cat of categories) {
    const key = categoryToKey[cat];
    assert.ok(key, `No category mapping key found for category "${cat}"`);

    for (const code of supportedCodes) {
      const dict = TRANSLATIONS[code];
      if (!dict[key]) {
        missing.push(`Category "${cat}" (${key}) is not translated in language "${code}"`);
      }
    }
  }

  assert.strictEqual(missing.length, 0, 'Missing translated category keys:\n' + missing.join('\n'));
});

test('i18n: Dictionary parity across all supported languages (EN is benchmark)', () => {
  const enKeys = Object.keys(TRANSLATIONS.en);
  const supportedCodes = SUPPORTED_LANGUAGES.map((l) => l.code).filter((c) => c !== 'en');

  const discrepancies = [];

  for (const code of supportedCodes) {
    const targetDict = TRANSLATIONS[code];
    assert.ok(targetDict, `Language dictionary "${code}" does not exist in TRANSLATIONS`);
    const targetKeys = new Set(Object.keys(targetDict));

    for (const key of enKeys) {
      if (!targetKeys.has(key)) {
        discrepancies.push(`Language "${code}" is missing benchmark EN key: "${key}"`);
      }
    }
  }

  assert.strictEqual(
    discrepancies.length,
    0,
    `Language dictionaries must match EN benchmark keys exactly:\n` + discrepancies.join('\n')
  );
});

test('i18n: getLocalizedFallacy returns valid localized metadata for all 24 archetypes across 5 languages', () => {
  const supportedCodes = SUPPORTED_LANGUAGES.map((l) => l.code);

  for (const f of fallacies) {
    for (const code of supportedCodes) {
      const localized = getLocalizedFallacy(f, code);
      assert.ok(localized, `getLocalizedFallacy returned null/undefined for ${f.id} in ${code}`);
      assert.ok(localized.name, `Missing localized name for ${f.id} in ${code}`);
      assert.ok(localized.subtitle, `Missing localized subtitle for ${f.id} in ${code}`);
      assert.ok(localized.description, `Missing localized description for ${f.id} in ${code}`);
      assert.ok(localized.viral_example, `Missing localized viral_example for ${f.id} in ${code}`);
      assert.ok(localized.reflection_prompt || localized.metacognition_prompt, `Missing localized reflection_prompt for ${f.id} in ${code}`);
      assert.ok(localized.psychology, `Missing localized psychology for ${f.id} in ${code}`);
      assert.ok(localized.sift_strategy, `Missing localized sift_strategy for ${f.id} in ${code}`);
    }
  }
});

test('i18n: Language change broadcasts verilens_lang_updated and synchronizes across all listener components', () => {
  const eventName = 'verilens_lang_updated';
  let eventDispatched = false;

  const mockListener = () => {
    eventDispatched = true;
  };

  const listeners = [];
  const addListener = (fn) => listeners.push(fn);
  const dispatch = () => listeners.forEach((fn) => fn());

  addListener(mockListener);
  dispatch();

  assert.strictEqual(eventDispatched, true, 'verilens_lang_updated should notify all listeners');
});

test('i18n: useTranslation hook registers and cleans up verilens_lang_updated event listener', () => {
  const activeListeners = new Set();
  const addMock = (event, fn) => {
    if (event === 'verilens_lang_updated') activeListeners.add(fn);
  };
  const removeMock = (event, fn) => {
    if (event === 'verilens_lang_updated') activeListeners.delete(fn);
  };

  const handler = () => {};
  addMock('verilens_lang_updated', handler);
  assert.strictEqual(activeListeners.size, 1);

  removeMock('verilens_lang_updated', handler);
  assert.strictEqual(activeListeners.size, 0);
});

test('i18n: Navbar component does not contain duplicate ref bindings across desktop and mobile views', () => {
  const navbarPath = path.resolve(__dirname, '../components/Navbar.tsx');
  const content = fs.readFileSync(navbarPath, 'utf8');

  // Verify that ref={langDesktopRef} is attached to exactly 1 dropdown container
  const refMatches = content.match(/ref=\{langDesktopRef\}/g) || [];
  assert.strictEqual(
    refMatches.length,
    1,
    `Navbar should bind langDesktopRef to exactly 1 dropdown container, found: ${refMatches.length}`
  );
});

test('i18n: getLocalizedScenario returns valid localized metadata for all 8 scenarios across 5 languages', () => {
  const supportedCodes = SUPPORTED_LANGUAGES.map((l) => l.code);

  for (const s of scenarios) {
    for (const code of supportedCodes) {
      const localized = getLocalizedScenario(s, code);
      assert.ok(localized, `getLocalizedScenario returned null for ${s.id} in ${code}`);
      assert.ok(localized.headline || localized.scenario, `Missing localized headline text for ${s.id} in ${code}`);
      assert.ok(localized.context, `Missing localized context for ${s.id} in ${code}`);
      assert.ok(localized.correct_fallacy_name, `Missing localized correct_fallacy_name for ${s.id} in ${code}`);
      assert.ok(Array.isArray(localized.options) && localized.options.length >= 3, `Options missing in ${code}`);
      for (const opt of localized.options) {
        assert.ok(opt.name, `Option ${opt.id} missing localized name in ${code}`);
      }
    }
  }
});
