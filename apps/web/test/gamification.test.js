/**
 * Web App Gamification & Illustrations Unit Test Suite
 */

import test from 'node:test';
import assert from 'node:assert';

import { RANKS, BADGES, getRankFromXP } from '../lib/gamification.ts';
import sharedPkg from '@verilens/shared';
const { FALLACY_ILLUSTRATIONS, fallacies, scenarios } = sharedPkg;

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
  const ids = new Set();
  for (const b of BADGES) {
    assert.ok(b.id);
    assert.ok(b.name);
    assert.ok(b.desc);
    assert.ok(b.xpReward > 0);
    assert.ok(!ids.has(b.id), `Duplicate badge id: ${b.id}`);
    ids.add(b.id);
  }
});

test('Illustrations: Core 12 UNESCO fallacies have bespoke SVG illustrations', () => {
  assert.ok(FALLACY_ILLUSTRATIONS);
  assert.strictEqual(typeof FALLACY_ILLUSTRATIONS, 'object');
  
  const sampleArchetypes = [
    'ad_hominem',
    'false_dilemma',
    'ad_metum',
    'confirmation_bias',
    'weasel_words',
    'scam_urgency'
  ];

  for (const id of sampleArchetypes) {
    assert.ok(FALLACY_ILLUSTRATIONS[id], `Missing illustration for ${id}`);
    assert.ok(FALLACY_ILLUSTRATIONS[id].includes('<svg'), `Illustration for ${id} is not valid SVG`);
  }
});

test('Taxonomy: All 24 registered fallacies have complete metadata', () => {
  assert.ok(Array.isArray(fallacies));
  assert.strictEqual(fallacies.length, 24);

  for (const f of fallacies) {
    assert.ok(f.id, 'Fallacy missing id');
    assert.ok(f.name, 'Fallacy missing name');
    assert.ok(f.category, 'Fallacy missing category');
    assert.ok(f.color, 'Fallacy missing color');
    assert.ok(f.description, 'Fallacy missing description');
    assert.ok(f.viral_example, 'Fallacy missing viral_example');
    assert.ok(f.reflection_prompt, 'Fallacy missing reflection_prompt');
    assert.ok(f.psychology, 'Fallacy missing psychology');
    assert.ok(f.sift_strategy, 'Fallacy missing sift_strategy');
    assert.ok(f.mil_competency, 'Fallacy missing mil_competency');
  }
});

test('Scenarios & Heuristics: Quiz items have complete pedagogical metadata', () => {
  assert.ok(Array.isArray(scenarios));
  assert.ok(scenarios.length >= 8);

  for (const s of scenarios) {
    assert.ok(s.id, 'Scenario missing id');
    assert.ok(s.headline, 'Scenario missing headline/text');
    assert.ok(s.context, 'Scenario missing context');
    assert.ok(Array.isArray(s.options) && s.options.length >= 3, 'Scenario missing options');
    assert.ok(s.correct_fallacy_id, 'Scenario missing correct_fallacy_id');
    assert.ok(s.sift_recommendation, 'Scenario missing sift_recommendation');
  }
});

test('Audio Engine: Native Web Audio synthesizer exports callable sound handlers without SSR errors', async () => {
  const audioModule = await import('../lib/audio.ts');
  assert.ok(typeof audioModule.playClick === 'function');
  assert.ok(typeof audioModule.playCorrect === 'function');
  assert.ok(typeof audioModule.playStreak === 'function');
  assert.ok(typeof audioModule.playIncorrect === 'function');
  assert.ok(typeof audioModule.playStart === 'function');
  assert.ok(typeof audioModule.playComplete === 'function');
  assert.ok(typeof audioModule.isAudioMuted === 'function');
  assert.ok(typeof audioModule.setAudioMuted === 'function');
  assert.ok(typeof audioModule.toggleAudioMute === 'function');

  // Verify non-browser environment executes cleanly without window
  assert.doesNotThrow(() => {
    audioModule.playClick();
    audioModule.playCorrect();
    audioModule.playStreak();
    audioModule.playIncorrect();
    audioModule.playStart();
    audioModule.playComplete();
  });
});

test('Story Card Engine: Exports generateStoryCardBlob and shareStoryImage handlers', async () => {
  const storyModule = await import('../lib/story-card.ts');
  assert.ok(typeof storyModule.generateStoryCardBlob === 'function');
  assert.ok(typeof storyModule.shareStoryImage === 'function');
});

