import LightsGenerator from "@/app/components/LightsGenerator";
import { BioShowcase } from "../components/Overview";
import { resume } from "@/data/resume";
import { HeroSection } from "./components/HeroSection";
import { WebDevSkillsSection } from "./components/WebDevSkillsSection";
import { AchievementsSection } from "./components/AchievementsSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { StatsSection } from "./components/StatsSection";
import { ContactSection } from "./components/ContactSection";
import { generatePageMetadata } from "@/shared/lib/metaData";
import { getAbout, getHome } from "@/services/home";
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
const Home = async () => {
  const homeData = await getHome();
  const aboutData = await getAbout();

  return (
    <div className="page portfolio-page relative z-0 flex flex-col justify-center">
      <div className="page-overlay"></div>
      <main className="space-y-24 md:space-y-32">
        <HeroSection overview={aboutData.data.overview!} />
        <StatsSection />
        <section className="px-4 md:px-0">
          <div className="overflow-hidden max-w-(--breakpoint-md) mx-auto section-aurora  interactive-card noise-overlay p-6 md:p-8">
            <div className="relative">
              <BioShowcase />
            </div>
          </div>
        </section>
        <WebDevSkillsSection />
        <AchievementsSection />
        <ExperienceSection experiences={homeData?.data?.experiences} />
        <ContactSection />
      </main>
    </div>
  );
};

export default Home;
