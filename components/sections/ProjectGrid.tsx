import { projects } from "@/lib/data";
import RevealImage from "@/components/ui/RevealImage";
import RevealText from "@/components/ui/RevealText";
import TLink from "@/components/ui/TLink";
import Button from "@/components/ui/Button";

const layout = [
  { id: "dha-residence", cls: "md:col-span-7", ratio: "4 / 3" },
  { id: "gulberg-hotel", cls: "md:col-span-4 md:col-start-9 md:mt-[22vh]", ratio: "3 / 4" },
  { id: "resort-murree", cls: "md:col-span-4 md:col-start-2 md:-mt-[10vh]", ratio: "3 / 4" },
  { id: "bahria-villa", cls: "md:col-span-6 md:col-start-7 md:mt-[8vh]", ratio: "16 / 11" },
];

export default function ProjectGrid() {
  return (
    <section className="relative bg-ivory px-gutter py-[16vh]">
      <div className="mb-16 flex flex-col justify-between gap-8 md:mb-24 md:flex-row md:items-end">
        <div>
          <div className="eyebrow mb-6 text-taupe">(05) Selected work</div>
          <RevealText as="h2" className="display text-[clamp(2.8rem,6.4vw,6.6rem)]">
            Bathrooms we&apos;ve <em className="text-brass">dressed</em>
          </RevealText>
        </div>
        <p className="max-w-[40ch] text-[14px] leading-relaxed text-ink/70">
          From a single cloakroom to a 48-key hotel, we specify, supply and support installation, with after-sales service from
          the same people who sold it to you.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-12">
        {layout.map((l, i) => {
          const p = projects.find((x) => x.id === l.id)!;
          return (
            <TLink key={p.id} href={`/projects?p=${p.id}`} className={`group block ${l.cls}`}>
              <div className="overflow-hidden">
                <div className="transition-transform duration-[1.4s] ease-[var(--ease-expo)] group-hover:scale-[1.03]">
                  <RevealImage src={p.cover} alt={p.alt} ratio={l.ratio} sizes="(max-width: 768px) 100vw, 55vw" />
                </div>
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-6 border-b border-ink/15 pb-4">
                <div className="flex items-baseline gap-4">
                  <span className="eyebrow text-taupe">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-serif text-[clamp(1.5rem,2.2vw,2.2rem)] leading-none transition-all duration-500 group-hover:italic">
                    {p.title}
                  </h3>
                </div>
                <span className="text-[12px] text-taupe">{p.year}</span>
              </div>
              <div className="mt-3 flex justify-between text-[12px] text-ink/60">
                <span>{p.type}</span>
                <span>{p.location}</span>
              </div>
            </TLink>
          );
        })}
      </div>

      <div className="mt-24 flex justify-center">
        <Button href="/projects" variant="outline">
          All projects
        </Button>
      </div>
    </section>
  );
}
