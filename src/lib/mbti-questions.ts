export interface MBTIQuestion {
  id: number;
  text: string;
  leftLabel: string;
  rightLabel: string;
  axis: "EI" | "SN" | "TF" | "JP";
}

export const mbtiQuestions: MBTIQuestion[] = [
  {
    id: 1,
    text: "At a party, you feel more energized by...",
    leftLabel: "Observing quietly",
    rightLabel: "Meeting everyone",
    axis: "EI",
  },
  {
    id: 2,
    text: "When solving a problem, you rely on...",
    leftLabel: "Proven methods",
    rightLabel: "New possibilities",
    axis: "SN",
  },
  {
    id: 3,
    text: "When a friend is upset, you first offer...",
    leftLabel: "Logical advice",
    rightLabel: "Emotional support",
    axis: "TF",
  },
  {
    id: 4,
    text: "Your workspace tends to be...",
    leftLabel: "Flexible & open",
    rightLabel: "Organized & planned",
    axis: "JP",
  },
  {
    id: 5,
    text: "You recharge best by...",
    leftLabel: "Being alone",
    rightLabel: "Being with people",
    axis: "EI",
  },
  {
    id: 6,
    text: "You are more drawn to...",
    leftLabel: "What is real now",
    rightLabel: "What could be",
    axis: "SN",
  },
  {
    id: 7,
    text: "Decisions should be based on...",
    leftLabel: "Objective analysis",
    rightLabel: "Personal values",
    axis: "TF",
  },
  {
    id: 8,
    text: "You prefer life to be...",
    leftLabel: "Spontaneous",
    rightLabel: "Structured",
    axis: "JP",
  },
  {
    id: 9,
    text: "In a group project, you naturally...",
    leftLabel: "Work independently",
    rightLabel: "Collaborate closely",
    axis: "EI",
  },
  {
    id: 10,
    text: "When imagining the future, you see...",
    leftLabel: "Concrete plans",
    rightLabel: "Abstract visions",
    axis: "SN",
  },
];

export function calculateMBTI(answers: number[]): string {
  const axes = { EI: 0, SN: 0, TF: 0, JP: 0 };

  mbtiQuestions.forEach((q, i) => {
    axes[q.axis] += answers[i] - 3;
  });

  const e = axes.EI > 0 ? "E" : "I";
  const s = axes.SN > 0 ? "N" : "S";
  const t = axes.TF > 0 ? "F" : "T";
  const j = axes.JP > 0 ? "J" : "P";

  return `${e}${s}${t}${j}`;
}
