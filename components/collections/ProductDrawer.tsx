"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { lockScroll, unlockScroll } from "@/lib/lenis";
import { categories, company, finishes, type FinishId, type Product } from "@/lib/data";
import Button from "@/components/ui/Button";
import { Arrow } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

type Props = {
  product: Product | null;
  index: number;
  total: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
};

export default function ProductDrawer({ product, index, total, onClose, onStep }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const mounted = useRef(false);
  const [shown, setShown] = useState(product);
  const isOpen = !!product;

  if (product && product !== shown) setShown(product);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      if (!mounted.current) {
        mounted.current = true;
        gsap.set(panel.current, { xPercent: 100 });
        if (!isOpen) return;
      }
      if (isOpen) {
        gsap
          .timeline()
          .set(el, { visibility: "visible" })
          .to("[data-drawer-backdrop]", { autoAlpha: 1, duration: 0.6, ease: "power2.out" }, 0)
          .to(panel.current, { xPercent: 0, duration: 1.1, ease: "expo.out" }, 0);
        closeBtn.current?.focus({ preventScroll: true });
      } else {
        gsap
          .timeline({ onComplete: () => gsap.set(el, { visibility: "hidden" }) })
          .to(panel.current, { xPercent: 100, duration: 0.75, ease: "power3.inOut" }, 0)
          .to("[data-drawer-backdrop]", { autoAlpha: 0, duration: 0.6 }, 0.1);
      }
    },
    { dependencies: [isOpen], scope: root },
  );

  useEffect(() => {
    if (!isOpen) return;
    lockScroll();
    return () => unlockScroll();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, onStep]);

  return (
    <div ref={root} className="invisible fixed inset-0 z-[60]" aria-hidden={!isOpen}>
      <div
        data-drawer-backdrop
        className="invisible absolute inset-0 bg-ink/55 opacity-0 backdrop-blur-[3px]"
        onClick={onClose}
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={shown?.name}
        className="absolute inset-y-0 right-0 flex w-full flex-col bg-ivory text-ink shadow-[0_0_80px_rgba(0,0,0,0.25)] md:w-[min(640px,52vw)]"
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5 md:px-10">
          <div className="eyebrow tabular-nums text-taupe">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onStep(-1)}
              aria-label="Previous piece"
              className="grid size-10 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-ivory"
            >
              <Arrow direction="left" />
            </button>
            <button
              type="button"
              onClick={() => onStep(1)}
              aria-label="Next piece"
              className="grid size-10 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-ivory"
            >
              <Arrow />
            </button>
            <button
              ref={closeBtn}
              type="button"
              onClick={onClose}
              className="ml-2 inline-flex h-10 items-center gap-3 rounded-full bg-ink px-5 text-[12px] font-medium text-ivory transition-colors hover:bg-brass"
            >
              Close
              <span aria-hidden className="relative block size-3">
                <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-current" />
              </span>
            </button>
          </div>
        </div>

        <div data-lenis-prevent className="no-scrollbar flex-1 overflow-y-auto overscroll-contain">
          {shown && <DrawerBody key={shown.id} product={shown} />}
        </div>
      </div>
    </div>
  );
}

function DrawerBody({ product }: { product: Product }) {
  const body = useRef<HTMLDivElement>(null);
  const [finish, setFinish] = useState<FinishId>(product.finishes[0]);
  const category = categories.find((c) => c.id === product.category)!;
  const current = finishes.find((f) => f.id === finish)!;

  useGSAP(
    () => {
      gsap.from("[data-drawer-in]", { y: 30, autoAlpha: 0, duration: 1, stagger: 0.06, ease: "expo.out", delay: 0.15 });
      gsap.fromTo(
        "[data-drawer-img]",
        { clipPath: "inset(0% 0% 100% 0%)", scale: 1.15 },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.3, ease: "expo.out", delay: 0.05 },
      );
    },
    { scope: body },
  );

  return (
    <div ref={body} className="px-6 pb-10 pt-6 md:px-10">
      <div className="relative aspect-[4/5] overflow-hidden bg-stone sm:aspect-[5/4]">
        <div data-drawer-img className="absolute inset-0">
          <Image src={product.image} alt={product.alt} fill sizes="(max-width: 768px) 100vw, 640px" className="object-cover" quality={85} />
        </div>
        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-ivory/90 py-1.5 pl-1.5 pr-4 text-[12px] backdrop-blur">
          <span className={cn("block size-5 rounded-full", `finish-${finish}`)} />
          Shown in {current.name}
        </div>
      </div>

      <div data-drawer-in className="eyebrow mt-10 text-taupe">
        {category.name}
      </div>
      <h2 data-drawer-in className="display mt-4 text-[clamp(2.6rem,4.4vw,4.2rem)]">
        {product.name}
      </h2>
      <p data-drawer-in className="mt-2 font-serif text-[1.35rem] italic text-brass">
        {product.meaning}
      </p>
      <p data-drawer-in className="mt-6 max-w-[48ch] text-[15px] leading-relaxed text-ink/75">
        {product.description}
      </p>

      <div data-drawer-in className="mt-10 border-t border-ink/10 pt-6">
        <div className="flex items-baseline justify-between">
          <div className="eyebrow text-taupe">Finish</div>
          <div className="text-[13px]">{current.name}</div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3" role="radiogroup" aria-label="Finish">
          {product.finishes.map((f) => {
            const meta = finishes.find((x) => x.id === f)!;
            return (
              <button
                key={f}
                type="button"
                role="radio"
                aria-checked={finish === f}
                aria-label={meta.name}
                onClick={() => setFinish(f)}
                className={cn(
                  "grid size-11 place-items-center rounded-full border transition-colors duration-300",
                  finish === f ? "border-ink" : "border-transparent hover:border-ink/30",
                )}
              >
                <span className={cn("block size-8 rounded-full", `finish-${f}`)} />
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-taupe">{current.note}</p>
      </div>

      <dl data-drawer-in className="mt-10 border-t border-ink/10">
        {product.specs.map((s, i) => (
          <div key={s} className="flex items-baseline gap-6 border-b border-ink/10 py-3.5 text-[14px]">
            <dt className="eyebrow w-6 shrink-0 text-taupe">{String(i + 1).padStart(2, "0")}</dt>
            <dd>{s}</dd>
          </div>
        ))}
      </dl>

      <div data-drawer-in className="mt-10 flex flex-wrap gap-3">
        <Button href={`/contact?product=${product.id}&finish=${finish}`} variant="solid" magnetic={false}>
          Enquire about this piece
        </Button>
        <Button href={company.phoneHref} external variant="outline" magnetic={false}>
          Call the showroom
        </Button>
      </div>
      <p data-drawer-in className="mt-5 text-[12px] text-taupe">
        Prices on request. Every piece is on display at our showroom on Ferozpur Road.
      </p>
    </div>
  );
}
