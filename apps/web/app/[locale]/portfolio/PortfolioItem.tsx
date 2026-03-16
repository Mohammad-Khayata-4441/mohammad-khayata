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
  const detailsHref = `/portfolio?project=${item.slug ?? item.id}`;

  return (
    <motion.article
      className="portfolio-card relative flex-shrink-0  aspect-video h-[70vh] rounded-2xl overflow-hidden group cursor-pointer select-none"
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Cover image */}
      {hasImages && (
        <div
          className="absolute inset-0 z-0"
          onClick={() => setVisible(true)}
        >
          <Image
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            src={cover}
            alt={item.title ?? ""}
            sizes="(max-width: 768px) 85vw, (max-width: 1024px) 60vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>
      )}

      {/* Content overlay */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8 gap-3">
        {/* Category / Company badge */}
        {item.company && (
          <span className="text-xs font-semibold tracking-widest uppercase text-white/70 w-fit bg-primary/10 backdrop-blur-sm rounded-full px-4 py-2">
            {item.company}
          </span>
        )}

        <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-white leading-tight">
          {item.title}
        </h2>

        {item.overview && (
          <p className="text-sm md:text-base text-white/70 line-clamp-2 max-w-lg">
            {typeof item.overview === "string" ? item.overview : ""}
          </p>
        )}

        {/* Tech icons */}
        {item.technologies && item.technologies.length > 0 && (
          <div className="flex gap-3 items-center mt-1">
            {item.technologies.map((t) =>
              t.logo?.url ? (
                <Image
                  key={t.documentId ?? t.id}
                  alt={t.name ?? String(t.id)}
                  className="rounded-md bg-white/10 backdrop-blur-sm p-1"
                  width={32}
                  height={32}
                  src={t.logo.url}
                />
              ) : null
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 mt-2 flex-wrap">
          {item.repo && (
            <a
              href={item.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          )}
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
              Live
            </a>
          )}
          {hasImages && images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setVisible(true);
              }}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 transition-colors"
            >
              <Images className="w-4 h-4" />
              {images.length}
            </button>
          )}
          <Link
            href={detailsHref}
            scroll={false}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-white ml-auto group/link"
          >
            Details
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
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
