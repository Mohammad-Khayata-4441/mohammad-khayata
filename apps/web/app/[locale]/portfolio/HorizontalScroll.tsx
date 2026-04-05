import { type Project } from "@/services/portfolio";
import Animator from "@/app/components/Animator";
import PortfolioItem from "./PortfolioItem";

export default function HorizontalScroll({
  projects,
}: {
  projects: Project[];
}) {
  return (
    <>
      {/* ── Page Header ── */}
      <div className="relative z-10 pt-28 sm:pt-32 md:pt-36 pb-6 sm:pb-8 md:pb-10">
        <div className="container mx-auto max-w-(--breakpoint-xl) px-4">
          <Animator>
            <div className="flex flex-col items-center sm:items-start gap-4">
              <span className="glass-badge text-primary/90 uppercase tracking-[0.2em] text-[11px] font-semibold">
                Portfolio
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center sm:text-left">
                <span className="text-foreground/90">Selected </span>
                <span className="text-primary drop-shadow-[0_0_24px_rgba(232,87,61,0.4)]">
                  Works
                </span>
              </h1>
              <p className="text-sm sm:text-base text-white/40 max-w-lg text-center sm:text-left leading-relaxed">
                A curated collection of projects spanning enterprise apps,
                e-commerce platforms, and modern web solutions.
              </p>
              <div className="w-16 h-px bg-white/10 mt-1" />
            </div>
          </Animator>
        </div>
      </div>

      {/* ── Projects Grid ── */}
      <div className="relative z-10 px-4 pb-20">
        <div className="container mx-auto max-w-(--breakpoint-xl)">
          <div className="flex flex-col gap-8 sm:gap-12 md:gap-16">
            {projects.map((item, i) => (
              <PortfolioItem
                key={item.documentId ?? item.id}
                item={item}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
