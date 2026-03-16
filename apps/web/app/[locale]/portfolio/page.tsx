import React from "react";
import { NextPage } from "next";
import { resume } from "@/data/resume";
import { generatePageMetadata } from "@/shared/lib/metaData";
import { getPortfolio } from "@/services/portfolio";
import HorizontalScroll from "./HorizontalScroll";

export const metadata = generatePageMetadata({
  title: "Portfolio",
  description: `Explore ${resume.seo.projectsCompleted}+ professional projects by ${resume.contact.name}. Featuring enterprise applications, e-commerce platforms, ERP systems, and modern web solutions built with React.js, Vue.js, Next.js, and cutting-edge technologies.`,
  slug: "portfolio",
  keywords: [
    "Portfolio Projects",
    "Enterprise Applications",
    "E-commerce Development",
    "ERP Systems",
    "React Projects",
    "Vue Projects",
    "Next.js Applications",
    "Professional Work",
    "Web Development Portfolio",
  ],
  type: "website",
});

const page: NextPage = async () => {
  const portfolio = await getPortfolio();
  const projects = portfolio.data.projects;

  return (
    <div className="portfolio-page relative z-0 page">
      {projects && projects.length > 0 ? (
        <HorizontalScroll projects={projects} />
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center section-aurora  p-8 md:p-10">
            <h2 className="text-2xl font-semibold text-foreground headline-glow">
              Projects Loading...
            </h2>
            <p className="text-muted-soft mt-2">
              Please check back in a moment.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
