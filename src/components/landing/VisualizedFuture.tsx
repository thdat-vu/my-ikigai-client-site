"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { MapPin, Sparkles, TrendingUp } from "lucide-react";

const milestones = [
  {
    quarter: "Q4 2024",
    title: "The Creative Awakening",
    description:
      "Mercury enters your 10th house. Perfect time for the launch of your design studio.",
    icon: Sparkles,
  },
  {
    quarter: "Q2 2025",
    title: "Leadership Shift",
    description:
      "Your intuitive logic aligns with a major management role in a tech startup.",
    icon: TrendingUp,
  },
];

const features = [
  "Precision Milestones: Based on transits and traits.",
  "Career Pivots: Optimal timing for massive moves.",
];

export function VisualizedFuture() {
  return (
    <section id="roadmap" className="relative py-28 px-6 overflow-hidden">
      {/* Tonal shift background */}
      <div className="absolute inset-0 bg-[#091328]" />

      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(91,244,222,0.05)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5bf4de]/60">
              Visualized Future
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] tracking-tight">
              Your Life Roadmap,
              <br />
              Decoded by
              <br />
              Intelligence.
            </h2>
            <p className="mt-6 text-[#8a94b0] leading-relaxed max-w-lg">
              Don&apos;t just discover who you are&mdash;see where you&apos;re
              going. Our AI generates a hyper-personalized vertical timeline of
              milestones, career pivots, and growth cycles.
            </p>
            <ul className="mt-8 space-y-4">
              {features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-sm text-[#dee5ff]/80"
                >
                  <MapPin className="h-4 w-4 mt-0.5 text-[#5bf4de]/60 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Mock Timeline Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="rounded-3xl bg-[#0f1d38] p-6 sm:p-8 shadow-[0_0_60px_rgba(91,244,222,0.04)]">
              {/* Profile header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5bf4de]/30 to-[#7c5bf4]/30 flex items-center justify-center text-sm font-bold text-white">
                  AC
                </div>
                <div>
                  <p className="font-bold text-white">Alex Chen</p>
                  <div className="flex gap-2 mt-1">
                    <Badge className="text-[10px] bg-[#5bf4de]/10 text-[#5bf4de] border-none hover:bg-[#5bf4de]/15 rounded-full px-2 py-0.5">
                      ENFP
                    </Badge>
                    <Badge className="text-[10px] bg-[#7c5bf4]/10 text-[#7c5bf4] border-none hover:bg-[#7c5bf4]/15 rounded-full px-2 py-0.5">
                      Sun in Leo
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative pl-6 border-l border-[#2a3556] space-y-8">
                {milestones.map((m, i) => (
                  <motion.div
                    key={m.quarter}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                    className="relative"
                  >
                    <div className="absolute -left-[1.65rem] top-1 w-3 h-3 rounded-full bg-[#5bf4de] shadow-[0_0_8px_rgba(91,244,222,0.5)]" />
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5bf4de]/60">
                      {m.quarter}
                    </p>
                    <h4 className="mt-1 text-base font-bold text-white">
                      {m.title}
                    </h4>
                    <p className="mt-1.5 text-sm text-[#8a94b0] leading-relaxed">
                      {m.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
