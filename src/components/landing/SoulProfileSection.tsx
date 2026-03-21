"use client";

import { motion } from "framer-motion";

export function SoulProfileSection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Tonal background shift */}
      <div className="absolute inset-0 bg-[#091328]" />

      {/* Centered orb glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div
          className="w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(91,244,222,0.12) 0%, rgba(124,91,244,0.06) 50%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#5bf4de]/70 mb-8"
        >
          Your Soul Profile is Waiting
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug"
        >
          Fragmented tests? MBTI says one thing, Astrology says another.{" "}
          <span className="text-[#5bf4de]">It&apos;s time for clarity.</span>
        </motion.h2>
      </div>
    </section>
  );
}
