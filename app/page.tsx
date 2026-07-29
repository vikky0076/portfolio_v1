import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Experience from "@/sections/Experience";
import Certificates from "@/sections/Certificates";
import AchievementsRibbon from "@/sections/AchievementsRibbon";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";
import ContactModal from "@/components/ContactModal";

export default function Home() {
  return (
    <main className="w-full flex flex-col">
      {/* Scroll sections */}
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certificates />
      <AchievementsRibbon />
      <Contact />
      <Footer />
      <ContactModal />
    </main>
  );
}
