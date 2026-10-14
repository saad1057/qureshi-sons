import { Suspense } from "react";
import PageHero from "@/components/ui/PageHero";
import CollectionsView from "@/components/collections/CollectionsView";
import ShowroomCTA from "@/components/sections/ShowroomCTA";
import { finishes, products } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Collections",
  description:
    "Showers, faucets, basins, WCs, bathtubs and accessories in six finishes, imported by Qureshi Sons and on display at our showroom on Ferozpur Road, Lahore.",
  path: "/collections",
  image: { url: products[5].image, alt: products[5].alt },
});

export default function CollectionsPage() {
  return (
    <>
      <PageHero
        index="Collections"
        eyebrow={`${products.length} pieces · ${finishes.length} finishes`}
        image={products[5].image}
        imageAlt={products[5].alt}
        imagePosition="object-[58%_center]"
        title={
          <>
            Pieces made <br className="hidden md:block" />
            to be <em className="text-brass">kept.</em>
          </>
        }
        intro="Every piece here hangs, stands or runs water in our Lahore showroom. Choose a room below, open any piece for its finishes and details, and send us an enquiry. We will call you back with stock and prices."
        aside={
          <div className="space-y-1">
            <div>Prices on request</div>
            <div>Delivery across Pakistan</div>
            <div>Installation support and after-sales</div>
          </div>
        }
      />
      <Suspense fallback={<div className="min-h-screen bg-ivory" />}>
        <CollectionsView />
      </Suspense>
      <ShowroomCTA eyebrow="(Visit) The showroom" />
    </>
  );
}
