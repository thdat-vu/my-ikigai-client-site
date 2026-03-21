"use client";

import { Sparkles } from "lucide-react";

const socialLinks = [
  { label: "Twitter", href: "https://twitter.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "Discord", href: "https://discord.com" },
];

export function Footer() {
  return (
    <footer className="py-12 px-6 bg-[#060e20]">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <Sparkles className="h-4 w-4 text-[#5bf4de]" />
              <span className="text-base font-bold text-white">MyIkigai</span>
            </div>
            <p className="text-sm text-[#8a94b0] max-w-xs">
              Crafting paths through the digital astral.
            </p>
          </div>

          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#8a94b0] hover:text-[#5bf4de] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="my-8 h-px bg-[#2a3556]/40" />

        <p className="text-center text-xs text-[#8a94b0]/60">
          &copy; {new Date().getFullYear()} MyIkigai. Powered by Next.js,
          Supabase, and TinyFish.ai
        </p>
      </div>
    </footer>
  );
}
