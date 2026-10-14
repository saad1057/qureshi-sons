"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, MOTION_OK } from "@/lib/gsap";
import { Drop } from "@/components/ui/Icons";

const words = ["Faucets", "Rain showers", "Basins", "Wall-hung WCs", "Bathtubs", "Towel warmers", "Mixers", "Vanities"];

export default function Marquee({ dark = false }: { dark?: boolean }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const row = root.current?.querySelector<HTMLElement>("[data-row]");
        if (!row) return;
        const loop = gsap.to(row, { xPercent: -50, ease: "none", duration: 40, repeat: -1 });
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const speed = gsap.utils.clamp(1, 7, Math.abs(self.getVelocity()) / 250);
            gsap.to(loop, { timeScale: speed, duration: 0.3, overwrite: true });
            gsap.to(loop, { timeScale: 1, duration: 1.4, delay: 0.3 });
          },
        });
        return () => st.kill();
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const sequence = [...words, ...words];

  return (
    <div
      ref={root}
      aria-hidden
      className={`overflow-hidden border-y py-7 ${dark ? "border-ink-line bg-ink text-ivory/80" : "border-ink/10 bg-ivory text-ink/80"}`}
    >
      <div data-row className="flex w-max whitespace-nowrap">
        {sequence.map((w, i) => (
          <span key={i} className="flex items-center font-serif text-[clamp(2.2rem,4.4vw,4.4rem)] italic leading-none">
            <span className="px-8">{w}</span>
            <Drop className="text-brass" />
          </span>
        ))}
      </div>
    </div>
  );
}
