"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { RocketIcon, SparklesIcon } from "@/components/icons";
import { useOnboardingStore } from "@/stores/onboarding";

const PHASES = [
  "Reading your stars...",
  "Mapping cognitive functions...",
  "Aligning your energy...",
  "Synthesizing Your Cosmos...",
  "Generating your roadmap...",
];

export function StepConvergence() {
  const router = useRouter();
  const {
    name, dateOfBirth, timeOfBirth, birthLocation,
    mbtiType, mbtiSource, quizAnswers,
    setGenerationProgress,
  } = useOnboardingStore();

  const [phaseIndex, setPhaseIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  const generateRoadmap = useCallback(async () => {
    try {
      const res = await fetch("/api/generate-roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          dateOfBirth,
          timeOfBirth,
          birthLocation,
          mbtiType,
          mbtiSource,
          quizAnswers: mbtiSource === "quiz" ? quizAnswers : undefined,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setDone(true);
        setTimeout(() => {
          router.push(`/roadmap/${data.roadmapId}`);
        }, 1500);
      } else {
        setDone(true);
        setTimeout(() => {
          router.push("/roadmap/demo");
        }, 1500);
      }
    } catch {
      setDone(true);
      setTimeout(() => {
        router.push("/roadmap/demo");
      }, 1500);
    }
  }, [name, dateOfBirth, timeOfBirth, birthLocation, mbtiType, mbtiSource, quizAnswers, router]);

  useEffect(() => {
    generateRoadmap();
  }, [generateRoadmap]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + 2, done ? 100 : 95);
        setGenerationProgress(next);
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [done, setGenerationProgress]);

  useEffect(() => {
    if (progress >= 100) return;
    const phaseAt = Math.floor((progress / 100) * PHASES.length);
    setPhaseIndex(Math.min(phaseAt, PHASES.length - 1));
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-5xl mx-auto px-6"
    >
      <div className="relative w-full aspect-video md:aspect-[21/9] min-h-[500px] rounded-[3rem] bg-[#192540]/40 backdrop-blur-3xl border border-white/5 shadow-2xl overflow-hidden flex items-center justify-center">
        {/* Background particles */}
        <div className="absolute inset-0 flex justify-around items-center opacity-30 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-64 h-64 rounded-full bg-[#5bf4de]/20 blur-[100px]"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="w-64 h-64 rounded-full bg-[#919bff]/20 blur-[100px]"
          />
        </div>

        {/* Central content */}
        <div className="relative flex flex-col items-center justify-center text-center p-12 z-10">
          {/* Core orb */}
          <div className="mb-8 relative">
            {/* Orbiting rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-16 border border-[#5bf4de]/20 rounded-full"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#5bf4de]/60 rounded-full shadow-[0_0_10px_rgba(91,244,222,0.5)]" />
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-24 border border-[#919bff]/10 rounded-full"
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-[#919bff]/60 rounded-full shadow-[0_0_10px_rgba(145,155,255,0.5)]" />
            </motion.div>

            {/* Core icon */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-32 h-32 rounded-full bg-[#192540] flex items-center justify-center border border-[#5bf4de]/40 shadow-[0_0_50px_rgba(91,244,222,0.3)]"
            >
              <SparklesIcon className="w-12 h-12 text-[#5bf4de]" />
            </motion.div>
          </div>

          <h1 className="font-[Manrope] text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 text-white drop-shadow-xl">
            Decoding Destiny...
          </h1>
          <motion.p
            key={phaseIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-[Manrope] text-xl md:text-2xl font-light text-[#a3aac4] tracking-wide max-w-2xl"
          >
            {PHASES[phaseIndex]}
          </motion.p>

          {/* Progress bar */}
          <div className="mt-12 w-full max-w-md">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[10px] uppercase tracking-widest text-[#5bf4de]/60 font-bold">
                Alchemy Status
              </span>
              <span className="text-xl font-[Manrope] font-black text-[#5bf4de]">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#192540] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#5bf4de] to-[#919bff] shadow-[0_0_15px_rgba(91,244,222,0.5)]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Generate button (visible when done) */}
      {done && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 flex justify-center"
        >
          <button
            onClick={() => router.push("/roadmap/demo")}
            className="group relative flex items-center gap-3 px-10 py-4 bg-[#5bf4de] text-[#00594f] rounded-full font-bold text-lg shadow-[0_0_40px_rgba(91,244,222,0.4)] hover:shadow-[0_0_60px_rgba(91,244,222,0.7)] hover:scale-105 transition-all"
          >
            <RocketIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            View Your Roadmap
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
