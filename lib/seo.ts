import type { Metadata } from "next";

export const siteUrl = "https://qureshisons.pk";

const defaultImage = { url: "/media/hero-poster.jpg", width: 1600, height: 900, alt: "Water pouring from a chrome mixer" };

export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; alt: string };
}): Metadata {
  const images = [image ?? defaultImage];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Qureshi Sons",
      locale: "en_PK",
      title: `${title} — Qureshi Sons`,
      description,
      url: path,
      images,
    },
    twitter: { card: "summary_large_image", title: `${title} — Qureshi Sons`, description },
  };
}
