import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Philosophy from "@/components/sections/Philosophy";
import Services from "@/components/sections/Services";
import PhotoArchive from "@/components/sections/PhotoArchive";
import Stats from "@/components/sections/Stats";
import FeaturedReviews from "@/components/sections/FeaturedReviews";
import FounderMe from "@/components/sections/FounderMe";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Header />
      
      <main className="flex-1 w-full relative z-10 bg-neutral-950">
        <Hero />
        <Philosophy />
        <Services />
        <PhotoArchive />
        <Stats />
        <FeaturedReviews />
        <FounderMe />
        <CTA />
      </main>
      
      <Footer />
    </>
  );
}
