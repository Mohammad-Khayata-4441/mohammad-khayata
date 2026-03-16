"use client";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/shared/lib/utils";

interface TypewriterEffectProps {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}

/**
 * Aceternity-style typewriter effect.
 * Renders words one character at a time, looping through the array.
 */
export const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  words,
  className,
  cursorClassName,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Cursor blink
  useEffect(() => {
    const blink = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    const currentWord = words[wordIndex]?.text ?? "";
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < currentWord.length) {
      // Typing
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 80);
    } else if (!isDeleting && charIndex === currentWord.length) {
      // Pause before deleting
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && charIndex > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 45);
    } else if (isDeleting && charIndex === 0) {
      // Move to next word
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words]);

  const currentWordClassName = words[wordIndex]?.className;

  return (
    <span className={cn("inline", className)}>
      <span className={cn(currentWordClassName)}>{displayedText}</span>
      <span
        className={cn(
          "inline-block w-0.75 h-[1em] ml-1 align-middle rounded-full bg-primary animate-pulse",
          cursorClassName,
          showCursor ? "opacity-100" : "opacity-0"
        )}
      />
    </span>
  );
};
