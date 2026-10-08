import type { Metadata } from "next";
import Image from "next/image";
import type { ComponentType } from "react";
import { cache } from "react";
import type { IconType } from "react-icons";
import {
  BsDiscord,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLink45Deg,
  BsLinkedin,
  BsReddit,
  BsTelegram,
  BsTwitterX,
  BsWhatsapp,
  BsYoutube,
} from "react-icons/bs";
import { ArrowUpRight, BriefcaseBusiness, FileText, Phone } from "lucide-react";
import { Link } from "@/i18n";
import { generatePageMetadata } from "@/shared/lib/metaData";
import { getAbout } from "@/services/home";

const getCachedAbout = cache(getAbout);

/** Static copies used only when the About API omits the field. */
const FALLBACK_NAME = "Mohammad Khayata";
const FALLBACK_OVERVIEW =
  "Building fast, scalable digital experiences with React, Vue, and Next.js.";
const FALLBACK_RESUME_URL =
  "https://docs.google.com/document/d/1oyzw0rlFsEl9nspx99wPJ1jlOqGsZaQ1jd69LmDQqo0/edit?usp=sharing";
const FALLBACK_PHONE = "+963956954441";
const PORTRAIT_SRC = "/assets/portrait-5.png";
const FALLBACK_LINKS = {
  linkedin: "https://www.linkedin.com/in/mohammad-khayata-9169801a9",
  github: "https://github.com/Mohammad-Khayata-4441",
  instagram: "https://www.instagram.com/mohammad_khayat4441/",
  telegram: "https://t.me/Mohammadkh4441",
  whatsapp: "https://wa.me/963956954441",
} as const;

const SOCIAL_ICONS: Record<string, IconType> = {
  facebook: BsFacebook,
  instagram: BsInstagram,
  linkedin: BsLinkedin,
  whatsapp: BsWhatsapp,
  github: BsGithub,
  telegram: BsTelegram,
  youtube: BsYoutube,
  reddit: BsReddit,
  discord: BsDiscord,
  x: BsTwitterX,
  twitter: BsTwitterX,
};

type Glyph = ComponentType<{ className?: string }>;

type SocialLink = {
  title?: string | null;
  url?: string | null;
  type?: string | null;
};

type LinkRow = {
  key: string;
  label: string;
  description: string;
  href: string;
  external: boolean;
  icon: Glyph;
  primary?: boolean;
};

function isResumeLink(link: SocialLink) {
  const title = link.title ?? "";
  const url = link.url ?? "";
  return /resume|curriculum|\bcv\b/i.test(title) || /resume|\bcv\b/i.test(url);
}

function findByType(links: SocialLink[], type: string) {
  return links.find((link) => link.type === type && link.url);
}

function normalizePhone(phone?: string | null) {
  const compact = (phone?.trim() || FALLBACK_PHONE).replace(/[^\d+]/g, "");
  return compact.startsWith("+") ? compact : `+${compact}`;
}

function formatPhone(phone: string) {
  const match = phone.match(/^\+(\d{3})(\d{3})(\d{3})(\d{3})$/);
  if (!match) return phone;
  return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
}

function addRow(rows: LinkRow[], usedUrls: Set<string>, usedTypes: Set<string>, row: LinkRow, type?: string) {
  rows.push(row);
  usedUrls.add(row.href);
  if (type) usedTypes.add(type);
}

function buildRows(links: SocialLink[], phone?: string | null): LinkRow[] {
  const rows: LinkRow[] = [];
  const usedUrls = new Set<string>();
  const usedTypes = new Set<string>();
  const dial = normalizePhone(phone);

  addRow(rows, usedUrls, usedTypes, {
    key: "call",
    label: "Call",
    description: formatPhone(dial),
    href: `tel:${dial}`,
    external: true,
    icon: Phone,
  });

  const linkedin = findByType(links, "linkedin");
  addRow(
    rows,
    usedUrls,
    usedTypes,
    {
      key: "linkedin",
      label: linkedin?.title?.trim() || "LinkedIn",
      description: "Let's connect professionally",
      href: linkedin?.url || FALLBACK_LINKS.linkedin,
      external: true,
      icon: BsLinkedin,
    },
    "linkedin"
  );

  const github = findByType(links, "github");
  addRow(
    rows,
    usedUrls,
    usedTypes,
    {
      key: "github",
      label: github?.title?.trim() || "GitHub",
      description: "Code and projects",
      href: github?.url || FALLBACK_LINKS.github,
      external: true,
      icon: BsGithub,
    },
    "github"
  );

  const resume = links.find((link) => link.url && isResumeLink(link));
  addRow(rows, usedUrls, usedTypes, {
    key: "resume",
    label: "Resume",
    description: "Experience and skills",
    href: resume?.url || FALLBACK_RESUME_URL,
    external: true,
    icon: FileText,
  });

  addRow(rows, usedUrls, usedTypes, {
    key: "portfolio",
    label: "Portfolio",
    description: "Explore selected work",
    href: "/portfolio",
    external: false,
    icon: BriefcaseBusiness,
    primary: true,
  });

  for (const link of links) {
    if (!link.url || usedUrls.has(link.url) || (link.type && usedTypes.has(link.type))) continue;
    const Icon = SOCIAL_ICONS[link.type ?? ""] ?? BsLink45Deg;
    addRow(
      rows,
      usedUrls,
      usedTypes,
      {
        key: `${link.type}-${link.url}`,
        label: link.title?.trim() || link.type || "Link",
        description: "Social profile",
        href: link.url,
        external: true,
        icon: Icon,
      },
      link.type ?? undefined
    );
  }

  const extraSocials: Array<{ type: string; label: string; description: string; href: string; icon: Glyph }> = [
    { type: "instagram", label: "Instagram", description: "Social profile", href: FALLBACK_LINKS.instagram, icon: BsInstagram },
    { type: "telegram", label: "Telegram", description: "Social profile", href: FALLBACK_LINKS.telegram, icon: BsTelegram },
    { type: "whatsapp", label: "WhatsApp", description: "Start a conversation", href: FALLBACK_LINKS.whatsapp, icon: BsWhatsapp },
  ];

  for (const social of extraSocials) {
    if (usedTypes.has(social.type) || usedUrls.has(social.href)) continue;
    addRow(
      rows,
      usedUrls,
      usedTypes,
      {
        key: social.type,
        label: social.label,
        description: social.description,
        href: social.href,
        external: true,
        icon: social.icon,
      },
      social.type
    );
  }

  return rows;
}

