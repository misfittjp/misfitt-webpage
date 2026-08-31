import Header from "@/components/layout/Header";
import NoiseOverlay from "@/components/layout/NoiseOverlay";
import Footer from "@/components/layout/Footer";
import Gallery from "@/components/photography/Gallery";
import Pricing from "@/components/photography/Pricing";

export default function PhotographyPage() {
  return (
    <>
      <NoiseOverlay />
      <Header />
      
      <main className="flex-1 w-full relative z-10 bg-neutral-950 pt-24 md:pt-32">
        <Gallery />
        <Pricing />
      </main>
      
      <Footer />
    </>
  );
}
