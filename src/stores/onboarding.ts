import { create } from "zustand";
import type { Roadmap } from "@/types";

export interface OnboardingState {
  step: number;
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  mbtiType: string;
  mbtiSource: "selected" | "quiz";
  personaGoal: string;
  quizAnswers: number[];
  isTakingQuiz: boolean;
  currentQuestionIndex: number;
  isGenerating: boolean;
  generationProgress: number;
  roadmap: Roadmap | null;
  courses: Record<string, { title: string; url: string; platform: string }>;

  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setName: (name: string) => void;
  setDateOfBirth: (dob: string) => void;
  setTimeOfBirth: (time: string) => void;
  setMbtiType: (type: string) => void;
  setMbtiSource: (source: "selected" | "quiz") => void;
  setPersonaGoal: (goal: string) => void;
  setQuizAnswer: (index: number, value: number) => void;
  setIsTakingQuiz: (v: boolean) => void;
  setCurrentQuestionIndex: (i: number) => void;
  nextQuestion: () => void;
  setIsGenerating: (v: boolean) => void;
  setGenerationProgress: (p: number) => void;
  setRoadmap: (r: Roadmap) => void;
  setCourses: (c: Record<string, { title: string; url: string; platform: string }>) => void;
  reset: () => void;
}

const initialState = {
  step: 1,
  name: "",
  dateOfBirth: "",
  timeOfBirth: "",
  mbtiType: "",
  mbtiSource: "selected" as const,
  personaGoal: "",
  quizAnswers: Array(10).fill(3),
  isTakingQuiz: false,
  currentQuestionIndex: 0,
  isGenerating: false,
  generationProgress: 0,
  roadmap: null as Roadmap | null,
  courses: {} as Record<string, { title: string; url: string; platform: string }>,
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initialState,
  setStep: (step) => set({ step }),
  nextStep: () => set((s) => ({ step: Math.min(s.step + 1, 4) })),
  prevStep: () => set((s) => ({ step: Math.max(s.step - 1, 1) })),
  setName: (name) => set({ name }),
  setDateOfBirth: (dateOfBirth) => set({ dateOfBirth }),
  setTimeOfBirth: (timeOfBirth) => set({ timeOfBirth }),
  setMbtiType: (mbtiType) => set({ mbtiType }),
  setMbtiSource: (mbtiSource) => set({ mbtiSource }),
  setPersonaGoal: (personaGoal) => set({ personaGoal }),
  setQuizAnswer: (index, value) =>
    set((s) => {
      const answers = [...s.quizAnswers];
      answers[index] = value;
      return { quizAnswers: answers };
    }),
  setIsTakingQuiz: (isTakingQuiz) =>
    set({ isTakingQuiz, currentQuestionIndex: 0 }),
  setCurrentQuestionIndex: (currentQuestionIndex) =>
    set({ currentQuestionIndex }),
  nextQuestion: () =>
    set((s) => ({ currentQuestionIndex: s.currentQuestionIndex + 1 })),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setGenerationProgress: (generationProgress) => set({ generationProgress }),
  setRoadmap: (roadmap) => set({ roadmap }),
  setCourses: (courses) => set({ courses }),
  reset: () => set(initialState),
}));
