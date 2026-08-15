'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPlayerProfile, getRankFromXP, savePlayerProfile } from '../../lib/gamification';

const SKILL_BRANCHES = [
  {
    id: 'dialectical',
    name: 'Dialectical Defense',
    icon: '🛡️',
    color: '#EF4444',
    description: 'Mastery in deflecting personal smears, strawman arguments, and conspiratorial webs.',
    skills: [
      { id: 'ad_hom_shield', name: 'Smear Deflector', cost: 1, desc: 'Instantly identifies Ad Hominem insults and highlights underlying claims.', perk: '+10% XP on Dialectical Scenarios' },
      { id: 'strawman_crush', name: 'Strawman Crusher', cost: 2, desc: 'Reveals the original unedited quote when a caricatured strawman is detected.', perk: 'Unlocks Strawman Clues in Arena' },
      { id: 'conspiracy_untangle', name: 'Web Untangler', cost: 3, desc: 'Traces conspiracy claims directly to primary peer-reviewed consensus archives.', perk: '+25% SIFT Speed Bonus' }
    ]
  },
  {
    id: 'statistical',
    name: 'Statistical Scrutiny',
    icon: '📊',
    color: '#10B981',
    description: 'Cognitive defense against cherry-picked data outliers and bandwagon herd momentum.',
    skills: [
      { id: 'cherry_filter', name: 'Sample Size Auditor', cost: 1, desc: 'Differentiates isolated anomalies from 50-year planetary statistical aggregate trends.', perk: '+15% Bonus on Science Claims' },
      { id: 'bandwagon_brake', name: 'Herd Resistance', cost: 2, desc: 'Protects judgment from social proof and viral view count distortion.', perk: 'Ignores Fake Social Proof in Gauntlet' },
      { id: 'sunk_cost_break', name: 'Sunk Cost Liberator', cost: 3, desc: 'Allows instant dispassionate resetting of ideological attachment.', perk: 'Second Chance on 1 Arena Error' }
    ]
  },
  {
    id: 'emotional',
    name: 'Emotional Immunity',
    icon: '🌋',
    color: '#F59E0B',
    description: 'Armor against catastrophic panic bait, false dichotomies, and influencer charisma overreach.',
    skills: [
      { id: 'fear_dampener', name: 'Amygdala Cooling', cost: 1, desc: 'Suppresses acute panic reflexes when facing apocalyptic doomsday framing.', perk: '+5s Time on Catastrophic Headlines' },
      { id: 'dilemma_bridge', name: 'The Nuance Bridge', cost: 2, desc: 'Illuminates 3rd and 4th compromise alternatives in forced binary ultimatums.', perk: 'Highlights Nuance Options in Arena' },
      { id: 'halo_deflector', name: 'Authority Decoupler', cost: 3, desc: 'Separates celebrity charisma and athletic skill from biomedical claims.', perk: '+20% XP on Influencer Scams' }
    ]
  },
  {
    id: 'scam',
    name: 'Scam & Epistemic Armor',
    icon: '⚡',
    color: '#8B5CF6',
    description: 'Immunity against urgent social engineering, phishing lures, and passive weasel words.',
    skills: [
      { id: 'urgency_brake', name: 'Time Dilation', cost: 1, desc: 'Automatically pauses countdown clocks when artificial urgency is detected.', perk: '+10s Gauntlet Timer' },
      { id: 'weasel_light', name: 'Attribution Illuminator', cost: 2, desc: 'Exposes vague "experts say" phrasing by demanding named institution sources.', perk: 'Highlights Anonymous Citations' },
      { id: 'phish_ward', name: 'Zero-Trust Ward', cost: 3, desc: 'Total immunity against malicious credential harvesting and SMS grant lures.', perk: 'Crown of Truth Badge Unlock' }
    ]
  }
];

