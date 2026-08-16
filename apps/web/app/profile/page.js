'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPlayerProfile, getRankFromXP, RANKS, BADGES } from '../../lib/gamification';
import { useTranslation } from '../../lib/i18n';

const BADGES_ID = {
  first_shield: { name: 'Perisai Pertama', desc: 'Menyelesaikan tantangan analisis skenario pertama Anda.' },
  streak_five: { name: 'Fokus Tak Tergoyahkan', desc: 'Mencapai 5 jawaban benar berturut-turut di Arena atau Gauntlet.' },
  codex_scholar: { name: 'Cendekiawan Kodeks', desc: 'Membuka dan mempelajari seluruh 12 arketipe sesat pikir.' },
  speed_sifter: { name: 'Penyaring Kilat', desc: 'Meraih akurasi 80%+ dalam Tantangan 60 Detik.' },
  scam_shield: { name: 'Kebal Penipuan', desc: 'Berhasil mendeteksi 5 jebakan finansial dengan batas waktu palsu.' },
  nuance_master: { name: 'Pakar Nuansa', desc: 'Mematahkan Dilema Palsu yang rumit dengan verifikasi lateral.' },
  sandbox_scientist: { name: 'Ilmuwan Sandbox', desc: 'Menganalisis 3 artikel berita langsung di Sandbox AI.' },
  grand_immunity: { name: 'Pemikir Sempurna', desc: 'Mencapai Peringkat Tingkat 5 dan meraih Sertifikat UNESCO.' }
};

