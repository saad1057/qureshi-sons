import type { Metadata, Viewport } from "next";
import { Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { company } from "@/lib/data";
import { siteUrl } from "@/lib/seo";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { PageTransitionProvider } from "@/components/layout/PageTransition";
import Preloader from "@/components/layout/Preloader";
import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/layout/Footer";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const sans = localFont({
  src: [
    { path: "./fonts/GeneralSans-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/GeneralSans-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/GeneralSans-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-general",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  title: {
    default: "Qureshi Sons — Importers of fine sanitaryware, Lahore",
    template: "%s — Qureshi Sons",
  },
  description:
    "Faucets, rain showers, basins, WCs and bathtubs from the world’s finest makers. Visit the Qureshi Sons showroom at Galaxy Shopping Center, Ferozpur Road, Lahore.",
  keywords: [
    "sanitaryware Lahore",
    "bathroom fittings Lahore",
    "shower panels",
    "faucets",
    "Ferozpur Road",
    "Qureshi Sons",
  ],
  openGraph: {
    type: "website",
    siteName: "Qureshi Sons",
    locale: "en_PK",
    images: [{ url: "/media/hero-poster.jpg", width: 1600, height: 900, alt: "Water pouring from a chrome mixer" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#1a1917",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeGoodsStore",
  name: company.name,
  description: company.category,
  url: siteUrl,
  telephone: company.phoneE164,
  image: `${siteUrl}/media/hero-poster.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${company.street}, Galaxy Shopping Center, Fazlia Colony`,
    addressLocality: company.locality,
    addressRegion: company.region,
    postalCode: company.postalCode,
    addressCountry: company.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: company.geo.lat, longitude: company.geo.lng },
  hasMap: company.mapsUrl,
  areaServed: { "@type": "Country", name: "Pakistan" },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:30",
      closes: "20:45",
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} antialiased`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <SmoothScroll />
        <PageTransitionProvider>
          <Preloader />
          <SiteHeader />
          <main>{children}</main>
          <Footer />
        </PageTransitionProvider>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
