"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { lockScroll, unlockScroll } from "@/lib/lenis";
import type { Project } from "@/lib/data";
import Button from "@/components/ui/Button";
import { Arrow } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

type Props = {
  project: Project | null;
  index: number;
  total: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
};

export default function ProjectLightbox({ project, index, total, onClose, onStep }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);
  const [shown, setShown] = useState(project);
  const isOpen = !!project;

  if (project && project !== shown) setShown(project);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      if (!mounted.current) {
        mounted.current = true;
        if (!isOpen) return;
      }
      if (isOpen) {
        gsap
          .timeline()
          .set(el, { visibility: "visible" })
          .fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.05, ease: "power4.inOut" });
      } else {
        gsap
          .timeline({ onComplete: () => gsap.set(el, { visibility: "hidden" }) })
          .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.85, ease: "power4.inOut" });
      }
    },
    { dependencies: [isOpen], scope: root },
  );

  useEffect(() => {
    if (!isOpen) return;
    lockScroll();
    return () => unlockScroll();
  }, [isOpen]);

  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label={shown?.title}
      aria-hidden={!isOpen}
      className="invisible fixed inset-0 z-[60] bg-ink text-ivory"
    >
      {shown && (
        <LightboxBody key={shown.id} project={shown} index={index} total={total} onClose={onClose} onStep={onStep} active={isOpen} />
      )}
    </div>
  );
}

function LightboxBody({
  project,
  index,
  total,
  onClose,
  onStep,
  active,
}: {
  project: Project;
  index: number;
  total: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
  active: boolean;
}) {
  const body = useRef<HTMLDivElement>(null);
  const [img, setImg] = useState(0);
  const z = useRef(1);
  const count = project.gallery.length;

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setImg((i) => (i + 1) % count);
      if (e.key === "ArrowLeft") setImg((i) => (i - 1 + count) % count);
      if (e.key === "ArrowDown" || e.key === "PageDown") onStep(1);
      if (e.key === "ArrowUp" || e.key === "PageUp") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, count, onClose, onStep]);

  useGSAP(
    () => {
      gsap.from("[data-lb-in]", { y: 40, autoAlpha: 0, duration: 1.1, stagger: 0.06, ease: "expo.out", delay: 0.35 });
    },
    { scope: body },
  );

  useGSAP(
    () => {
      const el = body.current?.querySelector<HTMLElement>(`[data-lb-img="${img}"]`);
      if (!el) return;
      z.current += 1;
      gsap.set(el, { zIndex: z.current });
      gsap.fromTo(
        el,
        { clipPath: "inset(0% 0% 0% 100%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.15, ease: "power4.inOut" },
      );
      gsap.fromTo(el.firstElementChild, { scale: 1.2, xPercent: 6 }, { scale: 1, xPercent: 0, duration: 1.6, ease: "expo.out" });
    },
    { dependencies: [img], scope: body },
  );

  return (
    <div ref={body} className="flex h-full flex-col lg:grid lg:grid-cols-12">
      <div className="relative h-[52svh] shrink-0 overflow-hidden bg-ink-soft lg:col-span-8 lg:h-full">
        {project.gallery.map((src, i) => (
          <div key={src + i} data-lb-img={i} className="absolute inset-0 overflow-hidden" style={{ zIndex: i === 0 ? 1 : 0 }}>
            <div className="absolute inset-0">
              <Image
                src={src}
                alt={i === 0 ? project.alt : `${project.title}, image ${i + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                quality={85}
                className="object-cover"
              />
            </div>
          </div>
        ))}
        <div className="pointer-events-none absolute inset-0 z-[999] bg-gradient-to-t from-ink/60 via-transparent to-ink/30" />

        <button
          type="button"
          aria-label="Previous image"
          onClick={() => setImg((i) => (i - 1 + count) % count)}
          className="absolute inset-y-0 left-0 z-[1000] w-1/2"
        />
        <button
          type="button"
          aria-label="Next image"
          onClick={() => setImg((i) => (i + 1) % count)}
          className="absolute inset-y-0 right-0 z-[1000] w-1/2"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1001] flex items-end justify-between gap-6 p-5 md:p-8">
          <div className="eyebrow tabular-nums text-ivory/80">
            {String(img + 1).padStart(2, "0")} — {String(count).padStart(2, "0")}
          </div>
          <div className="pointer-events-auto flex gap-2">
            {project.gallery.map((src, i) => (
              <button
                key={src + i}
                type="button"
                aria-label={`Show image ${i + 1}`}
                onClick={() => setImg(i)}
                className={cn(
                  "relative h-14 w-20 overflow-hidden outline outline-1 outline-offset-2 transition-all duration-500 md:h-16 md:w-24",
                  i === img ? "outline-ivory" : "opacity-50 outline-transparent hover:opacity-90",
                )}
              >
                <Image src={src} alt="" fill sizes="96px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        data-lenis-prevent
        className="no-scrollbar flex flex-1 flex-col overflow-y-auto px-6 pb-8 pt-6 md:px-10 lg:col-span-4 lg:pt-8"
      >
        <div className="flex items-center justify-between">
          <div className="eyebrow tabular-nums text-sand">
            Project {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 items-center gap-3 rounded-full border border-ivory/25 px-5 text-[12px] font-medium transition-colors hover:bg-ivory hover:text-ink"
          >
            Close
            <span aria-hidden className="relative block size-3">
              <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-current" />
              <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-current" />
            </span>
          </button>
        </div>

        <div className="mt-10 lg:mt-auto">
          <div data-lb-in className="eyebrow text-brass-light">
            {project.type}
          </div>
          <h2 data-lb-in className="display mt-5 text-[clamp(2.6rem,4.2vw,4.6rem)]">
            {project.title}
          </h2>
          <p data-lb-in className="mt-6 text-[15px] leading-relaxed text-ivory/75">
            {project.summary}
          </p>

          <dl data-lb-in className="mt-8 border-t border-ivory/10 text-[13px]">
            {[
              ["Location", project.location],
              ["Year", project.year],
              ["Scope", project.scope],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 border-b border-ivory/10 py-3">
                <dt className="text-sand">{k}</dt>
                <dd className="text-right">{v}</dd>
              </div>
            ))}
          </dl>

          <div data-lb-in className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={`/contact?project=${project.id}`} variant="brass" magnetic={false}>
              Start a similar project
            </Button>
          </div>

          <div data-lb-in className="mt-10 flex items-center justify-between border-t border-ivory/10 pt-5 text-[12px] text-sand">
            <button type="button" onClick={() => onStep(-1)} className="inline-flex items-center gap-2 transition-colors hover:text-ivory">
              <Arrow direction="left" /> Previous project
            </button>
            <button type="button" onClick={() => onStep(1)} className="inline-flex items-center gap-2 transition-colors hover:text-ivory">
              Next project <Arrow />
            </button>
          </div>
          <p className="mt-4 hidden text-[11px] text-sand/60 lg:block">← → images · ↑ ↓ projects · Esc to close</p>
        </div>
      </div>
    </div>
  );
}
