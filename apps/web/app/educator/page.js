'use client';

import Link from 'next/link';

export default function EducatorPage() {
  const unescoLaws = [
    {
      num: 'Law 1',
      title: 'Critical Engagement with All Media',
      desc: 'Information, communication, and digital media are critical to civic engagement and sustainable development.'
    },
    {
      num: 'Law 2',
      title: 'Every Citizen is a Creator of Information',
      desc: 'Users are no longer passive recipients; they produce, share, and amplify narratives across digital networks.'
    },
    {
      num: 'Law 3',
      title: 'Information is Never Value-Neutral',
      desc: 'Media messages are constructed with specific biases, economic incentives, or political framing that require ethical deconstruction.'
    },
    {
      num: 'Law 4',
      title: 'Right to Information & Verification',
      desc: 'Every digital citizen has the right to access accurate information and the responsibility to verify claims before sharing.'
    },
    {
      num: 'Law 5',
      title: 'Media Literacy is a Lifelong Process',
      desc: 'Cognitive defense requires ongoing metacognitive habit formation, not a one-time certification.'
    }
  ];

  return (
    <div className="container" style={{ maxWidth: '960px', padding: '40px 20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '20px', fontSize: '12px', fontWeight: '700', color: 'var(--accent-emerald-light)', textTransform: 'uppercase', marginBottom: '12px' }}>
          <span>🏫 UNESCO MIL Classroom Toolkit</span>
        </div>
        <h1 style={{ fontSize: '34px', fontWeight: '900', color: '#FFFFFF', marginBottom: '10px' }}>
          Educator Hub & Curriculum Guide
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '700px', margin: '0 auto' }}>
          Zero-install classroom activities, interactive smartboard exercises, and direct alignment with the official <strong>UNESCO Media & Information Literacy Curriculum</strong>.
        </p>
      </div>

      {/* Classroom Quick-Start Activities */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '36px' }}>
        <div className="card">
          <div style={{ fontSize: '28px', marginBottom: '10px' }}>🎮</div>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF', marginBottom: '8px' }}>
            Activity 1: The Live Arena Showdown (15 Mins)
          </h3>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '14px' }}>
            Project the <strong>"Bias Spotter" Arena</strong> on your classroom screen. Have students vote on the correct fallacy for each viral scenario before revealing the answer.
          </p>
          <Link href="/arena" className="btn btn-amber" style={{ fontSize: '12.5px', padding: '6px 14px' }}>
            Launch Arena on Projector ➔
          </Link>
        </div>

        <div className="card">
          <div style={{ fontSize: '28px', marginBottom: '10px' }}>🃏</div>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF', marginBottom: '8px' }}>
            Activity 2: Fallacy Card Fishbowl (20 Mins)
          </h3>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '14px' }}>
            Assign each student one card from the <strong>Cognitive Bias Codex</strong>. Have them find a real-world post from their personal social media feed that demonstrates the bias.
          </p>
          <Link href="/" className="btn btn-primary" style={{ fontSize: '12.5px', padding: '6px 14px' }}>
            Open Bias Codex ➔
          </Link>
        </div>
      </div>

      {/* UNESCO MIL Five Laws Mapping */}
      <div className="card" style={{ marginBottom: '36px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#FFFFFF', marginBottom: '16px' }}>
          🏛️ Direct Alignment with UNESCO's Five Laws of MIL
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {unescoLaws.map((law, i) => (
            <div key={i} style={{ background: 'var(--bg-surface-elevated)', padding: '14px 16px', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--accent-amber)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--accent-amber)', textTransform: 'uppercase' }}>{law.num}:</span>
                <strong style={{ fontSize: '14.5px', color: '#FFFFFF' }}>{law.title}</strong>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{law.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SIFT Method Summary */}
      <div className="card">
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#FFFFFF', marginBottom: '14px' }}>
          🧭 The SIFT Lateral Reading Framework
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
          <div style={{ background: 'var(--bg-surface-elevated)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
            <strong style={{ color: '#EF4444', fontSize: '15px' }}>S — STOP</strong>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Pause when feeling acute emotional surges or urgency.</p>
          </div>
          <div style={{ background: 'var(--bg-surface-elevated)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
            <strong style={{ color: '#F59E0B', fontSize: '15px' }}>I — INVESTIGATE</strong>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Check the publisher's background and funding model.</p>
          </div>
          <div style={{ background: 'var(--bg-surface-elevated)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
            <strong style={{ color: '#3B82F6', fontSize: '15px' }}>F — FIND</strong>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Search for consensus reporting on wire services (Reuters, AP).</p>
          </div>
          <div style={{ background: 'var(--bg-surface-elevated)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
            <strong style={{ color: '#10B981', fontSize: '15px' }}>T — TRACE</strong>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Locate the original context, video clip, or peer-reviewed study.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
