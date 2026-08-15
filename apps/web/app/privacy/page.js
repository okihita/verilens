import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — VeriLens Media Literacy Platform',
  description: 'VeriLens privacy policy and data protection disclosures for Chrome Web Store and UNESCO Global MIL 2026.'
};

export default function PrivacyPage() {
  return (
    <div className="container" style={{ maxWidth: '800px', padding: '60px 20px' }}>
      <div style={{ marginBottom: '32px' }}>
        <Link href="/" style={{ fontSize: '13px', color: 'var(--accent-blue-light)', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
          ← Back to VeriLens
        </Link>
        <h1 style={{ fontSize: '34px', fontWeight: '900', color: '#FFFFFF', marginBottom: '8px' }}>
          Privacy Policy
        </h1>
        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Last Updated: August 15, 2026 • UNESCO Global MIL Youth Hackathon Edition
        </div>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px', lineHeight: '1.7', fontSize: '14px', color: 'var(--text-secondary)' }}>
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF', marginBottom: '8px' }}>
            1. Core Privacy Commitment
          </h2>
          <p>
            <strong>VeriLens</strong> is an open-access educational media literacy tool developed for the UNESCO Global MIL Youth Hackathon. We believe that privacy is a fundamental human right. VeriLens is engineered with a <strong>privacy-first, client-side architecture</strong>. We do not track your browsing habits, do not sell user data, and do not profile users.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF', marginBottom: '8px' }}>
            2. What Data We Process & How It Is Used
          </h2>
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>
              <strong>Website Content (In-Memory Processing):</strong> When you view an article or highlight a sentence and select <em>"⚡ SIFT & Verify with VeriLens"</em>, the text is analyzed in temporary browser memory. Client-side heuristic matching runs 100% locally on your machine.
            </li>
            <li>
              <strong>AI Deep Scan (Gemini API):</strong> If you click <em>"Run Gemini AI Deep Scan"</em>, the selected article excerpt is transmitted via HTTPS directly to Google's official Gemini Generative Language API endpoint. No personally identifiable information (PII) is attached to this request.
            </li>
            <li>
              <strong>Local Storage (chrome.storage.local):</strong> Your streak counts, mastered fallacy badges, sensitivity preferences, and custom Gemini API keys are saved exclusively in your browser's isolated local storage. They are never uploaded to any central server.
            </li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF', marginBottom: '8px' }}>
            3. Data Sharing & Third Parties
          </h2>
          <p>
            We strictly do <strong>NOT</strong> sell, rent, monetize, or disclose your personal data or browsing history to data brokers, advertisers, or third-party marketing networks.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF', marginBottom: '8px' }}>
            4. User Controls & Data Deletion
          </h2>
          <p>
            You have full control over your data. You can clear your local Cognitive Gym streaks and saved preferences at any time by opening the extension <strong>Settings (⚙️)</strong> and clicking <em>"Reset Cognitive Gym Stats"</em>, or by uninstalling the extension.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF', marginBottom: '8px' }}>
            5. Contact & Open Source Verification
          </h2>
          <p>
            VeriLens is an open-source educational project. All source code is publicly inspectable and verifiable on our GitHub repository. For inquiries, reach out through our official UNESCO Hackathon submission portal.
          </p>
        </section>
      </div>
    </div>
  );
}
