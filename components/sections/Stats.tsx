"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { stats, company } from "@/lib/data";
import { Star } from "@/components/ui/Icons";

function format(v: number, decimals: number) {
  return decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-US");
}

export default function Stats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        root.current?.querySelectorAll<HTMLElement>("[data-count]").forEach((el, i) => {
          const s = stats[i];
          const obj = { v: 0 };
          gsap.to(obj, {
            v: s.value,
            duration: 2.4,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            onUpdate: () => {
              el.textContent = format(obj.v, s.decimals);
            },
          });
        });
        gsap.from("[data-stat-rule]", {
          scaleX: 0,
          duration: 1.6,
          ease: "power4.inOut",
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-stone px-gutter py-[12vh]">
      <div className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label}>
            <div data-stat-rule className="mb-6 h-px origin-left bg-ink/25" />
            <div className="display flex items-start text-[clamp(3.6rem,7.5vw,7.5rem)] tabular-nums">
              <span data-count>{format(s.value, s.decimals)}</span>
              <span className="text-brass">{s.suffix}</span>
            </div>
            <div className="mt-4 text-[14px] font-medium">{s.label}</div>
            <div className="mt-1 flex items-center gap-2 text-[12px] text-taupe">
              {i === 0 && (
                <span className="flex text-brass" aria-label={`${company.rating} out of 5 stars`}>
                  {[1, 1, 1, 1, 0.4].map((f, k) => (
                    <Star key={k} filled={f} />
                  ))}
                </span>
              )}
              {s.note}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
