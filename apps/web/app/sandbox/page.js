'use client';

import { useState, useEffect } from 'react';
import shared from '../../../../packages/shared/src/index.js';

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
  const [inputText, setInputText] = useState(PRESET_SCENARIOS.health.text);
  const [inputTitle, setInputTitle] = useState(PRESET_SCENARIOS.health.title);
  const [analysis, setAnalysis] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // Run local heuristics whenever text changes
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
    } catch (err) {
      setAiResult({ error: 'Network gateway unavailable' });
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '1000px', padding: '40px 20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '20px', fontSize: '12px', fontWeight: '700', color: 'var(--accent-blue-light)', textTransform: 'uppercase', marginBottom: '12px' }}>
          <span>🧪 In-Browser Sandbox Dissector</span>
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#FFFFFF', marginBottom: '8px' }}>
          Live Article Rhetoric Dissector
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '680px', margin: '0 auto' }}>
          Paste any article or claim below to see real-time heuristic fallacy tagging and live <strong>Gemini 2.0 Flash-Lite</strong> cognitive reasoning.
        </p>
      </div>

      {/* Preset Pickers */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button onClick={() => loadScenario('health')} className="btn btn-outline" style={{ fontSize: '12px', padding: '6px 12px' }}>
          💊 Miracle Cure Hoax
        </button>
        <button onClick={() => loadScenario('crypto')} className="btn btn-outline" style={{ fontSize: '12px', padding: '6px 12px' }}>
          💰 Crypto 500% Scam
        </button>
        <button onClick={() => loadScenario('politics')} className="btn btn-outline" style={{ fontSize: '12px', padding: '6px 12px' }}>
          🏛️ Outrage Headline
        </button>
        <button onClick={() => loadScenario('wire')} className="btn btn-outline" style={{ fontSize: '12px', padding: '6px 12px' }}>
          📰 Reuters Neutral Wire
        </button>
      </div>

      {/* Input Box */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Article Headline</label>
          <input
            type="text"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-sm)', color: '#FFFFFF', fontSize: '14px', marginTop: '4px', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Article Body Excerpt</label>
          <textarea
            rows={5}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-sm)', color: '#FFFFFF', fontSize: '14px', lineHeight: '1.5', marginTop: '4px', outline: 'none', resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            {analysis?.words || 0} words analyzed
          </span>
          <button
            onClick={handleRunAiScan}
            disabled={aiLoading}
            className="btn btn-amber"
            style={{ padding: '8px 18px' }}
          >
            {aiLoading ? '🤖 Analyzing with Gemini...' : '🤖 Run Gemini AI Deep Scan'}
          </button>
        </div>
      </div>

      {/* Real-time Analysis Dashboard */}
      {analysis && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
          {/* Sensationalism Gauge */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Sensationalism Index</span>
              <span style={{ fontSize: '12px', fontWeight: '800', color: analysis.score >= 60 ? '#EF4444' : analysis.score >= 30 ? '#F59E0B' : '#10B981' }}>
                {analysis.score}/100
              </span>
            </div>

            {/* Meter Bar */}
            <div style={{ width: '100%', height: '8px', background: 'var(--bg-surface-elevated)', borderRadius: '4px', overflow: 'hidden', margin: '6px 0 10px' }}>
              <div style={{ width: `${analysis.score}%`, height: '100%', background: analysis.score >= 60 ? '#EF4444' : analysis.score >= 30 ? '#F59E0B' : '#10B981', transition: 'width 0.4s ease' }}></div>
            </div>

            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              {analysis.score >= 60 ? (
                <span>⚠️ <strong>High Rhetorical Heat:</strong> Detected {analysis.matches.length} manipulation/urgency patterns. Verify claims laterally.</span>
              ) : analysis.score >= 30 ? (
                <span>⚖️ <strong>Mixed Nuance:</strong> Contains persuasive phrasing or speculative passive attribution.</span>
              ) : (
                <span>✨ <strong>Measured & Factual:</strong> Sober reporting tone with minimal emotional distortion cues.</span>
              )}
            </p>
          </div>

          {/* SIFT Lateral Toolkit */}
          <div className="card">
            <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
              🌐 1-Click SIFT Lateral Actions
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href={analysis.lateral.factCheckUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ justifyContent: 'flex-start', fontSize: '12px', padding: '6px 12px' }}>
                🔍 Search Google Fact Check Explorer
              </a>
              <a href={analysis.lateral.consensusSearchUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ justifyContent: 'flex-start', fontSize: '12px', padding: '6px 12px' }}>
                📰 Search Reuters/AP Consensus
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Gemini AI Live Result Box */}
      {aiResult && (
        <div className="card" style={{ border: '1.5px solid var(--accent-blue)', background: 'rgba(59, 130, 246, 0.06)', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '20px' }}>🤖</span>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#60A5FA' }}>
              Gemini 2.0 Flash-Lite Neural Analysis
            </h3>
          </div>

          {aiResult.error ? (
            <div style={{ color: '#F87171', fontSize: '13px' }}>{aiResult.error}</div>
          ) : (
            <div>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '12px', fontSize: '13px' }}>
                <div><strong>Primary Tone:</strong> {aiResult.primaryTone}</div>
                <div><strong>AI Outrage Score:</strong> {aiResult.sensationalismScore}/100</div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <strong style={{ fontSize: '12.5px', color: '#FFFFFF', display: 'block', marginBottom: '6px' }}>Identified Rhetorical Devices:</strong>
                <ul style={{ paddingLeft: '18px', fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {(aiResult.fallaciesFound || []).map((f, i) => (
                    <li key={i}>
                      <strong style={{ color: '#FBBF24' }}>{f.fallacy}:</strong> "{f.quote}" — <em>{f.explanation}</em>
                      <div style={{ color: '#34D399', fontSize: '12px', marginTop: '2px' }}>💡 <strong>Reflection:</strong> {f.reflection}</div>
                    </li>
                  ))}
                </ul>
              </div>

              {aiResult.siftAction && (
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px 14px', borderRadius: '6px', fontSize: '12.5px', color: '#93C5FD' }}>
                  <strong>🧭 Recommended SIFT Action:</strong> {aiResult.siftAction}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Flagged Devices Breakdown */}
      {analysis && analysis.matches.length > 0 && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#FFFFFF', marginBottom: '12px' }}>
            🚩 Client-Side Pattern Triggers ({analysis.matches.length} Flagged)
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {analysis.matches.map((m, i) => (
              <div key={i} style={{ background: 'var(--bg-surface-elevated)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', borderLeft: `3px solid ${m.color}` }}>
                <div style={{ fontSize: '12.5px', fontWeight: '700', color: '#FFFFFF' }}>{m.name}</div>
                <div style={{ fontSize: '11.5px', fontStyle: 'italic', color: 'var(--accent-amber)', margin: '2px 0' }}>"{m.matchedText}"</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{m.explanation}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
