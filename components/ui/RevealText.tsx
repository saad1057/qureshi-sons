"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";

type Tag = "h1" | "h2" | "h3" | "p" | "div" | "span";

type Props = {
  as?: Tag;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  start?: string;
  stagger?: number;
  id?: string;
};

export default function RevealText({
  as = "div",
  children,
  className,
  delay = 0,
  start = "top 88%",
  stagger = 0.09,
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const Component = as as React.ElementType;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "rt-line",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 112,
              duration: 1.3,
              ease: "expo.out",
              stagger,
              delay,
              scrollTrigger: { trigger: el, start, once: true },
            });
          },
        });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Component ref={ref} className={className} id={id}>
      {children}
    </Component>
  );
}
