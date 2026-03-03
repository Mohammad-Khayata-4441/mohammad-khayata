
import ExperienceTimeline from "@/shared/components/experience-timeline";
import SectionTitle from "@/shared/components/SectionTitle";
import { Button } from "@/shared/components/ui/button";
import { ArrowUp } from "lucide-react";

export const ExperienceSection = () => (
  <section className="min-h-screen bg-linear-to-b">
    <div className="overflow-hidden max-w-(--breakpoint-xl) px-4 md:px-0 mx-auto">
      <SectionTitle
        title="Professional Experience"
        subtitle="A journey through my professional career, showcasing projects and achievements across different companies."
      />
      <div className="overflow-hidden mx-auto max-w-(--breakpoint-xl) px-4 md:px-0">
        <ExperienceTimeline />
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
