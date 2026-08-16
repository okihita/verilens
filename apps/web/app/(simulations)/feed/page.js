'use client';

import { useState } from 'react';
import Link from 'next/link';
import { addPlayerXP, unlockBadge } from '../../../lib/gamification';
import { scanText, calculateSensationalismIndex } from '@verilens/shared';

const SIMULATED_FEED = [
  {
    id: 'post_1',
    author: 'CryptoWhale_Alpha',
    handle: '@cryptowhale_official',
    avatar: 'CW',
    verified: true,
    text: 'URGENT: Government insider leak confirms global ban on all private crypto wallets in 48 hours! Transfer your funds to this decentralized liquidity pool now to bypass KYC freezes!',
    timestamp: '2m ago',
    likes: '14.2K',
    shares: '8.9K',
    isManipulation: true,
    fallacy: 'Artificial Urgency & Phishing Lure',
    siftVerdict: 'Phishing scam exploiting panic and synthetic time constraints to steal private keys.'
  },
  {
    id: 'post_2',
    author: 'Reuters Science Wire',
    handle: '@reuters_science',
    avatar: 'RS',
    verified: true,
    text: 'James Webb Space Telescope captures new high-resolution infrared spectra of TRAPPIST-1e atmospheric composition, confirming trace carbon dioxide signatures.',
    timestamp: '14m ago',
    likes: '5.1K',
    shares: '1.2K',
    isManipulation: false,
    fallacy: 'None (Factual Wire)',
    siftVerdict: 'Factual empirical reporting with direct institutional attribution to NASA/ESA Webb data.'
  },
  {
    id: 'post_3',
    author: 'WellnessRebel_MD',
    handle: '@wellness_rebel',
    avatar: 'WR',
    verified: false,
    text: 'Mainstream oncology won’t tell you this, but raw alkaline water and wild apricot seeds eliminate 100% of cancer cells in 14 days. Share before Big Pharma takes this post down!',
    timestamp: '1h ago',
    likes: '48.9K',
    shares: '31.4K',
    isManipulation: true,
    fallacy: 'Appeal to Nature & Conspiracy Framing',
    siftVerdict: 'Dangerous medical disinformation paired with censorship paranoia to trigger viral sharing.'
  }
];

export default function FeedSimPage() {
  const [feedState, setFeedState] = useState({});
  const [hygieneScore, setHygieneScore] = useState(100);

  const handleAction = (postId, userAction) => {
    const post = SIMULATED_FEED.find((p) => p.id === postId);
    if (!post) return;

    const isCorrect = (userAction === 'FLAG' && post.isManipulation) || (userAction === 'PASS' && !post.isManipulation);
    const matches = scanText(post.text);
    const sensationalism = calculateSensationalismIndex(post.text, matches);

    setFeedState((prev) => ({
      ...prev,
      [postId]: {
        action: userAction,
        isCorrect,
        sensationalism,
        revealed: true
      }
    }));

    if (isCorrect) {
      addPlayerXP(100);
      unlockBadge('first_shield');
    } else {
      setHygieneScore((prev) => Math.max(0, prev - 25));
    }
  };

  return (
    <div className="container" style={{ maxWidth: '720px', padding: '40px 20px' }}>
      {/* Top Header & Feed Hygiene Score */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '800', color: 'var(--accent-amber)', textTransform: 'uppercase' }}>
            Algorithmic Feed Simulator
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: '900', color: 'var(--text-main)', marginTop: '2px' }}>
            Social Feed Dissector
          </h1>
        </div>

        <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-card)', padding: '8px 16px', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '800' }}>Critical Hygiene</div>
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
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--bg-surface-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '900', color: 'var(--accent-blue)' }}>
                    {post.avatar}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <strong style={{ fontSize: '14.5px', color: 'var(--text-main)' }}>{post.author}</strong>
                      {post.verified && <span style={{ color: '#38BDF8', fontSize: '12px' }}>✓</span>}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{post.handle} • {post.timestamp}</div>
                  </div>
                </div>

                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Simulation</span>
              </div>

              {/* Post Content */}
              <p style={{ fontSize: '15.5px', color: 'var(--text-main)', lineHeight: '1.55', marginBottom: '16px' }}>
                {post.text}
              </p>

              {/* Engagement Stats */}
              <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
                <span>Likes: {post.likes}</span>
                <span>Reposts: {post.shares}</span>
                <span>Comments</span>
              </div>

              {/* Interactive Moderation Buttons */}
              {!state?.revealed ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    onClick={() => handleAction(post.id, 'FLAG')}
                    className="btn"
                    style={{ padding: '10px', background: 'rgba(239, 68, 68, 0.15)', borderColor: '#EF4444', color: '#F87171', fontSize: '13.5px' }}
                  >
                    Flag Manipulation
                  </button>
                  <button
                    onClick={() => handleAction(post.id, 'PASS')}
                    className="btn"
                    style={{ padding: '10px', background: 'rgba(16, 185, 129, 0.15)', borderColor: '#10B981', color: '#34D399', fontSize: '13.5px' }}
                  >
                    Credible / Pass
                  </button>
                </div>
              ) : (
                /* Simulated Community Note / SIFT Verdict */
                <div style={{ background: state.isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', border: `1.5px solid ${state.isCorrect ? '#10B981' : '#EF4444'}`, borderRadius: '8px', padding: '14px', animation: 'fadeIn 0.3s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <strong style={{ fontSize: '14px', color: state.isCorrect ? '#34D399' : '#F87171' }}>
                      {state.isCorrect ? 'Accurate Triage! (+100 XP)' : 'Caution: Misjudged Post'}
                    </strong>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-main)', marginTop: '4px', lineHeight: '1.45' }}>
                    <strong>Verdict:</strong> {post.siftVerdict}
                  </p>
                  <div style={{ fontSize: '12.5px', color: 'var(--accent-amber)', marginTop: '6px' }}>
                    <strong>Rhetoric Device:</strong> {post.fallacy} (Sensationalism Score: {state.sensationalism}/100)
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '28px', textAlign: 'center' }}>
        <Link href="/sandbox" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '14.5px' }}>
          Open Full SIFT Sandbox Dissector
        </Link>
      </div>
    </div>
  );
}
