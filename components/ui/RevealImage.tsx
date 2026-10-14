"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, EASE_INOUT, MOTION_OK } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  ratio?: string;
  parallax?: number;
  from?: "bottom" | "top" | "left" | "right";
  preload?: boolean;
  quality?: number;
};

const startClip = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

export default function RevealImage({
  src,
  alt,
  className,
  imgClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  ratio,
  parallax = 8,
  from = "bottom",
  preload,
  quality = 75,
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      const media = inner.current;
      if (!el || !media) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          el,
          { clipPath: startClip[from] },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            ease: EASE_INOUT,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          },
        );
        gsap.fromTo(
          media,
          { scale: 1.28 },
          { scale: 1, duration: 1.9, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } },
        );
      });
      if (parallax) {
        mm.add(`${MOTION_OK} and (min-width: 768px)`, () => {
          gsap.fromTo(
            media,
            { yPercent: -parallax },
            {
              yPercent: parallax,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      }
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className={cn("relative overflow-hidden bg-stone", className)}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <div ref={inner} className="absolute inset-x-0 -inset-y-[10%] will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={quality}
          preload={preload}
          className={cn("object-cover", imgClassName)}
        />
      </div>
    </div>
  );
}
