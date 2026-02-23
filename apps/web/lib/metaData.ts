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

const BASE_URL = process.env.NEXT_BASE_URL || 'https://mohammad-khayata.vercel.app';
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
