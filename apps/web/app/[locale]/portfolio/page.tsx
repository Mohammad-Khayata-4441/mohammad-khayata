import React from "react";
import { NextPage } from "next";
import { resume } from "@/data/resume";
import { generatePageMetadata } from "@/shared/lib/metaData";
import { getPortfolio } from "@/services/portfolio";
import { Spotlight } from "@/app/components/Spotlight";
import Animator from "@/app/components/Animator";
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
    <div className="portfolio-page relative z-0 page overflow-hidden">
      {/* Spotlight effect — matching hero */}
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="rgba(232, 87, 61, 0.18)"
        fill2="rgba(255, 107, 53, 0.08)"
      />

      {/* Ambient glow blobs */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[10%] right-[5%] w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-orange/15 blur-[140px]" />
        <div className="absolute bottom-[15%] left-[3%] w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-orange/10 blur-[160px]" />
        <div className="absolute top-[50%] left-[25%] w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-orange-dim/8 blur-[120px]" />
        <div className="absolute bottom-[5%] right-[15%] w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-orange-light/8 blur-[130px]" />
      </div>

      {projects && projects.length > 0 ? (
        <HorizontalScroll projects={projects} />
      ) : (
        <div className="flex items-center justify-center h-screen relative z-10">
          <Animator>
            <div className="text-center glass-card rounded-2xl p-8 md:p-12">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-primary/60 animate-glow-pulse" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground">
                Projects Loading...
              </h2>
              <p className="text-white/40 mt-2">
                Please check back in a moment.
              </p>
            </div>
          </Animator>
        </div>
      )}
    </div>
  );
};

export default page;
