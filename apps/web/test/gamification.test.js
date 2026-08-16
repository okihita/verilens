/**
 * Web App Gamification & Illustrations Unit Test Suite
 */

const test = require('node:test');
const assert = require('node:assert');

const { RANKS, BADGES, getRankFromXP } = require('../lib/gamification.js');
const { FALLACY_ILLUSTRATIONS, fallacies, scenarios } = require('@verilens/shared');
const fallaciesData = { fallacies };
const scenariosData = { scenarios };

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

test('Illustrations: Core 12 UNESCO fallacies have bespoke SVG illustrations', () => {
  const core12 = ['ad_hominem', 'false_dilemma', 'ad_metum', 'confirmation_bias', 'weasel_words', 'scam_urgency', 'strawman', 'bandwagon', 'sunk_cost', 'halo_effect', 'cherry_picking', 'conspiracy_framing'];
  for (const id of core12) {
    const svg = FALLACY_ILLUSTRATIONS[id];
    assert.ok(svg, `Missing SVG illustration for fallacy: ${id}`);
    assert.ok(svg.includes('<svg'), `Illustration must be valid SVG markup for: ${id}`);
    assert.ok(svg.includes('</svg>'), `Illustration must close SVG tag for: ${id}`);
  }
});

test('Taxonomy: All 24 registered fallacies have complete metadata', () => {
  assert.strictEqual(fallaciesData.fallacies.length, 24);
  for (const f of fallaciesData.fallacies) {
    assert.ok(f.id, 'Must have ID');
    assert.ok(f.name, 'Must have name');
    assert.ok(f.category, 'Must have category');
    assert.ok(f.viral_example, 'Must have viral example');
    assert.ok(f.reflection_prompt, 'Must have reflection prompt');
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
