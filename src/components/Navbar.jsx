import { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Linkedin,
} from "lucide-react";

export default function Navbar({ isMenuOpen, setIsMenuOpen, setIsHovered, setCursorHidden }) {
  // Close mobile menu on Escape key
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    },
    [isMenuOpen, setIsMenuOpen],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const navItems = [
    { name: "About", id: "hero" },
    { name: "Skill", id: "skills" },
    { name: "Work", id: "project" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 w-full p-4 md:p-6 flex justify-center z-[100] cursor-auto"
      aria-label="Main navigation"
      onMouseEnter={() => setCursorHidden(true)}
      onMouseLeave={() => setCursorHidden(false)}
    >
      <div className="max-w-5xl w-full flex justify-between items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2 md:px-8 md:py-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 font-display font-bold text-xl md:text-2xl tracking-tighter"
        >
          <a href="#hero" aria-label="Go to top of page">
            <span className="text-brand-accent">AG</span>
          </a>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item, i) => (
            <motion.a
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              href={`#${item.id}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/60 hover:text-white transition-colors"
            >
              {item.name}
            </motion.a>
          ))}
        </div>

        {/* Desktop Right Icons */}
        <div className="hidden md:flex gap-4">
          <a
            href="https://github.com/Anshuman75586"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors"
            aria-label="GitHub profile (opens in new tab)"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/anshul-gourkhede-b357792aa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors"
            aria-label="LinkedIn profile (opens in new tab)"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-2 p-2 group"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <motion.div
            animate={isMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            className="w-6 h-[2px] bg-white rounded-full transition-transform"
          />
          <motion.div
            animate={isMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            className="w-6 h-[2px] bg-white rounded-full transition-transform"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        id="mobile-menu"
        role="dialog"
        aria-label="Mobile navigation menu"
        aria-hidden={!isMenuOpen}
        initial={{ opacity: 0, y: -20, pointerEvents: "none" }}
        animate={
          isMenuOpen
            ? { opacity: 1, y: 0, pointerEvents: "auto" }
            : { opacity: 0, y: -20, pointerEvents: "none" }
        }
        className="fixed inset-0 top-20 px-4 md:hidden z-40"
      >
        <div className="bg-brand-bg/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 flex flex-col gap-6 shadow-2xl">
          {navItems.map((item, i) => (
            <motion.a
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={
                isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
              }
              transition={{ delay: 0.1 * i }}
              href={`#${item.id}`}
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-display font-bold uppercase tracking-tighter flex justify-between items-center group"
            >
              <span>{item.name}</span>
              <ArrowUpRight className="w-6 h-6 text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          ))}

          <div className="mt-8 pt-8 border-t border-white/10 flex gap-6">
            <a
              href="https://github.com/Anshuman75586"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="GitHub profile (opens in new tab)"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/anshul-gourkhede-b357792aa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="LinkedIn profile (opens in new tab)"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </motion.div>
    </nav>
  );
}
