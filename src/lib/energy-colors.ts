/**
 * Maps energy_tag keywords to gradient colors for the "vibe" system.
 * Each tag gets a unique gradient that gives the UI spiritual personality.
 */

interface EnergyTheme {
  gradient: string;
  glow: string;
  badge: string;
  badgeText: string;
  border: string;
  accent: string;
}

const ENERGY_MAP: Record<string, EnergyTheme> = {
  saturn: {
    gradient: "from-[#7c5bf4]/20 to-[#4a2db5]/10",
    glow: "rgba(124,91,244,0.15)",
    badge: "bg-[#7c5bf4]/15",
    badgeText: "text-[#b19fff]",
    border: "border-[#7c5bf4]/20",
    accent: "#7c5bf4",
  },
  jupiter: {
    gradient: "from-[#f4b95b]/20 to-[#b5862d]/10",
    glow: "rgba(244,185,91,0.15)",
    badge: "bg-[#f4b95b]/15",
    badgeText: "text-[#f4b95b]",
    border: "border-[#f4b95b]/20",
    accent: "#f4b95b",
  },
  mars: {
    gradient: "from-[#f45b5b]/20 to-[#b52d2d]/10",
    glow: "rgba(244,91,91,0.15)",
    badge: "bg-[#f45b5b]/15",
    badgeText: "text-[#ff8a8a]",
    border: "border-[#f45b5b]/20",
    accent: "#f45b5b",
  },
  mercury: {
    gradient: "from-[#5bf4de]/20 to-[#2db5a0]/10",
    glow: "rgba(91,244,222,0.15)",
    badge: "bg-[#5bf4de]/15",
    badgeText: "text-[#5bf4de]",
    border: "border-[#5bf4de]/20",
    accent: "#5bf4de",
  },
  venus: {
    gradient: "from-[#f45bb9]/20 to-[#b52d7a]/10",
    glow: "rgba(244,91,185,0.15)",
    badge: "bg-[#f45bb9]/15",
    badgeText: "text-[#ff8ad4]",
    border: "border-[#f45bb9]/20",
    accent: "#f45bb9",
  },
  fire: {
    gradient: "from-[#ff6b35]/20 to-[#b54a1d]/10",
    glow: "rgba(255,107,53,0.15)",
    badge: "bg-[#ff6b35]/15",
    badgeText: "text-[#ff9a6c]",
    border: "border-[#ff6b35]/20",
    accent: "#ff6b35",
  },
  earth: {
    gradient: "from-[#8bc34a]/20 to-[#5d8a2d]/10",
    glow: "rgba(139,195,74,0.15)",
    badge: "bg-[#8bc34a]/15",
    badgeText: "text-[#a8d86e]",
    border: "border-[#8bc34a]/20",
    accent: "#8bc34a",
  },
  metal: {
    gradient: "from-[#b0bec5]/20 to-[#78909c]/10",
    glow: "rgba(176,190,197,0.15)",
    badge: "bg-[#b0bec5]/15",
    badgeText: "text-[#cfd8dc]",
    border: "border-[#b0bec5]/20",
    accent: "#b0bec5",
  },
  water: {
    gradient: "from-[#5b8cf4]/20 to-[#2d5ab5]/10",
    glow: "rgba(91,140,244,0.15)",
    badge: "bg-[#5b8cf4]/15",
    badgeText: "text-[#8ab1ff]",
    border: "border-[#5b8cf4]/20",
    accent: "#5b8cf4",
  },
  wood: {
    gradient: "from-[#66bb6a]/20 to-[#388e3c]/10",
    glow: "rgba(102,187,106,0.15)",
    badge: "bg-[#66bb6a]/15",
    badgeText: "text-[#81c784]",
    border: "border-[#66bb6a]/20",
    accent: "#66bb6a",
  },
};

const DEFAULT_THEME: EnergyTheme = {
  gradient: "from-[#5bf4de]/20 to-[#919bff]/10",
  glow: "rgba(91,244,222,0.12)",
  badge: "bg-[#5bf4de]/15",
  badgeText: "text-[#5bf4de]",
  border: "border-[#5bf4de]/20",
  accent: "#5bf4de",
};

export function getEnergyTheme(energyTag: string): EnergyTheme {
  const lower = energyTag.toLowerCase();
  for (const [keyword, theme] of Object.entries(ENERGY_MAP)) {
    if (lower.includes(keyword)) return theme;
  }
  return DEFAULT_THEME;
}
