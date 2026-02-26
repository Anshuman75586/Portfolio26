import { useState, lazy, Suspense } from "react";
import Hero from "./components/Hero";
import SmoothScroll from "./components/SmoothScroll";

// Lazy load below-fold components — they won't block initial paint
const Skills = lazy(() => import("./components/Skills"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));
const Chatbox = lazy(() => import("./components/chatbox"));

export default function App() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cursorHidden, setCursorHidden] = useState(false);

  return (
    <SmoothScroll>
      <main className="bg-brand-bg min-h-screen">
        {/* Hero loads immediately — it's above the fold */}
        <Hero
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          cursorHidden={cursorHidden}
          setCursorHidden={setCursorHidden}
        />
        {/* Everything below the fold is lazy loaded */}
        <Suspense fallback={null}>
          <Skills />
          <Projects />
          <Contact />
          <Chatbox setCursorHidden={setCursorHidden} />
          <Footer />
        </Suspense>
      </main>
    </SmoothScroll>
  );
}