export default function ProfilePage() {
  const { lang } = useTranslation();
  const [profile, setProfile] = useState({
    xp: 120,
    streak: 0,
    maxStreak: 3,
    quizzesCompleted: 1,
    cardsFlipped: [],
    unlockedBadgeIds: ['first_shield']
  });
  const [rank, setRank] = useState(RANKS[0]);

  useEffect(() => {
    const p = getPlayerProfile();
    setProfile(p);
    setRank(getRankFromXP(p.xp));
  }, []);

  const nextRank = RANKS.find(r => r.level === rank.level + 1) || rank;
  const currentLevelMin = rank.minXP;
  const nextLevelMin = nextRank.minXP;
  const progressInLevel = profile.xp - currentLevelMin;
  const levelTotalDistance = Math.max(1, nextLevelMin - currentLevelMin);
  const progressPercent = Math.min(100, Math.max(5, Math.round((progressInLevel / levelTotalDistance) * 100)));

  return (
    <div className="container" style={{ maxWidth: '960px', padding: '30px 16px' }}>
      {/* Top Banner */}
      <div className="card" style={{ marginBottom: '24px', background: 'linear-gradient(135deg, #101726 0%, #172554 100%)', border: `1.5px solid ${rank.color}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(0,0,0,0.3)', border: `2px solid ${rank.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '900', color: rank.color, flexShrink: 0 }}>
              Lv.{rank.level}
            </div>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '10.5px', fontWeight: '800', textTransform: 'uppercase', color: rank.color, letterSpacing: '0.6px' }}>
                {lang === 'id' ? `Peringkat MIL UNESCO • Tingkat ${rank.level}` : `UNESCO MIL Rank • Level ${rank.level}`}
              </div>
              <h1 style={{ fontSize: 'clamp(20px, 4.5vw, 26px)', fontWeight: '900', color: '#FFFFFF', marginTop: '2px' }}>
                {rank.name}
              </h1>
              <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                {lang === 'id' ? 'Total Poin: ' : 'Total Score: '}<strong style={{ color: '#FFFFFF' }}>{profile.xp} XP</strong> • {lang === 'id' ? `Peringkat berikutnya di ${nextRank.minXP} XP` : `Next rank at ${nextRank.minXP} XP`}
              </div>
            </div>
          </div>

          {/* Level Progress Bar */}
          <div style={{ width: '100%', maxWidth: '260px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '700' }}>
              <span>{lang === 'id' ? 'TINGKAT' : 'LVL'} {rank.level}</span>
              <span>{profile.xp} / {nextRank.minXP} XP</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(0,0,0,0.4)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${progressPercent}%`, height: '100%', background: rank.color, transition: 'width 0.4s ease' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Stats Overview Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginBottom: '28px' }}>
        <div className="card" style={{ textAlign: 'center', padding: '14px' }}>
          <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--accent-amber)', marginBottom: '2px' }}>XP</div>
          <div style={{ fontSize: '20px', fontWeight: '900', color: '#FFFFFF' }}>{profile.xp}</div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
            {lang === 'id' ? 'Total Poin XP' : 'Total XP Earned'}
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '14px' }}>
          <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--accent-amber)', marginBottom: '2px' }}>MAX</div>
          <div style={{ fontSize: '20px', fontWeight: '900', color: 'var(--accent-amber)' }}>{profile.maxStreak}x</div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
            {lang === 'id' ? 'Rentetan Tertinggi' : 'Highest Streak'}
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '14px' }}>
          <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--accent-blue-light)', marginBottom: '2px' }}>12</div>
          <div style={{ fontSize: '20px', fontWeight: '900', color: 'var(--accent-blue-light)' }}>{profile.cardsFlipped.length}/12</div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
            {lang === 'id' ? 'Kartu Dikuasai' : 'Cards Mastered'}
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '14px' }}>
          <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--accent-emerald-light)', marginBottom: '2px' }}>8</div>
          <div style={{ fontSize: '20px', fontWeight: '900', color: 'var(--accent-emerald-light)' }}>{profile.unlockedBadgeIds.length}/{BADGES.length}</div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
            {lang === 'id' ? 'Lencana Terbuka' : 'Badges Unlocked'}
          </div>
        </div>
      </div>

      {/* Achievement Badges Section */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ marginBottom: '14px' }}>
          <h2 style={{ fontSize: 'clamp(18px, 4vw, 20px)', fontWeight: '800', color: '#FFFFFF' }}>
            {lang === 'id' ? 'Lencana Prestasi Kognitif' : 'Cognitive Achievement Badges'}
          </h2>
          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
            {lang === 'id'
              ? 'Selesaikan tantangan di Arena, Gauntlet, dan Kodeks untuk membuka lencana dan bonus XP.'
              : 'Complete challenges across the Arena, Gauntlet, and Codex to unlock badges and earn bonus XP.'}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
          {BADGES.map((b) => {
            const isUnlocked = profile.unlockedBadgeIds.includes(b.id);
            const idData = BADGES_ID[b.id] || {};
            const badgeName = lang === 'id' && idData.name ? idData.name : b.name;
            const badgeDesc = lang === 'id' && idData.desc ? idData.desc : b.desc;

            return (
              <div
                key={b.id}
                className="card"
                style={{
                  padding: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: isUnlocked ? 'var(--bg-surface)' : 'rgba(16, 23, 38, 0.4)',
                  borderColor: isUnlocked ? 'var(--accent-amber)' : 'var(--border-subtle)',
                  opacity: isUnlocked ? 1 : 0.6
                }}
              >
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: isUnlocked ? 'rgba(245, 158, 11, 0.15)' : 'var(--bg-surface-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800', color: isUnlocked ? 'var(--accent-amber)' : 'var(--text-muted)', flexShrink: 0 }}>
                  {isUnlocked ? 'OK' : 'LOCKED'}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <strong style={{ fontSize: '13px', color: isUnlocked ? '#FFFFFF' : 'var(--text-muted)' }}>{badgeName}</strong>
                    {isUnlocked && <span style={{ fontSize: '10px', color: 'var(--accent-amber)', fontWeight: '800' }}>+{b.xpReward} XP</span>}
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.3' }}>
                    {badgeDesc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Play CTAs */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#FFFFFF' }}>
            {lang === 'id' ? 'Siap naik ke peringkat berikutnya?' : 'Ready to climb to the next rank?'}
          </h3>
          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
            {lang === 'id' ? 'Mainkan Tantangan 60 Detik atau masuk ke Arena 5 ronde.' : 'Play the 60-second Gauntlet or jump into the 5-round Arena.'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Link href="/gauntlet" className="btn btn-amber" style={{ padding: '8px 16px', fontSize: '13px' }}>
            {lang === 'id' ? 'Tantangan 60s' : 'Gauntlet'}
          </Link>
          <Link href="/arena" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
            {lang === 'id' ? 'Arena Deteksi' : 'Arena'}
          </Link>
        </div>
      </div>
    </div>
  );
}
