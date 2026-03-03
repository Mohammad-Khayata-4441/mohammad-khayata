"use client";
import ReadMore from "@/app/components/ReadMore";
import Image from "next/image";
import React, { useState } from "react";
import { Link } from "@/i18n";
import { Button } from "@/shared/components/ui/button";
import { MacbookMockUp } from "./MacbookMocUp";
import { PhotoSlider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { type Project } from "@/services/portfolio";
import { strapiMedia } from "@/shared/utils/strapiMedia";
import { ArrowUpRight, Github, ExternalLink, Images } from "lucide-react";

const coverUrl = (item: Project) =>
  item.cover?.url ?? item.media?.[0]?.url ?? "";
const imageUrls = (item: Project): string[] =>
  (item.media ?? []).map((m) => m.url).filter(Boolean);

export default function PortfolioItem({
  item,
  className,
}: {
  className?: string;
  item: Project;
}) {
  const [visible, setVisible] = useState(false);
  const cover = strapiMedia(coverUrl(item));
  const images = imageUrls(item).map((url) => strapiMedia(url));
  const hasImages = cover || images.length > 0;
  const detailsHref = `/portfolio?project=${item.slug ?? item.id}`;

  return (
    <div className={`grid grid-cols-12 project gap-2 xl:gap-4 ${className ?? ""}`}>
      {hasImages && (
        <div className="image col-span-12 xl:col-span-5 file:cursor-pointer flex justify-center xl:justify-start">
          <div className="hidden md:block w-full">
            {/* <MacbookMockUp> */}
              <div
                className="relative   shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer h-full w-full overflow-hidden group"
                onClick={() => setVisible(true)}
              >
                <Image
                  height={1080}
                  width={1920}
                  className="work-cover h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={cover}
                  alt={item.title ?? ""}
                />
              </div>
            {/* </MacbookMockUp > */}
          </div>
          <div className="md:hidden w-full">
            <Link
              className="relative   h-full w-full block overflow-hidden shadow-md group"
              href={`/portfolio?project=${item.slug ?? item.id}`}
              scroll={false}
            >
              <Image
                height={1080}
                width={1920}
                className="work-cover h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={cover}
                alt={item.title ?? ""}
              />
            </Link>
          </div>
        </div>
      )}
      <div className="info col-span-12 xl:col-span-7 flex flex-col justify-start items-start px-4 gap-4">
        <h2 className="text-3xl text-primary dark:text-white text-start xl:text-6xl font-bold">
          {item.title}
        </h2>
        {item.company && (
          <span className="text-sm font-semibold tracking-widest uppercase text-muted-foreground border-l-2 border-primary pl-3 py-0.5 hidden xl:block">
            {item.company}
          </span>
        )}
        {item.overview && (
          <ReadMore
            className="dark:text-gray-400 text-start md:text-lg capitalize"
            text={typeof item.overview === "string" ? item.overview : ""}
          />
        )}

        <div className="tecnologies flex items-center justify-start space-y-12">
          <div className="flex gap-8 items-center">
            {item.technologies?.map((t) =>
              t.logo?.url ? (
                <Image
                  key={t.documentId ?? t.id}
                  alt={t.name ?? String(t.id)}
                  className="tech-icon max-w-[40px] md:max-w-[65px]"
                  width={100}
                  height={100}
                  src={t.logo.url}
                />
              ) : null
            )}
          </div>
        </div>
        <div className="flex justify-start flex-wrap gap-3 xl:gap-4 w-full mt-4">

          {item.repo && (
            <Button
              asChild
              size="lg"
              variant="default"
              className="grow xl:grow-0 min-w-[150px]"
            >
              <a href={item.repo} target="_blank" rel="noreferrer" className="flex flex-row items-center justify-center gap-2">
                <Github className="w-5 h-5" />
                <span>Source Code</span>
              </a>
            </Button>
          )}
          {item.url && (
            <Button
              asChild
              size="lg"
               className="grow xl:grow-0 min-w-[150px]"
            >
              <a href={item.url} target="_blank" rel="noreferrer" className="flex flex-row items-center justify-center gap-2">
                <ExternalLink className="w-5 h-5" />
                <span>Live Preview</span>
              </a>
            </Button>
          )}
          {hasImages && (
            <Button
              size="lg"
              variant="outline"
              onClick={() => setVisible(true)}
              className="grow xl:grow-0 min-w-[150px] flex flex-row items-center justify-center gap-2"
            >
              <Images className="w-5 h-5" />
              <span>Gallery ({images.length})</span>
            </Button>
          )}
        </div>

        <div className="mt-4 w-full">
          <Link
            href={detailsHref}
            scroll={false}
            className="group flex justify-between items-center gap-2 font-medium hover:text-white hover:bg-black/20 dark:hover:bg-white/10 py-4 px-3   transition-all duration-300"
          >
            View Details
            <ArrowUpRight className="transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>

      <PhotoSlider
        images={images.map((src, i) => ({ src, key: `${src}-${i}` }))}
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </div>
  );
}
