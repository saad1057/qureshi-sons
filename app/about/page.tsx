import PageHero from "@/components/ui/PageHero";
import RevealImage from "@/components/ui/RevealImage";
import RevealText from "@/components/ui/RevealText";
import Chapters, { type Chapter } from "@/components/about/Chapters";
import Stats from "@/components/sections/Stats";
import ShowroomCTA from "@/components/sections/ShowroomCTA";
import { media, products } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Qureshi Sons is a Lahore family of sanitaryware importers. From a trading counter to a showroom on Ferozpur Road, this is how we work.",
  path: "/about",
  image: { url: media.brassTap, alt: "Antique brass tap on a weathered stone wall" },
});

const chapters: Chapter[] = [
  {
    numeral: "I",
    title: "The counter",
    text: "It began as a trading counter in Lahore, selling taps and fittings to plumbers and builders who wanted things that last. The name says who ran it: a father, and then his sons.",
    image: media.brassTap,
    alt: "Antique brass tap on a weathered stone wall",
  },
  {
    numeral: "II",
    title: "The search",
    text: "Customers kept asking for better. So the family began importing directly, choosing every range by hand for its weight, its cartridge and how its finish ages in Lahore's water.",
    image: media.subwayFaucet,
    alt: "Chrome mixer over a white sink against subway tiles",
  },
  {
    numeral: "III",
    title: "The showroom",
    text: "Inside Galaxy Shopping Center on Ferozpur Road the counter became a showroom, with working showers, finishes side by side and time to sit down with a cup of tea and decide.",
    image: media.marbleVanity,
    alt: "Marble double vanity with round brass mirrors",
  },
  {
    numeral: "IV",
    title: "The next generation",
    text: "Today we supply homes, hotels and offices across Pakistan. We help architects with specification, and after-sales still comes from the same family.",
    image: media.hotelLobby,
    alt: "Grand hotel lobby with crystal chandeliers and a marble sculpture",
  },
];

const values = [
  { title: "Weight over shine", text: "Solid brass, real ceramic and proper cartridges, over pieces that only look good in a photograph." },
  { title: "Tested here first", text: "Every range runs water in our own showroom before we sell it to you." },
  { title: "Honest advice", text: "If a simpler piece will do the job just as well, we will tell you, and show you why." },
  { title: "After-sales, in person", text: "Call the same number years later and speak to people who remember your project." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        index="About"
        eyebrow="A Lahore family business"
        image={media.brassTap}
        imageAlt="Antique brass tap on a weathered stone wall"
        imagePosition="object-[58%_center]"
        title={
          <>
            A family name, <em className="text-brass">built on water.</em>
          </>
        }
        intro="Qureshi Sons imports sanitaryware and bath fittings for people who notice the difference: the weight of a handle, the softness of a spray, the way a finish holds up after ten Lahore summers."
        aside={
          <div className="space-y-1">
            <div>Importers &amp; suppliers</div>
            <div>Showroom on Ferozpur Road</div>
            <div>{products.length}+ ranges on display</div>
          </div>
        }
      />

      <section className="bg-ivory px-gutter">
        <RevealImage
          src={media.greyBath}
          alt="Grey stone bathroom with black vessel basins, round mirrors and a freestanding bath"
          className="h-[70vh] md:h-[92vh]"
          sizes="100vw"
          parallax={12}
          quality={85}
        />
        <div className="mt-4 flex justify-between text-[12px] text-taupe">
          <span>Fig. 01 — Light, stone and water</span>
          <span>Qureshi Sons, Lahore</span>
        </div>
      </section>

      <section className="bg-ivory px-gutter py-[16vh]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="eyebrow text-taupe md:col-span-3">(01) The story</div>
          <div className="md:col-span-9">
            <RevealText as="p" className="font-serif text-[clamp(1.9rem,3.6vw,3.6rem)] leading-[1.08] tracking-[-0.015em]">
              We are not a factory and we are not a catalogue. We are a family that travels to find the right pieces, brings
              them home to Lahore and <em className="text-brass">puts our name on them.</em>
            </RevealText>
            <div className="mt-16 grid grid-cols-1 gap-10 text-[15px] leading-relaxed text-ink/75 md:grid-cols-2">
              <p>
                A bathroom is the first room of the day and the last one at night. It deserves fittings that feel solid in the
                hand and keep working for years, not months. That belief is the whole business.
              </p>
              <p>
                So we keep it personal. You will be shown around by someone from the family or a member of a team that has fitted
                thousands of bathrooms, and you will leave with advice you can trust, whether you are buying one tap or fitting
                out a hotel.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-[14vh] grid grid-cols-1 gap-6 md:grid-cols-12">
          <figure className="md:col-span-5">
            <RevealImage src={media.doubleVessel} alt="Bright attic bathroom with twin vessel basins and a freestanding bath" ratio="4 / 5" sizes="(max-width: 768px) 100vw, 40vw" />
            <figcaption className="mt-3 text-[12px] text-taupe">Fig. 02 — Chosen by hand</figcaption>
          </figure>
          <figure className="md:col-span-6 md:col-start-7 md:mt-[24vh]">
            <RevealImage src={media.sageVanity} alt="Oak vanity with two black stone vessel basins against a sage green wall" ratio="5 / 4" sizes="(max-width: 768px) 100vw, 48vw" from="right" />
            <figcaption className="mt-3 text-[12px] text-taupe">Fig. 03 — Fitted with care</figcaption>
          </figure>
        </div>
      </section>

      <Chapters chapters={chapters} />

      <section className="bg-ink px-gutter py-[16vh] text-ivory">
        <div className="mb-16 flex flex-col justify-between gap-8 md:mb-24 md:flex-row md:items-end">
          <div>
            <div className="eyebrow mb-6 text-sand">(03) What we hold to</div>
            <RevealText as="h2" className="display text-[clamp(2.8rem,5.6vw,5.8rem)]">
              Four <em className="text-brass-light">promises.</em>
            </RevealText>
          </div>
          <p className="max-w-[40ch] text-[14px] leading-relaxed text-ivory/65">
            Nothing here is a slogan. It is simply how the counter has always been run.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <div key={v.title} className="border-t border-ivory/15 pt-6">
              <div className="eyebrow text-brass-light">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="mt-10 font-serif text-[clamp(1.7rem,2.3vw,2.3rem)] leading-tight">{v.title}</h3>
              <p className="mt-4 max-w-[32ch] text-[14px] leading-relaxed text-ivory/65">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <Stats />
      <ShowroomCTA eyebrow="(04) The showroom" />
    </>
  );
}
