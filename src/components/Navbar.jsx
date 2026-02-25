import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Instagram,
  Camera,
} from "lucide-react";

export default function Navbar({ isMenuOpen, setIsMenuOpen, setIsHovered }) {
  return (
    <nav className="fixed top-0 left-0 w-full p-4 md:p-6 flex justify-center z-[100]">
      <div className="max-w-5xl w-full flex justify-between items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2 md:px-8 md:py-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 font-display font-bold text-xl md:text-2xl tracking-tighter"
        >
          <span className="text-brand-accent">AG</span>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          {[
            { name: "About", id: "hero" },
            { name: "Skill", id: "skills" },
            { name: "Work", id: "project" },
            { name: "Contact", id: "contact" },
          ].map((item, i) => (
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
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/anshul-gourkhede-b357792aa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-2 p-2 group"
          aria-label="Toggle Menu"
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
        initial={{ opacity: 0, y: -20, pointerEvents: "none" }}
        animate={
          isMenuOpen
            ? { opacity: 1, y: 0, pointerEvents: "auto" }
            : { opacity: 0, y: -20, pointerEvents: "none" }
        }
        className="fixed inset-0 top-20 px-4 md:hidden z-40"
      >
        <div className="bg-brand-bg/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 flex flex-col gap-6 shadow-2xl">
          {[
            { name: "About", id: "hero" },
            { name: "Skill", id: "skills" },
            { name: "Work", id: "project" },
            { name: "Contact", id: "contact" },
          ].map((item, i) => (
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
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/anshul-gourkhede-b357792aa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </motion.div>
    </nav>
  );
}
