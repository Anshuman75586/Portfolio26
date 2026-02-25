import { useState } from "react";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import SmoothScroll from "./components/SmoothScroll";
import Footer from "./components/Footer";
import Chatbox from "./components/chatbox";
import Contact from "./components/Contact";

export default function App() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <SmoothScroll>
      <main className="bg-brand-bg min-h-screen">
        <Hero
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <Skills />
        <Projects />
        <Contact />
        <Chatbox />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
