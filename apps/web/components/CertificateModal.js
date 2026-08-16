'use client';

import { useState } from 'react';
import { useTranslation } from '../lib/i18n';

export default function CertificateModal({ score, accuracy, mode, onClose }) {
  const { lang } = useTranslation();
  const [userName, setUserName] = useState('April Wang');
  const [copied, setCopied] = useState(false);

  const certId = `VL-${Math.random().toString(36).substring(2, 9).toUpperCase()}-2026`;
  const dateStr = new Date().toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const handleCopyShare = () => {
    const text = lang === 'id'
      ? `Saya baru saja meraih Sertifikat Kekebalan Kognitif UNESCO di VeriLens dengan akurasi ${accuracy}% dan ${score} XP! Uji kemampuan literasi mediamu: https://verilens.okihita.dev #UNESCO #LiterasiMedia #VeriLens2026`
      : `I just earned my UNESCO Media Literacy Cognitive Immunity Certificate on VeriLens with ${accuracy}% accuracy and ${score} XP! Test yourself: https://verilens.okihita.dev #UNESCO #MediaLiteracy #VeriLens2026`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', overflowY: 'auto' }}>
      <div style={{ background: 'var(--bg-surface)', border: '2px solid var(--accent-amber)', borderRadius: '16px', maxWidth: '780px', width: '100%', padding: '24px 16px', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)', maxHeight: '90vh', overflowY: 'auto' }}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '14px', right: '14px', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '20px', cursor: 'pointer' }}
        >
          ✕
        </button>

        {/* Certificate Container */}
        <div id="printable-certificate" style={{ border: '2px solid rgba(245, 158, 11, 0.4)', borderRadius: '12px', padding: '24px 16px', textAlign: 'center', background: 'var(--bg-surface-elevated)', position: 'relative' }}>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--accent-amber)' }}>
              {lang === 'id' ? 'HACKATHON PEMUDA MIL GLOBAL UNESCO 2026' : 'UNESCO GLOBAL MIL YOUTH HACKATHON 2026'}
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(20px, 4.5vw, 26px)', fontWeight: '900', color: 'var(--text-main)', letterSpacing: '-0.5px', marginBottom: '2px' }}>
            {lang === 'id' ? 'Sertifikat Kekebalan Kognitif' : 'Certificate of Cognitive Immunity'}
          </h2>
          <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            {lang === 'id' ? 'Sertifikasi Literasi Media & Informasi Resmi • Kerangka SIFT' : 'Official Media & Information Literacy Certification • SIFT Framework'}
          </div>

          <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '2px' }}>
            {lang === 'id' ? 'Dengan ini menerangkan bahwa' : 'This certifies that'}
          </div>
          
          {/* Editable Name Field */}
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{ fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: '900', color: 'var(--accent-amber)', textAlign: 'center', background: 'transparent', border: 'none', borderBottom: '2px dashed rgba(245, 158, 11, 0.5)', outline: 'none', width: '90%', margin: '2px auto 14px', fontFamily: 'serif' }}
          />

          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto 18px', lineHeight: '1.5' }}>
            {lang === 'id'
              ? <>Telah berhasil menyelesaikan evaluasi <strong>{mode || 'Arena Literasi Media'}</strong>, membuktikan kompetensi kritis dalam mendeteksi <strong>sesat pikir retorika, bias kognitif, manipulasi emosional, dan jebakan finansial digital</strong>.</>
              : <>Has successfully completed the <strong>{mode || 'Media Literacy Arena'}</strong> assessment, demonstrating competence in detecting <strong>rhetorical fallacies, cognitive biases, and artificial urgency scams</strong>.</>
            }
          </p>

          {/* Certificate Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '8px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '12px', maxWidth: '500px', margin: '0 auto 16px' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
                {lang === 'id' ? 'Skor Poin' : 'Score'}
              </div>
              <div style={{ fontSize: '16px', fontWeight: '900', color: 'var(--text-main)' }}>{score} XP</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
                {lang === 'id' ? 'Akurasi' : 'Accuracy'}
              </div>
              <div style={{ fontSize: '16px', fontWeight: '900', color: '#10B981' }}>{accuracy}%</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
                {lang === 'id' ? 'Diterbitkan' : 'Issued'}
              </div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginTop: '2px' }}>{dateStr}</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', maxWidth: '500px', margin: '0 auto', fontSize: '12px', color: 'var(--text-muted)', flexWrap: 'wrap', gap: '6px' }}>
            <span>ID: {certId}</span>
            <span style={{ color: 'var(--accent-amber)', fontWeight: '700' }}>
              {lang === 'id' ? 'Terverifikasi oleh VeriLens Engine' : 'Verified by VeriLens Engine'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
          <button onClick={handlePrint} className="btn btn-amber" style={{ padding: '9px 18px', fontSize: '13.5px' }}>
            {lang === 'id' ? 'Cetak / Simpan PDF' : 'Print / PDF'}
          </button>
          <button onClick={handleCopyShare} className="btn btn-primary" style={{ padding: '9px 18px', fontSize: '13.5px' }}>
            {copied ? (lang === 'id' ? 'Tersalin!' : 'Copied!') : (lang === 'id' ? 'Salin Tautan' : 'Copy Link')}
          </button>
          <button onClick={onClose} className="btn btn-outline" style={{ padding: '9px 18px', fontSize: '13.5px' }}>
            {lang === 'id' ? 'Tutup' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
}
