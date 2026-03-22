"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Sparkles, BookOpen, ExternalLink, ChevronDown } from "lucide-react";
import { useOnboardingStore } from "@/stores/onboarding";
import { DEMO_ROADMAP } from "@/lib/demo-roadmap";
import { getEnergyTheme } from "@/lib/energy-colors";
import type { Roadmap, RoadmapYear, RoadmapQuarter, CourseInfo } from "@/types";

/* ─── Navbar ─── */
function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-2xl bg-[#060e20]/70 px-6 md:px-8 py-4 flex justify-between items-center">
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

/* ─── Profile Card ─── */
function ProfileCard({ name, mbti, roadmap }: { name: string; mbti: string; roadmap: Roadmap }) {
  return (
    <div className="rounded-3xl bg-[#0f1d38] p-6 md:p-8 border border-[#5bf4de]/10">
      <span className="text-[10px] uppercase tracking-[0.2em] text-[#5bf4de]/60 font-bold">
        Cosmic Intelligence Profile
      </span>
      <h2 className="font-[Manrope] text-3xl md:text-4xl font-extrabold text-white mt-2 mb-3">
        {name}
      </h2>
      <p className="text-[#8a94b0] leading-relaxed text-sm max-w-xl">
        &quot;{roadmap.summary}&quot;
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {mbti && (
          <span className="px-3 py-1 rounded-full bg-[#5bf4de]/10 text-[#5bf4de] text-xs font-bold">
            {mbti}
          </span>
        )}
        <span className="px-3 py-1 rounded-full bg-[#919bff]/10 text-[#919bff] text-xs font-bold">
          Age {roadmap.current_age}
        </span>
        {roadmap.years[0] && (
          <span className="px-3 py-1 rounded-full bg-[#ff6b35]/10 text-[#ff9a6c] text-xs font-bold">
            {roadmap.years[0].energy_tag}
          </span>
        )}
      </div>
    </div>
  );
}

/* ─── Course Skeleton ─── */
function CourseSkeleton() {
  return (
    <div className="mt-2 flex items-center gap-2 animate-pulse">
      <div className="w-3 h-3 rounded bg-[#192540]" />
      <div className="h-3 w-32 rounded bg-[#192540]" />
    </div>
  );
}

/* ─── Quarter Card ─── */
function QuarterCard({
  quarter,
  course,
  loadingCourses,
  accentColor,
}: {
  quarter: RoadmapQuarter;
  course?: CourseInfo;
  loadingCourses: boolean;
  accentColor: string;
}) {
  return (
    <div className="rounded-2xl bg-[#192540]/80 p-5 border border-[#40485d]/20 flex flex-col gap-3 hover:border-[#40485d]/40 transition-all">
      <span
        className="text-[10px] uppercase tracking-widest font-bold"
        style={{ color: accentColor }}
      >
        {quarter.label}
      </span>
      <p className="text-sm text-[#dee5ff] leading-relaxed flex-1">
        {quarter.logic_action}
      </p>
      <p className="text-xs text-[#919bff]/60 italic leading-relaxed">
        {quarter.astral_energy}
      </p>
      <div className="pt-3 border-t border-[#40485d]/20 space-y-2">
        <span
          className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold"
          style={{
            backgroundColor: `${accentColor}15`,
            color: accentColor,
          }}
        >
          {quarter.focus_skill}
        </span>

        {loadingCourses && !course && <CourseSkeleton />}

        <AnimatePresence>
          {course && (
            <motion.a
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              href={course.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] text-[#919bff] hover:text-[#5bf4de] transition-colors group"
            >
              <BookOpen className="w-3 h-3 shrink-0" />
              <span className="truncate">{course.title}</span>
              <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Year Accordion Card ─── */
function YearCard({
  year,
  index,
  isExpanded,
  onToggle,
  courses,
  loadingCourses,
}: {
  year: RoadmapYear;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  courses: Record<string, CourseInfo>;
  loadingCourses: boolean;
}) {
  const theme = getEnergyTheme(year.energy_tag);

  return (
    <div
      className={`rounded-3xl bg-[#0f1d38] overflow-hidden transition-all duration-300 ${
        isExpanded ? theme.border : "border border-[#40485d]/15"
      }`}
      style={
        isExpanded
          ? { boxShadow: `0 0 40px ${theme.glow}` }
          : undefined
      }
    >
      {/* Year header — always visible */}
      <button
        onClick={onToggle}
        className="w-full p-5 md:p-7 flex items-center justify-between text-left bg-transparent hover:bg-transparent group"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1.5 flex-wrap">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8a94b0] font-bold">
              Phase {String(index).padStart(2, "0")}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8a94b0]">
              {year.year_label}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${theme.badge} ${theme.badgeText}`}
            >
              {year.energy_tag}
            </span>
          </div>
          <h3 className="font-[Manrope] text-lg md:text-2xl font-extrabold text-white">
            {year.title}
          </h3>
          {!isExpanded && (
            <p className="text-sm text-[#8a94b0] mt-1 truncate max-w-lg">
              {year.yearly_energy}
            </p>
          )}
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-4 w-9 h-9 rounded-full bg-[#192540] flex items-center justify-center shrink-0 group-hover:bg-[#1e2d4a] transition-colors"
        >
          <ChevronDown className="w-4 h-4 text-[#5bf4de]" />
        </motion.div>
      </button>

      {/* Expanded quarters */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {/* Energy description */}
            <div className="px-5 md:px-7 pb-4">
              <p className="text-sm text-[#8a94b0] leading-relaxed">
                {year.yearly_energy}
              </p>
            </div>

            {/* Quarter grid */}
            <div className="px-5 md:px-7 pb-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {year.quarters.map((q) => (
                <QuarterCard
                  key={q.label}
                  quarter={q}
                  course={courses[q.focus_skill]}
                  loadingCourses={loadingCourses}
                  accentColor={theme.accent}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Page ─── */
export default function RoadmapPage() {
  const { name, mbtiType, roadmap: storeRoadmap, courses, setCourses } = useOnboardingStore();
  const roadmap: Roadmap = storeRoadmap || DEMO_ROADMAP;
  const displayName = name || "Alex Chen";
  const displayMbti = mbtiType || "INTJ";

  const [expandedYear, setExpandedYear] = useState(0);
  const [loadingCourses, setLoadingCourses] = useState(false);

  const fetchCourses = useCallback(async () => {
    if (Object.keys(courses).length > 0) return;
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
      // courses are supplementary, don't block UI
    } finally {
      setLoadingCourses(false);
    }
  }, [roadmap, courses, setCourses]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <div className="min-h-screen bg-[#060e20] text-[#dee5ff]">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 md:pt-28 pb-10 md:pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,_rgba(91,244,222,0.06)_0%,_transparent_70%)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-[Manrope] text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-3">
              5-Year <span className="italic text-[#5bf4de]">Astro-Logic</span> Path
            </h1>
            <p className="text-[#8a94b0] max-w-2xl mx-auto text-sm md:text-base">
              A multidimensional roadmap bridging cognitive science and celestial timing to
              maximize your Ikigai.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ProfileCard name={displayName} mbti={displayMbti} roadmap={roadmap} />
          </motion.div>
        </div>
      </section>

      {/* 5-Year Timeline */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl space-y-3">
          {roadmap.years.map((year, i) => (
            <motion.div
              key={year.year_label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.06 * i }}
            >
              <YearCard
                year={year}
                index={i}
                isExpanded={expandedYear === i}
                onToggle={() => setExpandedYear(expandedYear === i ? -1 : i)}
                courses={courses}
                loadingCourses={loadingCourses}
              />
            </motion.div>
          ))}
        </div>

        {loadingCourses && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-6 text-xs text-[#5bf4de]/50 uppercase tracking-widest animate-pulse"
          >
            Discovering recommended courses...
          </motion.p>
        )}
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center border-t border-[#40485d]/10">
        <p className="text-xs text-[#40485d]">
          &copy; {new Date().getFullYear()} MyIkigai. Powered by Next.js, Supabase, and TinyFish.ai
        </p>
      </footer>
    </div>
  );
}
