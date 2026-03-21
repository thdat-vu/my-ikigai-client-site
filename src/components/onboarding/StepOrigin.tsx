"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { ArrowBack, ArrowForward } from "@/components/icons";
import { useOnboardingStore } from "@/stores/onboarding";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const HOURS = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
const MINUTES = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, "0"));

function TimePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [hour, minute] = value ? value.split(":") : ["", ""];

  const setTime = (h: string, m: string) => {
    if (h && m) onChange(`${h}:${m}`);
    else if (h) onChange(`${h}:00`);
  };

  return (
    <div className="flex gap-3">
      <div className="flex-1">
        <label className="block text-[10px] uppercase tracking-widest text-[#5bf4de]/60 mb-2 font-medium">
          Hour
        </label>
        <div className="grid grid-cols-6 gap-1.5 max-h-44 overflow-y-auto pr-1">
          {HOURS.map((h) => (
            <button
              key={h}
              onClick={() => setTime(h, minute || "00")}
              className={cn(
                "py-1.5 rounded-lg text-xs font-semibold transition-all bg-transparent hover:bg-transparent",
                hour === h
                  ? "bg-[#5bf4de]/20 text-[#5bf4de] border border-[#5bf4de]/40 shadow-[0_0_8px_rgba(91,244,222,0.2)] hover:bg-[#5bf4de]/20"
                  : "bg-[#192540] text-[#a3aac4] border border-transparent hover:text-[#dee5ff] hover:bg-[#192540]/80"
              )}
            >
              {h}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1">
        <label className="block text-[10px] uppercase tracking-widest text-[#5bf4de]/60 mb-2 font-medium">
          Minute
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {MINUTES.map((m) => (
            <button
              key={m}
              onClick={() => setTime(hour || "00", m)}
              className={cn(
                "py-1.5 rounded-lg text-xs font-semibold transition-all bg-transparent hover:bg-transparent",
                minute === m
                  ? "bg-[#5bf4de]/20 text-[#5bf4de] border border-[#5bf4de]/40 shadow-[0_0_8px_rgba(91,244,222,0.2)] hover:bg-[#5bf4de]/20"
                  : "bg-[#192540] text-[#a3aac4] border border-transparent hover:text-[#dee5ff] hover:bg-[#192540]/80"
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StepOrigin() {
  const {
    dateOfBirth, setDateOfBirth,
    timeOfBirth, setTimeOfBirth,
    nextStep, prevStep,
  } = useOnboardingStore();

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);

  const selectedDate = dateOfBirth ? new Date(dateOfBirth) : undefined;
  const canContinue = dateOfBirth.trim().length > 0;

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setDateOfBirth(format(date, "yyyy-MM-dd"));
      setCalendarOpen(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="relative w-full max-w-5xl mx-auto px-6"
    >
      <section className="relative bg-[#192540]/40 backdrop-blur-3xl rounded-[2.5rem] p-12 lg:p-16 overflow-hidden border border-[#40485d]/20 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
        {/* Background orbs */}
        <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none flex items-center justify-center overflow-hidden">
          <div className="relative w-[500px] h-[500px] rounded-full border border-[#5bf4de]/10 flex items-center justify-center">
            <div className="absolute w-[350px] h-[350px] rounded-full border border-[#5bf4de]/20" />
            <div className="absolute w-[200px] h-[200px] rounded-full border border-[#5bf4de]/30" />
            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-[#5bf4de] rounded-full shadow-[0_0_20px_#5bf4de]">
              <div className="absolute inset-0 animate-ping rounded-full bg-[#5bf4de] opacity-75" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start relative z-10">
          {/* Left: Context */}
          <div className="space-y-8">
            <h1 className="font-[Manrope] text-4xl lg:text-5xl font-extrabold tracking-tight text-[#dee5ff] leading-tight">
              Define Your <span className="text-[#5bf4de] italic">Origin</span>
            </h1>
            <p className="text-[#a3aac4] text-lg leading-relaxed max-w-sm">
              To map your purpose, we must first anchor your existence in time
              and space. The cosmos awaits your coordinates.
            </p>

            {/* Orbital clock visual */}
            <div className="pt-8 hidden lg:block">
              <div className="relative w-48 h-48 rounded-full border-2 border-[#40485d]/30 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#dee5ff] rounded-full shadow-lg" />
                </motion.div>
                <div className="text-center">
                  <span className="block font-[Manrope] text-3xl font-light text-[#5bf4de]">
                    {timeOfBirth || "00:00"}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#a3aac4]">
                    Birth Time
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Inputs */}
          <div className="space-y-8">
            {/* Date of Birth */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#5bf4de] mb-3 font-medium">
                Date of Birth
              </label>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger
                  className={cn(
                    "w-full flex items-center text-left h-14 rounded-xl px-6 bg-[#0f1930] border border-[#40485d]/30 hover:bg-[#152242] transition-all text-base cursor-pointer",
                    selectedDate ? "text-[#dee5ff]" : "text-[#40485d]"
                  )}
                >
                  <CalendarIcon className="mr-3 h-5 w-5 text-[#5bf4de]/60 shrink-0" />
                  {selectedDate
                    ? format(selectedDate, "MMMM d, yyyy")
                    : "Select your birth date"}
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 bg-[#0f1930] border-[#40485d]/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    captionLayout="dropdown"
                    defaultMonth={selectedDate || new Date(2000, 0)}
                    fromYear={1950}
                    toYear={new Date().getFullYear()}
                    className="rounded-2xl p-3"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time of Birth */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#5bf4de] mb-3 font-medium">
                Time of Birth (Optional)
              </label>
              <Popover open={timeOpen} onOpenChange={setTimeOpen}>
                <PopoverTrigger
                  className={cn(
                    "w-full flex items-center text-left h-14 rounded-xl px-6 bg-[#0f1930] border border-[#40485d]/30 hover:bg-[#152242] transition-all text-base cursor-pointer",
                    timeOfBirth ? "text-[#dee5ff]" : "text-[#40485d]"
                  )}
                >
                  <Clock className="mr-3 h-5 w-5 text-[#5bf4de]/60 shrink-0" />
                  {timeOfBirth || "Select birth time"}
                </PopoverTrigger>
                <PopoverContent
                  className="w-80 p-4 bg-[#0f1930] border-[#40485d]/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                  align="start"
                >
                  <TimePicker value={timeOfBirth} onChange={setTimeOfBirth} />
                </PopoverContent>
              </Popover>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={prevStep}
                className="flex items-center gap-2 px-6 py-3 text-[#a3aac4] hover:text-[#dee5ff] transition-colors font-semibold bg-transparent hover:bg-transparent"
              >
                <ArrowBack />
                Back
              </button>
              <button
                onClick={nextStep}
                disabled={!canContinue}
                className="relative px-10 py-4 bg-[#5bf4de] text-[#00594f] rounded-full font-bold text-lg shadow-[0_0_20px_rgba(91,244,222,0.3)] hover:shadow-[0_0_35px_rgba(91,244,222,0.5)] transition-all active:scale-95 disabled:opacity-40 flex items-center gap-2"
              >
                Continue
                <ArrowForward />
              </button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
