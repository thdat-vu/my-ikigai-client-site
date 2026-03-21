"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useOnboardingStore } from "@/stores/onboarding";
import { StepIdentity } from "@/components/onboarding/StepIdentity";
import { StepOrigin } from "@/components/onboarding/StepOrigin";
import { StepArchetype } from "@/components/onboarding/StepArchetype";
import { StepConvergence } from "@/components/onboarding/StepConvergence";

const STEP_LABELS = [
  "Identity",
  "Origin",
  "Archetype",
  "Convergence",
];

function ProgressIndicator({ step }: { step: number }) {
  return (
    <div className="hidden md:flex flex-col items-center">
      <div className="flex items-center gap-2 mb-1">
        {STEP_LABELS.map((_, i) => {
          const stepNum = i + 1;
          const isActive = stepNum === step;
          const isPast = stepNum < step;
          return (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-3 h-3 bg-[#5bf4de] shadow-[0_0_10px_rgba(91,244,222,0.8)]"
                    : isPast
                    ? "w-2 h-2 bg-[#5bf4de]/50"
                    : "w-1.5 h-1.5 bg-[#40485d]"
                }`}
              />
              {i < STEP_LABELS.length - 1 && (
                <div
                  className={`w-12 h-[1px] transition-all ${
                    isPast ? "bg-[#5bf4de]/30" : "bg-[#40485d]/30"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      <span className="text-[10px] uppercase tracking-[0.2em] text-[#5bf4de]/70 font-bold">
        Step {step}: {STEP_LABELS[step - 1]}
      </span>
    </div>
  );
}

export default function StartPage() {
  const { step } = useOnboardingStore();

  return (
    <div className="min-h-screen bg-[#060e20] text-[#dee5ff] overflow-hidden relative">
      {/* Background mesh gradient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(at 0% 0%, rgba(91,244,222,0.06) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(145,155,255,0.06) 0px, transparent 50%)",
          }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-6 bg-transparent">
        <Link href="/" className="flex items-center gap-2 group">
          <Sparkles className="h-5 w-5 text-[#5bf4de] group-hover:rotate-12 transition-transform drop-shadow-[0_0_8px_rgba(91,244,222,0.4)]" />
          <span className="font-[Manrope] font-extrabold tracking-tighter text-xl text-[#5bf4de]">
            MyIkigai
          </span>
        </Link>

        <ProgressIndicator step={step} />

        {/* Mobile step label */}
        <div className="md:hidden">
          <span className="text-[10px] uppercase tracking-widest text-[#5bf4de]/70 font-bold">
            {step}/4
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 min-h-screen flex items-center justify-center pt-24 pb-24">
        <AnimatePresence mode="wait">
          {step === 1 && <StepIdentity key="step-1" />}
          {step === 2 && <StepOrigin key="step-2" />}
          {step === 3 && <StepArchetype key="step-3" />}
          {step === 4 && <StepConvergence key="step-4" />}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full z-50 px-8 pb-6 pt-4 flex justify-between items-center pointer-events-none">
        <div className="flex items-center gap-4 opacity-40 pointer-events-auto">
          <span className="text-[10px] uppercase tracking-widest text-[#a3aac4]">
            24h Hackathon
          </span>
        </div>
        <div className="pointer-events-auto flex items-center gap-3">
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#40485d]">
            Powered by
          </span>
          <span className="font-[Manrope] font-black text-sm text-[#dee5ff]/60 tracking-tighter">
            TinyFish.ai
          </span>
        </div>
      </footer>

      {/* Ambient corner blurs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#5bf4de]/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#919bff]/[0.03] blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
}
