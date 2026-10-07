import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, permanentRedirect } from "@/i18n";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: "Redirecting",
};

/**
 * QR codes point here. The profile itself lives at /profile so the code
 * stays a stable redirect and the page can change without reprinting codes.
 */
export default async function QrPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  permanentRedirect({
    href: "/profile",
    locale: locale as (typeof locales)[number],
  });
}
