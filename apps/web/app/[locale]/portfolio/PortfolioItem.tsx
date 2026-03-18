"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Link } from "@/i18n";
import { PhotoSlider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { type Project } from "@/services/portfolio";
import { strapiMedia } from "@/shared/utils/strapiMedia";
import { ArrowUpRight, Github, ExternalLink, Images } from "lucide-react";
import { motion } from "motion/react";

const coverUrl = (item: Project) =>
  item.cover?.url ?? item.media?.[0]?.url ?? "";
const imageUrls = (item: Project): string[] =>
  (item.media ?? []).map((m) => m.url).filter(Boolean);

export default function PortfolioItem({
  item,
  index,
}: {
  item: Project;
  index: number;
}) {
  const [visible, setVisible] = useState(false);
  const cover = strapiMedia(coverUrl(item));
  const images = imageUrls(item).map((url) => strapiMedia(url));
  const hasImages = cover || images.length > 0;
  const detailsHref = `/projects/${item.slug ?? item.id}`;

  return (
    <motion.article
      className="portfolio-card relative w-full aspect-4/3 sm:aspect-video rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer select-none"
      initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Cover image */}
      {hasImages && (
        <div className="absolute inset-0 z-0" onClick={() => setVisible(true)}>
          <Image
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            src={cover}
            alt={item.title ?? ""}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 75vw, 60vw"
          />
          {/* Multi-layer gradient for depth */}
          <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/50 to-black/25 lg:backdrop-blur-[1px] group-hover:backdrop-blur-none transition duration-300  " />
          <div className="absolute inset-0 bg-linear-to-r from-black/30 via-transparent to-transparent " />
        </div>
      )}

      {/* Glass border glow on hover */}
      <div className="absolute inset-0 z-1 rounded-2xl md:rounded-3xl border border-white/6 group-hover:border-white/12 transition-colors duration-500 pointer-events-none" />

      {/* Top-left accent bar */}
      <div className="absolute top-0 left-6 sm:left-8 z-2 w-px h-12 sm:h-16 bg-linear-to-b from-primary/70 to-transparent" />

      {/* Project index number */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-2">
        <span className="text-[10px] sm:text-xs font-mono text-white/20 tracking-wider">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 h-full flex flex-col justify-end p-5 sm:p-6 md:p-8 gap-2.5 sm:gap-3">
        {/* Company glass badge */}
 

        {/* Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold text-white leading-tight tracking-tight  group-hover:opacity-0 transition-opacity duration-300">
          {item.title}
        </h2>

        {/* Overview */}
        {item.overview && (
          <p className="text-xs sm:text-sm md:text-base text-white/50 line-clamp-2 max-w-md leading-relaxed group-hover:opacity-0 transition-opacity duration-300">
            {typeof item.overview === "string" ? item.overview : ""}
          </p>
        )}

        {/* Tech badges — glass pills */}
        {item.technologies && item.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center mt-1">
            {item.technologies.map((t) =>
              t.logo?.url ? (
                <div
                  key={t.documentId ?? t.id}
                  className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/8 backdrop-blur-sm px-2.5 py-1 transition-colors hover:bg-white/10 hover:border-white/14"
                >
                  <Image
                    alt={t.name ?? String(t.id)}
                    className="rounded-sm"
                    width={16}
                    height={16}
                    src={t.logo.url}
                  />
                  {t.name && (
                    <span className="text-[10px] sm:text-[11px] text-white/60 font-medium hidden sm:inline">
                      {t.name}
                    </span>
                  )}
                </div>
              ) : null
            )}
          </div>
        )}

        {/* Glass divider */}
        <div className="w-full h-px bg-white/6 my-1" />

        {/* Actions row — glass buttons */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {item.repo && (
            <a
              href={item.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white/80 hover:text-white bg-white/6 hover:bg-white/12 border border-white/8 hover:border-white/15 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Code</span>
            </a>
          )}
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white/80 hover:text-white bg-white/6 hover:bg-white/12 border border-white/8 hover:border-white/15 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Live</span>
            </a>
          )}
          {hasImages && images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setVisible(true);
              }}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white/80 hover:text-white bg-white/6 hover:bg-white/12 border border-white/8 hover:border-white/15 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-300"
            >
              <Images className="w-3.5 h-3.5" />
              <span>{images.length}</span>
            </button>
          )}

          {/* Details link — positioned end */}
          <Link
            href={detailsHref}
            scroll={false}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary/80 hover:text-primary ml-auto group/link transition-colors duration-300"
          >
            Details
            <span className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/10 border border-primary/20 group-hover/link:bg-primary/20 group-hover/link:border-primary/30 transition-all duration-300">
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </span>
          </Link>
        </div>
      </div>

      {/* Bottom-right orange glow — hover accent */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-primary/0 group-hover:bg-primary/15 blur-[80px] transition-all duration-700 pointer-events-none z-1" />

      <PhotoSlider
        images={images.map((src, i) => ({ src, key: `${src}-${i}` }))}
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </motion.article>
  );
}
