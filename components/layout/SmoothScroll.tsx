"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/lenis";

export default function SmoothScroll() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nativeTouch = window.matchMedia("(pointer: coarse), (max-width: 767px)").matches;
    if (reduce || nativeTouch) return;

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.1,
      anchors: true,
    });
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
