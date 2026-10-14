"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { nav } from "@/lib/data";
import { cn } from "@/lib/cn";
import TLink from "@/components/ui/TLink";
import { Arrow } from "@/components/ui/Icons";

const notes: Record<string, string> = {
  "/": "The house. Water, composed.",
  "/collections": "Twenty-eight pieces across six rooms, in six finishes.",
  "/projects": "Homes, hotels and headquarters we have fitted.",
  "/about": "A Lahore family, four chapters in.",
  "/contact": "Visit Ferozpur Road, or call the showroom.",
};

const pad = (n: number) => String(n).padStart(2, "0");
const EASE = "ease-[var(--ease-expo)]";

export default function MenuNav({ pathname, open }: { pathname: string; open: boolean }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const activeIndex = Math.max(
    0,
    nav.findIndex((n) => n.href === pathname),
  );
  const shown = hovered ?? activeIndex;

  const list = useRef<HTMLUListElement>(null);
  const marker = useRef<HTMLSpanElement>(null);
  const placed = useRef(false);

  useEffect(() => {
    if (!open) {
      placed.current = false;
      return;
    }
    let raf = 0;
    let tries = 0;
    const place = () => {
      const row = list.current?.children[shown] as HTMLElement | undefined;
      const m = marker.current;
      if (!row || !m) return;
      if (!row.offsetHeight && tries++ < 20) {
        raf = requestAnimationFrame(place);
        return;
      }
      const y = row.offsetTop + row.offsetHeight / 2;
      gsap.to(m, { y, duration: placed.current ? 0.9 : 0, ease: "expo.out", overwrite: true });
      placed.current = true;
    };
    raf = requestAnimationFrame(place);
    const onResize = () => {
      placed.current = false;
      place();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [shown, open]);

  return (
    <div className="grid min-h-full grid-cols-1 items-center gap-10 py-4 lg:grid-cols-12">
      <div className="relative lg:col-span-8" onPointerLeave={() => setHovered(null)}>
        <span
          ref={marker}
          aria-hidden
          data-menu-aside
          className="pointer-events-none absolute left-0 top-0 h-px w-4 -translate-y-1/2 bg-brass-light sm:w-6"
        />
        <ul ref={list} className="flex flex-col">
          {nav.map((item, i) => {
            const isActive = i === activeIndex;
            const isShown = i === shown;
            const dimmed = hovered !== null && hovered !== i;
            return (
              <li key={item.href} data-menu-link>
                <TLink
                  href={item.href}
                  onPointerEnter={() => setHovered(i)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  className={cn(
                    "flex w-full items-center gap-4 py-[0.12em] pl-7 transition-opacity duration-700 sm:gap-6 sm:pl-10",
                    EASE,
                    dimmed ? "opacity-30" : "opacity-100",
                  )}
                >
                  <span
                    className={cn(
                      "eyebrow w-6 shrink-0 text-[10px] transition-colors duration-700 sm:text-[11px]",
                      EASE,
                      isShown ? "text-brass-light" : "text-sand/70",
                    )}
                  >
                    {pad(i + 1)}
                  </span>
                  <span
                    className={cn(
                      "display whitespace-nowrap pr-[0.15em] text-[clamp(2.3rem,min(10vw,10.5vh),7.5rem)] leading-[1.02] transition-[color,transform] duration-[900ms]",
                      EASE,
                      isActive && "italic",
                      isShown ? "translate-x-2 text-brass-light sm:translate-x-4" : "translate-x-0 text-ivory",
                    )}
                  >
                    {item.label}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "hidden items-center gap-3 text-brass-light transition-[opacity,transform] duration-[900ms] sm:flex",
                      EASE,
                      hovered === i ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0",
                    )}
                  >
                    <span
                      className={cn(
                        "block h-px w-[min(9vw,7rem)] origin-left bg-current transition-transform duration-[900ms]",
                        EASE,
                        hovered === i ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                    <Arrow />
                  </span>
                </TLink>
              </li>
            );
          })}
        </ul>
      </div>

      <div data-menu-aside className="hidden select-none lg:col-span-4 lg:flex lg:flex-col lg:items-end lg:text-right">
        <div className="eyebrow mb-4 text-sand">{hovered === null ? "You are here" : "Go to"}</div>
        <div className="display h-[1em] overflow-hidden pr-[0.08em] text-[clamp(7rem,min(16vw,32vh),17rem)] leading-none">
          <div
            className={cn("transition-transform duration-[1100ms]", EASE)}
            style={{ transform: `translateY(-${shown}em)` }}
          >
            {nav.map((item, i) => (
              <div
                key={item.href}
                className="h-[1em] italic text-transparent [-webkit-text-stroke:1.5px_#b08d57]"
              >
                {pad(i + 1)}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 grid w-full max-w-[22rem] justify-items-end">
          {nav.map((item, i) => (
            <p
              key={item.href}
              aria-hidden={i !== shown}
              className={cn(
                "col-start-1 row-start-1 text-[14px] leading-relaxed text-ivory/70 transition-[opacity,transform] duration-700",
                EASE,
                i === shown ? "translate-y-0 opacity-100 delay-150" : "translate-y-3 opacity-0",
              )}
            >
              {notes[item.href]}
              <span className="eyebrow mt-2 block text-[10px] text-sand/60">{item.href === "/" ? "/home" : item.href}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
