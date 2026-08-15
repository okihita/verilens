/**
 * VeriLens RPG Gamification & Level Progression Engine
 * Manages player XP, streak milestones, achievement badges, and stats persistence.
 */

export const RANKS = [
  { level: 1, name: 'Novice Skeptic', minXP: 0, nextXP: 150, color: '#94A3B8', icon: '🌱' },
  { level: 2, name: 'Heuristic Apprentice', minXP: 150, nextXP: 350, color: '#38BDF8', icon: '🔍' },
  { level: 3, name: 'Logical Analyst', minXP: 350, nextXP: 700, color: '#60A5FA', icon: '⚖️' },
  { level: 4, name: 'SIFT Investigator', minXP: 700, nextXP: 1200, color: '#34D399', icon: '🧭' },
  { level: 5, name: 'Bias Spotter Pro', minXP: 1200, nextXP: 1900, color: '#FBBF24', icon: '⭐' },
  { level: 6, name: 'Rhetoric Master', minXP: 1900, nextXP: 2800, color: '#F97316', icon: '⚔️' },
  { level: 7, name: 'Cognitive Guardian', minXP: 2800, nextXP: 4000, color: '#A855F7', icon: '🛡️' },
  { level: 8, name: 'Stanford SHEG Scholar', minXP: 4000, nextXP: 5500, color: '#EC4899', icon: '🎓' },
  { level: 9, name: 'UNESCO MIL Champion', minXP: 5500, nextXP: 7500, color: '#10B981', icon: '🏛️' },
  { level: 10, name: 'Grand Inquisitor of Truth', minXP: 7500, nextXP: 10000, color: '#E11D48', icon: '👑' }
];

export const BADGES = [
  {
    id: 'first_shield',
    name: 'First Cognitive Shield',
    desc: 'Complete your first Arena quiz or Gauntlet round.',
    icon: '🛡️',
    xpReward: 50
  },
  {
    id: 'streak_five',
    name: 'Unshakable Focus',
    desc: 'Achieve a 5x answer streak without a single mistake.',
    icon: '🔥',
    xpReward: 100
  },
  {
    id: 'codex_scholar',
    name: 'Codex Scholar',
    desc: 'Inspect and flip all 12 UNESCO fallacy cards.',
    icon: '🃏',
    xpReward: 150
  },
  {
    id: 'speed_sifter',
    name: 'Lightning Sifter',
    desc: 'Finish a 60-second Daily Gauntlet with 80%+ accuracy.',
    icon: '⚡',
    xpReward: 200
  },
  {
    id: 'scam_shield',
    name: 'Scam Immunizer',
    desc: 'Correctly identify 5 artificial urgency financial scams.',
    icon: '💰',
    xpReward: 120
  },
  {
    id: 'nuance_champion',
    name: 'Nuance Champion',
    desc: 'Expose 5 subtle passive weasel word attributions.',
    icon: '💨',
    xpReward: 120
  },
  {
    id: 'sandbox_scientist',
    name: 'Sandbox Scientist',
    desc: 'Dissect 3 custom articles in the live sandbox.',
    icon: '🧪',
    xpReward: 100
  },
  {
    id: 'flawless_thinker',
    name: 'Flawless Thinker',
    desc: 'Score 100% accuracy in a 5-round Arena challenge.',
    icon: '👑',
    xpReward: 250
  }
];

const STORAGE_KEY = 'verilens_player_profile';

const DEFAULT_PROFILE = {
  xp: 120,
  streak: 0,
  maxStreak: 3,
  quizzesCompleted: 1,
  articlesAnalyzed: 0,
  cardsFlipped: [],
  unlockedBadgeIds: ['first_shield'],
  lastPlayedDate: null
};

export function getPlayerProfile() {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...JSON.parse(data) };
  } catch (e) {
    return DEFAULT_PROFILE;
  }
}

export function savePlayerProfile(profile) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    window.dispatchEvent(new Event('verilens_profile_updated'));
  } catch (e) {
    console.error('Failed to save profile', e);
  }
}

export function getRankFromXP(xp) {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].minXP) {
      return RANKS[i];
    }
  }
  return RANKS[0];
}

export function addPlayerXP(amount) {
  const profile = getPlayerProfile();
  const oldRank = getRankFromXP(profile.xp);
  profile.xp += amount;
  const newRank = getRankFromXP(profile.xp);
  savePlayerProfile(profile);

  return {
    profile,
    leveledUp: newRank.level > oldRank.level,
    newRank
  };
}

export function unlockBadge(badgeId) {
  const profile = getPlayerProfile();
  if (!profile.unlockedBadgeIds.includes(badgeId)) {
    profile.unlockedBadgeIds.push(badgeId);
    const badge = BADGES.find(b => b.id === badgeId);
    if (badge) profile.xp += badge.xpReward;
    savePlayerProfile(profile);
    return badge;
  }
  return null;
}

export function recordCardFlipped(cardId) {
  const profile = getPlayerProfile();
  if (!profile.cardsFlipped.includes(cardId)) {
    profile.cardsFlipped.push(cardId);
    if (profile.cardsFlipped.length >= 12) {
      unlockBadge('codex_scholar');
    }
    savePlayerProfile(profile);
  }
}
