const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const { TRANSLATIONS, getLocalizedFallacy, getLocalizedScenario, SUPPORTED_LANGUAGES } = require('../lib/i18n.js');
const { fallacies, scenarios } = require('@verilens/shared');

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

test('i18n: Language change broadcasts verilens_lang_updated and synchronizes across all listener components', () => {
  const store = new Map();
  const listeners = new Map();

  const mockWindow = {
    addEventListener: (event, handler) => {
      if (!listeners.has(event)) listeners.set(event, []);
      listeners.get(event).push(handler);
    },
    removeEventListener: (event, handler) => {
      if (listeners.has(event)) {
        listeners.set(
          event,
          listeners.get(event).filter((h) => h !== handler)
        );
      }
    },
    dispatchEvent: (event) => {
      const type = event.type || event;
      if (listeners.has(type)) {
        for (const handler of listeners.get(type)) {
          handler(event);
        }
      }
    }
  };

  const mockLocalStorage = {
    getItem: (key) => store.get(key) || null,
    setItem: (key, val) => store.set(key, String(val))
  };

  global.window = mockWindow;
  global.localStorage = mockLocalStorage;
  global.Event = class {
    constructor(type) {
      this.type = type;
    }
  };

  // Simulate multiple active components across the app
  const navbarState = { lang: 'en' };
  const homePageState = { lang: 'en' };
  const gauntletState = { lang: 'en' };

  const onUpdateNavbar = () => {
    navbarState.lang = mockLocalStorage.getItem('verilens_lang') || 'en';
  };
  const onUpdateHomePage = () => {
    homePageState.lang = mockLocalStorage.getItem('verilens_lang') || 'en';
  };
  const onUpdateGauntlet = () => {
    gauntletState.lang = mockLocalStorage.getItem('verilens_lang') || 'en';
  };

  mockWindow.addEventListener('verilens_lang_updated', onUpdateNavbar);
  mockWindow.addEventListener('verilens_lang_updated', onUpdateHomePage);
  mockWindow.addEventListener('verilens_lang_updated', onUpdateGauntlet);

  // Set language to Indonesian 'id'
  const setLanguage = (newLang) => {
    if (TRANSLATIONS[newLang]) {
      mockLocalStorage.setItem('verilens_lang', newLang);
      mockWindow.dispatchEvent(new Event('verilens_lang_updated'));
    }
  };

  setLanguage('id');

  assert.strictEqual(mockLocalStorage.getItem('verilens_lang'), 'id');
  assert.strictEqual(navbarState.lang, 'id', 'Navbar must update to ID');
  assert.strictEqual(homePageState.lang, 'id', 'HomePage must update to ID immediately without refresh');
  assert.strictEqual(gauntletState.lang, 'id', 'Gauntlet must update to ID immediately without refresh');

  // Set language to Chinese 'zh'
  setLanguage('zh');
  assert.strictEqual(homePageState.lang, 'zh', 'HomePage must update to ZH');
});

test('i18n: useTranslation hook registers and cleans up verilens_lang_updated event listener', () => {
  const i18nSource = fs.readFileSync(path.resolve(__dirname, '../lib/i18n.js'), 'utf8');
  assert.ok(
    i18nSource.includes("window.addEventListener('verilens_lang_updated'") ||
    i18nSource.includes('window.addEventListener("verilens_lang_updated"'),
    'useTranslation hook must register verilens_lang_updated event listener'
  );
  assert.ok(
    i18nSource.includes("window.removeEventListener('verilens_lang_updated'") ||
    i18nSource.includes('window.removeEventListener("verilens_lang_updated"'),
    'useTranslation hook must clean up verilens_lang_updated event listener on unmount'
  );
});

test('i18n: Navbar component does not contain duplicate ref bindings across desktop and mobile views', () => {
  const navbarSource = fs.readFileSync(path.resolve(__dirname, '../components/Navbar.js'), 'utf8');
  const refMatches = navbarSource.match(/ref=\{([a-zA-Z0-9_$]+)\}/g) || [];
  const refCounts = {};

  for (const match of refMatches) {
    const refName = match.replace(/ref=\{|\}/g, '');
    refCounts[refName] = (refCounts[refName] || 0) + 1;
  }

  const duplicates = Object.entries(refCounts).filter(([_, count]) => count > 1);
  assert.strictEqual(
    duplicates.length,
    0,
    `Found duplicate ref bindings in Navbar.js: ${duplicates.map(([name, count]) => `${name} (${count}x)`).join(', ')}`
  );
});

test('i18n: getLocalizedScenario returns valid localized metadata for all 8 scenarios across 5 languages', () => {
  assert.ok(scenarios && scenarios.length >= 8, 'At least 8 scenarios must be loaded');

  for (const langObj of SUPPORTED_LANGUAGES) {
    const langCode = langObj.code;
    for (const rawScenario of scenarios) {
      const localized = getLocalizedScenario(rawScenario, langCode);

      assert.ok(localized.headline && localized.headline.length > 5, `Scenario ${rawScenario.id} must have headline in ${langCode}`);
      assert.ok(localized.platform && localized.platform.length > 2, `Scenario ${rawScenario.id} must have platform in ${langCode}`);
      assert.ok(localized.context && localized.context.length > 5, `Scenario ${rawScenario.id} must have context in ${langCode}`);
      assert.ok(localized.explanation && localized.explanation.length > 10, `Scenario ${rawScenario.id} must have explanation in ${langCode}`);
      assert.ok(localized.sift_recommendation && localized.sift_recommendation.length > 5, `Scenario ${rawScenario.id} must have sift_recommendation in ${langCode}`);
      assert.ok(localized.correct_fallacy_name && localized.correct_fallacy_name.length > 2, `Scenario ${rawScenario.id} must have correct_fallacy_name in ${langCode}`);

      assert.strictEqual(localized.options.length, 4, `Scenario ${rawScenario.id} must have 4 options in ${langCode}`);
      for (const opt of localized.options) {
        assert.ok(opt.name && opt.name.length > 2, `Option ${opt.id} in scenario ${rawScenario.id} must have a localized name in ${langCode}`);
      }
    }
  }
});
