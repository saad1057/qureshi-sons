"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { usePageTransition } from "@/components/layout/PageTransition";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

export default function TLink({ href, onClick, children, ...rest }: Props) {
  const navigate = usePageTransition();
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        navigate(href);
      }}
    >
      {children}
    </Link>
  );
}
