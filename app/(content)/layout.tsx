import "../global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "../sitemap";
import "app/config";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Next.js Portfolio Starter",
    template: "%s | Next.js Portfolio Starter",
  },
  description: "This is my portfolio.",
  openGraph: {
    title: "My babbyyy",
    description: "This is my portfolio.",
    url: baseUrl,
    siteName: "My Portfolio",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        "text-black bg-ourCream text-black ",
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased  flex h-dvh ">
        <div className="grid grid-cols-4 grid-rows-[70px_1fr] grow">
          <nav className="col-span-4 h-24 h-full bg-ourCream border-1 border-solid border-gray-200">
            <Navbar />
          </nav>

          <main className="col-span-4 flex">
            {children}

            {/* No idea what these two components show... so just gonna leave them there for a second */}
            <Analytics />
            <SpeedInsights />
          </main>

          {/* 
          <footer className="col-span-4">
            <Footer />
          </footer> */}
        </div>
      </body>
    </html>
  );
}
