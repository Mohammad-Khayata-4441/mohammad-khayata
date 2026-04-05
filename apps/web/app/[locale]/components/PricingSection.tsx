"use client";

import Animator from "@/app/components/Animator";
import SpotlightCard from "@/app/components/SpotlightCard/SpotlightCard";
import SectionTitle from "@/shared/components/SectionTitle";
import type { HomeData } from "@/services/home";
import { Check, Flame, Sparkles, Zap } from "lucide-react";

type Pricing = NonNullable<HomeData["pricings"]>[number];

interface PricingSectionProps {
  pricings?: HomeData["pricings"];
}

export const PricingSection = ({ pricings }: PricingSectionProps) => {
  if (!pricings?.length) return null;

  return (
    <section className="px-4 md:px-0">
      <div className="container max-w-(--breakpoint-xl) mx-auto">
        <SectionTitle
          title="Services Pricing "
          subtitle="Estimated prices vary depending on the project type. Contact me to get a suitable price for your project."
        />

        <div
          className={`grid grid-cols-1 gap-6 mx-auto ${
            pricings.length === 1
              ? "max-w-md"
              : pricings.length === 2
                ? "md:grid-cols-2 max-w-(--breakpoint-lg)"
                : "md:grid-cols-2 lg:grid-cols-4 max-w-(--breakpoint-xl)"
          }`}
        >
          {pricings.map((pricing, index) => (
            <Animator
              key={pricing.documentId}
              variant="scale-up"
              className="h-full"
            >
              <PricingCard pricing={pricing} index={index} />
            </Animator>
          ))}
        </div>
      </div>
    </section>
  );
};

function PricingCard({
  pricing,
  index,
}: {
  pricing: Pricing;
  index: number;
}) {
  const isHot = pricing.isHot;
  const features: string[] = Array.isArray(pricing.features)
    ? pricing.features
    : [];

  return (
    <div className="relative h-full group">
      {/* Hot badge */}
      {isHot && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider shadow-[0_0_30px_rgba(232,87,61,0.4)]">
            <Flame className="w-3.5 h-3.5" />
            Most Popular
          </div>
        </div>
      )}

      <SpotlightCard
        className={`h-full transition-all duration-500 ${
          isHot
            ? "border-primary/40 shadow-[0_0_40px_rgba(232,87,61,0.12)] hover:shadow-[0_0_60px_rgba(232,87,61,0.2)]"
            : "hover:border-white/15"
        }`}
        spotlightColor={
          isHot
            ? "rgba(232, 87, 61, 0.25)"
            : "rgba(255, 255, 255, 0.15)"
        }
      >
        <div className="flex flex-col h-full gap-6">
          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isHot ? "bg-primary/20" : "bg-white/6"
                } transition-colors duration-300`}
              >
                {isHot ? (
                  <Zap className="w-5 h-5 text-primary" />
                ) : index === 0 ? (
                  <Sparkles className="w-5 h-5 text-primary/70" />
                ) : (
                  <Zap className="w-5 h-5 text-primary/70" />
                )}
              </div>
              <h3 className="text-xl font-bold text-foreground tracking-tight">
                {pricing.title}
              </h3>
            </div>

            {pricing.description && (
              <p className="text-sm text-muted-soft leading-relaxed">
                {pricing.description}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="relative">
            <div
              className={`flex items-baseline gap-1 ${
                isHot ? "drop-shadow-[0_0_20px_rgba(232,87,61,0.3)]" : ""
              }`}
            >
              <span className="text-xs font-medium text-muted-soft uppercase tracking-wider">
                From
              </span>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-4xl md:text-5xl font-extrabold tabular-nums text-foreground">
                {pricing.startFrom ? `$${pricing.startFrom}` : "Contact "}
              </span>
            </div>

            {/* Subtle glow line under price for hot plan */}
            {isHot && (
              <div className="absolute -bottom-3 left-0 w-16 h-0.5 rounded-full bg-linear-to-r from-primary/60 to-transparent" />
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />

          {/* Features */}
          {features.length > 0 && (
            <ul className="flex-1 space-y-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 group/item">
                  <div
                    className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      isHot
                        ? "bg-primary/20 text-primary"
                        : "bg-white/6 text-white/50 group-hover/item:text-primary group-hover/item:bg-primary/10"
                    } transition-colors duration-300`}
                  >
                    <Check className="w-3 h-3" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-muted-soft group-hover/item:text-foreground/80 transition-colors duration-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* CTA Button */}
          <div className="pt-2">
            <a
              href="#contact"
              className={`block w-full text-center py-3 px-6 rounded-xl font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                isHot
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(232,87,61,0.25)] hover:shadow-[0_0_30px_rgba(232,87,61,0.4)] hover:-translate-y-0.5"
                  : "bg-white/6 text-foreground border border-white/8 hover:bg-white/10 hover:border-white/15 hover:-translate-y-0.5"
              }`}
            >
              Contact
            </a>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
}
