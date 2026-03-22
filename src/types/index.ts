// Onboarding form data
export interface OnboardingData {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  mbtiType: string;
  mbtiSource: "selected" | "quiz";
  personaGoal: string;
  quizAnswers?: number[];
}

// API request to Supabase Edge Function
export interface GenerateRoadmapRequest {
  name: string;
  dob: string;
  tob: string;
  mbti: string;
  persona_goal: string;
}

// Quarter within a year
export interface RoadmapQuarter {
  label: string;
  logic_action: string;
  astral_energy: string;
  focus_skill: string;
}

// Year in the 5-year plan
export interface RoadmapYear {
  year_label: string;
  year_age: number;
  title: string;
  yearly_energy: string;
  energy_tag: string;
  quarters: RoadmapQuarter[];
}

// Full roadmap object
export interface Roadmap {
  summary: string;
  current_age: number;
  years: RoadmapYear[];
}

// API response from process-roadmap
export interface RoadmapResponse {
  success: boolean;
  roadmap: Roadmap;
}

// Course info from process-find-courses
export interface CourseInfo {
  title: string;
  url: string;
  platform: string;
}

// API response from process-find-courses
export interface CoursesResponse {
  success: boolean;
  courses: Record<string, CourseInfo>;
}
