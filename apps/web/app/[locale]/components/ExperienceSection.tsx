
import ExperienceCards from "@/shared/components/experience-cards";
import SectionTitle from "@/shared/components/SectionTitle";
import { Button } from "@/shared/components/ui/button";
import { ArrowUp } from "lucide-react";
import type { HomeData } from "@/services/home";

interface ExperienceSectionProps {
  experiences?: HomeData['experiences'];
}

export const ExperienceSection = ({ experiences }: ExperienceSectionProps) => (
  <section className="min-h-screen bg-linear-to-b">
    <div className=" max-w-(--breakpoint-xl) px-4 md:px-0 mx-auto">
      <SectionTitle
        title="Professional Experience"
        subtitle="My career journey through key roles and companies. Click on each position to learn more about my responsibilities and achievements."
      />
      <div className=" mx-auto max-w-(--breakpoint-xl) px-4 md:px-0">
        <ExperienceCards experiences={experiences} />
      </div>
    </div>
    <div className="flex justify-center">
      <Button asChild variant={"outline"} className="mx-auto text-center mb-4">
        <a href={"#hero"}>
          Go Back To Top <ArrowUp />{" "}
        </a>
      </Button>
    </div>
  </section>
);
