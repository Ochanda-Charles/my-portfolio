import { motion, useInView, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { ExternalLink, Github, Info } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

const projects = [
  {
    title: 'Kifaru',
    description: 'A virtual Merchant POS system that allows merchants to receive payment in stablecoins.',
    image: 'https://res.cloudinary.com/ochanda-portfolio-website/image/upload/v1772015709/Screenshot_2026-02-25_132031_txsm8b.png',
    tech: ['TypeScript'],
    github: 'https://github.com/Ochanda-Charles/kifaruSwypt',
    live: 'https://kifaru-swypt.vercel.app/',
  },
  {
    title: 'Event scheduling system backend',
    description: 'A scalable event scheduling backend. The goal was simple learn how to make a system more scalable',
    image: 'https://res.cloudinary.com/ochanda-portfolio-website/image/upload/v1772015572/WALRUS_1_efbh7u.png',
    tech: ['Javascript', 'Node.js', 'Express', 'PostgreSQL', 'Redis'],
    github: 'https://github.com/Ochanda-Charles/Event-scheduling-system',
  },
  {
    title: '15 days of Sui Bootcamp',
    description: 'A beginner-friendly bootcamp that guides developers through Sui Move fundamentals using hands-on smart contract examples.',
    image: 'https://res.cloudinary.com/ochanda-portfolio-website/image/upload/v1768375688/WALRUS_1_mphd5s.png',
    tech: ['Sui Move'],
    github: 'https://github.com/Sui-Community-Network/sui-bootcamp',
  }
];

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [toast, setToast] = useState<string | null>(null);

  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const showToast = useCallback((projectTitle: string) => {
    setToast(`${projectTitle} is a backend project — no live preview available. Check out the code instead!`);
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const toastStyles = useMemo(() => ({
    container: {
      display: 'flex' as const,
      alignItems: 'center' as const,
      gap: '0.75rem',
      padding: '0.875rem 1.25rem',
      borderRadius: '0.75rem',
      backgroundColor: isDark ? '#1f1f1f' : '#ffffff',
      color: isDark ? '#ffffff' : '#111827',
      boxShadow: isDark
        ? '0 10px 15px -3px rgba(0,0,0,0.3)'
        : '0 10px 25px -5px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.05)',
      border: '1px solid rgba(255, 122, 89, 0.3)',
    },
    text: {
      fontSize: '0.875rem',
      lineHeight: '1.625',
      color: isDark ? '#ffffff' : '#111827',
      margin: 0,
    },
  }), [isDark]);

  return (
    <section id="projects" className="relative min-h-screen bg-[#F9FAFB] dark:bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-[#111827] dark:text-white mb-4">What I Build</h2>
          <p className="text-[#111827] dark:text-white opacity-70 max-w-2xl mx-auto">
            Technical projects spanning blockchain, Web3, and decentralized applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border-2 border-transparent hover:border-[#FF7A59] transition-all duration-300 h-full flex flex-col">
                <div className="aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-[#111827] dark:text-white mb-3">{project.title}</h3>
                  <p className="text-[#111827] dark:text-white opacity-70 mb-4 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-[#FF7A59] text-white text-sm font-medium rounded-full shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-[#111827] dark:border-[#2a2a2a] text-[#111827] dark:text-white hover:bg-[#111827] dark:hover:bg-white hover:text-white dark:hover:text-black"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    {project.live ? (
                      <Button
                        size="sm"
                        className="flex-1 bg-[#FF7A59] text-white hover:bg-[#2563EB]"
                        asChild
                      >
                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View
                        </a>
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="flex-1 bg-[#FF7A59] text-white hover:bg-[#2563EB]"
                        onClick={() => showToast(project.title)}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gentle toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 max-w-md w-[90%]"
          >
            <div style={toastStyles.container}>
              <Info className="w-5 h-5 shrink-0" style={{ color: '#FF7A59' }} />
              <p style={toastStyles.text}>{toast}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
