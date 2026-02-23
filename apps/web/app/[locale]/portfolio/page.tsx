import LightsGenerator from "@/app/components/LightsGenerator";
import React from "react";
// import projects from '@/data/projects'
import { NextPage } from "next";
import { type PortfolioItem as PortfolioItemType } from "@/types/PortfolioItem";
import ProjectDetails from "./ProjectDetails";
import PortfolioItem from "./PortfolioItem";
import BlurAppearVariant1, { MotionWrapper } from "@/components/MotionWrapper";
import { generatePageMetadata } from "@/lib/metaData";
import { resume } from "@/data/resume";
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
  // const supabase = await createClient();
  // let { data: projects, error } = await supabase
  //   .from("projects")
  //   .select<string, PortfolioItemType>(`* , project_skills(id,  skills(*))`);

  let projects: PortfolioItemType[] = [];

  // Check if Supabase environment variables are available
  if (!process.env.SUPABASE_ANON_KEY) {
    console.warn("SUPABASE_ANON_KEY not found. Using fallback projects data.");
    // Fallback to local projects data if available
    try {
      const { default: fallbackProjects } = await import("@/data/projects");
      projects = fallbackProjects || [];
    } catch (e) {
      console.warn("No fallback projects data available");
      projects = [];
    }
  } else {
    try {
      const response = await fetch(
        "https://ruhmvzueumswzfdbjlto.supabase.co/rest/v1/projects?select=*,project_skills(id,skills(*))&order=order",
        {
          headers: {
            apikey: process.env.SUPABASE_ANON_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        projects = Array.isArray(data) ? data : [];
      } else {
        console.error(
          "Failed to fetch projects:",
          response.status,
          response.statusText
        );
        // Try fallback on API failure
        try {
          const { default: fallbackProjects } = await import("@/data/projects");
          projects = fallbackProjects || [];
        } catch (e) {
          console.warn("No fallback projects data available");
        }
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      // Try fallback on network error
      try {
        const { default: fallbackProjects } = await import("@/data/projects");
        projects = fallbackProjects || [];
      } catch (e) {
        console.warn("No fallback projects data available");
      }
    }
  }

  return (
    <>
      <div className="page portfolio-page  relative z-0 flex flex-col ">
        <LightsGenerator />
        <div className="page-overlay "></div>
        <div className=" lg:px-12 mx-auto py-16">
          <div className=" px-4 mx-auto space-y-24">
            {projects && projects.length > 0 ? (
              projects.map((item) => (
                <MotionWrapper key={item.id}>
                  <PortfolioItem
                    item={item}
                    className="items-center"
                    data-aos-duration={1000}
                  ></PortfolioItem>
                </MotionWrapper>
              ))
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300">
                  Projects Loading...
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Please check back in a moment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default page;
