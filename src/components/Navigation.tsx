import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Moon, Sun } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Journey', href: '#journey' },
  { label: 'Projects', href: '#projects' },
  { label: 'Community', href: '#community' },
  { label: 'Content', href: '#content' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

interface NavigationProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function Navigation({ darkMode, toggleDarkMode }: NavigationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Always show navigation
    setIsVisible(true);

    const handleScroll = () => {
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsTransitioning(true);
    setMobileMenuOpen(false);

    const targetId = href.substring(1);
    const element = document.getElementById(targetId);

    if (element) {
      // Smooth scroll to section
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Remove transition overlay after animation
    setTimeout(() => setIsTransitioning(false), 800);
  };

  return (
    <>
      {/* Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 bg-[#FF7A59] z-[100] origin-top pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Desktop Navigation */}
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-0 left-0 right-0 ${darkMode ? 'bg-black/80' : 'bg-white/80'
              } backdrop-blur-md border-b ${darkMode ? 'border-[#2a2a2a]' : 'border-[#111827] border-opacity-10'
              } z-50`}
          >
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => scrollToSection('#home')}
                  className={`${darkMode ? 'text-white' : 'text-[#111827]'} cursor-pointer hover:opacity-80 transition-opacity`}
                >
                  <span className="text-[#FF7A59] text-3xl" style={{ fontWeight: 600 }}>Ochanda Charles</span>
                </motion.button>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.href}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      onClick={() => scrollToSection(item.href)}
                      className={`relative ${darkMode ? 'text-white' : 'text-[#111827]'
                        } hover:text-[#FF7A59] transition-colors ${activeSection === item.href.substring(1) ? 'text-[#FF7A59]' : ''
                        }`}
                    >
                      {item.label}
                      {activeSection === item.href.substring(1) && (
                        <motion.div
                          layoutId="activeSection"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FF7A59]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  ))}
                  {/* Dark Mode Toggle */}
                  <button
                    onClick={toggleDarkMode}
                    className={`${darkMode ? 'text-white hover:text-[#FF7A59]' : 'text-[#111827] hover:text-[#FF7A59]'
                      } transition-colors`}
                    aria-label="Toggle dark mode"
                  >
                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                </div>

                {/* Mobile Menu Button and Dark Mode Toggle */}
                <div className="flex md:hidden items-center gap-4">
                  <button
                    onClick={toggleDarkMode}
                    className={`${darkMode ? 'text-white hover:text-[#FF7A59]' : 'text-[#111827] hover:text-[#FF7A59]'
                      } transition-colors`}
                    aria-label="Toggle dark mode"
                  >
                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className={`${darkMode ? 'text-white hover:text-[#FF7A59]' : 'text-[#111827] hover:text-[#FF7A59]'
                      } transition-colors`}
                  >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </button>
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className={`fixed top-[73px] right-0 bottom-0 w-64 ${darkMode ? 'bg-black border-[#2a2a2a]' : 'bg-white border-[#111827] border-opacity-10'
              } border-l z-40 md:hidden`}
          >
            <div className="flex flex-col p-6 gap-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-left ${darkMode ? 'text-white' : 'text-[#111827]'
                    } hover:text-[#FF7A59] transition-colors py-2 ${activeSection === item.href.substring(1) ? 'text-[#FF7A59]' : ''
                    }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/20 z-30 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
