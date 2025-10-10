import "../global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { NavParent } from "./components/nav-parent";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "../sitemap";
import logo from "assets/rango3.svg";
// import background from "assets/iStock-2163734002-2.svg";
import openGraphRango from "assets/open-graph-rango.png";
import { SearchProvider } from "app/context/SearchContext";
// import ScreenSizeWarning from "./components/screensizeWarning";
import background from "assets/rangobg3.svg";
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
      className={cx("text-black", GeistSans.variable, GeistMono.variable)}
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // This keeps the background fixed while scrolling
      }}
    >
      {/* <ScreenSizeWarning /> */}
      <body className="antialiased flex h-dvh ">
        <SearchProvider>
          <div className="grid grid-cols-4 md:grid-rows-[70px_1fr] grid-rows-[1fr_70px] grow">
            <>
              {/* Desktop / tablet: Navbar stuck to top */}
              <NavParent />

              {/* Spacer so page content isn't hidden behind the fixed mobile nav */}
              {/* <div className="col-span-4 md:block hidden h-16" aria-hidden /> */}
            </>

            <main className="col-span-4 flex">
              {children}

              {/* No idea what these two components show... so just gonna leave them there for a second */}
              <Analytics />
              <SpeedInsights />
            </main>

            <footer className="md:block hidden col-span-4 bg-white border-t-1 border-solid border-gray-200">
              <Footer />
            </footer>

            <div className="col-span-4 md:hidden h-[70px]" aria-hidden />
          </div>
        </SearchProvider>
      </body>
    </html>
  );
}
