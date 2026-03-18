"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Link } from "@/i18n";
import { motion } from "motion/react";
import { PhotoSlider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import ReactMarkdown from "react-markdown";
import {
  ArrowLeft,
  Calendar,
  Building2,
  ExternalLink,
  Github,
  Images,
  Layers,
  Sparkles,
  Tag,
  Briefcase,
  CircleCheck,
} from "lucide-react";
import { type Project } from "@/services/projects";
import { strapiMedia } from "@/shared/utils/strapiMedia";
import { cn } from "@/shared/lib/utils";
import { Spotlight } from "@/app/components/Spotlight";
import Animator from "@/app/components/Animator";
import GlowText from "@/app/components/GlowText";
import { Button } from "@/shared/components/ui/button";

/* ───────── helpers ───────── */

const coverUrl = (p: Project) => p.cover?.url ?? p.media?.[0]?.url ?? "";
const galleryUrls = (p: Project): string[] =>
  (p.media ?? []).map((m: any) => m.url).filter(Boolean);

function formatDate(d?: string | null) {
  if (!d) return null;
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

/* ───────── component ───────── */

export default function ProjectDetail({ project }: { project: Project }) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const cover = coverUrl(project);
  const images = galleryUrls(project).map((u) => strapiMedia(u));
  const hasCover = !!cover;
  const primaryColor = project.primaryColor || "#E8573D";

  const technologies = (project.technologies ?? []) as Array<{
    id: number;
    documentId?: string;
    name?: string;
    logo?: { url?: string };
  }>;

  const skills = (project.skills ?? []) as Array<{
    id: number;
    title?: string;
    description?: string;
  }>;

  const categories = (project.categories ?? []) as Array<{
    id: number;
    title?: string;
    slug?: string;
  }>;

  const experience = project.experience as
    | {
        jobTitle?: string;
        company?: string;
        startDate?: string;
        endDate?: string;
      }
    | undefined;

  return (
    <div className="relative min-h-screen overflow-hidden pt-24">
      {/* ═══════ Ambient spotlights ═══════ */}
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill={`${primaryColor}22`}
        fill2={`${primaryColor}11`}
      />
      <div
        className="pointer-events-none absolute -top-32 right-0 h-150 w-150 rounded-full opacity-20 blur-[140px]"
        style={{ background: primaryColor }}
      />
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-100 w-200 rounded-full opacity-10 blur-[160px] bg-primary" />

      {/* ═══════ Main 2-column layout ═══════ */}
      <div className="relative z-10 container max-w-7xl mx-auto px-4 pt-8 pb-20">
        <div className="grid lg:grid-cols-12 gap-8 xl:gap-12">
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
             MAIN COLUMN — Title, Overview article, Gallery
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <main className="lg:col-span-7 xl:col-span-8 space-y-10">
            {/* ── Title block ── */}
            <Animator variant="blur-up">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]">
                    <GlowText>{project.title}</GlowText>
                  </h1>

                  <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm font-medium text-foreground/85 transition-all hover:bg-white/10 hover:border-white/20 hover:text-foreground hover:-translate-x-0.5"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Portfolio
                  </Link>
                </div>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  {project.company && (
                    <span className="inline-flex items-center gap-1.5">
                      <Building2 className="w-4 h-4" style={{ color: primaryColor }} />
                      {project.company}
                    </span>
                  )}
                  {project.date && (
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" style={{ color: primaryColor }} />
                      {formatDate(project.date)}
                    </span>
                  )}
                </div>

                {/* Experience */}
                {experience?.company && (
                  <div className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-3 py-2">
                    <Briefcase className="w-4 h-4" style={{ color: primaryColor }} />
                    <span className="text-sm font-medium text-foreground/90">
                      {experience.jobTitle}
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="text-sm text-muted-foreground">{experience.company}</span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {project.url && (
                    <Button asChild>
                      <a href={project.url} target="_blank" rel="noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        Live Preview
                      </a>
                    </Button>
                  )}
                  {project.repo && (
                    <Button variant="outline" asChild>
                      <a href={project.repo} target="_blank" rel="noreferrer">
                        <Github className="w-4 h-4" />
                        Source Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </Animator>

            {/* ── Overview article ── */}
            {project.overview && (
              <Animator variant="blur-up">
                <article className="relative">
                  <div
                    className="w-12 h-1 rounded-full mb-6"
                    style={{ background: primaryColor }}
                  />
                  <div
                    className={cn(
                      "max-w-none text-foreground/80 leading-[1.8] text-base",
                      "[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-10 [&_h1]:mb-4 [&_h1]:text-foreground",
                      "[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-foreground",
                      "[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-foreground",
                      "[&_h4]:text-lg [&_h4]:font-semibold [&_h4]:mt-5 [&_h4]:mb-2 [&_h4]:text-foreground",
                      "[&_p]:mb-4 [&_p]:text-foreground/70",
                      "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-1",
                      "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-1",
                      "[&_li]:text-foreground/70",
                      "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-primary/80",
                      "[&_blockquote]:border-l-2 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-foreground/60 [&_blockquote]:my-6",
                      "[&_code]:bg-white/5 [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:font-mono",
                      "[&_pre]:bg-white/3 [&_pre]:border [&_pre]:border-white/6 [&_pre]:rounded-xl [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:my-6",
                      "[&_img]:rounded-xl [&_img]:my-6",
                      "[&_hr]:border-white/8 [&_hr]:my-8",
                      "[&_strong]:text-foreground [&_strong]:font-semibold",
                      "[&_table]:w-full [&_table]:my-6 [&_th]:text-left [&_th]:pb-2 [&_th]:border-b [&_th]:border-white/10 [&_td]:py-2 [&_td]:border-b [&_td]:border-white/5"
                    )}
                  >
                    <ReactMarkdown>
                      {typeof project.overview === "string"
                        ? project.overview
                        : ""}
                    </ReactMarkdown>
                  </div>
                </article>
              </Animator>
            )}

            {/* ── Gallery masonry ── */}
            {images.length > 1 && (
              <div className="space-y-6">
                <Animator variant="blur-up">
                  <h2 className="text-2xl font-bold">
                    <GlowText>Screenshots</GlowText>
                  </h2>
                </Animator>

                <div className="columns-1 sm:columns-2 gap-4">
                  {images.map((src, i) => (
                    <Animator
                      key={src}
                      variant="scale-up"
                      transition={{ delay: i * 0.04 }}
                    >
                      <motion.button
                        onClick={() => {
                          setGalleryIndex(i);
                          setGalleryOpen(true);
                        }}
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative w-full mb-4 rounded-xl overflow-hidden group cursor-pointer block"
                      >
                        <Image
                          src={src}
                          alt={`${project.title} screenshot ${i + 1}`}
                          width={800}
                          height={500}
                          className="w-full h-auto object-cover transition-all duration-500 group-hover:brightness-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <Images className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div
                          className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ boxShadow: `inset 0 0 0 1px ${primaryColor}30` }}
                        />
                      </motion.button>
                    </Animator>
                  ))}
                </div>
              </div>
            )}
          </main>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
             SIDEBAR — Cover, Categories, Tech, Experience
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <aside className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* ── Cover image card ── */}
            {hasCover && (
              <Animator variant="scale-up">
                <div className="relative rounded-2xl overflow-hidden group">
                  <div className="relative aspect-video">
                    <Image
                      fill
                      src={strapiMedia(cover)}
                      alt={project.title ?? "Project cover"}
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                  </div>

                  {images.length > 1 && (
                    <button
                      onClick={() => {
                        setGalleryIndex(0);
                        setGalleryOpen(true);
                      }}
                      className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 text-xs font-medium text-white/90 hover:text-white glass rounded-full px-3 py-2 transition-all hover:scale-105"
                    >
                      <Images className="w-3.5 h-3.5" />
                      {images.length} Photos
                    </button>
                  )}

                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 0 1px ${primaryColor}15, 0 0 60px ${primaryColor}08`,
                    }}
                  />
                </div>
              </Animator>
            )}

            {/* ── Categories ── */}
            {categories.length > 0 && (
              <Animator variant="blur-up">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-4 h-4" style={{ color: primaryColor }} />
                    <h3 className="text-sm font-semibold text-foreground">Categories</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <span
                        key={cat.id}
                        className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium text-foreground/70 bg-white/5 border border-white/8 hover:bg-white/8 hover:border-white/12 transition-all"
                      >
                        {cat.title}
                      </span>
                    ))}
                  </div>
                </div>
              </Animator>
            )}

            {/* ── Technologies ── */}
            {technologies.length > 0 && (
              <Animator variant="blur-up">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4" style={{ color: primaryColor }} />
                    <h3 className="text-sm font-semibold text-foreground">Tech Stack</h3>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {technologies.map((tech) => (
                      <div
                        key={tech.documentId ?? tech.id}
                        className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-white/5 border border-white/8 hover:bg-white/8 hover:border-white/12 transition-all group"
                      >
                        {tech.logo?.url ? (
                          <Image
                            src={strapiMedia(tech.logo.url)}
                            alt={tech.name ?? ""}
                            width={20}
                            height={20}
                            className="rounded object-contain"
                          />
                        ) : (
                          <Layers className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span className="text-xs font-medium text-foreground/70 group-hover:text-foreground transition-colors">
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Animator>
            )}

            {/* ── Skills checklist ── */}
            {skills.length > 0 && (
              <Animator variant="fade">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <CircleCheck className="w-4 h-4" style={{ color: primaryColor }} />
                    <h3 className="text-sm font-semibold text-foreground">Skills</h3>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="inline-flex items-center gap-2.5 text-sm text-foreground/70"
                      >
                        <CircleCheck className="w-4 h-4 shrink-0" style={{ color: primaryColor }} />
                        {skill.title}
                      </div>
                    ))}
                  </div>
                </div>
              </Animator>
            )}
          </aside>
        </div>
      </div>

      {/* ═══════ Photo lightbox ═══════ */}
      <PhotoSlider
        images={images.map((src, i) => ({ src, key: `${src}-${i}` }))}
        visible={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        index={galleryIndex}
        onIndexChange={setGalleryIndex}
      />
    </div>
  );
}

