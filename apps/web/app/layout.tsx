import "./globals.css";
import type { Metadata } from "next";
import { resume } from "@/data/resume";
import {
  generateMetadataFromAbout,
  generateStructuredDataFromAbout,
  generateStructuredData,
} from "@/shared/lib/metaData";
import { getAbout } from "@/services/home";
import { cache } from "react";

const BASE_URL =
  process.env.NEXT_BASE_URL || "https://mohammad-khayata.vercel.app";

// Deduplicate across generateMetadata + RootLayout within the same render
const getCachedAbout = cache(getAbout);

export async function generateMetadata(): Promise<Metadata> {
  const metadataBase = new URL(BASE_URL);

  try {
    const { data: about } = await getCachedAbout();
    return {
      ...generateMetadataFromAbout(about),
      metadataBase,
      verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
      },
    };
  } catch {
    // Fallback to static metadata when CMS is unavailable
    return {
      metadataBase,
      title: { default: resume.seo.title, template: `%s | ${resume.contact.name}` },
      description: resume.seo.description,
      keywords: resume.seo.keywords.join(", "),
    };
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let structuredData: object;

  try {
    const { data: about } = await getCachedAbout();
    structuredData = generateStructuredDataFromAbout(about);
  } catch {
    structuredData = generateStructuredData("website");
  }

  return (
    <html>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

