"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger, EASE_INOUT } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { nav } from "@/lib/data";

type Navigate = (href: string) => void;

const TransitionContext = createContext<Navigate>(() => {});

export function usePageTransition() {
  return useContext(TransitionContext);
}

function labelFor(href: string) {
  const path = href.split(/[?#]/)[0] || "/";
  return nav.find((n) => n.href === path)?.label ?? "Qureshi Sons";
}

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const [label, setLabel] = useState("");

  const navigate = useCallback<Navigate>(
    (href) => {
      const targetPath = href.split(/[?#]/)[0] || "/";
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (targetPath === pathname && !href.includes("?")) {
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(0, { duration: 1.4 });
        else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        document.dispatchEvent(new CustomEvent("qs:covered"));
        return;
      }
      if (busy.current) return;

      if (reduce || !curtainRef.current) {
        document.dispatchEvent(new CustomEvent("qs:covered"));
        router.push(href);
        return;
      }

      busy.current = true;
      setLabel(labelFor(href));
      const curtain = curtainRef.current;

      gsap
        .timeline({
          onComplete: () => {
            document.dispatchEvent(new CustomEvent("qs:covered"));
            if (targetPath === pathname) {
              router.push(href);
              reveal();
            } else {
              router.push(href);
            }
          },
        })
        .set(curtain, { display: "flex", clipPath: "inset(100% 0% 0% 0%)" })
        .to(curtain, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.85, ease: EASE_INOUT })
        .fromTo(
          labelRef.current,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.7, ease: "expo.out" },
          "-=0.35",
        );
    },
    [pathname, router],
  );

  function reveal() {
    const curtain = curtainRef.current;
    if (!curtain) return;
    const lenis = getLenis();
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true, force: true });

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      gsap
        .timeline({
          onComplete: () => {
            gsap.set(curtain, { display: "none" });
            busy.current = false;
          },
        })
        .to(labelRef.current, { yPercent: -110, duration: 0.5, ease: "power3.in" })
        .to(curtain, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.9, ease: EASE_INOUT }, "-=0.15");
    });
  }

  useEffect(() => {
    if (busy.current) {
      reveal();
    } else {
      const id = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => cancelAnimationFrame(id);
    }
  }, [pathname]);

  return (
    <TransitionContext.Provider value={navigate}>
      {children}
      <div
        ref={curtainRef}
        aria-hidden
        className="fixed inset-0 z-[80] hidden items-center justify-center bg-ink text-ivory"
        style={{ clipPath: "inset(100% 0% 0% 0%)" }}
      >
        <div className="overflow-hidden pb-[0.12em]">
          <div ref={labelRef} className="display text-[clamp(3.5rem,10vw,9rem)] italic">
            {label}
          </div>
        </div>
        <div className="eyebrow absolute bottom-8 left-1/2 -translate-x-1/2 text-sand">Qureshi Sons — Lahore</div>
      </div>
    </TransitionContext.Provider>
  );
}
