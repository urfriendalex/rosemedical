"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type AnimatedLinkProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark";
  axis?: "diagonal" | "x" | "x-reverse" | "y";
  className?: string;
  href: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

export function AnimatedLink({
  children,
  variant = "primary",
  axis = "diagonal",
  className = "",
  href,
  ...props
}: AnimatedLinkProps) {
  const classes = {
    primary: "hero-primary-button",
    secondary: "hero-secondary-link",
    dark: "animated-pill-dark",
  };

  const content = (
    <>
      <span>{children}</span>
      <span className={`masked-arrow axis-${axis}`} aria-hidden>
        <ArrowUpRight className="arrow-one h-4 w-4" />
        <ArrowUpRight className="arrow-two h-4 w-4" />
      </span>
    </>
  );

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={`${classes[variant]} ${className}`} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={`${classes[variant]} ${className}`} {...props}>
      {content}
    </a>
  );
}
