import React from "react";
import Hero from "@/components/sections/Hero";
import MissionAndCapabilities from "@/components/sections/MissionAndCapabilities";
import OperativeAndDeployment from "@/components/sections/OperativeAndDeployment";

export default function Home() {
  return (
    <main className="w-full bg-black text-white selection:bg-neutral-800">
      <Hero />
      <MissionAndCapabilities />
      <OperativeAndDeployment />
    </main>
  );
}
