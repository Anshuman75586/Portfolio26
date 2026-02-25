import { motion } from "framer-motion";
import { SKILLS_DATA } from "../utils/constants";

const TechMarquee = () => {
  const marqueeSkills = [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Tailwind CSS",
    "GSAP",
    "Framer Motion",
    "Three.js",
    "Firebase",
    "Redux",
    "Vite",
    "Figma",
  ];

  return (
    <div className="relative py-12 overflow-hidden border-y border-white/5 bg-white/[0.01] backdrop-blur-sm">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-24 items-center px-12"
        >
          {[...marqueeSkills, ...marqueeSkills, ...marqueeSkills].map(
            (skill, i) => (
              <div key={i} className="flex items-center gap-6 group">
                <span className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter text-white/5 group-hover:text-brand-accent/30 transition-all duration-500 cursor-default select-none">
                  {skill}
                </span>
                <div className="w-2.5 h-2.5 rounded-full bg-brand-accent/20 group-hover:bg-brand-accent/50 group-hover:scale-125 transition-all duration-500" />
              </div>
            ),
          )}
        </motion.div>
      </div>

      {/* Gradient Overlays for smooth fade */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-brand-bg to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-brand-bg to-transparent z-10" />
    </div>
  );
};

export default function Skills() {
  const categories = [...new Set(SKILLS_DATA.map((skill) => skill.category))];

  return (
    <section id="skills" className="py-32 bg-brand-bg relative overflow-hidden">
      <TechMarquee />

      <div className="container mx-auto px-6 mt-32">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="text-brand-accent font-mono text-sm uppercase tracking-[0.4em] mb-4 block">
            Expertise
          </span>
          <h2 className="text-6xl md:text-8xl font-display font-bold uppercase tracking-tighter leading-none">
            Technical
            <br />
            <span className="text-stroke">Arsenal</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {categories.map((category, idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group"
            >
              <h3 className="text-brand-accent font-display font-bold text-xl uppercase tracking-widest mb-8 flex items-center gap-4">
                <span className="w-2 h-2 rounded-full bg-brand-accent" />
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {SKILLS_DATA.filter((skill) => skill.category === category).map(
                  (skill) => (
                    <span
                      key={skill.name}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-white/60 group-hover:text-white group-hover:border-brand-accent/30 transition-all"
                    >
                      {skill.name}
                    </span>
                  ),
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Design border at bottom */}
      <div className="mt-32 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-brand-bg border border-brand-accent/50 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-brand-accent" />
        </div>
      </div>

      {/* Decorative background element */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-brand-accent/5 blur-[150px] rounded-full -z-10" />
    </section>
  );
}
