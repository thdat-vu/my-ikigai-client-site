"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "The Magic", href: "#magic" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Trust", href: "#trust" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-[#060e20]/70"
    >
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <Sparkles className="h-5 w-5 text-[#5bf4de] group-hover:rotate-12 transition-transform" />
          <span className="text-lg font-bold tracking-tight text-white">
            MyIkigai
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#8a94b0] hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/start"
            className={cn(
              buttonVariants(),
              "rounded-full px-6 bg-[#5bf4de] text-[#00594f] font-semibold hover:bg-[#5bf4de]/90 hover:shadow-[0_0_20px_rgba(91,244,222,0.3)]"
            )}
          >
            Start Your Journey
          </Link>
        </div>

        <button
          className="md:hidden p-2 bg-transparent hover:bg-transparent"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#060e20]/95 backdrop-blur-2xl"
        >
          <div className="flex flex-col gap-4 px-6 py-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base font-medium text-[#8a94b0] hover:text-white"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/start"
              className={cn(
                buttonVariants(),
                "rounded-full w-full bg-[#5bf4de] text-[#00594f] font-semibold"
              )}
            >
              Start Your Journey
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
