import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Prop Firm News",
  description:
    "Your source for the latest Prop News, Payouts, Trading Rules, and Prop Firms insights.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
      </head>
      <body className={inter.className}>{children}</body>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-VY860BFJKF"
      />
      <Script id="gtag">
        {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VY860BFJKF');`}
      </Script>
    </html>
  );
}
