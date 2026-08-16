'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from '../../../lib/i18n';

const LESSON_MODULES = [
  {
    id: 'mod1',
    code: 'UNESCO MIL Module 1',
    title: 'Dissecting Algorithmic Outrage & Rhetorical Fallacies',
    duration: '45 Minutes',
    targetGrade: 'Secondary & Higher Education',
    overview: 'Students deconstruct how engagement algorithms amplify high-arousal emotions (fear, anger) and analyze 12 rhetorical fallacy archetypes.',
    competency: 'Understanding media functions, framing, and cognitive biases.',
    classroomActivity: 'Split the class into Team Alpha and Team Beta. Run the Classroom Showdown mode on the projector with 30-second debate intervals.',
    exerciseUrl: '/classroom'
  },
  {
    id: 'mod2',
    code: 'UNESCO MIL Module 2',
    title: 'Lateral Reading & The SIFT Verification Method',
    duration: '60 Minutes',
    targetGrade: 'Secondary & University',
    overview: 'Teaching the Stanford History Education Group (SHEG) lateral verification technique: Stop, Investigate the Source, Find Better Coverage, and Trace Claims.',
    competency: 'Lateral investigation vs vertical reading; publisher reputation assessment.',
    classroomActivity: 'Provide students with 3 viral articles in the Live Article Sandbox. Students must complete lateral search dossiers before making a credibility ruling.',
    exerciseUrl: '/sandbox'
  },
  {
    id: 'mod3',
    code: 'UNESCO MIL Module 3',
    title: 'Social Engineering, Scams & Financial Manipulation',
    duration: '30 Minutes',
    targetGrade: 'All Youth Age Groups',
    overview: 'Identifying artificial urgency triggers, phishing lures, and deceptive financial schemes across social networks.',
    competency: 'Digital safety, privacy defense, and financial scam resistance.',
    classroomActivity: 'Students run the 60-Second Daily Gauntlet speed trial, aiming for an 80%+ accuracy score to earn their Cognitive Immunity Certificate.',
    exerciseUrl: '/gauntlet'
  }
];

