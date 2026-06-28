"use client";
import Navbar from "../beranda/components/Navbar/Navbar"; import Footer from "../beranda/components/Footer/Footer";
import Hero from "./components/Hero/Hero"; import JourneyTimeline from "./components/JourneyTimeLine/JourneyTimeline";
import Penampahan from "./components/Penampahan/Penampahan"; import Galungan from "./components/Galungan/Galungan";
import Towardkuningan from "./components/Towardkuningan/TowardKuningan"; import Kuningan from "./components/Kuningan/Kuningan";
import DidYouKnow from "./components/DidYouKnow/DidYouKnow"; import Comments from "./components/Comments/Comments";
import { useJourney } from "./hooks/useJourney";

const SECTIONS = ["hero-section", "journey-timeline-section", "penampahan-section", "galungan-section", "toward-kuningan-section", "kuningan-section", "did-you-know-section", "comment-section"];

export default function Page() {
  const { activeSection, scrollProgress, scrollToSection } = useJourney(SECTIONS);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero onStartJourney={() => scrollToSection("journey-timeline-section")} />
        <JourneyTimeline activeSection={activeSection} scrollProgress={scrollProgress} onNavigate={scrollToSection} />
        <Penampahan /> <Galungan /> <Towardkuningan /> <Kuningan /> <DidYouKnow /> <Comments />
      </main>
      <Footer />
    </div>
  );
}
