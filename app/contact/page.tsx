import { Suspense } from "react";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import ShowroomMap from "@/components/contact/ShowroomMap";
import Button from "@/components/ui/Button";
import RevealImage from "@/components/ui/RevealImage";
import { LiveStatus } from "@/components/layout/StatusDot";
import { company, media } from "@/lib/data";
import { scheduleRows } from "@/lib/hours";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Visit the Qureshi Sons showroom at Galaxy Shopping Center, Ferozpur Road, Lahore, or call ${company.phoneDisplay}. Send an enquiry about any piece or project.`,
  path: "/contact",
  image: { url: media.glassShower, alt: "Walk-in glass shower beside a wall-hung WC and a timber vanity" },
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        index="Contact"
        eyebrow="Showroom & enquiries"
        image={media.glassShower}
        imageAlt="Walk-in glass shower beside a wall-hung WC and a timber vanity"
        imagePosition="object-[62%_center]"
        title={
          <>
            Visit, call, <em className="text-brass">or write.</em>
          </>
        }
        intro="The best way to choose a fitting is to hold it. Come to the showroom, call us with a question, or send an enquiry and we will get back to you within a working day."
        aside={<LiveStatus showTime />}
      />

      <section className="bg-ivory px-gutter pb-[14vh]">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-5 text-taupe">(01) Call the showroom</div>
            <a
              href={company.phoneHref}
              className="display group inline-block text-[clamp(2.6rem,5vw,4.8rem)] transition-colors duration-500 hover:text-brass"
            >
              {company.phoneDisplay}
            </a>

            <div className="mt-14 grid grid-cols-1 gap-10 border-t border-ink/15 pt-8 text-[14px] sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div>
                <div className="eyebrow mb-3 text-taupe">Address</div>
                <address className="not-italic leading-relaxed">
                  {company.addressLines.map((l) => (
                    <div key={l}>{l}</div>
                  ))}
                </address>
                <p className="mt-3 text-[13px] leading-relaxed text-taupe">
                  Inside Galaxy Shopping Center, beside New Galaxy Cinema on Lahore–Kasur Road.
                </p>
              </div>
              <div>
                <div className="eyebrow mb-3 text-taupe">Hours</div>
                {scheduleRows.map((r) => (
                  <div key={r.days} className="border-b border-ink/10 py-2.5 leading-relaxed">
                    <div>{r.days}</div>
                    <div className="text-taupe">{r.hours}</div>
                  </div>
                ))}
                <LiveStatus className="mt-4 text-[12px]" />
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={company.mapsUrl} external variant="solid">
                Get directions
              </Button>
              <Button href={company.phoneHref} external variant="outline">
                Call now
              </Button>
            </div>

            <figure className="mt-16 hidden lg:block">
              <RevealImage
                src={media.glassShower}
                alt="Walk-in glass shower beside a wall-hung WC and a timber vanity"
                ratio="16 / 11"
                sizes="40vw"
              />
              <figcaption className="mt-3 text-[12px] text-taupe">Walk in any time we are open. No appointment needed.</figcaption>
            </figure>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="eyebrow mb-5 text-taupe">(02) Send an enquiry</div>
            <Suspense fallback={<div className="min-h-[640px] border-t border-ink/15" />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>

      <ShowroomMap />
    </>
  );
}
