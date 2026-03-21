"use client";

import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { SoulProfileSection } from "@/components/landing/SoulProfileSection";
import { ConvergenceEngine } from "@/components/landing/ConvergenceEngine";
import { VisualizedFuture } from "@/components/landing/VisualizedFuture";
import { StatsSection } from "@/components/landing/StatsSection";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SoulProfileSection />
        <ConvergenceEngine />
        <VisualizedFuture />
        <StatsSection />
      </main>
      <Footer />
    </>
  );
}
