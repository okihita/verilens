/**
 * VeriLens Unit & Logic Test Suite
 * Zero-dependency automated testing using built-in node:test.
 */

const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const heuristics = require('../src/shared/heuristics.js');
const sifter = require('../src/shared/sifter.js');
const manifest = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../manifest.json'), 'utf8')
);
const fallaciesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/shared/fallacies.json'), 'utf8')
);

test('Manifest: Contains contextMenus permission and valid MV3 structure', () => {
  assert.strictEqual(manifest.manifest_version, 3);
  assert.ok(manifest.permissions.includes('contextMenus'), 'Must have contextMenus permission');
  assert.ok(manifest.permissions.includes('activeTab'), 'Must have activeTab permission');
});

test('Taxonomy: Fallacies JSON schema validity', () => {
  assert.ok(fallaciesData.fallacies.length >= 7, 'Must have at least 7 fallacies');
  for (const f of fallaciesData.fallacies) {
    assert.ok(f.id, 'Fallacy must have an id');
    assert.ok(f.name, 'Fallacy must have a name');
    assert.ok(f.reflection_prompt, 'Fallacy must have a reflection prompt');
    assert.ok(f.mil_competency, 'Fallacy must have a UNESCO MIL competency');
  }
});

test('Heuristics: Detects Phishing & Urgent Action Scams', () => {
  const sample = 'Urgent security alert: Your account has been compromised. Verify your account immediately or access will be suspended.';
  const matches = heuristics.scanText(sample);
  assert.ok(matches.length >= 2, 'Should match multiple scam triggers');
  assert.ok(matches.some(m => m.id === 'scam_urgency'), 'Must match scam_urgency');
});

test('Heuristics: Detects Financial & Crypto Lures', () => {
  const sample = 'Secret loophole revealed! Guaranteed profit with zero risk. Claim your reward today!';
  const matches = heuristics.scanText(sample);
  assert.ok(matches.length >= 2, 'Should detect financial scam keywords');
});

test('Heuristics: Detects Catastrophizing & Fear-Baiting', () => {
  const sample = 'The world is sleepwalking into an absolute, irreversible catastrophe and total annihilation.';
  const matches = heuristics.scanText(sample);
  assert.ok(matches.some(m => m.id === 'ad_metum'), 'Must flag ad_metum');
});

test('Heuristics: Computes Sensationalism Index correctly', () => {
  const sensationalText = 'Urgent security alert! Guaranteed profit! Absolute, irreversible catastrophe! Total annihilation! Share this before it is deleted!';
  const matches = heuristics.scanText(sensationalText);
  const score = heuristics.calculateSensationalismIndex(sensationalText, matches);
  assert.ok(score >= 60, `Score should be high sensationalism (got ${score})`);

  const neutralText = 'The federal meteorological department reported average precipitation data for the second quarter on Tuesday.';
  const neutralMatches = heuristics.scanText(neutralText);
  const neutralScore = heuristics.calculateSensationalismIndex(neutralText, neutralMatches);
  assert.ok(neutralScore <= 20, `Score should be low/reflective (got ${neutralScore})`);
});

test('Sifter: Publisher Trust Dossier Lookup', () => {
  const snopes = sifter.getDomainDossier('snopes.com');
  assert.strictEqual(snopes.name, 'Snopes Fact-Checking Network');
  assert.ok(snopes.credibility.includes('High'));

  const reuters = sifter.getDomainDossier('reuters.com');
  assert.strictEqual(reuters.name, 'Reuters News');

  const unknown = sifter.getDomainDossier('randomblog123.xyz');
  assert.ok(unknown.credibility.includes('Unverified'));
});

test('Sifter: Lateral Search URL Builder on Selection Quotes', () => {
  const selectedQuote = 'mandatory digital lockdowns starting next month';
  const links = sifter.buildLateralLinks(selectedQuote, 'snopes.com');
  assert.ok(links.factCheckUrl.includes('mandatory%20digital%20lockdowns'));
  assert.ok(links.consensusSearchUrl.includes('google.com/search'));
});
