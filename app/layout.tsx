import type { Metadata } from 'next';
import Link from 'next/link';
import { Merriweather, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Merriweather({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: '300',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TranslationAlign',
  description:
    'Translate texts into different languages using LLMs and compare them with respect to different criteria',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex h-screen">
          {/* Sidebar */}
          <nav className="w-64 flex flex-col font-[family-name:var(--font-geist-sans)]">
            <div className="p-4 border-b border-gray-700">
              <Link href="/" className="block">
                <img src="/logo.svg" alt="TransLingoPath Logo" className="h-16 mx-auto" />
              </Link>
            </div>
            <ul className="flex-grow space-y-2 p-4">
              <li>
                <Link href="/about" className="block p-2 rounded hover:bg-gray-700 transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="block p-2 rounded hover:bg-gray-700 transition">
                  Contact
                </Link>
              </li>
            </ul>
            <div className="p-4 border-t border-gray-700">
              <p className="text-sm text-gray-400">© 2024 Michael Günther</p>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-grow p-6 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
