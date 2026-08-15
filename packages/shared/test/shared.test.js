/**
 * Shared Package Unit Test Suite
 */

const test = require('node:test');
const assert = require('node:assert');

const shared = require('../src/index.js');

test('Shared: Fallacies taxonomy has 12 standardized archetypes', () => {
  assert.strictEqual(shared.fallacies.length, 12);
  for (const f of shared.fallacies) {
    assert.ok(f.id, 'Must have ID');
    assert.ok(f.name, 'Must have name');
    assert.ok(f.viral_example, 'Must have viral example');
    assert.ok(f.reflection_prompt, 'Must have reflection prompt');
  }
});

test('Shared: Quiz scenarios contain options and correct IDs', () => {
  assert.ok(shared.scenarios.length >= 8);
  for (const s of shared.scenarios) {
    assert.ok(s.id, 'Must have scenario ID');
    assert.ok(s.headline, 'Must have headline');
    assert.ok(s.correct_fallacy_id, 'Must have correct fallacy ID');
    assert.strictEqual(s.options.length, 4, 'Must have 4 options');
  }
});

test('Shared: Heuristics pattern scanner runs and scores accurately', () => {
  const sample = 'Urgent security alert! Guaranteed profit with zero risk. Act now before deleted!';
  const matches = shared.scanText(sample);
  assert.ok(matches.length >= 2);
  const score = shared.calculateSensationalismIndex(sample, matches);
  assert.ok(score >= 60);
});

test('Shared: Sifter builds lateral links', () => {
  const links = shared.buildLateralLinks('miracle cure cancer', 'snopes.com');
  assert.ok(links.factCheckUrl.includes('miracle%20cure%20cancer'));
  assert.ok(links.domainInvestigateUrl.includes('snopes.com'));
});
