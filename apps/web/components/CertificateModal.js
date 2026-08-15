'use client';

import { useState } from 'react';

export default function CertificateModal({ score, accuracy, mode, onClose }) {
  const [userName, setUserName] = useState('April Wang');
  const [copied, setCopied] = useState(false);

  const certId = `VL-${Math.random().toString(36).substring(2, 9).toUpperCase()}-2026`;
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const handleCopyShare = () => {
    const text = `🏆 I just earned my UNESCO Media Literacy Cognitive Immunity Certificate on VeriLens with ${accuracy}% accuracy and ${score} XP! Can you beat my streak? Test yourself: https://web-six-lac-47.vercel.app #UNESCO #MediaLiteracy #VeriLens2026`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: '#0B1120', border: '2px solid #F59E0B', borderRadius: '16px', maxWidth: '780px', width: '100%', padding: '32px', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)' }}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#94A3B8', fontSize: '20px', cursor: 'pointer' }}
        >
          ✕
        </button>

        {/* Certificate Container */}
        <div id="printable-certificate" style={{ border: '2px solid rgba(245, 158, 11, 0.4)', borderRadius: '12px', padding: '36px 28px', textAlign: 'center', background: 'radial-gradient(ellipse at center, #131E35 0%, #080C16 100%)', position: 'relative', overflow: 'hidden' }}>
          
          {/* Top Badges */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#F59E0B' }}>
              🏛️ UNESCO GLOBAL MIL YOUTH HACKATHON 2026
            </span>
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: '900', color: '#FFFFFF', letterSpacing: '-0.5px', marginBottom: '4px' }}>
            Certificate of Cognitive Immunity
          </h2>
          <div style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '20px' }}>
            Official Media & Information Literacy Certification • SIFT Framework
          </div>

          <div style={{ fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>This certifies that</div>
          
          {/* Editable Name Field */}
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{ fontSize: '28px', fontWeight: '900', color: '#FBBF24', textAlign: 'center', background: 'transparent', border: 'none', borderBottom: '2px dashed rgba(245, 158, 11, 0.5)', outline: 'none', width: '80%', margin: '4px auto 16px', fontFamily: 'serif' }}
          />

          <p style={{ fontSize: '13.5px', color: '#E2E8F0', maxWidth: '580px', margin: '0 auto 24px', lineHeight: '1.6' }}>
            Has successfully completed the <strong>{mode || 'Media Literacy Arena'}</strong> assessment, demonstrating rigorous competence in detecting <strong>rhetorical fallacies, cognitive biases, algorithmic outrage, and artificial urgency scams</strong>.
          </p>

          {/* Certificate Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '14px', maxWidth: '500px', margin: '0 auto 20px' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '700' }}>Score</div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#FFFFFF' }}>{score} XP</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '700' }}>Accuracy</div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#10B981' }}>{accuracy}%</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '700' }}>Issued</div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#FFFFFF', marginTop: '2px' }}>{dateStr}</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '14px', maxWidth: '500px', margin: '0 auto', fontSize: '11px', color: '#64748B' }}>
            <span>Verification ID: {certId}</span>
            <span style={{ color: '#F59E0B', fontWeight: '700' }}>⭐ Verified by VeriLens Engine</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
          <button onClick={handlePrint} className="btn btn-amber">
            🖨️ Print / Save as PDF
          </button>
          <button onClick={handleCopyShare} className="btn btn-primary">
            {copied ? '✓ Copied Shareable Text!' : '📋 Copy Shareable Link'}
          </button>
          <button onClick={onClose} className="btn btn-outline">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
