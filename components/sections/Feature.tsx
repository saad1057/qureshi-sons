import { products, finishes } from "@/lib/data";
import RevealImage from "@/components/ui/RevealImage";
import RevealText from "@/components/ui/RevealText";
import Button from "@/components/ui/Button";

const piece = products[0];

const figures = [
  { src: products[0].image, alt: products[0].alt, caption: "Fig. 02 — Barish ceiling rain head, 300 mm" },
  { src: products[1].image, alt: products[1].alt, caption: "Fig. 03 — Sukoon hand shower on a slide rail" },
  { src: products[2].image, alt: products[2].alt, caption: "Fig. 04 — Shabnam, flush to the ceiling" },
];

export default function Feature() {
  return (
    <section className="relative bg-ivory px-gutter py-[16vh]">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[16vh]">
            <div className="eyebrow mb-8 text-taupe">(03) Signature piece</div>
            <RevealText as="h2" className="display text-[clamp(3.2rem,7vw,7.4rem)]">
              Rain, <em className="text-brass">at will.</em>
            </RevealText>
            <p className="mt-8 max-w-[44ch] text-[15px] leading-relaxed text-ink/75">
              The {piece.name} is the piece customers ask to stand under first. {piece.description}
            </p>

            <dl className="mt-10 max-w-[460px] border-t border-ink/15 text-[13px]">
              {piece.specs.map((s, i) => (
                <div key={s} className="flex justify-between gap-6 border-b border-ink/15 py-3.5">
                  <dt className="text-taupe">{String(i + 1).padStart(2, "0")}</dt>
                  <dd className="text-right">{s}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex items-center gap-4">
              <span className="eyebrow text-taupe">Finishes</span>
              <div className="flex gap-2">
                {piece.finishes.map((f) => (
                  <span
                    key={f}
                    title={finishes.find((x) => x.id === f)?.name}
                    className={`finish-${f} h-6 w-6 rounded-full ring-1 ring-ink/10`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-10">
              <Button href={`/collections?c=showers&p=${piece.id}`} variant="solid">
                See the piece
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-7">
          <figure>
            <RevealImage src={figures[0].src} alt={figures[0].alt} ratio="4 / 5" sizes="(max-width: 1024px) 100vw, 58vw" />
            <figcaption className="mt-3 text-[12px] text-taupe">{figures[0].caption}</figcaption>
          </figure>
          <div className="grid grid-cols-2 gap-6">
            <figure className="mt-[12vh]">
              <RevealImage src={figures[1].src} alt={figures[1].alt} ratio="3 / 4" sizes="30vw" from="left" />
              <figcaption className="mt-3 text-[12px] text-taupe">{figures[1].caption}</figcaption>
            </figure>
            <figure>
              <RevealImage src={figures[2].src} alt={figures[2].alt} ratio="3 / 4" sizes="30vw" from="right" />
              <figcaption className="mt-3 text-[12px] text-taupe">{figures[2].caption}</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
