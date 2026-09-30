"use client";

import * as React from "react";
import { cn } from "@/shared/lib/utils";

export interface ScalesProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size, in pixels, of the gap between hairlines. */
  size?: number;
  /** Hairline color. Defaults to a faint neutral wash, meant as texture, not an accent. */
  color?: string;
}

/**
 * Subtle woven-hairline texture used as a frame border around a photo:
 * a fine diagonal repeating-linear-gradient over a barely-there tint,
 * low contrast by design. Meant to bleed past the edges of the strip
 * it's placed in and fade out via a mask utility.
 */
export const Scales = React.forwardRef<HTMLDivElement, ScalesProps>(
  ({ size = 8, color = "rgba(255, 255, 255, 0.1)", className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        aria-hidden
        className={cn("pointer-events-none h-full w-full bg-white/[0.03]", className)}
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${color} 0, ${color} 1px, transparent 1px, transparent ${size}px)`,
          ...style,
        }}
        {...props}
      />
    );
  }
);
Scales.displayName = "Scales";
