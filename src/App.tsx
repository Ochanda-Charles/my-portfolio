import { useState, useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { JourneySection } from './components/JourneySection';
import { ProjectsSection } from './components/ProjectsSection';
import { CommunitySection } from './components/CommunitySection';
import { ContentSection } from './components/ContentSection';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved dark mode preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Update document class and save preference
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-[#F9FAFB]'}`}>
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <HeroSection darkMode={darkMode} />
      <JourneySection />
      <ProjectsSection />
      <CommunitySection />
      <ContentSection />
      <SkillsSection />
      <ContactSection />
      <Footer isDarkMode={darkMode} />
      <BackToTop />
      <Toaster position="top-center" />
    </div>
  );
}
