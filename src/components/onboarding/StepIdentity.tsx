"use client";

import { motion } from "framer-motion";
import { ArrowForward } from "@/components/icons";
import { useOnboardingStore } from "@/stores/onboarding";

export function StepIdentity() {
  const { name, setName, personaGoal, setPersonaGoal, nextStep } = useOnboardingStore();

  const canContinue = name.trim().length >= 2;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="relative w-full max-w-2xl mx-auto px-6"
    >
      {/* Ambient glows */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#5bf4de]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-[#919bff]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative bg-[#192540]/40 backdrop-blur-3xl rounded-[2.5rem] p-12 md:p-16 flex flex-col items-center text-center border border-[#5bf4de]/15 shadow-2xl">
        <h1 className="font-[Manrope] text-4xl md:text-5xl font-extrabold tracking-tight text-[#dee5ff] mb-4">
          Your <span className="text-[#5bf4de]">Identity</span> Begins.
        </h1>
        <p className="text-[#a3aac4] text-lg max-w-md mb-12">
          Every journey starts with a name. Enter yours to align your digital
          destiny.
        </p>

        {/* Input area */}
        <div className="relative w-full group">
          <div className="absolute -top-12 -left-12 w-24 h-24 bg-[#5bf4de]/5 rounded-full blur-3xl group-focus-within:bg-[#5bf4de]/20 transition-all duration-700" />
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#919bff]/5 rounded-full blur-3xl group-focus-within:bg-[#919bff]/20 transition-all duration-700" />

          <label className="block text-left text-[11px] uppercase tracking-widest text-[#5bf4de]/60 mb-3 ml-4 font-medium">
            Legal or Chosen Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name..."
            className="w-full bg-[#192540]/60 border-0 rounded-2xl px-8 py-6 text-2xl font-[Manrope] font-medium text-[#dee5ff] placeholder:text-[#40485d] focus:ring-2 focus:ring-[#5bf4de]/40 focus:bg-[#192540] transition-all duration-300 shadow-inner outline-none"
          />
        </div>

        {/* Goal input */}
        <div className="relative w-full mt-8">
          <label className="block text-left text-[11px] uppercase tracking-widest text-[#5bf4de]/60 mb-3 ml-4 font-medium">
            Your Dream / Life Goal
          </label>
          <input
            type="text"
            value={personaGoal}
            onChange={(e) => setPersonaGoal(e.target.value)}
            placeholder="e.g. Become a Product Manager, Start my own business..."
            className="w-full bg-[#192540]/60 border-0 rounded-2xl px-8 py-5 text-lg font-medium text-[#dee5ff] placeholder:text-[#40485d] focus:ring-2 focus:ring-[#5bf4de]/40 focus:bg-[#192540] transition-all duration-300 shadow-inner outline-none"
          />
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-16 w-full max-w-sm">
          <button
            onClick={nextStep}
            disabled={!canContinue}
            className="flex-1 px-10 py-4 rounded-full bg-[#5bf4de] text-[#00594f] font-bold shadow-[0_0_20px_rgba(91,244,222,0.3)] hover:shadow-[0_0_30px_rgba(91,244,222,0.5)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-40 disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            Continue
            <ArrowForward />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
