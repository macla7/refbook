import "../global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "../sitemap";
import logo from "assets/rango3.svg";
import background from "assets/iStock-2163734002-2.svg";
import openGraphRango from "assets/open-graph-rango.png";
import { SearchProvider } from "app/context/SearchContext";
import ScreenSizeWarning from "./components/screensizeWarning";

import "app/config";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Rango",
    template: "%s | Rango",
  },
  description: "Wrangle your references",
  openGraph: {
    title: "Rango | Wrangle your references",
    description: "Say something nice",
    url: baseUrl,
    siteName: "My Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `https://www.rango.com.au/images/open-graph-rango.png`,
        width: 1200,
        height: 630,
        alt: "Rango – Wrangle your references",
      },
    ],
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
        " bg-ourCream text-black ",
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <ScreenSizeWarning />
      <body className="antialiased flex h-dvh ">
        <SearchProvider>
          <div className="grid grid-cols-4 grid-rows-[70px_1fr] grow">
            <nav className="col-span-4 h-full bg-white border-1 border-solid border-gray-200">
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
        </SearchProvider>
      </body>
    </html>
  );
}
