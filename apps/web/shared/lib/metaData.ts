// lib/metadata.ts
export interface PageMetadataOptions {
    title?: string;
    description?: string;
    slug?: string; // e.g. 'projects' or 'about'
    keywords?: string[];
    image?: string;
    type?: 'website' | 'article' | 'profile';
}
import type { Metadata } from 'next';
import { resume } from '@/data/resume';
import type { AboutData } from '@/services/home';

// ── Lightweight wrappers for CMS component shapes ─────────────────────────────

interface SeoComponent {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
    metaRobots?: string;
    canonicalURL?: string;
    structuredData?: unknown;
    metaImage?: { url?: string };
    openGraph?: OpenGraphComponent;
}

interface OpenGraphComponent {
    ogTitle?: string;
    ogDescription?: string;
    ogUrl?: string;
    ogType?: string;
    ogImage?: { url?: string };
}

interface SocialLinkComponent {
    title?: string;
    url?: string;
    type?: string;
}

const BASE_URL = (process.env.NEXT_BASE_URL || 'https://mohammad-khayata.sy').replace(/[;/]+$/, '');
const DEFAULT_TITLE = resume.seo.title;
const DEFAULT_DESCRIPTION = resume.seo.description;
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;
const DEFAULT_KEYWORDS = resume.seo.keywords;

