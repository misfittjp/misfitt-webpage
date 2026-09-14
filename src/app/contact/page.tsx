import Header from "@/components/layout/Header";
import NoiseOverlay from "@/components/layout/NoiseOverlay";
import MissionCTA from "@/components/sections/MissionCTA";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/contact/ContactForm";
import ConciergeInfo from "@/components/contact/ConciergeInfo";

export default function ContactPage() {
  return (
    <>
      <NoiseOverlay />
      <Header />
      
      <main className="flex-1 w-full relative z-10 bg-neutral-950 pt-24 md:pt-32 pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          
          <div className="mb-16 md:mb-24">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-neutral-100 uppercase mb-4">
              Connect
            </h1>
            <p className="font-mono text-xs md:text-sm tracking-[0.2em] text-neutral-500 uppercase">
              Bespoke Inquiries & Bookings
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-24">
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
            <div className="lg:col-span-2">
              <ConciergeInfo />
            </div>
          </div>

        </div>
      </main>
      
      <MissionCTA />
      <Footer />
    </>
  );
}
