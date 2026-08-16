'use client';

import { useState, useEffect } from 'react';
import * as shared from '@verilens/shared';
import { useTranslation } from '../../../lib/i18n';

const PRESET_SCENARIOS = {
  health: {
    title: 'Secret Miracle Cancer Cure Suppressed by Mainstream Media',
    text: 'URGENT ALERT: Leading scientists all agree without a doubt that this secret herbal treatment cures 100% of degenerative diseases! Mainstream media is hiding the shocking truth because pharmaceutical executives refuse to report it. Act now before this post is deleted by authorities! Share before it is censored!'
  },
  crypto: {
    title: 'Guaranteed 500% Monthly Crypto Yield — Zero Risk Loophole',
    text: 'BOMBSHELL REVELATION: Our automated AI quant algorithm offers guaranteed profit with absolutely zero downside risk! Claim your grant and token reward immediately. Over 10 million smart investors have already claimed their free money. If you are not with us, you will stay broke forever!'
  },
  politics: {
    title: 'Outrage Erupts as Opponent Totally Destroys Competitor in Brutal Clash',
    text: 'A furious backlash has erupted after the mayor brutally slammed her opponents as corrupt clowns and brainwashed puppets. Unnamed insiders confirm that society is sleepwalking into an absolute, irreversible catastrophe. Either you stand with our patriots, or you hate our community!'
  },
  wire: {
    title: 'International Renewable Energy Capacity Grew 14% in 2025',
    text: 'Global solar and wind electricity generation expanded by 14 percent over the past fiscal year, according to the annual market review published by the International Energy Agency on Thursday. Grid operators reported steady integration progress while noting ongoing transmission infrastructure requirements.'
  }
};

