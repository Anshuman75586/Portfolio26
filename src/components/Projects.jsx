// Projects.jsx
import { useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, X, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { PROJECTS_DATA } from "../utils/constants";

// ProjectCard component
function ProjectCard({ project, index, onClick }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const glowOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]);
  const cometOpacity = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.6],
    [0, 1, 0],
  );
  const cometScale = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.6],
    [0.8, 1.2, 0.8],
  );

  const isEven = index % 2 === 0;
  const xInitial = isEven ? -100 : 100;

  return (
    <motion.div
      ref={cardRef}
      layoutId={`card-${project.title}`}
      onClick={() => onClick(project)}
      initial={{ opacity: 0, x: xInitial, y: 50 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 1,
        delay: index * 0.1,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      className="group relative aspect-4/5 rounded-3xl overflow-hidden cursor-pointer bg-white/5 border border-white/10"
    >
      {/* Mobile Comet */}
      <motion.div
        style={{ opacity: cometOpacity, scale: cometScale }}
        className="md:hidden absolute -left-11.25 top-1/2 -translate-y-1/2 flex items-center z-30 pointer-events-none"
      >
        <div className="w-[45px] h-[1px] bg-brand-accent shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
        <div className="relative w-10 h-10 rounded-full bg-brand-accent/20 backdrop-blur-md flex items-center justify-center -translate-x-full">
          <div className="w-4 h-4 rounded-full bg-brand-accent shadow-[0_0_30px_rgba(168,85,247,1)] border border-white/60" />
          <div className="absolute inset-0 rounded-full bg-brand-accent animate-ping opacity-40" />
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: glowOpacity }}
        className="md:hidden absolute inset-0 bg-brand-accent/10 z-10 pointer-events-none"
      />

      <motion.div
        layoutId={`image-${project.title}`}
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
        style={{ backgroundImage: `url(${project.image})` }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <motion.div layoutId={`label-${project.title}`} className="mb-4">
          <span className="px-3 py-1 rounded-full bg-brand-accent/20 border border-brand-accent/30 text-[10px] font-bold uppercase tracking-widest text-brand-accent">
            {project.category}
          </span>
        </motion.div>
        <motion.h3
          layoutId={`title-${project.title}`}
          className="text-3xl font-display font-bold uppercase tracking-tighter leading-none mb-2"
        >
          {project.title}
        </motion.h3>
        <p className="text-white/60 text-xs line-clamp-2 font-light">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}

// ProjectDetail component (unchanged)
function ProjectDetail({ project, onClose }) {
  const detailRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      const tl = gsap.timeline();
      tl.fromTo(
        contentRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "expo.out",
          delay: 0.4,
        },
      );
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] overflow-y-auto bg-black/95 backdrop-blur-3xl"
    >
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-[120] w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center hover:bg-brand-accent transition-colors group border border-white/10"
      >
        <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform" />
      </button>

      <div className="fixed inset-0 z-0 cursor-pointer" onClick={onClose} />

      <div className="relative w-full min-h-screen flex flex-col items-center justify-start md:justify-center p-0 md:p-10 z-10 pointer-events-none">
        <motion.div
          layoutId={`card-${project.title}`}
          ref={detailRef}
          className="relative w-full max-w-6xl bg-brand-bg md:rounded-[40px] border-0 md:border border-white/10 flex flex-col md:flex-row shadow-2xl my-0 md:my-10 pointer-events-auto"
        >
          <div className="w-full md:w-1/2 h-[45vh] md:h-auto relative overflow-hidden shrink-0 md:rounded-l-[40px]">
            <motion.div
              layoutId={`image-${project.title}`}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${project.image})` }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-brand-bg via-transparent to-transparent md:hidden" />
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-16 pb-40 md:pb-16 flex flex-col">
            <div ref={contentRef}>
              <motion.div layoutId={`label-${project.title}`} className="mb-6">
                <span className="px-4 py-2 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">
                  {project.category}
                </span>
              </motion.div>

              <motion.h2
                layoutId={`title-${project.title}`}
                className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tighter leading-none mb-8"
              >
                {project.title}
              </motion.h2>

              <p className="text-brand-secondary text-base md:text-xl leading-relaxed font-light mb-10">
                {project.description}
              </p>

              <div className="mb-12">
                <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-6">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider font-bold text-white/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-auto">
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-brand-accent text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg shadow-brand-accent/20"
                >
                  Live Preview
                  <ExternalLink className="w-4 h-4" />
                </motion.a>

                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors"
                >
                  Close
                </motion.button>
              </div>
            </div>

            <div className="md:hidden mt-20 flex flex-col items-center gap-2 opacity-20">
              <span className="text-[8px] uppercase tracking-widest">
                Scroll for more
              </span>
              <div className="w-px h-10 bg-linear-to-b from-white to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Main Projects section
export default function Projects() {
  const sectionRef = useRef(null);
  const projectsGridRef = useRef(null);
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(4);
      } else {
        setVisibleCount(6);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredProjects = PROJECTS_DATA.filter((p) =>
    filter === "All" ? true : p.category === filter,
  );

  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = filteredProjects.length > visibleCount;

  return (
    <section
      id="project"
      ref={sectionRef}
      className="bg-brand-bg relative py-32 overflow-hidden"
    >
      <div className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-white/5 z-20" />

      <div className="container mx-auto px-8 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-accent font-mono text-sm uppercase tracking-[0.4em] mb-4 block">
              Portfolio
            </span>
            <h2 className="text-6xl md:text-9xl font-display font-bold uppercase tracking-tighter leading-none">
              Selected
              <br />
              <span className="text-stroke">Works</span>
            </h2>
          </motion.div>

          <div className="flex gap-2 p-1.5 bg-white/5 rounded-full border border-white/10 self-start md:self-end">
            {["All", "Frontend", "Fullstack"].map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setVisibleCount(window.innerWidth < 768 ? 4 : 6);
                }}
                className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                  filter === f
                    ? "bg-brand-accent text-white shadow-lg shadow-brand-accent/20"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          ref={projectsGridRef}
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                onClick={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-20 flex justify-center"
          >
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="group relative flex items-center gap-3 bg-white/5 border border-white/10 text-white px-10 py-5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              View More Projects
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none opacity-[0.02] whitespace-nowrap">
        <span className="text-[40vw] font-display font-bold uppercase tracking-tighter">
          PROJECTS
        </span>
      </div>
    </section>
  );
}
