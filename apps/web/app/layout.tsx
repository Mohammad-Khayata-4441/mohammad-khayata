import "./globals.css";
import type { Metadata } from "next";
import { resume } from "@/data/resume";
import { generatePageMetadata, generateStructuredData } from "@/shared/lib/metaData";

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: "",
    description: resume.seo.description,
    type: "website",
  }),
  title: {
    default: resume.seo.title,
    template: `%s | ${resume.contact.name}`,
  },
  metadataBase: new URL(
    process.env.NEXT_BASE_URL || "https://mohammad-khayata.vercel.app"
  ),
  verification: {
    google: "google-verification-code", // Add your Google verification code
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = generateStructuredData("website");

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
