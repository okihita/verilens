import './globals.css';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'VeriLens — UNESCO Gamified Media Literacy & Cognitive Companion',
  description: 'Master critical thinking, identify cognitive biases, and dissect misinformation in real-time. Built for the UNESCO Global MIL Youth Hackathon 2026.',
  openGraph: {
    title: 'VeriLens — The AI Cognitive Shield for Media Literacy',
    description: '12 Interactive Fallacy Cards, Gamified Bias Spotter Arena, and Real-Time Article Dissector.',
    type: 'website'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        <main>{children}</main>

        <footer className="app-footer">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-col">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <div className="brand-logo" style={{ width: '28px', height: '28px', fontSize: '11px' }}>VL</div>
                  <strong style={{ color: '#FFFFFF', fontSize: '15px' }}>VeriLens Platform</strong>
                </div>
                <p style={{ lineHeight: '1.5', color: '#94A3B8', fontSize: '12.5px' }}>
                  An open-access media & information literacy ecosystem combining gamified cognitive conditioning with real-time browser protection. Built for the <strong>UNESCO Global MIL Youth Hackathon 2026</strong>.
                </p>
              </div>

              <div className="footer-col">
                <h4>Learning Tools</h4>
                <ul>
                  <li><Link href="/">Cognitive Bias Codex</Link></li>
                  <li><Link href="/arena">Bias Spotter Arena</Link></li>
                  <li><Link href="/gauntlet">Daily Bias Gauntlet</Link></li>
                  <li><Link href="/sandbox">Live Article Sandbox</Link></li>
                  <li><Link href="/classroom">Classroom Showdown</Link></li>
                  <li><Link href="/profile">Trophy Room</Link></li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>UNESCO Standards</h4>
                <ul>
                  <li><a href="https://www.unesco.org/en/global-mil-week" target="_blank" rel="noopener noreferrer">Global MIL Week</a></li>
                  <li><a href="https://unesdoc.unesco.org/ark:/48223/pf0000377068" target="_blank" rel="noopener noreferrer">MIL Curriculum PDF</a></li>
                  <li><a href="https://hapgood.com/2019/06/19/sift-the-four-moves/" target="_blank" rel="noopener noreferrer">SIFT Framework</a></li>
                  <li><a href="https://sheg.stanford.edu/civic-online-reasoning" target="_blank" rel="noopener noreferrer">Stanford SHEG</a></li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>Ecosystem</h4>
                <ul>
                  <li><Link href="/extension">Chrome Extension (MV3)</Link></li>
                  <li><a href="https://github.com/okihita/verilens" target="_blank" rel="noopener noreferrer">GitHub Repository</a></li>
                  <li><a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer">Gemini 2.0 Flash-Lite</a></li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom">
              <span>© 2026 VeriLens Project • Developed for UNESCO Global MIL Youth Hackathon</span>
              <span>Open Source • Privacy-First Local Processing</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
