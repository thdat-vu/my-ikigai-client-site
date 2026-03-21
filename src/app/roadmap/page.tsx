"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Sparkles, BookOpen, ExternalLink } from "lucide-react";
import { useOnboardingStore } from "@/stores/onboarding";
import { DEMO_ROADMAP } from "@/lib/demo-roadmap";
import type { Roadmap, RoadmapYear, CourseInfo } from "@/types";

function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-2xl bg-[#060e20]/70 px-8 py-4 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-[#5bf4de]" />
        <span className="font-[Manrope] font-extrabold tracking-tighter text-lg text-white">
          AstroRoadmap
        </span>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        {["Journey", "Explore", "Insights"].map((l) => (
          <span key={l} className="text-sm text-[#8a94b0] hover:text-white cursor-pointer transition-colors">
            {l}
          </span>
        ))}
      </nav>
    </header>
  );
}

function ProfileCard({ name, mbti, roadmap }: { name: string; mbti: string; roadmap: Roadmap }) {
  return (
    <div className="rounded-3xl bg-[#0f1d38] p-8 border border-[#5bf4de]/10">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#5bf4de]/60 font-bold">
          Cosmic Intelligence Profile
        </span>
      </div>
      <h2 className="font-[Manrope] text-3xl md:text-4xl font-extrabold text-white mb-2">
        {name || "Explorer"}
      </h2>
      <p className="text-[#8a94b0] leading-relaxed text-sm max-w-xl">
        &quot;{roadmap.summary}&quot;
      </p>
      {mbti && (
        <div className="mt-4 flex gap-2">
          <span className="px-3 py-1 rounded-full bg-[#5bf4de]/10 text-[#5bf4de] text-xs font-bold">
            {mbti}
          </span>
          <span className="px-3 py-1 rounded-full bg-[#919bff]/10 text-[#919bff] text-xs font-bold">
            Age {roadmap.current_age}
          </span>
        </div>
      )}
    </div>
  );
}

function YearCard({ year, isExpanded, onToggle, courses }: {
  year: RoadmapYear;
  isExpanded: boolean;
  onToggle: () => void;
  courses: Record<string, CourseInfo>;
}) {
  return (
    <div className="rounded-3xl bg-[#0f1d38] overflow-hidden border border-[#40485d]/20 hover:border-[#5bf4de]/20 transition-all">
      {/* Year header */}
      <button
        onClick={onToggle}
        className="w-full p-6 md:p-8 flex items-center justify-between text-left bg-transparent hover:bg-transparent"
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#5bf4de]/60 font-bold">
              {year.year_label}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#5bf4de]/10 text-[#5bf4de] text-[10px] font-bold">
              {year.energy_tag}
            </span>
          </div>
          <h3 className="font-[Manrope] text-xl md:text-2xl font-extrabold text-white">
            {year.title}
          </h3>
          <p className="text-sm text-[#8a94b0] mt-1 max-w-lg">
            {year.yearly_energy}
          </p>
        </div>
        <div className="ml-4 w-10 h-10 rounded-full bg-[#192540] flex items-center justify-center shrink-0">
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="text-[#5bf4de] text-lg"
          >
            ▾
          </motion.span>
        </div>
      </button>

      {/* Quarters */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {year.quarters.map((q) => {
                const course = courses[q.focus_skill];
                return (
                  <div
                    key={q.label}
                    className="rounded-2xl bg-[#192540]/80 p-5 border border-[#40485d]/20 flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest text-[#5bf4de] font-bold">
                        {q.label}
                      </span>
                    </div>
                    <p className="text-sm text-[#dee5ff] leading-relaxed flex-1">
                      {q.logic_action}
                    </p>
                    <p className="text-xs text-[#919bff]/70 italic">
                      {q.astral_energy}
                    </p>
                    <div className="pt-2 border-t border-[#40485d]/20">
                      <span className="inline-block px-2.5 py-1 rounded-full bg-[#5bf4de]/10 text-[#5bf4de] text-[10px] font-bold">
                        {q.focus_skill}
                      </span>
                      {course && (
                        <a
                          href={course.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 flex items-center gap-1.5 text-[10px] text-[#919bff] hover:text-[#5bf4de] transition-colors"
                        >
                          <BookOpen className="w-3 h-3" />
                          {course.title}
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function RoadmapPage() {
  const { name, mbtiType, roadmap: storeRoadmap, courses, setCourses } = useOnboardingStore();
  const roadmap = storeRoadmap || DEMO_ROADMAP;
  const displayName = name || "Alex Chen";
  const displayMbti = mbtiType || "INTJ";

  const [expandedYear, setExpandedYear] = useState(0);
  const [loadingCourses, setLoadingCourses] = useState(false);

  useEffect(() => {
    if (Object.keys(courses).length > 0) return;
    if (!roadmap) return;

    const fetchCourses = async () => {
      setLoadingCourses(true);
      try {
        const res = await fetch("/api/find-courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(roadmap),
        });
        const data = await res.json();
        if (data.success && data.courses) {
          setCourses(data.courses);
        }
      } catch {
        // courses are optional
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, [roadmap, courses, setCourses]);

  return (
    <div className="min-h-screen bg-[#060e20] text-[#dee5ff]">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,_rgba(91,244,222,0.06)_0%,_transparent_70%)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-[Manrope] text-4xl md:text-6xl font-extrabold tracking-tight text-white text-center mb-3">
              5-Year <span className="italic text-[#5bf4de]">Astro-Logic</span> Path
            </h1>
            <p className="text-center text-[#8a94b0] max-w-2xl mx-auto mb-12">
              A multidimensional roadmap bridging cognitive science and celestial timing to
              maximize your Ikigai.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <ProfileCard name={displayName} mbti={displayMbti} roadmap={roadmap} />
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl space-y-4">
          {roadmap.years.map((year, i) => (
            <motion.div
              key={year.year_label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
            >
              <YearCard
                year={year}
                isExpanded={expandedYear === i}
                onToggle={() => setExpandedYear(expandedYear === i ? -1 : i)}
                courses={courses}
              />
            </motion.div>
          ))}
        </div>

        {/* Loading courses indicator */}
        {loadingCourses && (
          <div className="text-center mt-8">
            <span className="text-xs text-[#5bf4de]/60 uppercase tracking-widest animate-pulse">
              Finding recommended courses...
            </span>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center">
        <p className="text-xs text-[#40485d]">
          &copy; {new Date().getFullYear()} MyIkigai. Powered by Next.js, Supabase, and TinyFish.ai
        </p>
      </footer>
    </div>
  );
}
