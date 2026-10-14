"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { media } from "@/lib/data";
import RevealImage from "@/components/ui/RevealImage";
import TLink from "@/components/ui/TLink";
import { Arrow } from "@/components/ui/Icons";

type Segment = string | { em: string };

const statement: Segment[] = [
  "We are a Lahore family of importers who believe a bathroom is the first room of the day. For years we have travelled to bring",
  { em: "honest, heavy, beautifully made" },
  "fittings home — and to fit them with the care of people who will see you again.",
];

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-word]",
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: { trigger: "[data-statement]", start: "top 78%", end: "bottom 45%", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  let wordIndex = 0;

  return (
    <section ref={root} className="relative bg-ivory px-gutter py-[16vh] md:py-[22vh]">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <div className="eyebrow mb-8 text-taupe">(01) The house</div>
          <RevealImage
            src={media.brassTap}
            alt="Ornate antique brass tap set into a weathered stone wall"
            ratio="3 / 4"
            className="hidden w-[78%] lg:block"
            sizes="20vw"
          />
          <p className="mt-4 hidden text-[12px] text-taupe lg:block">Fig. 01 — Where it began: brass, stone and water.</p>
        </div>

        <div className="lg:col-span-9">
          <p data-statement className="display text-[clamp(2.1rem,4.7vw,4.9rem)] leading-[1.04]">
            {statement.map((seg, i) => {
              if (typeof seg === "string") {
                return seg.split(" ").map((w) => (
                  <span key={`${i}-${wordIndex++}`} data-word className="inline">
                    {w}{" "}
                  </span>
                ));
              }
              return seg.em.split(" ").map((w) => (
                <span key={`${i}-${wordIndex++}`} data-word className="inline italic text-brass">
                  {w}{" "}
                </span>
              ));
            })}
          </p>

          <div className="mt-16 grid grid-cols-1 gap-10 text-[15px] leading-relaxed text-ink/75 md:grid-cols-2 lg:mt-24 lg:w-[78%]">
            <p>
              Qureshi Sons imports sanitaryware and bath fittings for homes, hotels and offices across Pakistan. Every range we carry
              has been tested in our own showroom before it reaches yours.
            </p>
            <div>
              <p>
                You can turn every handle, feel every spray and compare finishes side by side, with advice from people who have
                fitted thousands of bathrooms.
              </p>
              <TLink href="/about" className="link-line mt-6 inline-flex items-center gap-2 font-medium text-ink">
                Our story <Arrow />
              </TLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
