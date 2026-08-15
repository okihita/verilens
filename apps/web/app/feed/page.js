'use client';

import { useState } from 'react';
import Link from 'next/link';
import { addPlayerXP, unlockBadge } from '../../lib/gamification';
import { scanText, calculateSensationalismIndex } from '../../lib/shared/heuristics';

const SIMULATED_FEED = [
  {
    id: 'p1',
    author: 'Quantum Yield Daily',
    handle: '@QuantumAlpha99',
    avatar: '💰',
    verified: false,
    timestamp: '2m ago',
    text: '🚨 BOMBSHELL LOOPHOLE: 10,000 smart investors just doubled their portfolio with our zero-risk AI crypto yield protocol. Claim your grant voucher before midnight or stay broke forever! 💸📈',
    likes: '14.2K',
    shares: '4.8K',
    isMisleading: true,
    fallacy: 'Artificial Urgency & Financial Lure',
    siftVerdict: 'Scam alert: Fake artificial deadline designed to induce FOMO and bypass independent financial verification.'
  },
  {
    id: 'p2',
    author: 'Reuters Science & Climate',
    handle: '@ReutersScience',
    avatar: '📰',
    verified: true,
    timestamp: '15m ago',
    text: 'Global atmospheric methane concentrations rose by 0.6% during the preceding measurement cycle, according to data released by the National Oceanic and Atmospheric Administration on Friday.',
    likes: '8.1K',
    shares: '1.2K',
    isMisleading: false,
    fallacy: 'None (Factual Wire)',
    siftVerdict: 'Credible journalism: Sober reporting citing a verified primary scientific institution (NOAA).'
  },
  {
    id: 'p3',
    author: 'Vigilant Health Secrets',
    handle: '@BioHackPatriot',
    avatar: '🌿',
    verified: false,
    timestamp: '42m ago',
    text: 'Mainstream media REFUSES to show you this secret Amazonian root that cures 100% of metabolic issues! Big Pharma is paying billions to delete this video. Share before taken down! 🚨👀',
    likes: '45.8K',
    shares: '18.9K',
    isMisleading: true,
    fallacy: 'Conspiracy Framing & Appeal to Fear',
    siftVerdict: 'Deceptive: Uses censorship paranoia and fake suppression myths to manufacture viral shares.'
  },
  {
    id: 'p4',
    author: 'Viral Politics Now',
    handle: '@OutrageWatchdog',
    avatar: '🏛️',
    verified: false,
    timestamp: '1h ago',
    text: 'Either you vote 100% against this controversial school policy, or you literally support the total destruction of our children’s future! There are only two choices!',
    likes: '29.3K',
    shares: '9.4K',
    isMisleading: true,
    fallacy: 'False Dilemma / Forced Dichotomy',
    siftVerdict: 'Manipulative: Erases all moderate compromise policies to force an aggressive binary ultimatum.'
  }
];