export function generatePageMetadata({
    title,
    description,
    slug = '',
    keywords = [],
    image,
    type = 'website'
}: PageMetadataOptions): Metadata {
    const fullTitle = title ? `${title} | ${resume.contact.name}` : DEFAULT_TITLE;
    const fullDescription = description || DEFAULT_DESCRIPTION;
    const url = `${BASE_URL}/${slug}`;
    const ogImage = image || DEFAULT_IMAGE;
    const allKeywords = [...DEFAULT_KEYWORDS, ...keywords];

    return {
        title: fullTitle,
        description: fullDescription,
        keywords: allKeywords.join(', '),
        authors: [{ name: resume.contact.name, url: resume.contact.website }],
        creator: resume.contact.name,
        publisher: resume.contact.name,
        applicationName: 'Mohammad Khayata Portfolio',
        generator: 'Next.js',
        referrer: 'origin-when-cross-origin',
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: fullTitle,
            description: fullDescription,
            url,
            siteName: resume.contact.name,
            locale: 'en_US',
            type: type as any,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: `${resume.contact.name} - Frontend Developer Portfolio`,
                }
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description: fullDescription,
            images: [ogImage],
            creator: '@mohammad_khayata',
        },
        robots: {
            index: true,
            follow: true,
            nocache: false,
            googleBot: {
                index: true,
                follow: true,
                noimageindex: false,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

// Generate structured data (JSON-LD) for better SEO
export function generateStructuredData(type: 'person' | 'website' | 'portfolio' = 'person') {
    const baseStructuredData = {
        '@context': 'https://schema.org',
        '@type': type === 'person' ? 'Person' : type === 'website' ? 'WebSite' : 'CreativeWork',
        name: resume.contact.name,
        url: resume.contact.website,
        email: resume.contact.email,
        jobTitle: 'Frontend Developer',
        description: resume.seo.description,
        knowsAbout: resume.seo.expertise,
        skills: [
            ...resume.skills.frontend,
            ...resume.skills.backend,
            ...resume.skills.devops
        ],
        worksFor: resume.experience.map(exp => ({
            '@type': 'Organization',
            name: exp.company,
            startDate: `${exp.startYear}`,
            endDate: exp.endYear === 'Present' || exp.endYear === 'Now' ? new Date().getFullYear().toString() : exp.endYear?.toString(),
        })),
        address: {
            '@type': 'PostalAddress',
            addressCountry: resume.contact.location
        },
        sameAs: [
            resume.contact.linkedin,
            resume.contact.github,
            resume.contact.website
        ].filter(Boolean)
    };

    if (type === 'website') {
        return {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: `${resume.contact.name} Portfolio`,
            url: resume.contact.website,
            description: resume.seo.description,
            author: {
                '@type': 'Person',
                name: resume.contact.name,
                jobTitle: 'Frontend Developer',
                email: resume.contact.email
            },
            potentialAction: {
                '@type': 'SearchAction',
                target: `${resume.contact.website}/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string'
            }
        };
    }

    return baseStructuredData;
}

// ─────────────────────────────────────────────────────────────────────────────
// Backend-driven metadata — built from the About CMS entry
// ─────────────────────────────────────────────────────────────────────────────

function strapiUrl(path?: string): string | undefined {
    if (!path) return undefined;
    const base = (process.env.NEXT_PUBLIC_STRAPI_URL ?? '').replace(/\/$/, '');
    return path.startsWith('http') ? path : `${base}${path}`;
}

export function generateMetadataFromAbout(about: AboutData): Metadata {
    const seo = about?.seo as SeoComponent | undefined;
    const ogCms = (seo?.openGraph ?? about?.openGraph) as OpenGraphComponent | undefined;
    const socialLinks = (about?.socialLinks ?? []) as SocialLinkComponent[];

    const siteName = about?.fullName ?? resume.contact.name;
    const title = seo?.metaTitle ?? DEFAULT_TITLE;
    const description = seo?.metaDescription ?? DEFAULT_DESCRIPTION;

    const keywords = seo?.keywords
        ? seo.keywords.split(',').map((k) => k.trim()).filter(Boolean)
        : DEFAULT_KEYWORDS;

    const canonicalUrl = seo?.canonicalURL ?? BASE_URL;

    // Resolve images (Strapi relative paths → absolute URLs, fall back to static asset)
    const metaImageUrl = strapiUrl(seo?.metaImage?.url) ?? DEFAULT_IMAGE;
    const ogImageUrl = strapiUrl(ogCms?.ogImage?.url) ?? metaImageUrl;

    const ogTitle = ogCms?.ogTitle ?? title;
    const ogDescription = ogCms?.ogDescription ?? description;
    const ogUrl = ogCms?.ogUrl ?? canonicalUrl;
    const ogType = (ogCms?.ogType ?? 'website') as 'website' | 'article' | 'profile';

    // Derive Twitter creator handle from socialLinks (x or twitter type)
    const twitterLink = socialLinks.find((l) => l.type === 'x' || l.type === 'twitter');
    const twitterHandle = twitterLink?.url
        ? `@${twitterLink.url.split('/').filter(Boolean).pop()}`
        : '@mohammad_khayata';

    // Build robots directive from CMS metaRobots string (e.g. "index, follow")
    const robotsStr = seo?.metaRobots ?? 'index, follow';
    const noIndex = robotsStr.includes('noindex');
    const noFollow = robotsStr.includes('nofollow');

    return {
        title: {
            default: title,
            template: `%s | ${siteName}`,
        },
        description,
        keywords: keywords.join(', '),
        authors: [{ name: siteName, url: resume.contact.website }],
        creator: siteName,
        publisher: siteName,
        applicationName: `${siteName} Portfolio`,
        generator: 'Next.js',
        referrer: 'origin-when-cross-origin',
        formatDetection: { email: false, address: false, telephone: false },
        alternates: { canonical: canonicalUrl },
        openGraph: {
            title: ogTitle,
            description: ogDescription,
            url: ogUrl,
            siteName,
            locale: 'en_US',
            type: ogType,
            images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `${siteName} - Portfolio` }],
        },
        twitter: {
            card: 'summary_large_image',
            title: ogTitle,
            description: ogDescription,
            images: [ogImageUrl],
            creator: twitterHandle,
        },
        robots: {
            index: !noIndex,
            follow: !noFollow,
            nocache: false,
            googleBot: {
                index: !noIndex,
                follow: !noFollow,
                noimageindex: false,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// Backend-driven JSON-LD — built from the About CMS entry
// ─────────────────────────────────────────────────────────────────────────────

export function generateStructuredDataFromAbout(about: AboutData) {
    const siteName = about?.fullName ?? resume.contact.name;
    const socialLinks = (about?.socialLinks ?? []) as SocialLinkComponent[];
    const sameAs = socialLinks.map((l) => l.url).filter(Boolean);

    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: `${siteName} Portfolio`,
        url: BASE_URL,
        description: (about?.seo as SeoComponent | undefined)?.metaDescription ?? resume.seo.description,
        author: {
            '@type': 'Person',
            name: siteName,
            jobTitle: 'Frontend Developer',
            email: about?.email ?? resume.contact.email,
            sameAs,
        },
        potentialAction: {
            '@type': 'SearchAction',
            target: `${BASE_URL}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
        },
    };
}
