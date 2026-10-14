"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap, useGSAP, EASE_INOUT } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { lockScroll, unlockScroll } from "@/lib/lenis";
import { company } from "@/lib/data";
import { scheduleRows } from "@/lib/hours";
import { useLahoreStatus } from "@/lib/useLahoreStatus";
import { cn } from "@/lib/cn";
import TLink from "@/components/ui/TLink";
import { BrandMark, Arrow } from "@/components/ui/Icons";
import { StatusDot } from "./StatusDot";
import MenuNav from "./MenuNav";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const pathname = usePathname();
  const status = useLahoreStatus();

  const pill = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const openRef = useRef(open);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Intro + hide on scroll down / show on scroll up
  useGSAP(() => {
    const el = pill.current;
    if (!el) return;
    gsap.set(el, { yPercent: -180, autoAlpha: 0 });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lines = el.querySelectorAll("[data-mark-outline], [data-mark-arch]");
    const drop = el.querySelector("[data-mark-drop]");
    if (!reduce) {
      gsap.set(lines, { strokeDashoffset: 1 });
      gsap.set(drop, { autoAlpha: 0, y: -3 });
    }
    const off = onIntroDone(() => {
      gsap.to(el, { yPercent: 0, autoAlpha: 1, duration: 1.2, ease: "expo.out", delay: 0.35 });
      if (reduce) return;
      gsap
        .timeline({ delay: 0.55 })
        .to(lines, { strokeDashoffset: 0, duration: 1.4, stagger: 0.25, ease: "power2.inOut", clearProps: "strokeDashoffset" })
        .to(drop, { autoAlpha: 1, y: 0, duration: 0.9, ease: "expo.out", clearProps: "all" }, "-=0.35");
    });

    let lastY = window.scrollY;
    let hidden = false;
    const onScroll = () => {
      const y = window.scrollY;
      setCompact(y > 80);
      if (openRef.current) return;
      const down = y > lastY && y > 200;
      if (down !== hidden && Math.abs(y - lastY) > 2) {
        hidden = down;
        gsap.to(el, { yPercent: down ? -180 : 0, duration: 0.8, ease: "expo.out" });
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      off();
      window.removeEventListener("scroll", onScroll);
    };
  });

  // Menu timeline
  useGSAP(
    () => {
      const m = menu.current;
      if (!m) return;
      tl.current = gsap
        .timeline({
          paused: true,
          onReverseComplete: () => {
            gsap.set(m, { display: "none" });
          },
        })
        .set(m, { display: "flex" })
        .fromTo(m, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: EASE_INOUT })
        .fromTo(
          "[data-menu-link]",
          { y: 36, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.05, ease: "expo.out", clearProps: "transform" },
          0.35,
        )
        .fromTo("[data-menu-aside]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1, ease: "power2.out" }, 0.55)
        .fromTo("[data-menu-meta]", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.05 }, 0.5)
        .fromTo("[data-menu-rule]", { scaleX: 0 }, { scaleX: 1, duration: 1, ease: EASE_INOUT }, 0.3);
    },
    { scope: menu },
  );

  const locked = useRef(false);
  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    if (open) {
      if (!locked.current) lockScroll();
      locked.current = true;
      gsap.to(pill.current, { yPercent: 0, duration: 0.6 });
      t.timeScale(1).play();
    } else {
      t.timeScale(1.6).reverse();
      if (locked.current) unlockScroll();
      locked.current = false;
    }
  }, [open]);

  // Close instantly once the page-transition curtain covers the screen
  useEffect(() => {
    const onCovered = () => {
      if (!openRef.current) return;
      tl.current?.pause(0);
      if (menu.current) menu.current.style.display = "none";
      if (locked.current) unlockScroll();
      locked.current = false;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("qs:covered", onCovered);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("qs:covered", onCovered);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      <header
        ref={pill}
        className="pointer-events-none fixed inset-x-0 top-3 z-[60] flex justify-center px-3 md:top-5"
        style={{ visibility: "hidden" }}
      >
        <div className="pointer-events-auto flex h-12 max-w-full items-center gap-1 rounded-full border border-white/10 bg-ink/70 p-1 pl-1.5 text-ivory shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150 sm:h-14 sm:p-1.5 sm:pl-2">
          <TLink
            href="/"
            onClick={(e) => e.currentTarget.blur()}
            className="group flex min-w-0 items-center gap-1.5 rounded-full py-1 pl-1 pr-2.5 focus-visible:outline-offset-0 sm:gap-2 sm:pr-3.5"
            aria-label="Qureshi Sons — home"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[radial-gradient(circle_at_50%_60%,rgba(210,182,136,0.16),transparent_70%)] sm:h-10 sm:w-10">
              <BrandMark className="h-8 w-8 text-brass-light sm:h-9 sm:w-9" />
            </span>
            <span className="hidden items-baseline gap-[0.22em] font-serif text-[17px] leading-none tracking-[-0.01em] min-[380px]:flex sm:text-[19px]">
              <span>Qureshi</span>
              <span className="italic text-brass-light">Sons</span>
            </span>
          </TLink>

          <div
            className={cn(
              "hidden overflow-hidden transition-[grid-template-columns] duration-700 ease-[var(--ease-expo)] md:grid",
              compact && !open ? "grid-cols-[0fr]" : "grid-cols-[1fr]",
            )}
          >
            <div className="min-w-0">
              <div className="flex items-center gap-3 whitespace-nowrap border-l border-white/10 px-4 text-[12px] text-ivory/80">
                <StatusDot open={status?.open} />
                <span>{status ? status.label : "Showroom"}</span>
                <span className="text-ivory/40">{status ? status.detail : "Ferozpur Road"}</span>
                <span className="tabular-nums text-ivory/40">Lahore {status?.time ?? "--:--"}</span>
              </div>
            </div>
          </div>

          <TLink
            href="/contact"
            className="hidden h-11 items-center rounded-full px-4 text-[12px] text-ivory/80 transition-colors hover:text-ivory lg:flex"
          >
            Visit showroom
          </TLink>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="group flex h-10 shrink-0 items-center gap-2 rounded-full bg-ivory pl-4 pr-3 text-[12px] font-medium text-ink transition-colors duration-500 hover:bg-brass-light sm:h-11 sm:gap-3 sm:pl-5 sm:pr-4"
          >
            <span className="relative block h-[1.2em] overflow-hidden">
              <span className={cn("block transition-transform duration-700 ease-[var(--ease-expo)]", open && "-translate-y-1/2")}>
                <span className="block">Menu</span>
                <span className="block">Close</span>
              </span>
            </span>
            <span className="relative block h-3 w-4">
              <span
                className={cn(
                  "absolute left-0 top-[3px] h-px w-4 bg-ink transition-transform duration-500 ease-[var(--ease-expo)]",
                  open && "translate-y-[2.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[8px] h-px w-4 bg-ink transition-transform duration-500 ease-[var(--ease-expo)]",
                  open ? "-translate-y-[2.5px] -rotate-45" : "scale-x-[0.6] origin-right",
                )}
              />
            </span>
          </button>
        </div>
      </header>

      <div
        id="site-menu"
        ref={menu}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="fixed inset-0 z-[55] hidden flex-col bg-ink text-ivory"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
        data-lenis-prevent
      >
        <div className="flex h-dvh min-h-0 flex-col px-gutter pb-[max(1rem,env(safe-area-inset-bottom))] pt-20 sm:pt-24 md:pt-28">
          <nav
            aria-label="Primary"
            className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <MenuNav pathname={pathname} open={open} />
          </nav>

          <div className="shrink-0 pt-4 sm:pt-6">
            <div data-menu-rule className="mb-4 h-px origin-left bg-ink-line sm:mb-6" />
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-[12px] leading-snug text-ivory/70 sm:gap-6 sm:text-[13px] lg:grid-cols-4">
              <div data-menu-meta>
                <div className="eyebrow mb-1.5 text-sand sm:mb-2">Showroom</div>
                <div className="sm:hidden">{company.addressShort}</div>
                <div className="hidden sm:block">
                  {company.addressLines.map((l) => (
                    <div key={l}>{l}</div>
                  ))}
                </div>
              </div>
              <div data-menu-meta>
                <div className="eyebrow mb-1.5 text-sand sm:mb-2">Call</div>
                <a href={company.phoneHref} className="link-line text-ivory">
                  {company.phoneDisplay}
                </a>
              </div>
              <div data-menu-meta>
                <div className="eyebrow mb-1.5 text-sand sm:mb-2">Hours</div>
                {scheduleRows.map((r) => (
                  <div key={r.days}>
                    <span className="sm:hidden">{r.days.split("–")[0]?.trim() ?? r.days}</span>
                    <span className="hidden sm:inline">{r.days}</span>
                    <span className="text-ivory/40"> · {r.hours}</span>
                  </div>
                ))}
              </div>
              <div data-menu-meta className="lg:text-right">
                <div className="eyebrow mb-1.5 text-sand sm:mb-2">Directions</div>
                <a href={company.mapsUrl} target="_blank" rel="noreferrer" className="link-line inline-flex items-center gap-2 text-ivory">
                  Google Maps <Arrow direction="up-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
