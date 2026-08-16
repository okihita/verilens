import './globals.css';
import Link from 'next/link';
import { cookies } from 'next/headers';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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
    siteName: 'VeriLens Platform',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VeriLens — AI Cognitive Shield',
    description: 'Master critical thinking, identify cognitive biases, and dissect misinformation in real-time.'
  }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const initialLang = cookieStore.get('verilens_lang')?.value || 'en';

  return (
    <html lang={initialLang} className={sansFont.variable}>
      <body className={sansFont.className}>
        <I18nProvider initialLang={initialLang}>
          <Navbar />

          <main>{children}</main>

          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
