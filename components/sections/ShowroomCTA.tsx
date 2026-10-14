import { company, media } from "@/lib/data";
import { scheduleRows } from "@/lib/hours";
import RevealImage from "@/components/ui/RevealImage";
import RevealText from "@/components/ui/RevealText";
import Button from "@/components/ui/Button";
import { LiveStatus } from "@/components/layout/StatusDot";

export default function ShowroomCTA({ eyebrow = "(06) The showroom" }: { eyebrow?: string }) {
  return (
    <section className="relative bg-ivory">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <RevealImage
          src={media.showroom}
          alt="Bright bathroom with a glass shower enclosure, wall-mounted vanity and plants"
          className="min-h-[60vh] lg:min-h-[100vh]"
          sizes="(max-width: 1024px) 100vw, 50vw"
          parallax={10}
        />
        <div className="flex flex-col justify-center px-gutter py-24 lg:px-[6vw]">
          <div className="eyebrow mb-8 text-taupe">{eyebrow}</div>
          <RevealText as="h2" className="display text-[clamp(2.8rem,5.4vw,5.6rem)]">
            Come and <em className="text-brass">feel</em> the weight of it.
          </RevealText>
          <p className="mt-8 max-w-[44ch] text-[15px] leading-relaxed text-ink/75">
            Fittings are chosen by hand, not by screen. Turn every handle and test every spray at our showroom inside Galaxy
            Shopping Center on Ferozpur Road. Tea is on us.
          </p>

          <div className="mt-12 grid max-w-[520px] grid-cols-1 gap-8 border-t border-ink/15 pt-8 text-[14px] sm:grid-cols-2">
            <div>
              <div className="eyebrow mb-3 text-taupe">Address</div>
              <address className="not-italic leading-relaxed">
                {company.addressLines.map((l) => (
                  <div key={l}>{l}</div>
                ))}
              </address>
            </div>
            <div>
              <div className="eyebrow mb-3 text-taupe">Hours</div>
              {scheduleRows.map((r) => (
                <div key={r.days} className="leading-relaxed">
                  {r.days}
                  <div className="text-taupe">{r.hours}</div>
                </div>
              ))}
              <LiveStatus className="mt-3 text-[12px]" />
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={company.mapsUrl} external variant="solid">
              Get directions
            </Button>
            <Button href={company.phoneHref} external variant="outline">
              Call {company.phoneDisplay}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
