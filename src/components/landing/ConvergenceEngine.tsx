"use client";

import { motion } from "framer-motion";
import { Brain, Bot, Sun } from "lucide-react";

const pillars = [
  {
    icon: Brain,
    title: "MBTI (Psychology)",
    description:
      "Understanding your cognitive functions and behavioral patterns through a scientific lens.",
  },
  {
    icon: Bot,
    title: "AI Agent (Logic)",
    description:
      "Synthesizing disparate data points into a single, actionable life purpose blueprint.",
    featured: true,
  },
  {
    icon: Sun,
    title: "Astrology (Energy)",
    description:
      "Decoding the cosmic blueprint and energetic cycles that influence your unique timing.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function ConvergenceEngine() {
  return (
    <section id="magic" className="relative py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            The Convergence Engine
          </h2>
          <p className="mt-5 text-base text-[#8a94b0] max-w-2xl mx-auto leading-relaxed">
            We bridge ancient wisdom and modern psychology with advanced neural
            logic.
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#5bf4de]/60">
            Core Logic
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {pillars.map((pillar) => (
            <motion.div key={pillar.title} variants={cardVariants}>
              <div
                className={cn(
                  "h-full rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-300",
                  pillar.featured
                    ? "bg-[#192540] hover:shadow-[0_0_40px_rgba(91,244,222,0.08)]"
                    : "bg-[#0f1d38] hover:bg-[#152242]"
                )}
              >
                <div
                  className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-6",
                    pillar.featured
                      ? "bg-[#5bf4de]/15"
                      : "bg-[#1e2d4a]"
                  )}
                >
                  <pillar.icon
                    className={cn(
                      "h-7 w-7",
                      pillar.featured ? "text-[#5bf4de]" : "text-[#5bf4de]/70"
                    )}
                  />
                </div>
                {pillar.featured && (
                  <span className="mb-3 px-3 py-1 rounded-full bg-[#5bf4de]/10 text-[#5bf4de] text-[10px] font-semibold uppercase tracking-wider">
                    Core Engine
                  </span>
                )}
                <h3 className="text-lg font-bold text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#8a94b0] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
