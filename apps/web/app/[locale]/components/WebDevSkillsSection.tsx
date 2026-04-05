import Animator from "@/app/components/Animator";
import SpotlightCard from "@/app/components/SpotlightCard/SpotlightCard";
import SectionTitle from "@/shared/components/SectionTitle";
import Image from "next/image";
import { getTechnologies } from "@/services/home";
import { strapiMedia } from "@/shared/utils/strapiMedia";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/shared/components/kibo-ui/marquee";

export const WebDevSkillsSection = async () => {
  const { data: technologies } = await getTechnologies();

  return (
    <section className="px-4 md:px-0">
      <div className="overflow-hidden mx-auto grid grid-cols-1 max-w-(--breakpoint-xl) px-4 md:px-0">
        <SectionTitle
          title="Web Development Skills"
          subtitle="I Utilize the most powerful technologies to save your time and build modern , high-performance and scalable web applications."
        />
        <div className="features-wrapper py-10 w-full overflow-hidden">
          <Marquee >
            <MarqueeFade side="left"  />
            <MarqueeContent className="overflow-hidden" pauseOnHover>
              {technologies?.map((tech: any, index: number) => (
                <MarqueeItem  key={tech.id ?? index}>
                  <Animator variant="scale-down">
             
                      <div className="relative aspect-square w-16 h-16 md:w-20 md:h-20 mx-4">
                        {tech.logo?.url && (
                          <Image
                            className="object-contain"
                            src={strapiMedia(tech.logo.url)}
                            alt={tech.name || "Technology logo"}
                            fill
                          />
                        )}
                      </div>
                  </Animator>
                </MarqueeItem>
              ))}
            </MarqueeContent>
            <MarqueeFade side="right" />
          </Marquee>
        </div>
      </div>
    </section>
  );
};
