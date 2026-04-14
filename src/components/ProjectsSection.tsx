import { motion, useInView, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { ExternalLink, Github, Info, Play, X, Maximize2 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Project {
  title: string;
  description: string;
  image?: string;
  youtubeId?: string;
  alt: string;
  tech: string[];
  github: string;
  live?: string;
  privateRepo?: boolean;
}

const projects: Project[] = [
  {
    title: 'NeuroContent',
    description: 'An AI-powered brain activity prediction platform for content creators. Analyzes videos to predict neural responses with interactive 3D brain visualizations and AI coaching.',
    youtubeId: 'YjyIUzACaT0',
    alt: 'Demo video of the NeuroContent platform showing 3D brain activity visualization with neural engagement heatmap',
    tech: ['Next.js', 'Python', 'FastAPI', 'Three.js', 'PyTorch', 'Claude AI'],
    github: 'https://github.com/Ochanda-Charles/Neurocontent',
  },
  {
    title: 'Ultrashine V2',
    description: 'A redesigned automotive detailing website with AI-powered vehicle previews, Sanity CMS, and 10 Gemini-powered modification services.',
    image: 'https://res.cloudinary.com/ochanda-portfolio-website/image/upload/v1773984168/Screenshot_2026-03-20_082055_i0k151.png',
    alt: 'Screenshot of the Ultrashine V2 homepage showcasing AI vehicle preview and premium auto detailing services',
    tech: ['TypeScript', 'Next.js', 'Sanity', 'Gemini AI'],
    github: 'https://github.com/Ochanda-Charles/Ultrashine-redesign',
    live: 'https://ultrashine-redesign.vercel.app/',
    privateRepo: true,
  },
  {
    title: 'Kifaru',
    description: 'A virtual Merchant POS system that allows merchants to receive payment in stablecoins.',
    image: 'https://res.cloudinary.com/ochanda-portfolio-website/image/upload/v1772015709/Screenshot_2026-02-25_132031_txsm8b.png',
    alt: 'Screenshot of the Kifaru Virtual POS dashboard showing merchant transactions in stablecoins',
    tech: ['TypeScript','Node.js', 'Express', 'PostgreSQL', 'Fonbnk API'],
    github: 'https://github.com/Ochanda-Charles/Kifaru-V2',
    live: 'https://kifaru-virtual-pos.vercel.app/',
  },
  {
    title: 'Event scheduling system backend',
    description: 'A scalable event scheduling backend. The goal was simple learn how to make a system more scalable',
    image: 'https://res.cloudinary.com/ochanda-portfolio-website/image/upload/v1772015572/WALRUS_1_efbh7u.png',
    alt: 'Terminal output showing logs from the event scheduling system testing and performance metrics',
    tech: ['Javascript', 'Node.js', 'Express', 'PostgreSQL', 'Redis'],
    github: 'https://github.com/Ochanda-Charles/Event-scheduling-system',
  },
  {
    title: '15 days of Sui Bootcamp',
    description: 'A beginner-friendly bootcamp that guides developers through Sui Move fundamentals using hands-on smart contract examples.',
    image: 'https://res.cloudinary.com/ochanda-portfolio-website/image/upload/v1768375688/WALRUS_1_mphd5s.png',
    alt: 'Promotional cover banner for the 15 days of Sui Bootcamp showing blockchain smart contract development',
    tech: ['Sui Move'],
    github: 'https://github.com/Sui-Community-Network/sui-bootcamp',
  }
];

function YouTubeFullscreen({ youtubeId, title, onClose }: { youtubeId: string; title: string; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      ref={overlayRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ width: '92vw', height: '75vh', position: 'relative' }}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '-3rem', right: 0, zIndex: 10, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.7)', background: 'none', border: 'none', cursor: 'pointer' }}
          aria-label="Close video"
        >
          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{title}</span>
          <X className="w-6 h-6" />
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={`Demo video for ${title}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          frameBorder={0}
          style={{ width: '100%', height: '100%', borderRadius: '0.5rem' }}
        />
      </motion.div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [toast, setToast] = useState<string | null>(null);
  const [fullscreenVideo, setFullscreenVideo] = useState<{ youtubeId: string; title: string } | null>(null);

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

  const showToast = useCallback((message: string) => {
    setToast(message);
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
                {project.youtubeId ? (
                  <div
                    className="aspect-video overflow-hidden relative group cursor-pointer"
                    onClick={() => setFullscreenVideo({ youtubeId: project.youtubeId!, title: project.title })}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`}
                      alt={project.alt}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    {/* Play / expand overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-full bg-[#FF7A59] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                        </div>
                        <Maximize2 className="w-5 h-5 text-white absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                    {/* Video badge */}
                    <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-white text-xs font-medium">Demo</span>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video overflow-hidden">
                    <ImageWithFallback
                      src={project.image!}
                      alt={project.alt}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
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
                    {project.privateRepo ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-[#111827] dark:border-[#2a2a2a] text-[#111827] dark:text-white hover:bg-[#111827] dark:hover:bg-white hover:text-white dark:hover:text-black"
                        onClick={() => showToast(`${project.title}'s GitHub repo is private for client protection purposes. You can view the live preview using the Vercel link instead!`)}
                        aria-label={`View source code for ${project.title} on GitHub`}
                      >
                        <Github className="w-4 h-4 mr-2" aria-hidden="true" />
                        Code
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-[#111827] dark:border-[#2a2a2a] text-[#111827] dark:text-white hover:bg-[#111827] dark:hover:bg-white hover:text-white dark:hover:text-black"
                        asChild
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`View source code for ${project.title} on GitHub`}>
                          <Github className="w-4 h-4 mr-2" aria-hidden="true" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.live ? (
                      <Button
                        size="sm"
                        className="flex-1 bg-[#FF7A59] text-white hover:bg-[#2563EB]"
                        asChild
                      >
                        <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`View live deployment of ${project.title}`}>
                          <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                          View
                        </a>
                      </Button>
                    ) : project.youtubeId ? (
                      <Button
                        size="sm"
                        className="flex-1 bg-[#FF7A59] text-white hover:bg-[#2563EB]"
                        onClick={() => setFullscreenVideo({ youtubeId: project.youtubeId!, title: project.title })}
                        aria-label={`Watch demo video for ${project.title}`}
                      >
                        <Play className="w-4 h-4 mr-2" aria-hidden="true" />
                        Demo
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="flex-1 bg-[#FF7A59] text-white hover:bg-[#2563EB]"
                        onClick={() => showToast(`${project.title} is a backend project — no live preview available. Check out the code instead!`)}
                        aria-label={`View details for ${project.title}`}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
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

      {/* Fullscreen YouTube modal */}
      <AnimatePresence>
        {fullscreenVideo && (
          <YouTubeFullscreen
            youtubeId={fullscreenVideo.youtubeId}
            title={fullscreenVideo.title}
            onClose={() => setFullscreenVideo(null)}
          />
        )}
      </AnimatePresence>

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
