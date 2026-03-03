import LightsGenerator from "@/app/components/LightsGenerator";
import React from "react";
// import projects from '@/data/projects'
import { NextPage } from "next";
import PortfolioItem from "./PortfolioItem";
import { resume } from "@/data/resume";
import { generatePageMetadata } from "@/shared/lib/metaData";
import { getPortfolio } from "@/services/portfolio";
import { MotionWrapper } from "@/shared/components/MotionWrapper";
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
  // let { data: projects, error } = await supabase
  //   .from("projects")
  //   .select<string, PortfolioItemType>(`* , project_skills(id,  skills(*))`);

  // let projects: PortfolioItemType[] = [];



  return (
    <>
      <div className="page portfolio-page  relative z-0 flex flex-col ">
        <LightsGenerator />
        <div className="page-overlay "></div>
        <div className=" lg:px-12 mx-auto py-16">
          <div className=" px-4 mx-auto space-y-24">
            {projects && projects.length > 0 ? (
              projects.map((item) => (
                <MotionWrapper key={item.documentId ?? item.id}>
                  <PortfolioItem
                    item={item}
                    className="items-center"
                  />
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
