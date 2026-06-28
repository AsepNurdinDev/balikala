"use client";

import { useEffect, useState } from "react";

export function useJourney(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    // Set initial active section
    if (sectionIds.length > 0) {
      setActiveSection(sectionIds[0]);
    }

    const handleScroll = () => {
      // 1. Calculate overall scroll progress of the journey.
      // We base it on the distance between the top of the timeline and the end of Kuningan section.
      const timelineEl = document.getElementById("journey-timeline-section");
      const endEl = document.getElementById("kuningan-section");
      
      if (timelineEl && endEl) {
        const timelineRect = timelineEl.getBoundingClientRect();
        const endRect = endEl.getBoundingClientRect();
        
        // Start of progress is when timeline starts to enter viewport
        // End of progress is when Kuningan section is fully scrolled past
        const startOffset = timelineEl.offsetTop;
        const endOffset = endEl.offsetTop + endEl.offsetHeight;
        
        const scrollPosition = window.scrollY;
        const totalHeight = endOffset - startOffset - window.innerHeight;
        const currentProgress = ((scrollPosition - startOffset) / totalHeight) * 100;
        
        setScrollProgress(Math.min(Math.max(currentProgress, 0), 100));
      }

      // 2. Scroll Spy logic
      let currentSection = sectionIds[0];
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the element is less than 40% of the viewport height, consider it active
          if (rect.top <= window.innerHeight * 0.4) {
            currentSection = id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    // Call once initially
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sectionIds]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Find offset of element minus some spacing (e.g. navbar height)
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return {
    activeSection,
    scrollProgress,
    scrollToSection,
  };
}
