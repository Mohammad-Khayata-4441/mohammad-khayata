import Animator from "@/app/components/Animator";
import React from "react";

export default function SectionTitle(props: {
  title: React.ReactNode;
  subtitle: React.ReactNode;
}) {
  return (
    <Animator className="flex justify-center flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground capitalize headline-glow">
        {props.title}
      </h1>
      <p className="text-lg max-w-(--breakpoint-lg) capitalize text-center text-muted-soft mb-12 lg:mb-24 hero-subtitle">
        {props.subtitle}
      </p>
    </Animator>
  );
}
