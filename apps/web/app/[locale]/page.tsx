import LightsGenerator from "@/app/components/LightsGenerator";
import { BioShowcase } from "../components/Overview";
import { generatePageMetadata } from "@/lib/metaData";
import { resume } from "@/data/resume";
import { HeroSection } from "./components/HeroSection";
import { PersonalInfoSection } from "./components/PersonalInfoSection";
import { WebDevSkillsSection } from "./components/WebDevSkillsSection";
import { AchievementsSection } from "./components/AchievementsSection";
import { ExperienceSection } from "./components/ExperienceSection";
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
const Home = () => {
  return (
    <div className="page portfolio-page relative z-0 flex flex-col justify-center">
      <LightsGenerator />
      <div className="page-overlay"></div>
      <main className="space-y-32">
        <HeroSection />
        <PersonalInfoSection />
        <section>
          <div className="overflow-hidden max-w-screen-md mx-auto">
            <div className="relative">
              <BioShowcase />
            </div>
          </div>
        </section>
        <WebDevSkillsSection />
        <AchievementsSection />
        <ExperienceSection />
      </main>
    </div>
  );
};

export default Home;
