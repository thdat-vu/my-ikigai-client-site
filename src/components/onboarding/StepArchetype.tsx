"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowBack, ArrowForward } from "@/components/icons";
import { useOnboardingStore } from "@/stores/onboarding";
import { mbtiQuestions, calculateMBTI } from "@/lib/mbti-questions";

const MBTI_TYPES = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP",
];

function MBTIGrid() {
  const { mbtiType, setMbtiType, setMbtiSource, nextStep } = useOnboardingStore();

  const handleSelect = (type: string) => {
    setMbtiType(type);
    setMbtiSource("selected");
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-4 gap-3">
        {MBTI_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => handleSelect(type)}
            className={`aspect-square flex items-center justify-center rounded-xl text-[11px] font-black transition-all duration-200 hover:scale-110 ${
              mbtiType === type
                ? "bg-[#5bf4de]/20 border-2 border-[#5bf4de]/60 text-[#5bf4de] shadow-[0_0_12px_rgba(91,244,222,0.3)]"
                : "bg-[#192540] border border-[#40485d] text-[#a3aac4] hover:text-[#dee5ff] hover:border-[#5bf4de]/40"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      {mbtiType && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <button
            onClick={nextStep}
            className="px-10 py-3 bg-[#5bf4de] text-[#00594f] rounded-full font-bold shadow-[0_0_20px_rgba(91,244,222,0.3)] hover:shadow-[0_0_30px_rgba(91,244,222,0.5)] transition-all"
          >
            Confirm {mbtiType}
          </button>
        </motion.div>
      )}
    </div>
  );
}

function VibeCheckQuiz() {
  const {
    currentQuestionIndex,
    quizAnswers,
    setQuizAnswer,
    nextQuestion,
    setMbtiType,
    setMbtiSource,
    nextStep,
  } = useOnboardingStore();

  const question = mbtiQuestions[currentQuestionIndex];
  const isLast = currentQuestionIndex === mbtiQuestions.length - 1;
  const value = quizAnswers[currentQuestionIndex];

  const handleNext = () => {
    if (isLast) {
      const result = calculateMBTI(quizAnswers);
      setMbtiType(result);
      setMbtiSource("quiz");
      nextStep();
    } else {
      nextQuestion();
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Progress */}
      <div className="flex items-center gap-2 w-full">
        {mbtiQuestions.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i <= currentQuestionIndex
                ? "bg-[#5bf4de] shadow-[0_0_6px_rgba(91,244,222,0.4)]"
                : "bg-[#192540]"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full flex flex-col items-center gap-8"
        >
          {/* Question number */}
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#919bff] font-bold">
            Question {currentQuestionIndex + 1} of {mbtiQuestions.length}
          </span>

          {/* Question text */}
          <h3 className="font-[Manrope] text-xl md:text-2xl font-bold text-center text-[#dee5ff] max-w-md">
            {question.text}
          </h3>

          {/* Floating word hints */}
          <div className="h-12 flex items-center justify-between w-full relative px-4">
            <span className="text-sm font-[Manrope] italic text-[#5bf4de]/70">
              {question.leftLabel}
            </span>
            <span className="text-sm font-[Manrope] italic text-[#919bff]/70">
              {question.rightLabel}
            </span>
          </div>

          {/* Slider */}
          <div className="w-full px-4">
            <div className="w-full h-12 flex items-center px-4 bg-[#192540]/50 rounded-full relative overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#5bf4de]/10 to-[#919bff]/20 transition-all"
                style={{ width: `${(value / 5) * 100}%` }}
              />
              <input
                type="range"
                min={1}
                max={5}
                value={value}
                onChange={(e) =>
                  setQuizAnswer(currentQuestionIndex, Number(e.target.value))
                }
                className="relative z-10 w-full h-1.5 appearance-none bg-[#192540] rounded-full outline-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-8
                  [&::-webkit-slider-thumb]:h-8
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-[#dee5ff]
                  [&::-webkit-slider-thumb]:border-4
                  [&::-webkit-slider-thumb]:border-[#5bf4de]
                  [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(91,244,222,0.6)]
                  [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>
            <p className="text-center text-[10px] text-[#a3aac4] mt-3 tracking-wide">
              Slide to resonate with your core energy
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={handleNext}
        className="px-10 py-3 bg-[#5bf4de] text-[#00594f] rounded-full font-bold shadow-[0_0_20px_rgba(91,244,222,0.3)] hover:shadow-[0_0_30px_rgba(91,244,222,0.5)] transition-all flex items-center gap-2"
      >
        {isLast ? "Reveal My Type" : "Next"}
        <ArrowForward />
      </button>
    </div>
  );
}

export function StepArchetype() {
  const { isTakingQuiz, setIsTakingQuiz, prevStep } = useOnboardingStore();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="relative w-full max-w-6xl mx-auto px-6"
    >
      <div className="bg-[#192540]/40 backdrop-blur-3xl rounded-[2.5rem] p-12 lg:p-16 border border-white/5 shadow-2xl shadow-[0_0_60px_-15px_rgba(91,244,222,0.15)] flex flex-col gap-12">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="font-[Manrope] text-4xl lg:text-5xl font-extrabold tracking-tight text-[#dee5ff]">
            The Pivot
          </h1>
          <p className="text-[#a3aac4] text-base max-w-md mx-auto">
            Define your digital essence through structured logic or intuitive
            resonance.
          </p>
        </header>

        {/* Mode toggle */}
        <div className="flex justify-center">
          <div className="flex bg-[#0f1930] rounded-full p-1">
            <button
              onClick={() => setIsTakingQuiz(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                !isTakingQuiz
                  ? "bg-[#5bf4de]/15 text-[#5bf4de] shadow-[0_0_10px_rgba(91,244,222,0.2)]"
                  : "text-[#a3aac4] hover:text-[#dee5ff]"
              }`}
            >
              I Know My Type
            </button>
            <button
              onClick={() => setIsTakingQuiz(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                isTakingQuiz
                  ? "bg-[#919bff]/15 text-[#919bff] shadow-[0_0_10px_rgba(145,155,255,0.2)]"
                  : "text-[#a3aac4] hover:text-[#dee5ff]"
              }`}
            >
              Take the Vibe Check
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-8">
          <div className="relative p-8 rounded-3xl bg-[#091328]/60 border border-[#5bf4de]/10">
            <div className="flex flex-col gap-4 mb-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#5bf4de] font-bold">
                {isTakingQuiz ? "RESONATE" : "RECOGNIZE"}
              </span>
              <h2 className="font-[Manrope] text-2xl font-bold text-[#dee5ff]">
                {isTakingQuiz ? "Take the Vibe Check" : "Set Your Base Archetype"}
              </h2>
            </div>

            <AnimatePresence mode="wait">
              {isTakingQuiz ? (
                <motion.div
                  key="quiz"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <VibeCheckQuiz />
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <MBTIGrid />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Back button */}
        <div className="flex justify-start">
          <button
            onClick={prevStep}
            className="flex items-center gap-2 px-6 py-3 text-[#a3aac4] hover:text-[#dee5ff] transition-colors font-semibold bg-transparent hover:bg-transparent"
          >
            <ArrowBack />
            Back
          </button>
        </div>

        {/* Constellation step indicator */}
        <div className="flex justify-center items-center gap-4 py-2">
          <div className="flex items-center gap-2 opacity-30">
            <div className="w-2 h-2 rounded-full bg-[#dee5ff]" />
            <div className="w-8 h-px bg-[#dee5ff]/20" />
          </div>
          <div className="flex items-center gap-2 opacity-30">
            <div className="w-2 h-2 rounded-full bg-[#dee5ff]" />
            <div className="w-8 h-px bg-[#dee5ff]/20" />
          </div>
          <div className="flex items-center gap-3 bg-[#5bf4de]/10 px-4 py-2 rounded-full border border-[#5bf4de]/20">
            <div className="w-3 h-3 rounded-full bg-[#5bf4de] shadow-[0_0_8px_#5bf4de]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#5bf4de]">
              Archetype Resonance
            </span>
          </div>
          <div className="flex items-center gap-2 opacity-30">
            <div className="w-8 h-px bg-[#dee5ff]/20" />
            <div className="w-2 h-2 rounded-full bg-[#dee5ff]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
