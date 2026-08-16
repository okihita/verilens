import './globals.css';
import Link from 'next/link';
import { cookies } from 'next/headers';
import Navbar from '../components/Navbar';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { I18nProvider } from '../lib/i18n';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap'
});

export const metadata = {
  title: 'VeriLens — AI Cognitive Shield',
  description: 'Master critical thinking, identify cognitive biases, and dissect misinformation in real-time.',
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/icon.png'
  },
  openGraph: {
    title: 'VeriLens — AI Cognitive Shield',
    description: '12 Interactive Fallacy Cards, Gamified Bias Spotter Arena, Skill Tree, and Real-Time Article Dissector.',
    type: 'website'
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const initialLang = cookieStore.get('verilens_lang')?.value || 'en';

  return (
    <html lang={initialLang} className={sansFont.variable}>
      <body className={sansFont.className}>
        <I18nProvider initialLang={initialLang}>
          <Navbar />

          <main>{children}</main>

        <footer className="app-footer">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-col">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <img
                    src="/logo.png"
                    alt="VeriLens Logo"
                    style={{ height: '24px', width: 'auto', display: 'block' }}
                  />
                  <strong style={{ color: 'var(--text-main)', fontSize: '15px', fontWeight: '800', letterSpacing: '-0.02em' }}>VeriLens Platform</strong>
                </div>
                <p style={{ lineHeight: '1.55', color: 'var(--text-secondary)', fontSize: '12.5px' }}>
                  An open-access media & information literacy ecosystem combining gamified cognitive conditioning with real-time browser protection. Built for the <strong>UNESCO Global MIL Youth Hackathon 2026</strong>.
                </p>
              </div>

              <div className="footer-col">
                <h4>Training Games</h4>
                <ul>
                  <li><Link href="/">Cognitive Bias Codex</Link></li>
                  <li><Link href="/arena">Bias Spotter Arena</Link></li>
                  <li><Link href="/gauntlet">Daily 60s Gauntlet</Link></li>
                  <li><Link href="/forge">The Fallacy Forge</Link></li>
                  <li><Link href="/feed">Feed Simulator</Link></li>
                  <li><Link href="/duel">1v1 Cognitive Duel</Link></li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>Progression & Ranks</h4>
                <ul>
                  <li><Link href="/skills">Metacognition Skill Tree</Link></li>
                  <li><Link href="/leaderboard">Global League Ladder</Link></li>
                  <li><Link href="/profile">Cognitive Trophy Room</Link></li>
                  <li><Link href="/classroom">Classroom Showdown</Link></li>
                  <li><Link href="/sandbox">Live Article Sandbox</Link></li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>Ecosystem</h4>
                <ul>
                  <li><Link href="/educator">Educator Guide & Lesson Plans</Link></li>
                  <li><Link href="/extension">Chrome Extension (MV3)</Link></li>
                  <li><Link href="/privacy">Privacy & Security Architecture</Link></li>
                  <li><a href="https://github.com/okihita/verilens" target="_blank" rel="noopener noreferrer">GitHub Repository</a></li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom">
              <span>2026 VeriLens Project • Developed for UNESCO Global MIL Youth Hackathon</span>
              <span>Open Source • Privacy-First Local Processing</span>
            </div>
          </div>
        </footer>
        </I18nProvider>
      </body>
    </html>
  );
}
