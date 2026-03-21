export interface OnboardingData {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  birthLocation: string;
  mbtiType: string;
  mbtiSource: "selected" | "quiz";
  quizAnswers?: number[];
}

export interface UserProfile {
  id: string;
  name: string;
  date_of_birth: string;
  time_of_birth: string | null;
  birth_location: string | null;
  mbti_type: string;
  mbti_source: "selected" | "quiz";
  created_at: string;
}

export interface RoadmapMilestone {
  id: string;
  quarter: string;
  title: string;
  description: string;
  astroContext?: string;
  type: "career" | "growth" | "relationship" | "spiritual";
}

export interface Roadmap {
  id: string;
  profile_id: string;
  milestones: RoadmapMilestone[];
  ai_response: Record<string, unknown>;
  created_at: string;
}

export interface GenerateRoadmapRequest {
  name: string;
  dateOfBirth: string;
  timeOfBirth?: string;
  birthLocation?: string;
  mbtiType: string;
  mbtiSource: "selected" | "quiz";
  quizAnswers?: number[];
}

export interface GenerateRoadmapResponse {
  profileId: string;
  roadmapId: string;
  milestones: RoadmapMilestone[];
}
