import { Suspense } from "react";
import PageHero from "@/components/ui/PageHero";
import ProjectsView from "@/components/projects/ProjectsView";
import Marquee from "@/components/sections/Marquee";
import { projects } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Residences, hotels and offices fitted by Qureshi Sons, from a family home in DHA to a 48-key boutique hotel in Gulberg.",
  path: "/projects",
  image: { url: projects[0].cover, alt: projects[0].alt },
});

const types = Object.entries(
  projects.reduce<Record<string, number>>((acc, p) => ({ ...acc, [p.type]: (acc[p.type] ?? 0) + 1 }), {}),
);

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        index="Projects"
        eyebrow="Selected work, 2022 — 2025"
        image={projects[1].cover}
        imageAlt={projects[1].alt}
        imagePosition="object-[55%_center]"
        title={
          <>
            Fitted, finished, <em className="text-brass">lived in.</em>
          </>
        }
        intro="Homes, hotels and headquarters across Pakistan. We specify the pieces, supply them from stock and stay with the project through installation and after-sales, often for years."
        aside={
          <ul className="space-y-1">
            {types.map(([t, n]) => (
              <li key={t} className="flex max-w-[220px] justify-between">
                <span>{t}</span>
                <span className="tabular-nums">{String(n).padStart(2, "0")}</span>
              </li>
            ))}
          </ul>
        }
      />
      <Suspense fallback={<div className="min-h-screen bg-ivory" />}>
        <ProjectsView />
      </Suspense>
      <Marquee />
    </>
  );
}
