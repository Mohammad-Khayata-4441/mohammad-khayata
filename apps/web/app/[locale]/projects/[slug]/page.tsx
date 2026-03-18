import { notFound } from "next/navigation";
import { projectsService, type Project } from "@/services/projects";
import ProjectDetail from "./ProjectDetail";
import type { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

async function getProject(slug: string): Promise<Project | null> {
  return projectsService.getByField<Project>("slug", slug, {
    populate: {
      cover: { fields: ["url", "width", "height", "alternativeText"] },
      media: { fields: ["url", "width", "height", "alternativeText"] },
      technologies: {
        fields: ["name", "documentId"],
        populate: { logo: { fields: ["url", "width", "height"] } },
      },
      skills: { fields: ["title", "description"] },
      categories: { fields: ["title", "slug"] },
      experience: {
        fields: ["jobTitle", "company", "startDate", "endDate"],
      },
      seo: { populate: "*" },
      openGraph: { populate: "*" },
    },
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return notFound();
  return <ProjectDetail project={project} />;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project Not Found" };

  const seo = project.seo as
    | { metaTitle?: string; metaDescription?: string }
    | undefined;

  return {
    title: seo?.metaTitle || project.title || "Project Details",
    description:
      seo?.metaDescription ||
      (typeof project.overview === "string"
        ? project.overview.slice(0, 160)
        : "Project details and implementation showcase."),
  };
}