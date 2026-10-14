"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE_INOUT } from "@/lib/gsap";
import { markIntroDone } from "@/lib/intro";
import { lockScroll, unlockScroll } from "@/lib/lenis";
import { BrandMark } from "@/components/ui/Icons";

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.to(el, {
          autoAlpha: 0,
          duration: 0.4,
          delay: 0.2,
          onComplete: () => {
            el.style.display = "none";
            markIntroDone();
          },
        });
        return;
      }

      const mobile = window.matchMedia("(max-width: 767px)").matches;
      lockScroll();
      let locked = true;
      const release = () => {
        if (!locked) return;
        locked = false;
        unlockScroll();
      };
      const progress = { v: 0 };
      const letters = el.querySelectorAll("[data-letter]");
      const enterDuration = mobile ? 0.65 : 1.1;
      const enterStagger = mobile ? 0.022 : 0.035;
      const progressDuration = mobile ? 0.9 : 2.1;
      const exitAt = mobile ? 1 : 2.15;
      const markAt = mobile ? 1.3 : 2.55;
      const curtainAt = mobile ? 1.2 : 2.45;
      const curtainDuration = mobile ? 0.65 : 1.1;

      const tl = gsap.timeline({
        onComplete: () => {
          el.style.display = "none";
          release();
        },
      });

      tl.from(letters, { yPercent: 115, duration: enterDuration, stagger: enterStagger, ease: "expo.out" }, 0.1)
        .from("[data-pre-meta]", { autoAlpha: 0, y: 12, duration: mobile ? 0.45 : 0.8, stagger: 0.1 }, mobile ? 0.2 : 0.4)
        .to(
          progress,
          {
            v: 100,
            duration: progressDuration,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counter.current) counter.current.textContent = String(Math.round(progress.v)).padStart(3, "0");
            },
          },
          0,
        )
        .to("[data-pre-bar]", { scaleX: 1, duration: progressDuration, ease: "power2.inOut" }, 0)
        .fromTo(
          "[data-pre-mark] [data-mark-outline], [data-pre-mark] [data-mark-arch]",
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: mobile ? 0.7 : 1.3, stagger: mobile ? 0.12 : 0.22, ease: "power2.inOut" },
          0,
        )
        .fromTo(
          "[data-pre-mark] [data-mark-drop]",
          { autoAlpha: 0, y: -3 },
          { autoAlpha: 1, y: 0, duration: mobile ? 0.45 : 0.8, ease: "expo.out" },
          mobile ? 0.65 : 1.2,
        )
        .to("[data-pre-mark]", { autoAlpha: 0, y: -10, duration: mobile ? 0.3 : 0.5, ease: "power3.in" }, exitAt)
        .to(letters, { yPercent: -115, duration: mobile ? 0.4 : 0.7, stagger: mobile ? 0.012 : 0.02, ease: "power3.in" }, exitAt)
        .to("[data-pre-meta]", { autoAlpha: 0, duration: mobile ? 0.25 : 0.4 }, exitAt)
        .add(() => markIntroDone(), markAt)
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: curtainDuration, ease: EASE_INOUT }, curtainAt);

      return release;
    },
    { scope: root },
  );

  const word = "Qureshi Sons".split("");

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-gutter py-8 text-ivory"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      aria-hidden
    >
      <div className="flex items-start justify-between">
        <span data-pre-meta className="eyebrow text-sand">
          Importers of fine sanitaryware
        </span>
        <span data-pre-meta className="eyebrow text-sand">
          Lahore — Est. on Ferozpur Road
        </span>
      </div>

      <div className="flex flex-col items-center gap-5 md:gap-7">
        <div data-pre-mark>
          <BrandMark className="h-14 w-14 text-brass-light md:h-20 md:w-20" />
        </div>
        <div className="flex justify-center overflow-hidden pb-[0.1em]">
          <h2 className="display flex text-[clamp(3.2rem,11vw,11rem)]">
            {word.map((ch, i) => (
              <span key={i} data-letter className={ch === " " ? "w-[0.28em]" : i >= 8 ? "inline-block italic text-brass-light" : "inline-block"}>
                {ch === " " ? "\u00a0" : ch}
              </span>
            ))}
          </h2>
        </div>
      </div>

      <div className="flex items-end justify-between gap-8">
        <div className="relative h-px w-full max-w-[420px] bg-ink-line">
          <div data-pre-bar className="absolute inset-0 origin-left scale-x-0 bg-brass" />
        </div>
        <span ref={counter} className="display text-[clamp(2.5rem,6vw,5rem)] tabular-nums leading-none">
          000
        </span>
      </div>
    </div>
  );
}
