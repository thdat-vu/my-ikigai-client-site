"use client";

import { motion } from "framer-motion";

export function StatsSection() {
  return (
    <section id="trust" className="py-28 px-6">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5bf4de]/60">
            Verified Accuracy
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-3xl bg-[#091328] p-12 sm:p-16"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-20">
            <div className="text-center">
              <p className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight">
                1,000
                <span className="text-[#5bf4de]">+</span>
              </p>
              <p className="mt-3 text-sm text-[#8a94b0] font-medium">
                Life Roadmaps Generated
              </p>
            </div>
            <div className="hidden sm:block w-px h-24 bg-[#2a3556]" />
            <div className="text-center">
              <p className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight">
                <span className="text-[#5bf4de]">+</span>997
              </p>
              <p className="mt-3 text-sm text-[#8a94b0] font-medium">
                MyIkigai
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
