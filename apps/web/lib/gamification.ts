/**
 * VeriLens Gamification & RPG Progression Engine
 * UNESCO MIL Hackathon 2026
 */

export interface Rank {
  level: number;
  name: string;
  minXP: number;
  color: string;
}

export interface Badge {
  id: string;
  name: string;
  desc: string;
  xpReward: number;
}

export interface PlayerProfile {
  xp: number;
  streak: number;
  maxStreak: number;
  quizzesCompleted: number;
  cardsFlipped: string[];
  unlockedBadgeIds: string[];
  unlockedSkillIds: string[];
  lastPlayedDate: string;
}

export const RANKS: Rank[] = [
  { level: 1, name: 'Novice Skeptic', minXP: 0, color: '#94A3B8' },
  { level: 2, name: 'Heuristic Apprentice', minXP: 150, color: '#38BDF8' },
  { level: 3, name: 'Logical Analyst', minXP: 350, color: '#60A5FA' },
  { level: 4, name: 'SIFT Investigator', minXP: 700, color: '#34D399' },
  { level: 5, name: 'Bias Spotter Pro', minXP: 1200, color: '#FBBF24' },
  { level: 6, name: 'Rhetoric Master', minXP: 1900, color: '#F87171' },
  { level: 7, name: 'Cognitive Guardian', minXP: 2800, color: '#A78BFA' },
  { level: 8, name: 'SHEG Scholar', minXP: 4000, color: '#F472B6' },
  { level: 9, name: 'UNESCO MIL Champion', minXP: 5500, color: '#F59E0B' },
  { level: 10, name: 'Grand Inquisitor of Truth', minXP: 7500, color: '#EC4899' }
];

export const BADGES: Badge[] = [
  {
    id: 'first_shield',
    name: 'First Shield',
    desc: 'Completed your first scenario analysis challenge.',
    xpReward: 50
  },
  {
    id: 'streak_five',
    name: 'Unshakable Focus',
    desc: 'Achieved a 5x correct answer streak in Arena or Gauntlet.',
    xpReward: 100
  },
  {
    id: 'codex_scholar',
    name: 'Codex Scholar',
    desc: 'Flipped and inspected all 12 illustrated fallacy archetypes.',
    xpReward: 150
  },
  {
    id: 'speed_sifter',
    name: 'Lightning Sifter',
    desc: 'Scored 80%+ accuracy in the 60-second Daily Gauntlet.',
    xpReward: 200
  },
  {
    id: 'scam_shield',
    name: 'Scam Immunizer',
    desc: 'Accurately identified 5 artificial urgency financial lures.',
    xpReward: 120
  },
  {
    id: 'nuance_master',
    name: 'Nuance Champion',
    desc: 'Defeated a complex False Dilemma with lateral source verification.',
    xpReward: 130
  },
  {
    id: 'sandbox_scientist',
    name: 'Sandbox Scientist',
    desc: 'Analyzed 3 live online articles in the Real-Time Sandbox.',
    xpReward: 140
  },
  {
    id: 'grand_immunity',
    name: 'Flawless Thinker',
    desc: 'Reached Level 5 Rank and claimed your UNESCO MIL Certificate.',
    xpReward: 300
  }
];

export function getPlayerProfile(): PlayerProfile {
  if (typeof window === 'undefined') {
    return {
      xp: 120,
      streak: 0,
      maxStreak: 3,
      quizzesCompleted: 1,
      cardsFlipped: [],
      unlockedBadgeIds: ['first_shield'],
      unlockedSkillIds: ['ad_hom_shield', 'fear_dampener'],
      lastPlayedDate: new Date().toISOString()
    };
  }

  const stored = localStorage.getItem('verilens_player_profile');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // Fallback
    }
  }

  const initialProfile: PlayerProfile = {
    xp: 120,
    streak: 0,
    maxStreak: 3,
    quizzesCompleted: 1,
    cardsFlipped: [],
    unlockedBadgeIds: ['first_shield'],
    unlockedSkillIds: ['ad_hom_shield', 'fear_dampener'],
    lastPlayedDate: new Date().toISOString()
  };

  localStorage.setItem('verilens_player_profile', JSON.stringify(initialProfile));
  return initialProfile;
}

export function savePlayerProfile(profile: PlayerProfile): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('verilens_player_profile', JSON.stringify(profile));
  window.dispatchEvent(new Event('verilens_profile_updated'));
}

export function addPlayerXP(points: number): { newXP: number; leveledUp: boolean; newRank: Rank } {
  const profile = getPlayerProfile();
  const oldRank = getRankFromXP(profile.xp);
  profile.xp += points;
  const newRank = getRankFromXP(profile.xp);

  savePlayerProfile(profile);

  return {
    newXP: profile.xp,
    leveledUp: newRank.level > oldRank.level,
    newRank
  };
}

export function unlockBadge(badgeId: string): boolean {
  const profile = getPlayerProfile();
  if (!profile.unlockedBadgeIds.includes(badgeId)) {
    profile.unlockedBadgeIds.push(badgeId);
    const badge = BADGES.find((b) => b.id === badgeId);
    if (badge) {
      profile.xp += badge.xpReward;
    }
    savePlayerProfile(profile);
    return true;
  }
  return false;
}

export function recordCardFlipped(cardId: string): void {
  const profile = getPlayerProfile();
  if (!profile.cardsFlipped.includes(cardId)) {
    profile.cardsFlipped.push(cardId);
    if (profile.cardsFlipped.length >= 12) {
      unlockBadge('codex_scholar');
    }
    savePlayerProfile(profile);
  }
}

export function getRankFromXP(xp: number): Rank {
  let currentRank = RANKS[0];
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].minXP) {
      currentRank = RANKS[i];
      break;
    }
  }
  return currentRank;
}

export function unlockSkill(skillId: string): boolean {
  const profile = getPlayerProfile();
  if (!profile.unlockedSkillIds) {
    profile.unlockedSkillIds = [];
  }
  if (!profile.unlockedSkillIds.includes(skillId)) {
    profile.unlockedSkillIds.push(skillId);
    savePlayerProfile(profile);
    return true;
  }
  return false;
}
