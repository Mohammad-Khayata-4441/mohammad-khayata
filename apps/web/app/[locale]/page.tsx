import LightsGenerator from "@/app/components/LightsGenerator";
import { BioShowcase } from "../components/Overview";
 import { resume } from "@/data/resume";
import { HeroSection } from "./components/HeroSection";
import { PersonalInfoSection } from "./components/PersonalInfoSection";
import { WebDevSkillsSection } from "./components/WebDevSkillsSection";
import { AchievementsSection } from "./components/AchievementsSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { generatePageMetadata } from "@/shared/lib/metaData";
import { StrapiService } from "@/services/strapi";
import { getHome } from "@/services/home";
export const metadata = generatePageMetadata({
  title: "Home",
  description: `${resume.seo.description} View my portfolio showcasing ${resume.seo.projectsCompleted}+ projects including enterprise applications, e-commerce platforms, and ERP systems.`,
  slug: "",
  keywords: [
    "Portfolio",
    "Home",
    "Professional Experience",
    "Enterprise Applications",
    "Frontend Portfolio",
    "React Projects",
    "Vue Projects",
  ],
  type: "profile",
});
const  Home = async () => {
  const homeData = await getHome();



   return (
    <div className="page portfolio-page relative z-0 flex flex-col justify-center">
      <LightsGenerator />
      <div className="page-overlay"></div>
      <main className="space-y-32">
        <HeroSection />
        <PersonalInfoSection />
        <section>
          <div className="overflow-hidden max-w-(--breakpoint-md) mx-auto">
            <div className="relative">
              <BioShowcase />
            </div>
          </div>
        </section>
        <WebDevSkillsSection />
        <AchievementsSection />
        <ExperienceSection experiences={homeData?.data?.experiences} />
      </main>
    </div>
  );
};

export default Home;
