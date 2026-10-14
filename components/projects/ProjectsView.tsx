"use client";

import { useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { projects, type Project } from "@/lib/data";
import RevealImage from "@/components/ui/RevealImage";
import { Arrow } from "@/components/ui/Icons";
import ProjectLightbox from "./ProjectLightbox";
import { cn } from "@/lib/cn";

const ratios = { tall: "3 / 4", wide: "4 / 3", square: "1 / 1" } as const;

export default function ProjectsView() {
  const params = useSearchParams();
  const openId = params.get("p");
  const openIndex = projects.findIndex((p) => p.id === openId);

  const setOpen = useCallback((id: string | null) => {
    const sp = new URLSearchParams(window.location.search);
    if (id) sp.set("p", id);
    else sp.delete("p");
    const qs = sp.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, []);

  const close = useCallback(() => setOpen(null), [setOpen]);
  const step = useCallback(
    (dir: 1 | -1) => setOpen(projects[(Math.max(openIndex, 0) + dir + projects.length) % projects.length].id),
    [openIndex, setOpen],
  );

  const columns = [projects.filter((_, i) => i % 2 === 0), projects.filter((_, i) => i % 2 === 1)];

  return (
    <>
      <section className="bg-ivory px-gutter pb-[14vh] pt-6">
        <div className="flex flex-col gap-20 md:hidden">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={setOpen} />
          ))}
        </div>
        <div className="hidden grid-cols-2 gap-x-[6vw] md:grid">
          {columns.map((col, c) => (
            <div key={c} className={cn("flex flex-col gap-[18vh]", c === 1 && "pt-[30vh]")}>
              {col.map((p) => (
                <ProjectCard key={p.id} project={p} onOpen={setOpen} />
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ivory px-gutter pb-[16vh]">
        <div className="mb-8 flex items-end justify-between border-b border-ink/15 pb-6">
          <h2 className="display text-[clamp(2.2rem,4vw,4rem)]">
            Project <em className="text-brass">index</em>
          </h2>
          <span className="eyebrow text-taupe">{projects.length} selected</span>
        </div>
        <ul>
          {projects.map((p, i) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => setOpen(p.id)}
                className="group grid w-full grid-cols-12 items-baseline gap-4 border-b border-ink/10 py-5 text-left transition-colors duration-500 hover:bg-stone/60 md:py-6"
              >
                <span className="eyebrow col-span-2 text-taupe md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="col-span-10 font-serif text-[clamp(1.4rem,2.2vw,2.2rem)] leading-none transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-3 group-hover:italic md:col-span-5">
                  {p.title}
                </span>
                <span className="col-span-5 col-start-3 text-[13px] text-ink/60 md:col-span-2 md:col-start-auto">{p.type}</span>
                <span className="col-span-5 text-[13px] text-ink/60 md:col-span-2">{p.location}</span>
                <span className="hidden items-center justify-end gap-3 text-[13px] tabular-nums text-taupe md:col-span-2 md:flex">
                  {p.year}
                  <Arrow className="-translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <ProjectLightbox
        project={openIndex >= 0 ? projects[openIndex] : null}
        index={Math.max(openIndex, 0)}
        total={projects.length}
        onClose={close}
        onStep={step}
      />
    </>
  );
}

function ProjectCard({ project: p, onOpen }: { project: Project; onOpen: (id: string) => void }) {
  const n = projects.indexOf(p);
  return (
    <button type="button" onClick={() => onOpen(p.id)} className="group block text-left">
      <div className="overflow-hidden">
        <div className="transition-transform duration-[1.4s] ease-[var(--ease-expo)] group-hover:scale-[1.03]">
          <RevealImage src={p.cover} alt={p.alt} ratio={ratios[p.size]} sizes="(max-width: 768px) 100vw, 46vw" parallax={6} />
        </div>
      </div>
      <div className="mt-6 flex items-baseline justify-between gap-6">
        <div className="flex items-baseline gap-4">
          <span className="eyebrow text-taupe">{String(n + 1).padStart(2, "0")}</span>
          <h2 className="font-serif text-[clamp(1.8rem,2.8vw,2.9rem)] leading-none transition-all duration-500 group-hover:italic">
            {p.title}
          </h2>
        </div>
        <span className="text-[12px] tabular-nums text-taupe">{p.year}</span>
      </div>
      <div className="mt-4 flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-ink/15 pt-3 text-[12px] text-ink/60">
        <span>
          {p.type} · {p.location}
        </span>
        <span>{p.scope}</span>
      </div>
    </button>
  );
}
