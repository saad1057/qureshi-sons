"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

const W = 1600;
const H = 460;

const blobs = [
  { r: 150, x: 360, y: 230 },
  { r: 120, x: 760, y: 170 },
  { r: 170, x: 1180, y: 240 },
  { r: 95, x: 1450, y: 150 },
];

export default function FooterWordmark() {
  const root = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      const s = svg.current;
      if (!el || !s) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-wordmark]",
          { yPercent: 40 },
          {
            yPercent: 0,
            ease: "none",
            // Finish the rise before the footer sits flush with the viewport,
            // so the full wordmark is visible at the page end.
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom 92%", scrub: true },
          },
        );

        const drift = s.querySelectorAll<SVGCircleElement>("[data-drift]");
        drift.forEach((c, i) => {
          const b = blobs[i];
          const loop = () => {
            gsap.to(c, {
              attr: {
                cx: b.x + gsap.utils.random(-220, 220),
                cy: b.y + gsap.utils.random(-90, 90),
                r: b.r * gsap.utils.random(0.75, 1.25),
              },
              duration: gsap.utils.random(4, 7),
              ease: "sine.inOut",
              onComplete: loop,
            });
          };
          loop();
        });

        const follower = s.querySelector<SVGCircleElement>("[data-follow]");
        if (!follower) return;
        const pos = { x: W / 2, y: H * 0.6 };
        const render = () => {
          follower.setAttribute("cx", pos.x.toFixed(1));
          follower.setAttribute("cy", pos.y.toFixed(1));
        };
        const cx = gsap.quickTo(pos, "x", { duration: 1.4, ease: "power3.out", onUpdate: render });
        const cy = gsap.quickTo(pos, "y", { duration: 1.4, ease: "power3.out", onUpdate: render });

        const move = (e: PointerEvent) => {
          const rect = s.getBoundingClientRect();
          cx(((e.clientX - rect.left) / rect.width) * W);
          cy(((e.clientY - rect.top) / rect.height) * H);
        };
        const leave = () => {
          cx(W / 2);
          cy(H * 0.6);
        };
        const footer = el.closest("footer") ?? el;
        footer.addEventListener("pointermove", move as EventListener);
        footer.addEventListener("pointerleave", leave);
        return () => {
          footer.removeEventListener("pointermove", move as EventListener);
          footer.removeEventListener("pointerleave", leave);
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const textProps = {
    x: W / 2,
    y: H - 120,
    textAnchor: "middle" as const,
    fontSize: 290,
    textLength: W - 40,
    lengthAdjust: "spacingAndGlyphs" as const,
    style: { fontFamily: "var(--font-serif)", letterSpacing: "-0.02em" },
  };

  return (
    <div ref={root} className="relative pb-12 md:pb-16" aria-hidden>
      <div data-wordmark className="will-change-transform">
        <svg ref={svg} viewBox={`0 0 ${W} ${H}`} className="block w-full overflow-visible" preserveAspectRatio="xMidYMax meet">
          <defs>
            <radialGradient id="qs-brass" cx="35%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#f3dfb8" />
              <stop offset="45%" stopColor="#c9a26a" />
              <stop offset="100%" stopColor="#6e5530" />
            </radialGradient>
            <filter id="qs-goo" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="22" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -10" result="goo" />
              <feGaussianBlur in="goo" stdDeviation="3" />
            </filter>
            <filter id="qs-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="60" />
            </filter>
            <clipPath id="qs-letters">
              <text {...textProps}>Qureshi Sons</text>
            </clipPath>
            <g id="qs-blobs">
              {blobs.map((b, i) => (
                <circle key={i} data-drift cx={b.x} cy={b.y} r={b.r} fill="url(#qs-brass)" />
              ))}
              <circle data-follow cx={W / 2} cy={H * 0.6} r={130} fill="url(#qs-brass)" />
            </g>
          </defs>

          <g filter="url(#qs-glow)" opacity="0.22">
            <use href="#qs-blobs" />
          </g>
          <text {...textProps} fill="#2a2724">
            Qureshi Sons
          </text>
          <g clipPath="url(#qs-letters)">
            <g filter="url(#qs-goo)">
              <use href="#qs-blobs" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
