"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { finishes, media } from "@/lib/data";
import { cn } from "@/lib/cn";
import RevealText from "@/components/ui/RevealText";

export default function Finishes() {
  const [active, setActive] = useState(1);
  const [desktop, setDesktop] = useState(false);
  const current = finishes[active];

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const visibleFinishes = desktop ? finishes : [current];

  return (
    <section className="relative overflow-hidden bg-ink px-gutter py-[16vh] text-ivory">
      {desktop && (
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-screen"
          src={media.splashVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
        />
      )}

      <div className="relative">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="eyebrow mb-6 text-sand">(04) Finishes</div>
            <RevealText as="h2" className="display text-[clamp(2.8rem,6.4vw,6.6rem)]">
              Six finishes. <em className="text-brass-light">One standard.</em>
            </RevealText>
          </div>
          <p className="max-w-[38ch] text-[14px] leading-relaxed text-ivory/65">
            Every finish is applied over solid, lead-free brass and tested against Lahore&apos;s hard water. Choose one, or mix
            them room by room.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <ul className="lg:col-span-5" role="tablist" aria-label="Finishes">
            {finishes.map((f, i) => (
              <li key={f.id} className="border-t border-ink-line last:border-b">
                <button
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group flex w-full items-center gap-6 py-5 text-left"
                >
                  <span className="eyebrow w-6 text-sand">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`finish-${f.id} h-8 w-8 shrink-0 rounded-full transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-110`} />
                  <span
                    className={cn(
                      "font-serif text-[clamp(1.6rem,2.6vw,2.6rem)] leading-none transition-all duration-700 ease-[var(--ease-expo)]",
                      i === active ? "translate-x-2 italic text-brass-light" : "text-ivory/55",
                    )}
                  >
                    {f.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="relative lg:col-span-7">
            <div className="relative grid grid-cols-5 items-center gap-6">
              <div className="relative col-span-3 aspect-[4/5] overflow-hidden">
                {visibleFinishes.map((f) => (
                  <div
                    key={f.id}
                    className={cn(
                      "absolute inset-0 transition-[opacity,transform,clip-path] duration-[1.2s] ease-[var(--ease-expo)]",
                      f.id === current.id
                        ? "scale-100 opacity-100 [clip-path:inset(0%_0%_0%_0%)]"
                        : "scale-110 opacity-0 [clip-path:inset(0%_0%_100%_0%)]",
                    )}
                  >
                    <Image
                      src={f.image}
                      alt={`${f.name} fitting`}
                      fill
                      sizes="(max-width: 767px) 58vw, (max-width: 1024px) 60vw, 34vw"
                      quality={desktop ? 75 : 60}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="col-span-2">
                <div className="relative mx-auto aspect-square w-full max-w-[220px]">
                  {finishes.map((f, i) => (
                    <div
                      key={f.id}
                      className={cn(
                        `finish-${f.id} absolute inset-0 rounded-full shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] transition-[opacity,transform] duration-[1s] ease-[var(--ease-expo)]`,
                        i === active ? "scale-100 opacity-100" : "scale-75 opacity-0",
                      )}
                    />
                  ))}
                </div>
                <div className="mt-10" aria-live="polite">
                  <div className="eyebrow mb-3 text-sand">{String(active + 1).padStart(2, "0")} / 06</div>
                  <div className="font-serif text-[1.9rem] leading-tight">{current.name}</div>
                  <p className="mt-3 text-[13px] leading-relaxed text-ivory/65">{current.note}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
