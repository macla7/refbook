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
        "text-black bg-white text-black bg-stone-100",
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased mx-12 py-8 flex h-dvh">
        <div className="grid grid-cols-4 grid-rows-[100px_1fr] gap-4 grow">
          <nav className="col-span-4 bg-sky-950 h-24">
            <Navbar />
          </nav>

          <main className="col-span-3 bg-yellow-200">
            {children}

            {/* No idea what these two components show... so just gonna leave them there for a second */}
            <Analytics />
            <SpeedInsights />
          </main>
          <aside className="bg-sky-950">
            <p>where the user sidebar thingo will go...</p>
          </aside>

          {/* 
          <footer className="col-span-4">
            <Footer />
          </footer> */}
        </div>
      </body>
    </html>
  );
}
