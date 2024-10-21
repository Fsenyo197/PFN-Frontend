import "./globals.css";
import { Inter } from "next/font/google";
import GoogleAnalytics from "../components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Prop Firm News",
  description: "Your source for the latest Prop News, Payouts, Trading Rules, and Prop Firms insights.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
