'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPlayerProfile, getRankFromXP, unlockSkill } from '../../../lib/gamification';

const SKILL_BRANCHES = [
  {
    id: 'sift_mastery',
    name: 'SIFT Investigation Reflex',
    color: '#3B82F6',
    icon: 'SIFT',
    description: 'Master Stanford History Education Group lateral reading techniques.',
    skills: [
      { id: 'sift_1', name: 'Stop & Pause', cost: 1, desc: 'Instinctively detect emotional hijack triggers before sharing.', perk: '+10% XP in Gauntlet Mode' },
      { id: 'sift_2', name: 'Lateral Sifter', cost: 2, desc: 'Automate opening 3 lateral search windows in <1.2s.', perk: 'Unlocks Fast Wire Verification' },
      { id: 'sift_3', name: 'Primary Tracing', cost: 3, desc: 'Trace viral infographics directly to original source papers.', perk: '+25% XP on Science Scenarios' }
    ]
  },
  {
    id: 'fallacy_defense',
    name: 'Rhetoric & Fallacy Armor',
    color: '#F59E0B',
    icon: 'ARMOR',
    description: 'Immunity against 24 psychological traps and dialectical manipulation.',
    skills: [
      { id: 'fallacy_1', name: 'Ad Hominem Deflector', cost: 1, desc: 'Isolate substantive claims from personal smears instantly.', perk: 'Auto-flags personal attacks' },
      { id: 'fallacy_2', name: 'Strawman Dissector', cost: 2, desc: 'Reconstruct distorted arguments back to original definitions.', perk: '+1.5x Combo Multiplier Duration' },
      { id: 'fallacy_3', name: 'Cognitive Immunity', cost: 3, desc: 'Complete resistance to binary False Dilemmas and Whataboutism.', perk: 'Unlocks Master Debater Rank Badge' }
    ]
  },
  {
    id: 'scam_radar',
    name: 'Phishing & Urgency Radar',
    color: '#EF4444',
    icon: 'RADAR',
    description: 'Defeat social engineering, crypto lures, and panic traps.',
    skills: [
      { id: 'scam_1', name: 'Panic Shield', cost: 1, desc: 'Immunity to 15-minute fake account expiration timers.', perk: '+5s Time Bonus in Gauntlet' },
      { id: 'scam_2', name: 'Lure Sniffer', cost: 2, desc: 'Instantly spot free grant and crypto giveaway signatures.', perk: 'Highlight fake URL domains' },
      { id: 'scam_3', name: 'Deepfake Cynicism Radar', cost: 3, desc: 'Verify synthetic media vs authentic whistleblowing files.', perk: 'Unlocks SIFT Forensic Analysis' }
    ]
  },
  {
    id: 'metacognition',
    name: 'Metacognitive Autonomy',
    color: '#10B981',
    icon: 'MIND',
    description: 'Self-awareness against confirmation bias and tribal in-group favoritism.',
    skills: [
      { id: 'meta_1', name: 'Confirmation Check', cost: 1, desc: 'Pause when an agreeable claim validates existing bias.', perk: 'Reflective metacognition prompt' },
      { id: 'meta_2', name: 'Tribal Neutralizer', cost: 2, desc: 'Apply equal scrutiny to your favored political group.', perk: '+20% XP across Global League' },
      { id: 'meta_3', name: 'Epistemic Humility', cost: 3, desc: 'Willingness to update beliefs based on verified empirical data.', perk: 'Unlocks UNESCO MIL Certificate of Honor' }
    ]
  }
];

export default function SkillsPage() {
  const [profile, setProfile] = useState({ xp: 120, unlockedSkillIds: [] });
  const [rank, setRank] = useState({ level: 1, name: 'Novice Skeptic' });

  useEffect(() => {
    function refresh() {
      const p = getPlayerProfile();
      setProfile(p);
      setRank(getRankFromXP(p.xp));
    }
    refresh();
    window.addEventListener('verilens_profile_updated', refresh);
    return () => window.removeEventListener('verilens_profile_updated', refresh);
  }, []);

  const totalPointsEarned = rank.level;
  const spentPoints = (profile.unlockedSkillIds || []).length;
  const availablePoints = Math.max(0, totalPointsEarned - spentPoints);

  const handleUnlock = (skill) => {
    if (availablePoints >= skill.cost) {
      unlockSkill(skill.id);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '1000px', padding: '40px 20px' }}>
      {/* Top Banner */}
      <div className="card" style={{ marginBottom: '28px', background: 'var(--bg-surface)', border: '1.5px solid var(--accent-purple)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--accent-purple)', letterSpacing: '0.6px' }}>
              UNESCO Cognitive Metacognition Tree
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text-main)', marginTop: '4px' }}>
              Cognitive Mastery Skill Tree
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Spend your earned Level Points to unlock passive cognitive perks and defense boosters.
            </p>
          </div>

          <div style={{ background: 'var(--bg-surface-elevated)', padding: '12px 20px', borderRadius: '12px', border: '1px solid var(--border-card)', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '800' }}>Available Points</div>
            <div style={{ fontSize: '26px', fontWeight: '900', color: 'var(--accent-amber)' }}>{availablePoints} PTS</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Level {rank.level} ({spentPoints} Unlocked)</div>
          </div>
        </div>
      </div>

      {/* 4 Skill Branches */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(460px, 1fr))', gap: '22px' }}>
        {SKILL_BRANCHES.map((branch) => (
          <div key={branch.id} className="card" style={{ borderTop: `4px solid ${branch.color}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: '900', padding: '3px 8px', borderRadius: '6px', background: 'var(--bg-surface-elevated)', color: branch.color }}>{branch.icon}</span>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)' }}>{branch.name}</h2>
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '18px', lineHeight: '1.4' }}>
              {branch.description}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {branch.skills.map((skill, index) => {
                const isUnlocked = (profile.unlockedSkillIds || []).includes(skill.id);
                return (
                  <div
                    key={skill.id}
                    style={{
                      background: isUnlocked ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)',
                      border: `1.5px solid ${isUnlocked ? branch.color : 'var(--border-subtle)'}`,
                      borderRadius: '8px',
                      padding: '12px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      opacity: isUnlocked ? 1 : 0.75
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <strong style={{ fontSize: '13.5px', color: isUnlocked ? 'var(--text-main)' : 'var(--text-muted)' }}>
                          {isUnlocked ? '[ACTIVE] ' : '[LOCKED] '}{skill.name}
                        </strong>
                        <span style={{ fontSize: '10.5px', fontWeight: '700', padding: '1px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', color: branch.color }}>
                          Tier {index + 1} ({skill.cost} pt)
                        </span>
                      </div>
                      <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>{skill.desc}</div>
                      <div style={{ fontSize: '11px', color: 'var(--accent-amber)', fontWeight: '700', marginTop: '4px' }}>PERK: {skill.perk}</div>
                    </div>

                    {!isUnlocked ? (
                      <button
                        onClick={() => handleUnlock(skill)}
                        disabled={availablePoints < skill.cost}
                        className="btn btn-primary"
                        style={{ padding: '6px 12px', fontSize: '11.5px', whiteSpace: 'nowrap' }}
                      >
                        Unlock ({skill.cost} pt)
                      </button>
                    ) : (
                      <span style={{ fontSize: '11px', color: branch.color, fontWeight: '800', padding: '4px 8px', background: 'var(--bg-surface)', borderRadius: '4px' }}>
                        MASTERED
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
