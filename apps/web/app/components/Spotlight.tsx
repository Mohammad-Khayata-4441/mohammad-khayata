"use client";
import React, { useRef, useEffect } from "react";
import { cn } from "@/shared/lib/utils";

interface SpotlightProps {
  className?: string;
  fill?: string;
  /** second spotlight fill colour */
  fill2?: string;
}

/**
 * Aceternity-inspired SVG spotlight that slowly animates across the hero.
 * Two overlapping radial "cones" cast warm orange ambient light.
 */
export const Spotlight: React.FC<SpotlightProps> = ({
  className,
  fill = "rgba(232, 87, 61, 0.18)",
  fill2 = "rgba(255, 107, 53, 0.10)",
}) => {
  return (
    <svg
      className={cn(
        "pointer-events-none absolute z-1 h-[169%] w-[138%] animate-spotlight opacity-0",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter-spotlight-1)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill}
          fillOpacity="0.21"
        />
      </g>
      <g filter="url(#filter-spotlight-2)">
        <ellipse
          cx="1600"
          cy="200"
          rx="1600"
          ry="200"
          transform="matrix(-0.75 -0.66 -0.66 0.75 3200 1800)"
          fill={fill2}
          fillOpacity="0.15"
        />
      </g>
      <defs>
        <filter
          id="filter-spotlight-1"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur" />
        </filter>
        <filter
          id="filter-spotlight-2"
          x="0"
          y="0"
          width="3787"
          height="2842"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="180" result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </svg>
  );
};
