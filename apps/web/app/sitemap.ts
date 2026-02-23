import { MetadataRoute } from "next";
import { resume } from "@/data/resume";

const BASE_URL = process.env.NEXT_BASE_URL || 'https://mohammad-khayata.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const lastModified = new Date();

    return [
        {
            url: `${BASE_URL}/en/`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${BASE_URL}/en/portfolio`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/en/contact`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/ar/`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/ar/portfolio`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/ar/contact`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ];
}