export default function SocialFeedSimulatorPage() {
  const [feedState, setFeedState] = useState({});
  const [hygieneScore, setHygieneScore] = useState(100);
  const [moderatedCount, setModeratedCount] = useState(0);

  const handleAction = (postId, action) => {
    if (feedState[postId]) return;

    const post = SIMULATED_FEED.find((p) => p.id === postId);
    const isCorrect = (action === 'FLAG' && post.isMisleading) || (action === 'PASS' && !post.isMisleading);

    const matches = scanText(post.text);
    const sensationalism = calculateSensationalismIndex(post.text, matches);

    setFeedState((prev) => ({
      ...prev,
      [postId]: {
        action,
        isCorrect,
        sensationalism,
        matches,
        revealed: true
      }
    }));

    setModeratedCount((prev) => prev + 1);

    if (isCorrect) {
      addPlayerXP(100);
      unlockBadge('first_shield');
    } else {
      setHygieneScore((prev) => Math.max(20, prev - 25));
    }
  };

  return (
    <div className="container" style={{ maxWidth: '720px', padding: '40px 20px' }}>
      {/* Top Header & Feed Hygiene Score */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '800', color: 'var(--accent-amber)', textTransform: 'uppercase' }}>
            📱 Algorithmic Feed Simulator
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#FFFFFF', marginTop: '2px' }}>
            Social Feed Dissector
          </h1>
        </div>

        <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-card)', padding: '8px 16px', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '800' }}>Critical Hygiene</div>
          <div style={{ fontSize: '20px', fontWeight: '900', color: hygieneScore >= 80 ? '#10B981' : '#F59E0B' }}>
            {hygieneScore}%
          </div>
        </div>
      </div>

      {/* Feed Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {SIMULATED_FEED.map((post) => {
          const state = feedState[post.id];

          return (
            <div key={post.id} className="card" style={{ padding: '20px', borderLeft: state?.revealed ? (state.isCorrect ? '4px solid #10B981' : '4px solid #EF4444') : '1px solid var(--border-card)' }}>
              {/* Post Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--bg-surface-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                    {post.avatar}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <strong style={{ fontSize: '14px', color: '#FFFFFF' }}>{post.author}</strong>
                      {post.verified && <span style={{ color: '#38BDF8', fontSize: '12px' }}>✓</span>}
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{post.handle} • {post.timestamp}</div>
                  </div>
                </div>

                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Simulation</span>
              </div>

              {/* Post Content */}
              <p style={{ fontSize: '15px', color: '#E2E8F0', lineHeight: '1.5', marginBottom: '16px' }}>
                {post.text}
              </p>

              {/* Engagement Stats */}
              <div style={{ display: 'flex', gap: '20px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
                <span>❤️ {post.likes}</span>
                <span>🔄 {post.shares}</span>
                <span>💬 Comments</span>
              </div>

              {/* Interactive Moderation Buttons */}
              {!state?.revealed ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    onClick={() => handleAction(post.id, 'FLAG')}
                    className="btn"
                    style={{ padding: '10px', background: 'rgba(239, 68, 68, 0.15)', borderColor: '#EF4444', color: '#F87171', fontSize: '13px' }}
                  >
                    🚩 Flag Manipulation
                  </button>
                  <button
                    onClick={() => handleAction(post.id, 'PASS')}
                    className="btn"
                    style={{ padding: '10px', background: 'rgba(16, 185, 129, 0.15)', borderColor: '#10B981', color: '#34D399', fontSize: '13px' }}
                  >
                    💚 Credible / Pass
                  </button>
                </div>
              ) : (
                /* Simulated Community Note / SIFT Verdict */
                <div style={{ background: state.isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', border: `1.5px solid ${state.isCorrect ? '#10B981' : '#EF4444'}`, borderRadius: '8px', padding: '14px', animation: 'fadeIn 0.3s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '16px' }}>{state.isCorrect ? '✅' : '❌'}</span>
                    <strong style={{ fontSize: '13.5px', color: state.isCorrect ? '#34D399' : '#F87171' }}>
                      {state.isCorrect ? 'Accurate Triage! (+100 XP)' : 'Caution: Misjudged Post'}
                    </strong>
                  </div>
                  <p style={{ fontSize: '13px', color: '#FFFFFF', marginTop: '4px', lineHeight: '1.4' }}>
                    <strong>Verdict:</strong> {post.siftVerdict}
                  </p>
                  <div style={{ fontSize: '11.5px', color: 'var(--accent-amber)', marginTop: '6px' }}>
                    <strong>Rhetoric Device:</strong> {post.fallacy} (Sensationalism Score: {state.sensationalism}/100)
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '28px', textAlign: 'center' }}>
        <Link href="/arena" className="btn btn-amber" style={{ padding: '10px 24px' }}>
          🎮 Move to Spotter Arena ➔
        </Link>
      </div>
    </div>
  );
}
