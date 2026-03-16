"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { type Project } from "@/services/portfolio";
import PortfolioItem from "./PortfolioItem";

export default function HorizontalScroll({
  projects,
}: {
  projects: Project[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const totalCards = projects.length;
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(totalCards - 1) * (100 / totalCards)}%`]
  );

  return (
    <section ref={containerRef} style={{ height: `${totalCards * 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div className="flex gap-6 px-[7.5vw]" style={{ x }}>
          {projects.map((item, i) => (
            <PortfolioItem
              key={item.documentId ?? item.id}
              item={item}
              index={i}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
