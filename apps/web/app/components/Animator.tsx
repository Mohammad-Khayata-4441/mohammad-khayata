"use client";
import React from "react";
import { motion, TargetAndTransition, Transition } from "motion/react";
import { HTMLMotionProps } from "motion/react";

const variants: Record<
  string,
  {
    initial: TargetAndTransition;
    whileInView: TargetAndTransition;
    transition?: Transition;
  }
> = {
  "blur-up": {
    initial: {
      opacity: 0,
      filter: "blur(12px)",
      y: 60,
      scale: 0.96,
    },
    whileInView: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
    },
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 18,
      mass: 0.8,
    },
  },
  "blur-down": {
    initial: {
      opacity: 0,
      filter: "blur(12px)",
      y: -60,
      scale: 0.96,
    },
    whileInView: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
    },
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 18,
      mass: 0.8,
    },
  },
  "scale-up": {
    initial: {
      opacity: 0,
      filter: "blur(16px)",
      scale: 0.3,
      rotate: -4,
    },
    whileInView: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
    },
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 14,
      mass: 0.6,
    },
  },
  "scale-down": {
    initial: {
      opacity: 0,
      filter: "blur(16px)",
      scale: 1.8,
      rotate: 4,
    },
    whileInView: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
    },
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 14,
      mass: 0.6,
    },
  },
  fade: {
    initial: {
      opacity: 0,
      filter: "blur(8px)",
      scale: 0.98,
    },
    whileInView: {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
    },
    transition: {
      type: "tween",
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  "slide-left": {
    initial: {
      opacity: 0,
      filter: "blur(10px)",
      x: 80,
      rotate: 2,
    },
    whileInView: {
      opacity: 1,
      x: 0,
      rotate: 0,
      filter: "blur(0px)",
    },
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 16,
      mass: 0.7,
    },
  },
  "slide-right": {
    initial: {
      opacity: 0,
      filter: "blur(10px)",
      x: -80,
      rotate: -2,
    },
    whileInView: {
      opacity: 1,
      x: 0,
      rotate: 0,
      filter: "blur(0px)",
    },
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 16,
      mass: 0.7,
    },
  },
  glide: {
    initial: {
      opacity: 0,
      filter: "blur(14px)",
      x: 40,
      y: 40,
      scale: 0.92,
    },
    whileInView: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
    },
    transition: {
      type: "tween",
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  float: {
    initial: {
      opacity: 0,
      filter: "blur(6px)",
      y: 30,
      scale: 0.95,
    },
    whileInView: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
    },
    transition: {
      type: "tween",
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  elastic: {
    initial: {
      opacity: 0,
      filter: "blur(10px)",
      y: 80,
      scale: 0.6,
    },
    whileInView: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
    },
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 12,
      mass: 0.5,
    },
  },
  flip: {
    initial: {
      opacity: 0,
      filter: "blur(8px)",
      rotateX: 90,
      y: 30,
    },
    whileInView: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      filter: "blur(0px)",
    },
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 15,
      mass: 0.8,
    },
  },
  unfold: {
    initial: {
      opacity: 0,
      filter: "blur(12px)",
      scaleY: 0.4,
      scaleX: 0.8,
      y: 20,
    },
    whileInView: {
      opacity: 1,
      scaleY: 1,
      scaleX: 1,
      y: 0,
      filter: "blur(0px)",
    },
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 0.7,
    },
  },
  rise: {
    initial: {
      opacity: 0,
      filter: "blur(6px)",
      y: 100,
      rotate: -6,
      scale: 0.9,
    },
    whileInView: {
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      filter: "blur(0px)",
    },
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 14,
      mass: 1,
    },
  },
  zoom: {
    initial: {
      opacity: 0,
      filter: "blur(20px)",
      scale: 0,
    },
    whileInView: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    transition: {
      type: "tween",
      duration: 0.7,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

export default function Animator(
  props: {
    children: React.ReactNode;
    className?: string;
    variant?: keyof typeof variants;
  } & HTMLMotionProps<"div">
) {
  const { variant = "blur-up", ...rest } = props;
  const preset = variants[variant];

  return (
    <motion.div
      className={props.className}
      initial={preset.initial}
      whileInView={preset.whileInView}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        ...preset.transition,
        ...rest.transition,
      }}
    >
      {props.children}
    </motion.div>
  );
}
