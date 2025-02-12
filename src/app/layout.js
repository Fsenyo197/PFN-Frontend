import './globals.css';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: 'Prop Firm News',
    url: 'https://propfirmnews.live',
    description:
      'Your source for the latest Prop News, Payouts, Trading Rules, and Prop Firm insights.',
    publisher: {
      '@type': 'Organization',
      name: 'Prop Firm News',
    },
  };

  return (
    <html lang="en">
      <head>
        {/* Title & Meta Tags */}
        <title>Prop Firm News | Compare Prop Firms</title>
        <meta
          name="description"
          content="Stay updated with the latest prop trading news, firm comparisons, payouts, and rules."
        />
        <meta property="og:title" content="Prop Firm News" />
        <meta
          property="og:description"
          content="The best site for prop firm comparisons and news."
        />
        <meta property="og:url" content="https://propfirmnews.live" />

        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
      <GoogleAnalytics gaId="G-VY860BFJKF" />
    </html>
  );
}