export default function SkillsTreePage() {
  const [profile, setProfile] = useState({ xp: 120, unlockedSkillIds: ['ad_hom_shield', 'fear_dampener'] });
  const [rank, setRank] = useState({ level: 1, name: 'Novice Skeptic' });
  const [selectedSkill, setSelectedSkill] = useState(null);

  useEffect(() => {
    const p = getPlayerProfile();
    if (!p.unlockedSkillIds) p.unlockedSkillIds = ['ad_hom_shield', 'fear_dampener'];
    setProfile(p);
    setRank(getRankFromXP(p.xp));
  }, []);

  // Calculate available skill points based on level
  const totalEarnedPoints = Math.max(2, rank.level * 2);
  const spentPoints = (profile.unlockedSkillIds || []).length;
  const availablePoints = Math.max(0, totalEarnedPoints - spentPoints);

  const handleUnlock = (skill) => {
    if ((profile.unlockedSkillIds || []).includes(skill.id)) return;
    if (availablePoints < skill.cost) {
      alert('Not enough Skill Points! Level up by playing the Arena or Gauntlet to earn more points.');
      return;
    }

    const updatedSkills = [...(profile.unlockedSkillIds || []), skill.id];
    const updatedProfile = { ...profile, unlockedSkillIds: updatedSkills };
    setProfile(updatedProfile);
    savePlayerProfile(updatedProfile);
  };

  return (
    <div className="container" style={{ maxWidth: '1000px', padding: '40px 20px' }}>
      {/* Top Banner */}
      <div className="card" style={{ marginBottom: '28px', background: 'radial-gradient(ellipse at top, #1E1B4B 0%, #0F172A 80%)', border: '1.5px solid #8B5CF6' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#A78BFA', letterSpacing: '0.6px' }}>
              🌳 UNESCO Cognitive Metacognition Tree
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#FFFFFF', marginTop: '4px' }}>
              Cognitive Mastery Skill Tree
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Spend your earned Level Points to unlock passive cognitive perks and defense boosters.
            </p>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '12px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '800' }}>Available Points</div>
            <div style={{ fontSize: '26px', fontWeight: '900', color: '#FBBF24' }}>{availablePoints} ⚡</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Level {rank.level} ({spentPoints} Unlocked)</div>
          </div>
        </div>
      </div>

      {/* 4 Skill Branches */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(460px, 1fr))', gap: '22px' }}>
        {SKILL_BRANCHES.map((branch) => (
          <div key={branch.id} className="card" style={{ borderTop: `4px solid ${branch.color}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ fontSize: '24px' }}>{branch.icon}</span>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF' }}>{branch.name}</h2>
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
                      background: isUnlocked ? 'var(--bg-surface-elevated)' : 'rgba(0,0,0,0.25)',
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
                        <strong style={{ fontSize: '13.5px', color: isUnlocked ? '#FFFFFF' : 'var(--text-muted)' }}>
                          {isUnlocked ? '✓ ' : '🔒 '}{skill.name}
                        </strong>
                        <span style={{ fontSize: '10.5px', fontWeight: '700', padding: '1px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', color: branch.color }}>
                          Tier {index + 1} ({skill.cost} pt)
                        </span>
                      </div>
                      <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>{skill.desc}</div>
                      <div style={{ fontSize: '11px', color: '#FBBF24', fontWeight: '700', marginTop: '4px' }}>⚡ {skill.perk}</div>
                    </div>

                    {!isUnlocked ? (
                      <button
                        onClick={() => handleUnlock(skill)}
                        disabled={availablePoints < skill.cost}
                        className="btn btn-primary"
                        style={{ padding: '6px 12px', fontSize: '11.5px', whiteSpace: 'nowrap' }}
                      >
                        Unlock ({skill.cost} ⚡)
                      </button>
                    ) : (
                      <span style={{ fontSize: '11px', fontWeight: '800', color: '#10B981' }}>ACTIVE</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '28px', textAlign: 'center' }}>
        <Link href="/arena" className="btn btn-amber" style={{ padding: '10px 24px' }}>
          🎮 Test Perks in the Arena ➔
        </Link>
      </div>
    </div>
  );
}
