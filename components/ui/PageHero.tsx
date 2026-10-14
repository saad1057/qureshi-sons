"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import { isIntroDone, onIntroDone } from "@/lib/intro";
import { cn } from "@/lib/cn";

type Props = {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
};

export default function PageHero({
  index,
  eyebrow,
  title,
  intro,
  aside,
  className,
  tone = "light",
  image,
  imageAlt = "",
  imagePosition = "object-center",
}: Props) {
  const root = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = heading.current;
      if (!el || !root.current) return;
      const fades = root.current.querySelectorAll("[data-hero-fade]");
      const rules = root.current.querySelectorAll("[data-hero-rule]");
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "rt-line" });
        gsap.set(split.lines, { yPercent: 112 });
        gsap.set(fades, { autoAlpha: 0, y: 24 });
        if (rules.length) gsap.set(rules, { scaleX: 0 });

        // After a client-side navigation the curtain still covers the page for ~0.5s.
        const delay = isIntroDone() ? 0.5 : 0.15;
        const off = onIntroDone(() => {
          gsap
            .timeline({ delay })
            .to(split.lines, { yPercent: 0, duration: 1.5, stagger: 0.1, ease: "expo.out" })
            .to(rules, { scaleX: 1, duration: 1.4, ease: "expo.inOut" }, 0.1)
            .to(fades, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.08, ease: "expo.out" }, 0.45);
        });
        return () => {
          off();
          split.revert();
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const dark = tone === "dark";

  return (
    <header
      ref={root}
      className={cn(
        "relative",
        image ? "px-0 pb-0 pt-0 md:px-gutter md:pb-20 md:pt-[26vh]" : "px-gutter pb-14 pt-[24vh] md:pb-20 md:pt-[26vh]",
        dark ? "bg-ink text-ivory" : "bg-ivory text-ink",
        className,
      )}
    >
      {image && (
        <div className="absolute inset-x-0 top-0 h-[68svh] overflow-hidden md:hidden">
          <Image
            src={image}
            alt={imageAlt}
            fill
            preload
            quality={75}
            sizes="100vw"
            className={cn("object-cover", imagePosition)}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,25,23,0.52)_0%,rgba(26,25,23,0.12)_36%,rgba(26,25,23,0.45)_66%,rgba(26,25,23,0.92)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(26,25,23,0.42)_0%,transparent_75%)]" />
        </div>
      )}

      <div
        className={cn(
          "relative z-10",
          image && "flex min-h-[68svh] flex-col justify-end px-gutter pb-10 pt-28 text-ivory md:block md:min-h-0 md:p-0 md:text-inherit",
        )}
      >
        <div
          data-hero-fade
          className={cn(
            "eyebrow mb-8 flex items-center gap-4 md:mb-10",
            image ? "text-sand [text-shadow:0_2px_16px_rgba(26,25,23,0.8)] md:text-taupe md:[text-shadow:none]" : dark ? "text-sand" : "text-taupe",
          )}
        >
          <span>({index})</span>
          <span className={cn("h-px w-10", image ? "bg-sand/60 md:bg-taupe/50" : dark ? "bg-sand/50" : "bg-taupe/50")} />
          <span>{eyebrow}</span>
        </div>

        <h1
          ref={heading}
          className={cn(
            "display max-w-[14ch] text-[clamp(3.35rem,13.5vw,6rem)] md:text-[clamp(3.6rem,10.4vw,11.5rem)]",
            image && "[text-shadow:0_4px_36px_rgba(26,25,23,0.72)] md:[text-shadow:none]",
          )}
        >
          {title}
        </h1>
      </div>

      {(intro || aside) && (
        <div
          className={cn(
            image ? "relative z-10 bg-ivory px-gutter py-10 text-ink md:mt-20 md:bg-transparent md:p-0 md:text-inherit" : "mt-14 md:mt-20",
          )}
        >
          <div data-hero-rule className={cn("h-px w-full origin-left", dark ? "bg-ivory/15" : "bg-ink/15")} />
          <div className="mt-7 grid grid-cols-1 gap-7 md:mt-8 md:grid-cols-12 md:gap-8">
            {aside && (
              <div
                data-hero-fade
                className={cn(
                  "order-2 border-t border-ink/10 pt-5 text-[12px] leading-relaxed md:order-none md:col-span-4 md:border-0 md:pt-0 md:text-[13px]",
                  dark ? "text-sand" : "text-taupe",
                )}
              >
                {aside}
              </div>
            )}
            {intro && (
              <div
                data-hero-fade
                className={cn(
                  "order-1 max-w-[52ch] text-[15px] leading-relaxed md:order-none md:col-span-6 md:col-start-7 md:text-[clamp(1rem,1.25vw,1.2rem)]",
                  dark ? "text-ivory/80" : "text-ink/75",
                )}
              >
                {intro}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
