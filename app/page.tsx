import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import CollectionRail from "@/components/sections/CollectionRail";
import Feature from "@/components/sections/Feature";
import Finishes from "@/components/sections/Finishes";
import ProjectGrid from "@/components/sections/ProjectGrid";
import Stats from "@/components/sections/Stats";
import Marquee from "@/components/sections/Marquee";
import ShowroomCTA from "@/components/sections/ShowroomCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <CollectionRail />
      <Feature />
      <Finishes />
      <ProjectGrid />
      <Stats />
      <Marquee />
      <ShowroomCTA />
    </>
  );
}
