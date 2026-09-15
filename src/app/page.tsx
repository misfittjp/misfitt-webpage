import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import MissionAndCapabilities from "@/components/sections/MissionAndCapabilities";
import OperativeAndDeployment from "@/components/sections/OperativeAndDeployment";

export default function Home() {
  return (
    <>
      <Header />
      <main className="w-full bg-black text-white selection:bg-neutral-800">
        <Hero />
        <MissionAndCapabilities />
        <OperativeAndDeployment />
      </main>
      <Footer />
    </>
  );
}
