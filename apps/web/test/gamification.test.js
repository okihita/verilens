/**
 * Web App Gamification & Illustrations Unit Test Suite
 */

const test = require('node:test');
const assert = require('node:assert');

const { RANKS, BADGES, getRankFromXP } = require('../lib/gamification.js');
const { FALLACY_ILLUSTRATIONS } = require('../lib/shared/illustrations.js');
const fallaciesData = require('../lib/shared/fallacies.json');
const scenariosData = require('../lib/shared/scenarios.json');

test('Gamification: Ranks progression contains 10 distinct levels', () => {
  assert.strictEqual(RANKS.length, 10);
  for (let i = 0; i < RANKS.length; i++) {
    assert.strictEqual(RANKS[i].level, i + 1);
    assert.ok(RANKS[i].name);
    assert.ok(RANKS[i].color);
  }
});

test('Gamification: XP to Rank calculation matches thresholds', () => {
  assert.strictEqual(getRankFromXP(0).level, 1);
  assert.strictEqual(getRankFromXP(100).level, 1);
  assert.strictEqual(getRankFromXP(150).level, 2);
  assert.strictEqual(getRankFromXP(350).level, 3);
  assert.strictEqual(getRankFromXP(7500).level, 10);
  assert.strictEqual(getRankFromXP(10000).level, 10);
});

test('Gamification: 8 distinct achievement badges are registered', () => {
  assert.strictEqual(BADGES.length, 8);
  for (const b of BADGES) {
    assert.ok(b.id);
    assert.ok(b.name);
    assert.ok(b.desc);
    assert.ok(b.xpReward > 0);
  }
});

test('Illustrations: All 12 UNESCO fallacies have bespoke SVG illustrations', () => {
  for (const f of fallaciesData.fallacies) {
    const svg = FALLACY_ILLUSTRATIONS[f.id];
    assert.ok(svg, `Missing SVG illustration for fallacy: ${f.id}`);
    assert.ok(svg.includes('<svg'), `Illustration must be valid SVG markup for: ${f.id}`);
    assert.ok(svg.includes('</svg>'), `Illustration must close SVG tag for: ${f.id}`);
  }
});

test('Scenarios & Heuristics: Quiz items have complete pedagogical metadata', () => {
  assert.ok(scenariosData.scenarios.length >= 8);
  for (const s of scenariosData.scenarios) {
    assert.ok(s.id);
    assert.ok(s.headline);
    assert.ok(s.correct_fallacy_id);
    assert.ok(s.sift_recommendation);
    assert.strictEqual(s.options.length, 4);
  }
});