export default function SandboxPage() {
  const { lang } = useTranslation();
  const [inputText, setInputText] = useState(PRESET_SCENARIOS.health.text);
  const [inputTitle, setInputTitle] = useState(PRESET_SCENARIOS.health.title);
  const [analysis, setAnalysis] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  useEffect(() => {
    if (!inputText || inputText.trim().length === 0) {
      setAnalysis(null);
      return;
    }

    const matches = shared.scanText(inputText);
    const score = shared.calculateSensationalismIndex(inputText, matches);
    const lateral = shared.buildLateralLinks(inputTitle || inputText.slice(0, 50), 'sandbox-demo.web');

    setAnalysis({
      score,
      matches,
      lateral,
      words: inputText.trim().split(/\s+/).length
    });
  }, [inputText, inputTitle]);

  const loadScenario = (key) => {
    const s = PRESET_SCENARIOS[key];
    setInputTitle(s.title);
    setInputText(s.text);
    setAiResult(null);
  };

  const handleRunAiScan = async () => {
    setAiLoading(true);
    setAiResult(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: inputTitle,
          text: inputText
        })
      });

      const data = await res.json();
      if (data.success) {
        setAiResult(data.data);
      } else {
        setAiResult({ error: data.error || 'Failed to analyze' });
      }
    } catch {
      setAiResult({ error: 'Network gateway unavailable' });
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '1000px', padding: '40px 20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '20px', fontSize: '12px', fontWeight: '800', color: 'var(--accent-blue-light)', textTransform: 'uppercase', marginBottom: '12px' }}>
          <span>{lang === 'id' ? 'Disetor Sandbox Dalam Browser' : 'In-Browser Sandbox Dissector'}</span>
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--text-main)', marginBottom: '8px' }}>
          {lang === 'id' ? 'Disetor Retorika Artikel Langsung' : 'Live Article Rhetoric Dissector'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '680px', margin: '0 auto', lineHeight: '1.6' }}>
          {lang === 'id'
            ? 'Tempelkan artikel atau klaim di bawah ini untuk melihat penandaan sesat pikir heuristik waktu nyata dan penalaran kognitif Gemini 2.0 Flash-Lite.'
            : 'Paste any article or claim below to see real-time heuristic fallacy tagging and live Gemini 2.0 Flash-Lite cognitive reasoning.'}
        </p>
      </div>

      {/* Preset Pickers */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button onClick={() => loadScenario('health')} className="btn btn-outline" style={{ fontSize: '13px', padding: '6px 12px' }}>
          Miracle Cure Hoax
        </button>
        <button onClick={() => loadScenario('crypto')} className="btn btn-outline" style={{ fontSize: '13px', padding: '6px 12px' }}>
          Crypto 500% Scam
        </button>
        <button onClick={() => loadScenario('politics')} className="btn btn-outline" style={{ fontSize: '13px', padding: '6px 12px' }}>
          Outrage Headline
        </button>
        <button onClick={() => loadScenario('wire')} className="btn btn-outline" style={{ fontSize: '13px', padding: '6px 12px' }}>
          Reuters Neutral Wire
        </button>
      </div>

      {/* Input Box */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            {lang === 'id' ? 'Judul Berita / Artikel' : 'Article Headline'}
          </label>
          <input
            type="text"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)', fontSize: '14px', marginTop: '4px', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            {lang === 'id' ? 'Isi Kutipan Artikel' : 'Article Body Excerpt'}
          </label>
          <textarea
            rows={5}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)', fontSize: '14px', lineHeight: '1.5', marginTop: '4px', outline: 'none', resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', flexWrap: 'wrap', gap: '10px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            {analysis?.words || 0} {lang === 'id' ? 'kata dianalisis' : 'words analyzed'}
          </span>
          <button
            onClick={handleRunAiScan}
            disabled={aiLoading}
            className="btn btn-amber"
            style={{ padding: '8px 18px', fontSize: '14px' }}
          >
            {aiLoading ? (lang === 'id' ? 'Menganalisis dengan Gemini...' : 'Analyzing with Gemini...') : (lang === 'id' ? 'Jalankan Pemindaian AI Gemini' : 'Run Gemini AI Deep Scan')}
          </button>
        </div>
      </div>

      {/* Real-time Analysis Dashboard */}
      {analysis && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '24px' }}>
          {/* Sensationalism Gauge */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                {lang === 'id' ? 'Indeks Sensasionalisme' : 'Sensationalism Index'}
              </span>
              <span style={{ fontSize: '14px', fontWeight: '800', color: analysis.score >= 60 ? '#EF4444' : analysis.score >= 30 ? '#F59E0B' : '#10B981' }}>
                {analysis.score}/100
              </span>
            </div>

            {/* Meter Bar */}
            <div style={{ width: '100%', height: '8px', background: 'var(--bg-surface-elevated)', borderRadius: '4px', overflow: 'hidden', margin: '6px 0 10px' }}>
              <div style={{ width: `${analysis.score}%`, height: '100%', background: analysis.score >= 60 ? '#EF4444' : analysis.score >= 30 ? '#F59E0B' : '#10B981', transition: 'width 0.4s ease' }}></div>
            </div>

            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.45' }}>
              {analysis.score >= 60 ? (
                <span><strong>High Rhetorical Heat:</strong> Detected {analysis.matches.length} manipulation/urgency patterns. Verify claims laterally.</span>
              ) : analysis.score >= 30 ? (
                <span><strong>Mixed Nuance:</strong> Contains persuasive phrasing or speculative passive attribution.</span>
              ) : (
                <span><strong>Measured & Factual:</strong> Sober reporting tone with minimal emotional distortion cues.</span>
              )}
            </p>

            {analysis.matches.length > 0 && (
              <div style={{ marginTop: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {analysis.matches.map((m, i) => (
                  <span key={i} style={{ fontSize: '12px', background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>
                    {m.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* SIFT Lateral Search Links */}
          <div className="card">
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              UNESCO SIFT Lateral Links
            </span>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              {lang === 'id' ? 'Lakukan verifikasi silang terhadap klaim ini melalui sumber terpercaya:' : 'Cross-verify this claim across trusted primary consensus archives:'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href={analysis.lateral.googleNews}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ justifyContent: 'space-between', fontSize: '13px', padding: '8px 12px' }}
              >
                <span>Google News Lateral Search</span>
                <span>➔</span>
              </a>
              <a
                href={analysis.lateral.reuters}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ justifyContent: 'space-between', fontSize: '13px', padding: '8px 12px' }}
              >
                <span>Reuters Archive Search</span>
                <span>➔</span>
              </a>
              <a
                href={analysis.lateral.factCheck}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ justifyContent: 'space-between', fontSize: '13px', padding: '8px 12px' }}
              >
                <span>Google Fact Check Explorer</span>
                <span>➔</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* AI Deep Reasoning Result */}
      {aiResult && (
        <div className="card" style={{ background: 'rgba(59, 130, 246, 0.08)', border: '1.5px solid var(--accent-blue)', animation: 'fadeIn 0.3s ease' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#60A5FA', marginBottom: '8px' }}>
            Gemini 2.0 Flash-Lite Cognitive Analysis
          </h3>

          {aiResult.error ? (
            <p style={{ color: '#F87171', fontSize: '13px' }}>{aiResult.error}</p>
          ) : (
            <div>
              <p style={{ fontSize: '14px', color: 'var(--text-main)', lineHeight: '1.5', marginBottom: '12px' }}>
                {aiResult.analysis || aiResult.summary || 'Analysis complete.'}
              </p>
              {aiResult.fallacy && (
                <div style={{ fontSize: '13px', color: 'var(--accent-amber)' }}>
                  <strong>Identified Device:</strong> {aiResult.fallacy}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
