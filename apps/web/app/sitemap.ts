import { MetadataRoute } from "next";
import { projectsService } from "@/services/projects";
import type { DevToPost } from "@/app/[locale]/blog/types";

const BASE_URL =
  process.env.NEXT_BASE_URL || "https://mohammad-khayata.vercel.app";

const LOCALES = ["en", "ar"] as const;

/** Build one sitemap entry per locale for a static route. */
function staticRoute(
  path: string,
  options: {
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
    lastModified?: Date;
  }
): MetadataRoute.Sitemap {
  const lastModified = options.lastModified ?? new Date();
  return LOCALES.map((locale, i) => ({
    url: `${BASE_URL}/${locale}${path}`,
    lastModified,
    changeFrequency: options.changeFrequency,
    // Slightly lower priority for secondary locale
    priority: i === 0 ? options.priority : Math.max(options.priority - 0.1, 0.1),
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ── Static routes ───────────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    ...staticRoute("/", { changeFrequency: "monthly", priority: 1.0 }),
    ...staticRoute("/portfolio", { changeFrequency: "weekly", priority: 0.9 }),
    ...staticRoute("/projects", { changeFrequency: "weekly", priority: 0.85 }),
    ...staticRoute("/blog", { changeFrequency: "weekly", priority: 0.8 }),
    ...staticRoute("/experience", { changeFrequency: "monthly", priority: 0.75 }),
    ...staticRoute("/contact", { changeFrequency: "monthly", priority: 0.7 }),
  ];

  // ── Dynamic: projects from CMS ──────────────────────────────────────────────
  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const { data: projects } = await projectsService.getCollection<{ slug?: string; updatedAt?: string }>({
      fields: ["slug", "updatedAt"],
      pagination: { limit: 200 },
    });

    projectRoutes = (projects ?? [])
      .filter((p) => p.slug)
      .flatMap((p) =>
        LOCALES.map((locale, i) => ({
          url: `${BASE_URL}/${locale}/projects/${p.slug}`,
          lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
          changeFrequency: "weekly" as const,
          priority: i === 0 ? 0.8 : 0.7,
        }))
      );
  } catch {
    // CMS unavailable — omit project detail pages from sitemap gracefully
  }

  // ── Dynamic: blog posts from dev.to ────────────────────────────────────────
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const DEV_TO_ENDPOINT = `https://dev.to/api/articles?username=mohammad_kh4441&per_page=100`;
    const res = await fetch(DEV_TO_ENDPOINT, { next: { revalidate: 3600 } });
    if (res.ok) {
      const posts: DevToPost[] = await res.json();
      // Blog posts live on dev.to — include canonical URLs for reference
      blogRoutes = posts.map((post) => ({
        url: post.canonical_url || post.url,
        lastModified: post.edited_at
          ? new Date(post.edited_at)
          : new Date(post.published_at),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }));
    }
  } catch {
    // dev.to unreachable — skip blog entries gracefully
  }

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