function RowLink({ label, description, href, external, icon: Icon, primary }: LinkRow) {
  const className = primary
    ? "group flex min-h-18 items-center gap-4 rounded-2xl border border-primary/45 bg-primary px-4 py-3.5 text-primary-foreground shadow-[0_12px_30px_rgba(232,87,61,0.16)] transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] active:scale-[0.98]"
    : "group flex min-h-18 items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3.5 transition-colors duration-200 hover:border-primary/45 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.98]";

  const content = (
    <>
      <span
        className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
          primary ? "bg-black/15" : "bg-primary/10 text-primary"
        }`}
      >
        <Icon className="size-5" />
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className={`block text-[15px] font-semibold ${primary ? "" : "text-white"}`}>
          {label}
        </span>
        <span className={`mt-0.5 block truncate text-xs ${primary ? "text-primary-foreground/70" : "text-white/45"}`}>
          {description}
        </span>
      </span>
      <ArrowUpRight
        className={`size-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
          primary ? "" : "text-white/35 group-hover:text-white"
        }`}
      />
    </>
  );

  if (external) {
    const opensNewTab = href.startsWith("http://") || href.startsWith("https://");
    return (
      <a
        href={href}
        {...(opensNewTab ? { target: "_blank", rel: "noreferrer" } : {})}
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { data } = await getCachedAbout();
    return generatePageMetadata({
      title: data?.fullName || FALLBACK_NAME,
      description: data?.overview || data?.seo?.metaDescription || FALLBACK_OVERVIEW,
      slug: "profile",
      type: "profile",
    });
  } catch {
    return generatePageMetadata({
      title: FALLBACK_NAME,
      description: FALLBACK_OVERVIEW,
      slug: "profile",
      type: "profile",
    });
  }
}

export default async function ProfilePage() {
  let fullName = FALLBACK_NAME;
  let overview = FALLBACK_OVERVIEW;
  let rows = buildRows([]);

  try {
    const { data } = await getCachedAbout();
    fullName = data?.fullName?.trim() || FALLBACK_NAME;
    overview = data?.overview?.trim() || FALLBACK_OVERVIEW;
    rows = buildRows((data?.socialLinks ?? []) as SocialLink[], data?.phoneNumber);
  } catch {
    fullName = FALLBACK_NAME;
    overview = FALLBACK_OVERVIEW;
    rows = buildRows([]);
  }

  return (
    <main className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#050505] px-4 py-8 text-white sm:px-6 sm:py-12">
      <div className="pointer-events-none absolute -left-24 top-1/4 size-72 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 size-80 rounded-full bg-primary/8 blur-[140px]" />

      <section className="relative w-full max-w-[430px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a] px-5 py-7 shadow-2xl shadow-black/40 sm:px-8 sm:py-9">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent" />

        <div className="flex flex-col items-center text-center">
          <a
            href={PORTRAIT_SRC}
            target="_blank"
            rel="noreferrer"
            aria-label={`View photo of ${fullName}`}
            className="relative mb-5 block rounded-full outline-none transition-transform duration-200 hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          >
            <div className="absolute -inset-2 rounded-full border border-primary/20" />
            <Image
              src={PORTRAIT_SRC}
              alt=""
              width={830}
              height={1069}
              priority
              className="relative size-32 rounded-full border-2 border-primary/70 object-cover object-[center_18%] p-1"
            />
          </a>

          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-[34px]">
            {fullName}
          </h1>
          {overview ? (
            <p className="mt-3 max-w-[320px] text-sm leading-6 text-white/55">{overview}</p>
          ) : null}
        </div>

        <div className="mt-8 grid gap-3">
          {rows.map(({ key, ...row }) => (
            <RowLink key={key} {...row} />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-[11px] tracking-wide text-white/30">
          <span className="size-1.5 rounded-full bg-primary" />
          <span>mohammad-khayata.sy</span>
        </div>
      </section>
    </main>
  );
}
