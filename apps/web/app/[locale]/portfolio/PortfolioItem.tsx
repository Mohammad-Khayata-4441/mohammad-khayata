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
      className="portfolio-card w-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-center group mb-16 md:mb-24 last:mb-0 relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Image container */}
      <div
        className={`w-full lg:w-1/2 relative aspect-4/3 sm:aspect-video rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer shadow-lg   ${index % 2 !== 0 ? 'lg:order-2' : ''}`}
        onClick={() => setVisible(true)}
      >
        {hasImages ? (
          <>
            <Image
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              src={cover}
              alt={item.title ?? ""}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Ambient overlay */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition duration-500 pointer-events-none" />

            {/* Glass border glow on hover */}
            <div className="absolute inset-0 z-1 rounded-2xl md:rounded-3xl border border-white/0 group-hover:border-white/10 transition-colors duration-500 pointer-events-none" />
          </>
        ) : (
          <div className="w-full h-full bg-white/5 border border-white/10 flex items-center justify-center">
            <span className="text-white/30 text-sm">No Image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`w-full lg:w-1/2 flex flex-col justify-center gap-4 sm:gap-6 ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>

        {/* Project index number & divider */}
        <div className="flex items-center gap-4">
          <span className="text-xs sm:text-sm font-mono text-primary/80 tracking-wider">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="w-16 h-px bg-white/10" />
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
          {item.title}
        </h2>

        {/* Overview */}
        {item.overview && (
          <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-xl line-clamp-4">
            {typeof item.overview === "string" ? item.overview : ""}
          </p>
        )}

        {/* Tech badges */}
        {item.technologies && item.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {item.technologies.map((t) =>
              t.logo?.url ? (
                <div
                  key={t.documentId ?? t.id}
                  className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm px-3 py-1.5 transition-colors hover:bg-white/10"
                >
                  <Image
                    alt={t.name ?? String(t.id)}
                    className="rounded-sm"
                    width={16}
                    height={16}
                    src={t.logo.url}
                  />
                  {t.name && (
                    <span className="text-[11px] sm:text-xs text-white/70 font-medium">
                      {t.name}
                    </span>
                  )}
                </div>
              ) : null
            )}
          </div>
        )}

        <div className="w-full h-px bg-white/5 my-2" />

        {/* Actions row */}
        <div className="flex items-center gap-3 flex-wrap">
          {item.repo && (
            <a
              href={item.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2 transition-all duration-300"
            >
              <Github className="w-4 h-4" />
              <span>Code</span>
            </a>
          )}
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2 transition-all duration-300"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Preview</span>
            </a>
          )}
          {hasImages && images.length > 1 && (
            <button
              onClick={() => setVisible(true)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2 transition-all duration-300"
            >
              <Images className="w-4 h-4" />
              <span>Gallery ({images.length})</span>
            </button>
          )}

          {/* Details link */}
          <Link
            href={detailsHref}
            scroll={false}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary hover:text-primary/80 ml-auto group/link transition-colors duration-300"
          >
            Read More
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 border border-primary/20 group-hover/link:bg-primary/20 transition-all duration-300">
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </span>
          </Link>
        </div>
      </div>

      <PhotoSlider
        images={images.map((src, i) => ({ src, key: `${src}-${i}` }))}
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </motion.article>
  );
}
