"use client";

import Animator from "@/app/components/Animator";
import { Briefcase, CalendarClock, Cpu, Handshake } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stats = [
  {
    icon: Briefcase,
    title: "Projects Completed",
    value: "30+",
    numericValue: 30,
  },
  {
    icon: CalendarClock,
    title: "Years of Experience",
    value: "5+",
    numericValue: 5,
  },
  {
    icon: Cpu,
    title: "Technologies Used",
    value: "50+",
    numericValue: 50,
  },
  {
    icon: Handshake,
    title: "Clients / Companies",
    value: "12+",
    numericValue: 12,
  },
];

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return count;
}

function StatItem({
  icon: Icon,
  title,
  value,
  numericValue,
  index,
  inView,
}: (typeof stats)[0] & { index: number; inView: boolean }) {
  const count = useCountUp(numericValue, 1800 + index * 120, inView);
  const suffix = value.replace(/\d+/, "");

  return (
    <div
      className={`group relative flex flex-col items-center gap-3 px-6 py-8 sm:py-10
        ${index !== 0 ? "border-l border-white/[0.06]" : ""}
        ${index >= 2 ? "border-t border-white/[0.06] sm:border-t-0" : ""}
      `}
    >
      {/* Hover glow behind the cell */}
      <div className="absolute inset-0 bg-primary/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Icon */}
      <div className="relative flex items-center justify-center mb-1 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(232,87,61,0.5)]">
        <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary" strokeWidth={1.5} />
      </div>

      {/* Number */}
      <div className="flex items-baseline gap-[2px] leading-none">
        <span className="text-3xl sm:text-4xl font-extrabold tabular-nums text-foreground transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(232,87,61,0.5)]">
          {inView ? count : 0}
          <span className="text-xl sm:text-3xl font-bold text-primary/90">
            {suffix}
          </span>
        </span>
      </div>

      {/* Label */}
      <p className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.16em] text-white/35 text-center transition-colors duration-300 group-hover:text-white/55">
        {title}
      </p>

      {/* Bottom accent line (appears on hover) */}
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] rounded-full bg-primary/60 group-hover:w-12 transition-all duration-500" />
    </div>
  );
}

export const StatsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="px-4 md:px-0">
      <div className="container mx-auto max-w-(--breakpoint-xl) px-4">
        <Animator>
          <div
            ref={ref}
            className="rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-2xl overflow-hidden"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4">
              {stats.map((stat, i) => (
                <StatItem key={stat.title} {...stat} index={i} inView={inView} />
              ))}
            </div>
          </div>
        </Animator>
      </div>
    </section>
  );
};
