"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import RevealImage from "@/components/ui/RevealImage";
import RevealText from "@/components/ui/RevealText";

export type Chapter = { numeral: string; title: string; text: string; image: string; alt: string };

export default function Chapters({ chapters }: { chapters: Chapter[] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-chapter-line]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-chapter-list]", start: "top 60%", end: "bottom 60%", scrub: true },
          },
        );
        gsap.utils.toArray<HTMLElement>("[data-chapter]").forEach((el) => {
          gsap.fromTo(
            el.querySelector("[data-numeral]"),
            { color: "#b9ae9f" },
            {
              color: "#b08d57",
              scrollTrigger: { trigger: el, start: "top 62%", end: "bottom 62%", toggleActions: "play reverse play reverse" },
              duration: 0.6,
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-stone px-gutter py-[16vh]">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[18vh]">
            <div className="eyebrow mb-6 text-taupe">(02) The chapters</div>
            <RevealText as="h2" className="display text-[clamp(2.8rem,5vw,5.2rem)]">
              Four chapters, <em className="text-brass">one counter.</em>
            </RevealText>
            <p className="mt-8 max-w-[36ch] text-[14px] leading-relaxed text-ink/70">
              We would rather tell you how we work than give you a list of dates. This is how a trading counter became a
              showroom people drive across Lahore to visit.
            </p>
          </div>
        </div>

        <ol data-chapter-list className="relative lg:col-span-7 lg:col-start-6">
          <span aria-hidden className="absolute bottom-0 left-0 top-0 hidden w-px bg-ink/15 md:block" />
          <span aria-hidden data-chapter-line className="absolute bottom-0 left-0 top-0 hidden w-px origin-top bg-brass md:block" />
          {chapters.map((c) => (
            <li key={c.numeral} data-chapter className="grid grid-cols-1 gap-8 pb-[12vh] last:pb-0 md:grid-cols-7 md:pl-12">
              <div className="md:col-span-4">
                <div data-numeral className="display text-[clamp(4rem,7vw,7rem)] italic text-sand">
                  {c.numeral}
                </div>
                <h3 className="mt-4 font-serif text-[clamp(1.6rem,2.4vw,2.4rem)] leading-tight">{c.title}</h3>
                <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-ink/75">{c.text}</p>
              </div>
              <div className="md:col-span-3 md:pt-6">
                <RevealImage src={c.image} alt={c.alt} ratio="4 / 5" sizes="(max-width: 768px) 100vw, 22vw" parallax={6} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
