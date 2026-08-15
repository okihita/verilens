'use client';

import Link from 'next/link';

export default function ExtensionPage() {
  const downloadUrl = 'https://github.com/okihita/verilens/releases/download/v1.0.0/verilens-extension-v1.0.0.zip';

  return (
    <div className="container" style={{ maxWidth: '900px', padding: '40px 20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '20px', fontSize: '12px', fontWeight: '700', color: 'var(--accent-amber)', textTransform: 'uppercase', marginBottom: '12px' }}>
          <span>🧩 Chrome Manifest V3 Extension</span>
        </div>
        <h1 style={{ fontSize: '34px', fontWeight: '900', color: '#FFFFFF', marginBottom: '10px' }}>
          VeriLens Browser Armor
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '680px', margin: '0 auto 24px' }}>
          Take your cognitive defenses directly to live web pages. Highlight suspicious claims, right-click to verify, and stream Gemini Flash-Lite neural reasoning in real-time.
        </p>

        {/* 1-Click Fast Download Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href={downloadUrl}
            className="btn btn-amber"
            style={{ padding: '12px 24px', fontSize: '15px' }}
          >
            ⬇️ Download Extension Package (.ZIP)
          </a>
          <Link href="/sandbox" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '15px' }}>
            🧪 Test In-Browser Sandbox (No Install)
          </Link>
        </div>
      </div>

      {/* Feature Showcase Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '36px' }}>
        <div className="card">
          <div style={{ fontSize: '28px', marginBottom: '8px' }}>⚡</div>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#FFFFFF', marginBottom: '6px' }}>
            Zero-Lag TreeWalker
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
            Non-destructive pure text node parser. Never breaks DOM attributes or web page event listeners.
          </p>
        </div>

        <div className="card">
          <div style={{ fontSize: '28px', marginBottom: '8px' }}>🖱️</div>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#FFFFFF', marginBottom: '6px' }}>
            Right-Click SIFT Verify
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
            Highlight any sentence on Twitter, Reddit, or news articles to trigger an instant in-page slide-out dissection.
          </p>
        </div>

        <div className="card">
          <div style={{ fontSize: '28px', marginBottom: '8px' }}>🤖</div>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#FFFFFF', marginBottom: '6px' }}>
            Gemini 2.0 Flash-Lite
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
            Sub-300ms neural reasoning providing pedagogical reflection questions and tailored SIFT queries.
          </p>
        </div>
      </div>

      {/* 30-Second Installation Guide */}
      <div className="card" style={{ marginBottom: '36px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#FFFFFF', marginBottom: '16px' }}>
          🛠️ 30-Second Quickstart Installation (Evaluator Guide)
        </h2>

        <ol style={{ paddingLeft: '22px', color: 'var(--text-main)', fontSize: '14px', lineHeight: '1.9' }}>
          <li>
            <strong>Download & Unzip:</strong> Download the <a href={downloadUrl} style={{ color: 'var(--accent-amber)', fontWeight: '700' }}>verilens-extension-v1.0.0.zip</a> release.
          </li>
          <li>
            Open Google Chrome and navigate to <code style={{ background: 'var(--bg-surface-elevated)', padding: '2px 6px', borderRadius: '4px', color: 'var(--accent-amber)' }}>chrome://extensions</code>.
          </li>
          <li>
            Toggle <strong>Developer mode</strong> in the top-right corner.
          </li>
          <li>
            Click <strong>Load unpacked</strong> and select the unzipped folder.
          </li>
          <li>
            Open any webpage, press <strong style={{ color: 'var(--accent-amber)' }}>Alt + V</strong> or right-click any highlighted claim to verify with Gemini AI!
          </li>
        </ol>
      </div>

      {/* Pitch Video Container */}
      <div className="card" style={{ textAlign: 'center', padding: '36px 20px' }}>
        <div style={{ fontSize: '32px', marginBottom: '10px' }}>🎥</div>
        <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#FFFFFF', marginBottom: '8px' }}>
          UNESCO Hackathon 2-Minute Pitch Video
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto 20px' }}>
          Watch the full walkthrough of the VeriLens dual-ecosystem, live classroom demonstrations, and in-browser AI verification in action.
        </p>

        <div style={{ width: '100%', maxWidth: '640px', height: '320px', background: 'var(--bg-surface-elevated)', border: '2px dashed var(--border-card)', borderRadius: 'var(--radius-md)', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
          <span style={{ fontSize: '36px', marginBottom: '8px' }}>▶️</span>
          <span style={{ fontSize: '13px', fontWeight: '600' }}>[ 2-Minute Video Pitch Embed Container ]</span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Ready for YouTube / Vimeo submission link</span>
        </div>
      </div>
    </div>
  );
}
