import { useEffect, useCallback, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import Navbar from "./Navbar";
import { HERO_NAME, HERO_subLine, HERO_Description } from "../utils/constants";

export default function Hero({
  isHovered,
  setIsHovered,
  isMenuOpen,
  setIsMenuOpen,
  cursorHidden,
  setCursorHidden,
}) {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = useMemo(() => ({ damping: 25, stiffness: 700 }), []);
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Passive mousemove listener — doesn't block scroll/paint
  useEffect(() => {
    // Skip cursor tracking on touch devices
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor, { passive: true });
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      ".hero-text-reveal",
      { y: "110%", opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1.2,
        ease: "expo.out",
        force3D: true, // Force GPU acceleration
      },
    );

    tl.fromTo(
      ".hero-stat-item",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power2.out", force3D: true },
      "-=0.5",
    );

    return () => tl.kill(); // Clean up GSAP timeline
  }, []);

  const nameParts = useMemo(() => HERO_NAME.split(" "), []);

  return (
    <div
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex flex-col md:cursor-none bg-brand-bg"
      role="banner"
    >
      {/* Custom Cursor — desktop only, GPU-accelerated with will-change */}
      <motion.div
        aria-hidden="true"
        className="hidden md:block fixed top-0 left-0 w-10 h-10 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovered ? 4.5 : 3.5,
          opacity: cursorHidden ? 0 : 1,
          willChange: "transform, opacity",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="hidden md:block fixed top-0 left-0 w-16 h-16 border border-white/30 rounded-full pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovered ? 1.2 : 1,
          opacity: cursorHidden ? 0 : (isHovered ? 0 : 1),
          willChange: "transform, opacity",
        }}
      />

      {/* Background Blurs — decorative */}
      <div className="absolute inset-0 -z-10 bg-[#0a0a0c]" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-accent/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-accent/5 blur-[120px] rounded-full" />
      </div>

      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setIsHovered={setIsHovered}
        setCursorHidden={setCursorHidden}
      />

      <main className="flex-1 flex flex-col justify-center px-8 md:px-20 pt-20">
        <div className="max-w-7xl w-full mx-auto">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-accent">
                {HERO_subLine}
              </span>
            </motion.div>
          </div>

          {/* Hero Name Reveal */}
          <div className="mb-10 group relative">
            <div className="overflow-hidden py-1 px-4 -mx-4">
              <h1 className="hero-text-reveal text-[10vw] lg:text-[8vw] font-serif italic leading-[1.1] tracking-tighter hover:text-brand-accent transition-colors duration-500 cursor-default">
                {nameParts[0]}
              </h1>
            </div>
            <div className="overflow-hidden py-2 px-4 -mx-4">
              <h1 className="hero-text-reveal text-[10vw] lg:text-[8vw] font-display font-bold leading-[1.1] tracking-tighter uppercase text-stroke hover:text-white transition-all duration-500 cursor-default">
                {nameParts[1]}
              </h1>
            </div>
          </div>

          <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-brand-secondary text-lg leading-relaxed font-light mb-10 max-w-lg"
            >
              {HERO_Description}
            </motion.p>

            <div className="flex flex-wrap gap-6 items-center">
              <motion.a
                href="#project"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center gap-3 bg-brand-accent text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider overflow-hidden"
                aria-label="View Projects section"
              >
                <span className="relative z-10">View Projects</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10" />
              </motion.a>

              <motion.a
                href="#skills"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="text-xs font-bold uppercase tracking-widest border-b border-white/20 pb-1 hover:border-brand-accent transition-colors"
                aria-label="View My Expertise section"
              >
                My Expertise
              </motion.a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
