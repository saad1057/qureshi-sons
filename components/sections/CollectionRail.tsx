"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { categories, products } from "@/lib/data";
import TLink from "@/components/ui/TLink";
import RevealText from "@/components/ui/RevealText";
import { Arrow } from "@/components/ui/Icons";

export default function CollectionRail() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      const t = track.current;
      if (!el || !t) return;
      const mm = gsap.matchMedia();

      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const distance = () => t.scrollWidth - window.innerWidth;
        const tween = gsap.to(t, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(categories.length, Math.floor(self.progress * categories.length) + 1);
              if (counter.current) counter.current.textContent = String(idx).padStart(2, "0");
              if (progress.current) progress.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });

        t.querySelectorAll<HTMLElement>("[data-rail-img]").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -10 },
            {
              xPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: img.parentElement,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-stone lg:h-screen">
      <div className="flex h-full flex-col py-24 lg:py-10 xl:py-12">
        <div className="mb-8 flex shrink-0 flex-col gap-6 px-gutter md:flex-row md:items-end md:justify-between lg:mb-8">
          <div>
            <div className="eyebrow mb-5 text-taupe lg:mb-4">(02) Collections</div>
            <RevealText as="h2" className="display text-[clamp(2.8rem,5.4vw,5.4rem)]">
              Six rooms of <em className="text-brass">craft</em>
            </RevealText>
          </div>
          <div className="hidden items-center gap-6 lg:flex">
            <span className="eyebrow text-taupe">
              <span ref={counter} className="tabular-nums text-ink">
                01
              </span>{" "}
              / {String(categories.length).padStart(2, "0")}
            </span>
            <div className="relative h-px w-40 bg-ink/15">
              <div ref={progress} className="absolute inset-0 origin-left scale-x-0 bg-ink" />
            </div>
          </div>
        </div>

        <div className="no-scrollbar min-h-0 overflow-x-auto lg:flex-1 lg:overflow-visible">
          <div
            ref={track}
            className="flex w-max items-stretch gap-5 px-gutter will-change-transform lg:h-full lg:gap-7"
          >
            {categories.map((c, i) => {
              const count = products.filter((p) => p.category === c.id).length;
              return (
                <TLink
                  key={c.id}
                  href={`/collections?c=${c.id}`}
                  className="group flex w-[74vw] shrink-0 flex-col sm:w-[46vw] lg:w-[27vw]"
                >
                  <div className="relative aspect-[4/5] min-h-0 overflow-hidden bg-sand/30 lg:aspect-auto lg:flex-1">
                    <div data-rail-img className="absolute inset-y-0 -left-[12%] -right-[12%]">
                      <Image
                        src={c.image}
                        alt={c.name}
                        fill
                        sizes="(max-width: 1024px) 74vw, 30vw"
                        className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-expo)] group-hover:scale-[1.06]"
                      />
                    </div>
                    <div className="absolute left-4 top-4 rounded-full bg-ivory/85 px-3 py-1.5 text-[11px] font-medium tabular-nums backdrop-blur">
                      {count} pieces
                    </div>
                  </div>
                  <div className="mt-4 flex shrink-0 items-start justify-between gap-4 lg:mt-5">
                    <div className="min-w-0">
                      <div className="eyebrow mb-1.5 text-taupe">{String(i + 1).padStart(2, "0")}</div>
                      <h3 className="font-serif text-[clamp(1.7rem,2.2vw,2.25rem)] leading-none">{c.name}</h3>
                      <p className="mt-2 max-w-[28ch] text-[13px] leading-snug text-ink/65 lg:mt-2.5 lg:leading-relaxed">
                        {c.blurb}
                      </p>
                    </div>
                    <span className="mt-5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/20 transition-[border-color,background-color,color] duration-500 ease-[var(--ease-expo)] group-hover:border-ink group-hover:bg-ink group-hover:text-ivory">
                      <Arrow />
                    </span>
                  </div>
                </TLink>
              );
            })}

            <TLink
              href="/collections"
              className="group flex w-[74vw] shrink-0 flex-col justify-between bg-ink p-8 text-ivory sm:w-[46vw] lg:w-[24vw]"
            >
              <span className="eyebrow text-sand">The full catalogue</span>
              <span className="display text-[clamp(2.6rem,4vw,4.4rem)]">
                See every <em className="text-brass-light">piece</em>
              </span>
              <span className="flex items-center gap-3 text-[13px]">
                {products.length} pieces in six finishes
                <Arrow className="transition-transform duration-500 group-hover:translate-x-2" />
              </span>
            </TLink>
          </div>
        </div>
      </div>
    </section>
  );
}
