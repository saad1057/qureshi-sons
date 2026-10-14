"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { isIntroDone, onIntroDone } from "@/lib/intro";
import { company, media } from "@/lib/data";
import Button from "@/components/ui/Button";
import { Drop } from "@/components/ui/Icons";

const chapters = [
  { label: "Pour", end: 6.4 },
  { label: "Light", end: 12.2 },
  { label: "Stone", end: 18.6 },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const names = useRef<(HTMLSpanElement | null)[]>([]);
  const [videoSrc, setVideoSrc] = useState<string>();
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    let frame = 0;
    if (!mobile) {
      frame = requestAnimationFrame(() => setVideoSrc(media.heroVideo));
      return () => cancelAnimationFrame(frame);
    }

    if (isIntroDone()) {
      frame = requestAnimationFrame(() => setVideoSrc(media.heroVideo));
      return () => cancelAnimationFrame(frame);
    }

    return onIntroDone(() => setVideoSrc(media.heroVideo));
  }, []);

  useEffect(() => {
    if (!videoSrc || !video.current) return;
    const el = video.current;
    el.load();
    void el.play().catch(() => {
      // The poster remains visible if a browser blocks autoplay.
    });
  }, [videoSrc]);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      // Chapter progress tied to the reel's playhead
      const v = video.current;
      let raf = 0;
      const tick = () => {
        if (v) {
          const t = v.currentTime;
          let startAt = 0;
          chapters.forEach((c, i) => {
            const p = gsap.utils.clamp(0, 1, (t - startAt) / (c.end - startAt));
            const bar = bars.current[i];
            if (bar) bar.style.transform = `scaleX(${p})`;
            const name = names.current[i];
            if (name) name.style.opacity = t >= startAt && t < c.end ? "1" : "0.4";
            startAt = c.end;
          });
        }
        raf = requestAnimationFrame(tick);
      };
      const desktop = window.matchMedia("(min-width: 768px)");
      if (desktop.matches) raf = requestAnimationFrame(tick);

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const intro = gsap.timeline({ paused: true });
        intro
          .fromTo("[data-hero-media]", { scale: 1.25 }, { scale: 1, duration: 2.6, ease: "expo.out" }, 0)
          .from("[data-hero-line]", { yPercent: 115, duration: 1.6, stagger: 0.12, ease: "expo.out" }, 0.1)
          .from("[data-hero-fade]", { autoAlpha: 0, y: 24, duration: 1.2, stagger: 0.08, ease: "expo.out" }, 0.6);

        const off = onIntroDone(() => intro.play());

        gsap.to("[data-hero-media]", {
          yPercent: 18,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-content]", {
          yPercent: -12,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: { trigger: el, start: "35% top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-shade]", {
          opacity: 0.85,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
        return () => off();
      });

      return () => {
        cancelAnimationFrame(raf);
        mm.revert();
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative min-h-[100svh] bg-ink text-ivory">
      <div className="absolute inset-0 overflow-hidden">
        <div data-hero-media className="absolute inset-0 will-change-transform">
          <Image
            src={media.heroPoster}
            alt=""
            fill
            preload
            quality={75}
            sizes="(max-width: 767px) 100vw, 1px"
            className="object-cover md:hidden"
            aria-hidden
          />
          <video
            ref={video}
            className={`relative h-full w-full object-cover transition-opacity duration-1000 ${
              videoReady ? "opacity-100" : "opacity-0 md:opacity-100"
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload={videoSrc ? "metadata" : "none"}
            poster={media.heroPoster}
            onCanPlay={() => setVideoReady(true)}
            aria-hidden
          >
            {videoSrc && <source src={videoSrc} type="video/mp4" />}
          </video>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,25,23,0.6)_0%,rgba(26,25,23,0.18)_24%,rgba(26,25,23,0.18)_72%,rgba(26,25,23,0.78)_100%)] md:bg-[linear-gradient(180deg,rgba(26,25,23,0.72)_0%,rgba(26,25,23,0.42)_30%,rgba(26,25,23,0.5)_58%,rgba(26,25,23,0.9)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_115%_58%_at_50%_52%,rgba(26,25,23,0.66)_0%,rgba(26,25,23,0.34)_52%,transparent_82%)] md:bg-[linear-gradient(90deg,rgba(26,25,23,0.72)_0%,rgba(26,25,23,0.45)_38%,rgba(26,25,23,0.12)_68%,transparent_100%)]" />
        <div data-hero-shade className="absolute inset-0 bg-ink opacity-0" />
      </div>

      <div
        data-hero-content
        className="relative z-10 flex min-h-[max(100svh,36rem)] flex-col px-6 pb-[max(5.5rem,calc(env(safe-area-inset-bottom)+4.5rem))] pt-[5.5rem] sm:px-gutter md:min-h-[100svh] md:pb-10 md:pt-28 lg:pb-12"
      >
        {/* Top meta — desktop only; mobile keeps the frame open for the film */}
        <div className="hidden shrink-0 items-start justify-between text-ivory [text-shadow:0_2px_24px_rgba(26,25,23,0.85)] md:flex">
          <div data-hero-fade className="eyebrow flex items-center gap-2">
            <Drop className="text-brass-light drop-shadow-[0_1px_14px_rgba(26,25,23,0.85)]" /> Importers of fine sanitaryware
          </div>
          <div data-hero-fade className="eyebrow">
            {company.coordsLabel}
          </div>
        </div>

        {/* Title zone — centered on mobile; sits above the composed bottom bar on desktop */}
        <div className="my-auto min-w-0 pt-6 text-center md:my-0 md:flex md:min-h-0 md:flex-1 md:flex-col md:justify-end md:pb-8 md:pt-6 md:text-left lg:pb-10">
          <div data-hero-fade className="eyebrow mb-5 flex items-center justify-center gap-2 text-[10px] text-brass-light [text-shadow:0_2px_18px_rgba(26,25,23,0.9)] md:hidden">
            <Drop className="size-3.5 shrink-0" /> Importers of fine sanitaryware
          </div>

          <h1 className="display text-[clamp(3.1rem,15vw,12rem)] text-ivory [text-shadow:0_4px_48px_rgba(26,25,23,0.95),0_2px_12px_rgba(26,25,23,0.7),0_0_2px_rgba(26,25,23,0.9)] md:text-[clamp(3.25rem,8.8vw,9.5rem)]">
            <span className="block overflow-hidden pb-[0.06em]">
              <span data-hero-line className="block">
                Water,
              </span>
            </span>
            <span className="-mt-[0.04em] block overflow-hidden pb-[0.12em] pl-[0.12em] pr-[0.12em] md:-mt-[0.06em] md:pl-[12vw] lg:pl-[14vw]">
              <span data-hero-line className="block italic text-brass-light [text-shadow:0_4px_48px_rgba(26,25,23,0.95),0_2px_12px_rgba(26,25,23,0.75),0_0_2px_rgba(26,25,23,0.9)]">
                composed.
              </span>
            </span>
          </h1>

          {/* Mobile-only stack under the title */}
          <div className="mt-6 flex flex-col items-center gap-7 sm:mt-8 md:hidden">
            <p
              data-hero-fade
              className="mx-auto max-w-[30ch] text-[14px] leading-[1.6] text-ivory/90 [text-shadow:0_2px_20px_rgba(26,25,23,0.9)] sm:max-w-[34ch] sm:text-[15px]"
            >
              Weighted faucets, monsoon showers and basins for a lifetime of mornings — shown on Ferozpur Road, Lahore.
            </p>
            <div data-hero-fade className="w-full max-w-[20rem] shrink-0">
              <Button
                href="/collections"
                variant="light"
                magnetic={false}
                className="h-12 w-full justify-center px-6 text-[13px]"
              >
                Explore collections
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop composed bottom bar — always fully in view */}
        <div className="hidden shrink-0 items-end justify-between gap-8 md:flex lg:gap-12">
          <p
            data-hero-fade
            className="max-w-[34ch] text-[14px] leading-relaxed text-ivory [text-shadow:0_2px_20px_rgba(26,25,23,0.9)] lg:max-w-[38ch] lg:text-[15px]"
          >
            Faucets that feel weighted in the hand, showers that fall like monsoon rain, basins shaped for a lifetime of mornings.
            Curated from the world&apos;s best makers, shown in our showroom on Ferozpur Road, Lahore.
          </p>

          <div data-hero-fade className="min-w-0 flex-1 px-4 lg:px-10 xl:px-16">
            <div className="mx-auto grid max-w-md grid-cols-3 gap-4 lg:gap-6">
              {chapters.map((c, i) => (
                <div key={c.label}>
                  <div className="relative h-px bg-ivory/20">
                    <span
                      ref={(n) => {
                        bars.current[i] = n;
                      }}
                      className="absolute inset-0 origin-left scale-x-0 bg-ivory"
                    />
                  </div>
                  <span
                    ref={(n) => {
                      names.current[i] = n;
                    }}
                    className="eyebrow mt-3 block text-[10px] text-ivory transition-opacity duration-500 [text-shadow:0_1px_12px_rgba(26,25,23,0.65)]"
                  >
                    0{i + 1} — {c.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div data-hero-fade className="shrink-0">
            <Button
              href="/collections"
              variant="light"
              magnetic={false}
              className="h-12 justify-center px-6 text-[13px]"
            >
              Explore collections
            </Button>
          </div>
        </div>
      </div>

      <div
        data-hero-fade
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-10 flex flex-col items-center gap-2.5 md:hidden"
      >
        <span className="eyebrow text-[9px] tracking-[0.3em] text-ivory/60">Scroll</span>
        <span className="relative block h-9 w-px overflow-hidden bg-ivory/15">
          <span className="qs-scroll-cue absolute inset-x-0 top-0 h-1/2 bg-brass-light" />
        </span>
      </div>
    </section>
  );
}
