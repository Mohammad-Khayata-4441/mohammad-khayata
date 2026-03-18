import Animator from "@/app/components/Animator";
import { Spotlight } from "@/app/components/Spotlight";
import { TypewriterEffect } from "@/app/components/TypewriterEffect";
import { Button } from "@/shared/components/ui/button";
import { Link } from "@/i18n";
import {
  CalendarDays,
  Flag,
  Mail,
  Phone,
  FileText,
  LayoutGrid,
} from "lucide-react";
import Image from "next/image";

const infoItems = [
  {
    icon: CalendarDays,
    label: "Birthday",
    value: "2 May 2001",
    href: undefined,
  },
  {
    icon: Flag,
    label: "Nationality",
    value: "Syrian",
    href: undefined,
  },
  {
    icon: Mail,
    label: "Email",
    value: "MohammadKhayata.gm@gmail.com",
    href: "mailto:MohammadKhayata.gm@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+963 956 954 441",
    href: "tel:+963956954441",
  },
];

export const HeroSection = (props: { overview: string }) => (
  <section className="overflow-hidden min-h-screen flex flex-col justify-center relative" id="hero">
    {/* Aceternity-style SVG Spotlight */}
    <Spotlight
      className="-top-40 left-0 md:-top-20 md:left-60"
      fill="rgba(232, 87, 61, 0.22)"
      fill2="rgba(255, 107, 53, 0.12)"
    />

    {/* Ambient orange glow blobs */}
    <div className="absolute top-[15%] right-[10%] w-80 h-80 rounded-full bg-orange/15 blur-[140px] pointer-events-none" />
    <div className="absolute bottom-[20%] left-[5%] w-96 h-96 rounded-full bg-orange/10 blur-[160px] pointer-events-none" />
    <div className="absolute top-[40%] left-[30%] w-64 h-64 rounded-full bg-orange-dim/8 blur-[120px] pointer-events-none" />
    <div className="absolute bottom-[10%] right-[20%] w-72 h-72 rounded-full bg-orange-light/8 blur-[130px] pointer-events-none" />

    <div className="hero container mx-auto px-4 max-w-(--breakpoint-xl) grid grid-cols-12 gap-8 lg:gap-12 items-center relative z-1">
      {/* Left — Text & Info */}
      <div className="col-span-12 order-2 lg:order-1 lg:col-span-7 flex flex-col justify-center items-center lg:items-start space-y-6">
     

        <Animator>
          <div className="text-center lg:text-left">
            <p className="text-lg sm:text-xl text-white/50 mb-2 tracking-wide">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Hey there, I'm
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
              <span className="block text-foreground/90">Mohammad</span>
              <span className="block text-primary drop-shadow-[0_0_32px_rgba(232,87,61,0.5)]">
                <TypewriterEffect
                  words={[
                    { text: "Khayata", className: "text-primary" },
                    { text: "TypeScript Developer", className: "text-primary" },
                    { text: "Software Engineer", className: "text-primary" },
                    { text: "Architect Specialist", className: "text-primary" },
                  ]}
                />
              </span>
            </h1>
          </div>
        </Animator>

        <Animator>
          <p className="text-base sm:text-lg text-foreground/50 max-w-lg text-center lg:text-left leading-relaxed">
              {props.overview}
          </p>
        </Animator>

        {/* Divider */}
        <Animator>
          <div className="w-16 h-px bg-white/10" />
        </Animator>

        {/* CTA buttons */}
        <Animator>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              asChild
              size="lg"
              className="rounded-full button-glow"
            >
              <Link href="/portfolio">
                <LayoutGrid className="w-4 h-4" />
                View My Work
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full glass-button border-white/10 text-white hover:bg-white/10"
            >
              <Link
                target="_blank"
                href="https://docs.google.com/document/d/1gkeG0JCpvpfxjXxXd64PqcON_FVlfosGOxHVa52_wkY/edit?usp=sharing"
              >
                <FileText className="w-4 h-4" />
                Resume
              </Link>
            </Button>
          </div>
        </Animator>
      </div>

      {/* Right — Portrait */}
      <div className="col-span-12 lg:col-span-5 order-1 lg:order-2 flex justify-center">
        <Animator variant="fade">
          <Image
            src="/assets/portrait-5.png"
            alt="Mohammad Khayata"
            width={500}
            height={500}
            className="drop-shadow-2xl"
            priority
          />
        </Animator>
      </div>
    </div>

    {/* ── Info Glass Banner ── */}
    <div className=" left-0 right-0 z-2 relative xl:bottom-12 mt-8 lg:mt-0 ">
      <div className="container mx-auto max-w-(--breakpoint-xl) px-4">
        <Animator>
          <div className="rounded-2xl bg-white/4 border border-white/10 backdrop-blur-2xl overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-4">
              {infoItems.map((item, i) => (
                <div
                  key={item.label}
                  className={`flex flex-col gap-1.5 px-6 py-5 sm:py-6 relative
                    ${i !== 0 ? "border-l border-white/8" : ""}
                    ${i >= 2 ? "border-t border-white/8 sm:border-t-0" : ""}
                  `}
                >
                  {/* left orange accent bar */}
                  <span className="absolute left-0 top-5 bottom-5 w-0.5 bg-primary/70 rounded-full" />
                  <div className="flex items-center gap-2 pl-1">
                    <item.icon className="w-3.5 h-3.5 text-primary/80 shrink-0" />
                    <span className="text-[11px] uppercase tracking-wider text-white/40">
                      {item.label}
                    </span>
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm sm:text-base font-semibold text-foreground pl-1 truncate hover:text-primary transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm sm:text-base font-semibold text-foreground pl-1">
                      {item.value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Animator>
      </div>
    </div>
  </section>
);