export default function EducatorPage() {
  const { lang } = useTranslation();
  const [selectedDuration, setSelectedDuration] = useState('45');
  const [selectedGrade, setSelectedGrade] = useState('High School');
  const [printableModalOpen, setPrintableModalOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container" style={{ maxWidth: '960px', padding: '40px 20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '20px', fontSize: '11.5px', fontWeight: '800', color: 'var(--accent-emerald-light)', textTransform: 'uppercase', marginBottom: '12px' }}>
          <span>{lang === 'id' ? 'Pusat Pendidik & Kurikulum UNESCO' : 'UNESCO MIL Educator Hub'}</span>
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#FFFFFF', marginBottom: '10px' }}>
          {lang === 'id' ? 'Panduan Kurikulum & Generator RPP' : 'Curriculum Guide & Lesson Plan Generator'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '720px', margin: '0 auto', lineHeight: '1.6' }}>
          {lang === 'id'
            ? 'Aktivitas kelas tanpa instalasi, latihan smartboard interaktif, dan pemetaan langsung dengan Kurikulum Literasi Media & Informasi UNESCO.'
            : 'Zero-install classroom exercises, interactive smartboard showdowns, and direct mapping to the official UNESCO Media and Information Literacy Curriculum.'}
        </p>
      </div>

      {/* Lesson Plan Generator Card */}
      <div className="card" style={{ marginBottom: '32px', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', border: '1.5px solid var(--accent-blue)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#FFFFFF' }}>
              {lang === 'id' ? 'Generator Rencana Pembelajaran 1-Klik' : '1-Click Classroom Lesson Plan Generator'}
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {lang === 'id'
                ? 'Sesuaikan durasi kelas dan tingkat siswa untuk menghasilkan lembar kerja siap cetak.'
                : 'Select your class duration and grade level to generate a complete printable workshop guide.'}
            </p>
          </div>

          <button onClick={() => setPrintableModalOpen(true)} className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '13.5px' }}>
            {lang === 'id' ? 'Buat Lembar Kerja RPP' : 'Generate Lesson Sheet'}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div>
            <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
              {lang === 'id' ? 'Durasi Sesi' : 'Session Duration'}
            </label>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-card)', borderRadius: '6px', color: '#FFFFFF', fontSize: '13px', outline: 'none' }}
            >
              <option value="15">15 Minutes (Warm-up Activity)</option>
              <option value="45">45 Minutes (Full Standard Class)</option>
              <option value="90">90 Minutes (Deep-Dive Workshop)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
              {lang === 'id' ? 'Tingkat Pendidikan' : 'Grade Level'}
            </label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-card)', borderRadius: '6px', color: '#FFFFFF', fontSize: '13px', outline: 'none' }}
            >
              <option value="Middle School">Middle School (Ages 11-14)</option>
              <option value="High School">High School (Ages 15-18)</option>
              <option value="University / Community">University / Youth Group (Ages 18+)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Curriculum Modules Grid */}
      <div style={{ marginBottom: '36px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#FFFFFF', marginBottom: '16px' }}>
          {lang === 'id' ? 'Modul Kurikulum Literasi Media UNESCO' : 'UNESCO Media Literacy Curriculum Modules'}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {LESSON_MODULES.map((mod) => (
            <div key={mod.id} className="card" style={{ borderLeft: '4px solid var(--accent-emerald)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--accent-emerald-light)', textTransform: 'uppercase' }}>
                  {mod.code} • {mod.duration}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{mod.targetGrade}</span>
              </div>

              <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#FFFFFF', marginBottom: '6px' }}>
                {mod.title}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '12px' }}>
                {mod.overview}
              </p>

              <div style={{ background: 'var(--bg-surface-elevated)', padding: '12px 14px', borderRadius: '8px', marginBottom: '12px', fontSize: '12.5px' }}>
                <strong style={{ color: 'var(--accent-amber)' }}>Classroom Interactive Activity: </strong>
                <span style={{ color: '#E2E8F0' }}>{mod.classroomActivity}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                  <strong>Key Competency:</strong> {mod.competency}
                </span>
                <Link href={mod.exerciseUrl} className="btn btn-outline" style={{ padding: '6px 14px', fontSize: '12px' }}>
                  Launch Activity Module
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Printable Lesson Sheet Modal */}
      {printableModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', overflowY: 'auto' }}>
          <div style={{ background: '#0B1120', border: '1.5px solid var(--border-card)', borderRadius: '16px', maxWidth: '800px', width: '100%', padding: '28px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--accent-emerald-light)', textTransform: 'uppercase' }}>
                  UNESCO Global MIL Curriculum Standard
                </span>
                <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#FFFFFF' }}>
                  Classroom Activity & Lesson Worksheet
                </h2>
              </div>
              <button onClick={() => setPrintableModalOpen(false)} style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '20px', cursor: 'pointer' }}>
                ✕
              </button>
            </div>

            <div id="printable-lesson" style={{ background: 'var(--bg-surface)', padding: '24px', borderRadius: '10px', border: '1px solid var(--border-subtle)', marginBottom: '20px', lineHeight: '1.6', fontSize: '13.5px', color: '#E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '14px', fontSize: '12px', color: 'var(--text-muted)' }}>
                <span><strong>Target:</strong> {selectedGrade}</span>
                <span><strong>Duration:</strong> {selectedDuration} Minutes</span>
                <span><strong>Framework:</strong> UNESCO SIFT & Cognitive Reflex</span>
              </div>

              <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#FFFFFF', marginBottom: '6px' }}>Part 1: 5-Minute Primer on Cognitive Biases</h4>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
                Explain to students that misinformation succeeds not because people lack intelligence, but because digital outrage algorithms exploit biological cognitive reflexes (Appeal to Fear, In-Group Confirmation, Artificial Scarcity).
              </p>

              <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#FFFFFF', marginBottom: '6px' }}>Part 2: Interactive Smartboard Showdown ({selectedDuration === '15' ? '8' : selectedDuration === '45' ? '25' : '50'} Minutes)</h4>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
                Open <strong>VeriLens Classroom Showdown</strong> on the main projector. Divide the classroom into Team Alpha and Team Beta. Teams have 30 seconds per headline to deliberate and explain the rhetorical flaw before the teacher reveals the answer.
              </p>

              <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#FFFFFF', marginBottom: '6px' }}>Part 3: Metacognitive Reflection Prompts</h4>
              <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                <li>"What emotional reaction was this headline designed to trigger in the reader?"</li>
                <li>"Who benefits financially or politically from the viral spread of this claim?"</li>
                <li>"What lateral search query would reveal the primary scientific consensus?"</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button onClick={handlePrint} className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '13px' }}>
                Print Lesson Plan
              </button>
              <button onClick={() => setPrintableModalOpen(false)} className="btn btn-outline" style={{ padding: '8px 18px', fontSize: '13px' }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
