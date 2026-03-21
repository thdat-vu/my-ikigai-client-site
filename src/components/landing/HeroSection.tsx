"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Ambient glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(91,244,222,0.08)_0%,_transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(91,100,244,0.06)_0%,_transparent_70%)]" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_center,_rgba(180,91,244,0.05)_0%,_transparent_70%)]" />
      </div>

      {/* Orb graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] rounded-full opacity-20"
          style={{
            background:
              "conic-gradient(from 0deg, #5bf4de, #7c5bf4, #5bf4de)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight text-white leading-[1.1]"
        >
          Decode Your Soul.
          <br />
          Build Your Path.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-5 text-base sm:text-lg text-[#8a94b0] max-w-xl mx-auto leading-relaxed"
        >
          Bridging destiny and digital intelligence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/start"
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-full px-8 py-3 text-base gap-2 bg-[#5bf4de] text-[#00594f] font-semibold hover:bg-[#5bf4de]/90 hover:shadow-[0_0_30px_rgba(91,244,222,0.3)] transition-all"
            )}
          >
            Start Your Journey
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#magic"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-full px-8 py-3 text-base gap-2 border-[#2a3556] bg-[#1e2d4a]/20 text-[#dee5ff] backdrop-blur-sm hover:bg-[#1e2d4a]/40 hover:text-white transition-all"
            )}
          >
            <Compass className="h-4 w-4" />
            Explore Method
          </a>
        </motion.div>
      </div>
    </section>
  );
}
