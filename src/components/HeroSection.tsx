import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroSectionProps {
  darkMode: boolean;
}

export function HeroSection({ darkMode }: HeroSectionProps) {
  const scrollToJourney = () => {
    const journeySection = document.getElementById('journey');
    journeySection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-black' : 'bg-[#F9FAFB]'
        } px-6 py-12 relative overflow-hidden`}
    >
      {/* Subtle background accent - geometric pattern in corners */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute top-0 left-0 w-64 h-64 opacity-[0.03]" viewBox="0 0 200 200">
          <circle cx="0" cy="0" r="100" fill="#FF7A59" />
        </svg>
        <svg className="absolute bottom-0 right-0 w-64 h-64 opacity-[0.03]" viewBox="0 0 200 200">
          <circle cx="200" cy="200" r="100" fill="#2563EB" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="text-center max-w-4xl relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeInOut" }}
          className="mb-8 flex flex-col items-center"
        >
          {/* Coral radial gradient behind photo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-52 h-52 md:w-72 md:h-72 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255, 122, 89, 0.1) 0%, transparent 70%)'
              }}
            />
          </div>

          {/* Profile Photo */}
          <div className="relative">
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#FF7A59]">
              <ImageWithFallback
                src="https://res.cloudinary.com/ochanda-portfolio-website/image/upload/v1766838561/headshot_gbrzgy.jpg"
                alt="Ochanda Charles Otieno"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
          className={`${darkMode ? 'text-white' : 'text-[#111827]'} mb-6 text-sm md:text-xl lg:text-2xl`}
        >
          "Great technology must be an order of magnitude better than the status quo to gain traction, but technical superiority is only the starting point. I believe a project’s true longevity is found in the quality of its community, not just its syntax. My work in focuses on building human ecosystems that are as robust and high-performing as the code itself."
        </motion.h1>

        {/* Impact Metrics - Minimalistic Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeInOut" }}
          className={`${darkMode ? 'text-[#a1a1a1]' : 'text-[#6B7280]'
            } mb-6 max-w-2xl mx-auto text-xs md:text-sm`}
        >
          <span className="text-[#FF7A59]">500+ developers onboarded</span>
          {' • '}
          <span className="text-[#FF7A59]">5+ university tours</span>
          {' • '}
          <span className="text-[#FF7A59]">10+ workshops</span>
          {' • '}
          <span className="text-[#FF7A59]">3+ communities nurtured</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeInOut" }}
          className={`${darkMode ? 'text-white' : 'text-[#111827]'} mb-4 max-w-2xl mx-auto opacity-50`}
          style={{ fontSize: '0.9em' }}
        >
          Scroll or click to journey through my story.
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          onClick={scrollToJourney}
          className="inline-flex items-center gap-2 text-[#FF7A59] transition-colors cursor-pointer"
          style={{ fontWeight: 600 }}
        >
          <span>Start Journey</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
}
