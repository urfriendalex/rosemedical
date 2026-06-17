"use client";

import Image from "next/image";
import { motion, type MotionProps } from "motion/react";
import type { ReactNode } from "react";

const revealViewport = { once: true, margin: "-80px" };
const revealEase = [0.22, 1, 0.36, 1] as const;

type AnimatedHeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4";
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function AnimatedHeading({
  as = "h2",
  children,
  className,
  delay = 0,
}: AnimatedHeadingProps) {
  const Component = {
    h1: motion.h1,
    h2: motion.h2,
    h3: motion.h3,
    h4: motion.h4,
  }[as];

  return (
    <Component
      className={`reveal-motion font-display ${className ?? ""}`}
      initial={{ opacity: 0, transform: "translateY(30px)", filter: "blur(12px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" }}
      viewport={revealViewport}
      transition={{ duration: 0.9, delay, ease: revealEase }}
    >
      {children}
    </Component>
  );
}

export function AnimatedText({
  children,
  className,
  delay = 0.15,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.p
      className={`reveal-motion ${className ?? ""}`}
      initial={{ opacity: 0, transform: "translateY(20px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={revealViewport}
      transition={{ duration: 0.7, delay, ease: revealEase }}
    >
      {children}
    </motion.p>
  );
}

export function MaskedImage({
  src,
  alt,
  className,
  delay = 0,
  priority = false,
  sizes = "100vw",
  imageClassName = "object-cover",
  motionProps,
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  priority?: boolean;
  sizes?: string;
  imageClassName?: string;
  motionProps?: MotionProps;
}) {
  return (
    <motion.div
      className={`reveal-media ${className ?? ""}`}
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={revealViewport}
      transition={{ duration: 1.1, delay, ease: revealEase }}
      {...motionProps}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={imageClassName}
      />
    </motion.div>
  );
}
