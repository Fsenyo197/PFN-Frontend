import './globals.css';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Prop Firm News',
  description:
    'Your source for the latest Prop News, Payouts, Trading Rules, Prop Firms insights and prop firm compare platforms.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
      </head>
      <body className={inter.className}>{children}</body>
      <GoogleAnalytics gaId="G-VY860BFJKF" />
    </html>
  );
}
