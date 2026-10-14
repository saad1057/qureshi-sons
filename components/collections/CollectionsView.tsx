"use client";

import Image from "next/image";
import { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { gsap, Flip, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { categories, finishes, products, type CategoryId } from "@/lib/data";
import ProductDrawer from "./ProductDrawer";
import { cn } from "@/lib/cn";

type Filter = CategoryId | "all";

const counts = Object.fromEntries(categories.map((c) => [c.id, products.filter((p) => p.category === c.id).length]));

export default function CollectionsView() {
  const params = useSearchParams();
  const c = params.get("c");
  const active: Filter = categories.some((x) => x.id === c) ? (c as CategoryId) : "all";
  const openId = params.get("p");

  const section = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const dock = useRef<HTMLDivElement>(null);
  const dockPill = useRef<HTMLSpanElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);

  const visible = useMemo(() => (active === "all" ? products : products.filter((p) => p.category === active)), [active]);
  const openIndex = visible.findIndex((p) => p.id === openId);
  const open = openIndex >= 0 ? visible[openIndex] : (products.find((p) => p.id === openId) ?? null);
  const category = categories.find((x) => x.id === active);

  const setQuery = useCallback((next: Record<string, string | null>) => {
    const sp = new URLSearchParams(window.location.search);
    for (const [k, v] of Object.entries(next)) {
      if (v) sp.set(k, v);
      else sp.delete(k);
    }
    const qs = sp.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, []);

  const filter = (id: Filter) => {
    if (id === active) return;
    const motion = window.matchMedia(MOTION_OK).matches;
    if (grid.current && motion) flipState.current = Flip.getState(grid.current.querySelectorAll("[data-card]"));
    setQuery({ c: id === "all" ? null : id, p: null });

    const top = section.current?.getBoundingClientRect().top ?? 0;
    if (top < -40 && section.current) {
      const y = window.scrollY + top - 24;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(y, { duration: 1.2 });
      else window.scrollTo({ top: y, behavior: motion ? "smooth" : "auto" });
    }
  };

  const close = useCallback(() => setQuery({ p: null }), [setQuery]);
  const step = useCallback(
    (dir: 1 | -1) => {
      if (!visible.length) return;
      const i = openIndex < 0 ? 0 : (openIndex + dir + visible.length) % visible.length;
      setQuery({ p: visible[i].id });
    },
    [openIndex, visible, setQuery],
  );

  useLayoutEffect(() => {
    const state = flipState.current;
    const pill = dockPill.current;
    const btn = dock.current?.querySelector<HTMLElement>(`[data-filter="${active}"]`);
    const rail = btn?.parentElement;
    if (pill && btn && rail) {
      gsap.to(pill, {
        x: btn.offsetLeft,
        width: btn.offsetWidth,
        duration: state ? 0.7 : 0,
        ease: "expo.out",
      });
      rail.scrollTo({ left: btn.offsetLeft - (rail.clientWidth - btn.offsetWidth) / 2, behavior: state ? "smooth" : "auto" });
    }
    if (!state) return;
    flipState.current = null;
    Flip.from(state, {
      duration: 0.95,
      ease: "expo.inOut",
      absolute: true,
      stagger: 0.015,
      onEnter: (els) =>
        gsap.fromTo(els, { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.9, delay: 0.25, ease: "expo.out" }),
      onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.92, duration: 0.45, ease: "power2.in" }),
      onComplete: () => ScrollTrigger.refresh(),
    });
  }, [active]);

  useGSAP(
    () => {
      const d = dock.current;
      if (!d) return;
      gsap.set(d, { yPercent: 160, autoAlpha: 0 });
      ScrollTrigger.create({
        trigger: section.current,
        start: "top 75%",
        end: "bottom 80%",
        onToggle: (self) =>
          gsap.to(d, {
            yPercent: self.isActive ? 0 : 160,
            autoAlpha: self.isActive ? 1 : 0,
            duration: self.isActive ? 0.9 : 0.5,
            ease: self.isActive ? "expo.out" : "power2.in",
            overwrite: true,
          }),
      });

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.set("[data-card-inner]", { y: 70, autoAlpha: 0 });
        ScrollTrigger.batch("[data-card-inner]", {
          start: "top 92%",
          once: true,
          onEnter: (els) =>
            gsap.fromTo(els, { y: 70, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.3, stagger: 0.08, ease: "expo.out" }),
        });
      });
      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section ref={section} className="relative bg-ivory px-gutter pb-[18vh] pt-10">
      <div className="mb-12 grid grid-cols-1 items-end gap-6 border-t border-ink/15 pt-8 md:mb-16 md:grid-cols-12">
        <div className="md:col-span-7">
          <div key={active} className="animate-[qs-fade_0.9s_var(--ease-expo)_both]">
            <h2 className="display text-[clamp(2.4rem,5vw,5rem)]">
              {category ? category.name : "Every piece"}
              <sup className="ml-2 align-super font-sans text-[0.22em] tracking-normal text-taupe">
                {String(visible.length).padStart(2, "0")}
              </sup>
            </h2>
          </div>
        </div>
        <p
          key={`b-${active}`}
          className="max-w-[44ch] animate-[qs-fade_0.9s_var(--ease-expo)_both] text-[14px] leading-relaxed text-ink/70 md:col-span-4 md:col-start-9"
        >
          {category
            ? category.blurb
            : "Showers, faucets, basins, WCs, baths and accessories, all on display in Lahore. Select a piece for finishes and details."}
        </p>
      </div>

      <div
        ref={grid}
        className="grid grid-flow-dense grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-12 lg:auto-rows-[min(46vw,780px)] lg:grid-cols-3 lg:gap-y-16"
      >
        {products.map((p, i) => {
          const hidden = active !== "all" && p.category !== active;
          const wide = p.ratio === "landscape";
          return (
            <button
              key={p.id}
              type="button"
              data-card
              onClick={() => setQuery({ p: p.id })}
              aria-label={`${p.name}, ${categories.find((x) => x.id === p.category)?.short}`}
              className={cn("group block text-left", wide && "col-span-2", hidden && "hidden")}
            >
              <div data-card-inner className="flex h-full flex-col">
                <div
                  className={cn(
                    "relative overflow-hidden bg-stone lg:aspect-auto lg:flex-1",
                    wide ? "aspect-[16/10]" : "aspect-[4/5]",
                  )}
                >
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes={wide ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 50vw, 33vw"}
                    className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-expo)] group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/10" />
                  <span className="eyebrow absolute left-2.5 top-2.5 rounded-full bg-ivory/85 px-2.5 py-1 text-[9px] text-ink backdrop-blur sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-[10px]">
                    {categories.find((x) => x.id === p.category)?.short}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4 pt-3 sm:pt-4">
                  <div>
                    <div className="flex items-baseline gap-2 sm:gap-3">
                      <span className="eyebrow hidden text-taupe sm:inline">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="font-serif text-[clamp(1.15rem,1.9vw,1.9rem)] leading-tight transition-[font-style] group-hover:italic">
                        {p.name}
                      </h3>
                    </div>
                    <p className="mt-1 text-[11px] text-taupe sm:pl-[calc(2ch+0.75rem)] sm:text-[12px]">{p.meaning}</p>
                  </div>
                  <div className="hidden shrink-0 -space-x-1.5 pt-2 sm:flex" aria-hidden>
                    {p.finishes.map((f) => (
                      <span
                        key={f}
                        title={finishes.find((x) => x.id === f)?.name}
                        className={cn("block size-3.5 rounded-full ring-2 ring-ivory", `finish-${f}`)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4 md:bottom-7">
        <div
          ref={dock}
          className="invisible pointer-events-auto max-w-full rounded-full bg-ink/80 p-1.5 text-ivory shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl"
        >
          <div className="no-scrollbar relative flex overflow-x-auto" role="tablist" aria-label="Filter by category">
            <span ref={dockPill} aria-hidden className="absolute inset-y-0 left-0 rounded-full bg-ivory" />
            {(["all", ...categories.map((x) => x.id)] as Filter[]).map((id) => {
              const label = id === "all" ? "All" : categories.find((x) => x.id === id)!.short;
              const count = id === "all" ? products.length : counts[id];
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={active === id}
                  data-filter={id}
                  onClick={() => filter(id)}
                  className={cn(
                    "relative z-10 flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 text-[12.5px] font-medium transition-colors duration-500 md:px-5",
                    active === id ? "text-ink" : "text-ivory/75 hover:text-ivory",
                  )}
                >
                  {label}
                  <sup className={cn("text-[9px] tabular-nums", active === id ? "text-taupe" : "text-sand/70")}>{count}</sup>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <ProductDrawer
        product={open}
        index={openIndex >= 0 ? openIndex : 0}
        total={visible.length}
        onClose={close}
        onStep={step}
      />
    </section>
  );
}
