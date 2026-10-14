import { company, nav, categories } from "@/lib/data";
import { scheduleRows } from "@/lib/hours";
import TLink from "@/components/ui/TLink";
import Button from "@/components/ui/Button";
import RevealText from "@/components/ui/RevealText";
import { Arrow, Star } from "@/components/ui/Icons";
import FooterWordmark from "./FooterWordmark";
import { LiveStatus } from "./StatusDot";

export default function Footer() {
  return (
    <footer className="relative bg-ink text-ivory">
      <div className="px-gutter pt-28 md:pt-40">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="eyebrow mb-8 text-sand">(Start a project)</div>
            <RevealText as="h2" className="display text-balance text-[clamp(3rem,7.4vw,7.5rem)]">
              Let&apos;s build a bathroom <em className="text-brass-light">worth</em> waking up to.
            </RevealText>
            <div className="mt-12 flex flex-wrap gap-3">
              <Button href="/contact" variant="brass">
                Plan a visit
              </Button>
              <Button href={company.phoneHref} variant="ghost-light" external>
                {company.phoneDisplay}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 text-[14px] lg:col-span-5 lg:pt-16">
            <div>
              <div className="eyebrow mb-5 text-sand">Explore</div>
              <ul className="space-y-2.5">
                {nav.map((n) => (
                  <li key={n.href}>
                    <TLink href={n.href} className="link-line text-ivory/80 hover:text-ivory">
                      {n.label}
                    </TLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow mb-5 text-sand">Collections</div>
              <ul className="space-y-2.5">
                {categories.map((c) => (
                  <li key={c.id}>
                    <TLink href={`/collections?c=${c.id}`} className="link-line text-ivory/80 hover:text-ivory">
                      {c.name}
                    </TLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow mb-5 text-sand">Showroom</div>
              <address className="not-italic leading-relaxed text-ivory/80">
                {company.addressLines.map((l) => (
                  <div key={l}>{l}</div>
                ))}
              </address>
              <a href={company.mapsUrl} target="_blank" rel="noreferrer" className="link-line mt-3 inline-flex items-center gap-2 text-brass-light">
                Directions <Arrow direction="up-right" />
              </a>
            </div>
            <div>
              <div className="eyebrow mb-5 text-sand">Hours</div>
              <div className="space-y-1 text-ivory/80">
                {scheduleRows.map((r) => (
                  <div key={r.days}>
                    <div>{r.days}</div>
                    <div className="text-ivory/45">{r.hours}</div>
                  </div>
                ))}
              </div>
              <LiveStatus className="mt-4 text-[12px] text-ivory/80" />
            </div>
          </div>
        </div>

        <div className="mt-24 flex flex-col gap-4 border-t border-ink-line py-6 text-[12px] text-ivory/55 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex text-brass-light">
              {[1, 1, 1, 1, 0.4].map((f, i) => (
                <Star key={i} filled={f} />
              ))}
            </span>
            {company.rating} on Google · {company.reviews} reviews
          </div>
          <div>© {new Date().getFullYear()} Qureshi Sons. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <TLink href="/contact" className="link-line hover:text-ivory">
              Privacy policy
            </TLink>
            <TLink href="/contact" className="link-line inline-flex items-center gap-2 text-ivory hover:text-brass-light">
              Start a project <Arrow />
            </TLink>
          </div>
        </div>
      </div>

      <FooterWordmark />
    </footer>
  );
}
