import { motion, useInView, AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import { Users, Palette, Shield, Code2, Share2, Layout, MessageSquare, Terminal, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

const journeySteps = [
  {
    id: 'acyberschool',
    company: 'AcyberSchool',
    role: 'Social Media Manager & Community Coordinator',
    timeframe: '2022 - 2023',
    subtitle: 'Building digital communities and managing online presence',
    description: 'Led social media strategy and community engagement initiatives, creating compelling content that resonated with the tech education audience. Coordinated events and managed a growing online community.',
    image: 'https://res.cloudinary.com/ochanda-portfolio-website/image/upload/v1766865540/Acyberschool-banner_deykmv.png',
    skills: [
      { name: 'Social Media Marketing', icon: Share2 },
      { name: 'Community Management', icon: Users },
      { name: 'Content Strategy', icon: MessageSquare },
    ],
  },
  {
    id: '7thcentury',
    company: '7th Century Music',
    role: 'Graphic Designer & Social Media Manager',
    timeframe: '2024',
    subtitle: 'Merging creativity with brand storytelling',
    description: 'Designed visual identities and marketing materials while managing social media campaigns. Blended artistic vision with strategic marketing to elevate brand presence in the music industry.',
    image: 'https://res.cloudinary.com/ochanda-portfolio-website/image/upload/v1766865533/7thCentury-Music_yzwusz.png',
    skills: [
      { name: 'Graphic Design', icon: Palette },
      { name: 'Brand Development', icon: Layout },
      { name: 'Campaign Management', icon: Share2 },
    ],
  },
  {
    id: 'adamur',
    company: 'Adamur',
    role: 'Blockchain Community Associate & Technical Support',
    timeframe: '2025',
    subtitle: 'Bridging communities with emerging Web3 technology',
    description: 'Provided technical support for blockchain users and built educational content around Web3 concepts. Facilitated developer workshops and organized community-driven learning sessions.',
    image: 'https://res.cloudinary.com/ochanda-portfolio-website/image/upload/v1766838328/sui_kenya_collage_uwc6lr.jpg',
    skills: [
      { name: 'Blockchain', icon: Shield },
      { name: 'Technical Support', icon: MessageSquare },
      { name: 'Community Building', icon: Users },
    ],
  },
  {
    id: 'fullsail',
    company: 'Full Sail Finance',
    role: 'Ambassador',
    timeframe: '2025',
    subtitle: 'Onboarding the next generation of DeFi users',
    description: 'Onboarded new users to DeFi and Full Sail DEX, providing hands-on support, creating clear Web3 educational content, and leading developer workshops and community learning sessions..',
    image: 'https://res.cloudinary.com/ochanda-portfolio-website/image/upload/v1766865543/FullSail-banner_svzwfj.png',
    skills: [
      { name: 'Defi Development', icon: Code2 },
      { name: 'Technical Writing', icon: Terminal },
      { name: 'Community Leadership', icon: Users },
    ],
  },
];

export function JourneySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeTab, setActiveTab] = useState<string>(journeySteps[0].id);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="journey" className="min-h-screen bg-white dark:bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[#111827] dark:text-white mb-4">My Journey — From Creativity to Code</h2>
          <p className="text-[#111827] dark:text-white opacity-70 max-w-2xl mx-auto">
            A timeline of growth across social media, design, blockchain, and developer relations
          </p>
        </motion.div>

        {/* Desktop Horizontal Accordion */}
        <div className="hidden md:flex gap-4 mb-12">
          {journeySteps.map((step, index) => {
            const isActive = activeTab === step.id;
            const IconComponent = step.skills[0].icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-lg cursor-pointer transition-all duration-500 ${isActive ? 'flex-[7]' : 'flex-1'
                  }`}
                onClick={() => setActiveTab(step.id)}
              >
                <div className="h-full min-h-[400px] bg-[#F9FAFB] dark:bg-[#0a0a0a] border-2 border-[#111827] dark:border-[#2a2a2a] border-opacity-10 hover:border-[#FF7A59] transition-colors overflow-hidden">
                  {/* Collapsed Tab */}
                  <AnimatePresence mode="wait">
                    {!isActive ? (
                      <motion.div
                        key="collapsed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-full flex items-center justify-center p-6"
                      >
                        <div className="text-center">
                          <div className="w-12 h-12 rounded-full bg-[#FF7A59] bg-opacity-10 flex items-center justify-center mx-auto mb-4">
                            <IconComponent className="w-6 h-6 text-[#FF7A59]" />
                          </div>
                          <h3 className="text-[#111827] dark:text-white mb-2 mx-auto" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                            {step.company}
                          </h3>
                          <p className="text-[#111827] dark:text-white opacity-50 mx-auto" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                            {step.timeframe}
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="expanded"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-full p-8 flex flex-col"
                      >
                        <div className="mb-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-[#111827] dark:text-white mb-2">{step.company}</h3>
                              <p className="text-[#FF7A59] mb-2">{step.role}</p>
                              <p className="text-[#111827] dark:text-white opacity-50">{step.timeframe}</p>
                            </div>
                          </div>
                          <p className="text-[#111827] dark:text-white opacity-90 mb-4">{step.subtitle}</p>
                        </div>

                        <div className="mb-6 rounded-lg overflow-hidden border border-[#111827] dark:border-[#2a2a2a] border-opacity-10">
                          <ImageWithFallback
                            src={step.image}
                            alt={step.company}
                            className="w-full h-40 object-cover"
                          />
                        </div>

                        <p className="text-[#111827] dark:text-white opacity-70 mb-6 flex-1">{step.description}</p>

                        <div className="flex flex-wrap gap-2">
                          {step.skills.map((skill, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-[#FF7A59] border-opacity-30 rounded-full"
                            >
                              <skill.icon className="w-4 h-4 text-[#FF7A59]" />
                              <span className="text-[#111827] dark:text-white">{skill.name}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Vertical Accordion */}
        <div className="md:hidden space-y-4 mb-12">
          {journeySteps.map((step, index) => {
            const isActive = activeTab === step.id;
            const IconComponent = step.skills[0].icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="overflow-hidden rounded-lg bg-[#F9FAFB] dark:bg-[#0a0a0a] border-2 border-[#111827] dark:border-[#2a2a2a] border-opacity-10"
              >
                <button
                  onClick={() => setActiveTab(isActive ? '' : step.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white dark:hover:bg-[#0a0a0a] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#FF7A59] bg-opacity-10 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-[#FF7A59]" />
                    </div>
                    <div>
                      <h3 className="text-[#111827] dark:text-white mb-1">{step.company}</h3>
                      <p className="text-[#111827] dark:text-white opacity-50">{step.timeframe}</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-[#FF7A59]"
                  >
                    <ArrowRight className="w-5 h-5 rotate-90" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 border-t border-[#111827] dark:border-[#2a2a2a] border-opacity-10">
                        <p className="text-[#FF7A59] mb-2">{step.role}</p>
                        <p className="text-[#111827] dark:text-white opacity-90 mb-4">{step.subtitle}</p>

                        <div className="mb-4 rounded-lg overflow-hidden border border-[#111827] dark:border-[#2a2a2a] border-opacity-10">
                          <ImageWithFallback
                            src={step.image}
                            alt={step.company}
                            className="w-full h-48 object-cover"
                          />
                        </div>

                        <p className="text-[#111827] dark:text-white opacity-70 mb-4">{step.description}</p>

                        <div className="flex flex-wrap gap-2">
                          {step.skills.map((skill, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-[#FF7A59] border-opacity-30 rounded-full"
                            >
                              <skill.icon className="w-4 h-4 text-[#FF7A59]" />
                              <span className="text-[#111827] dark:text-white">{skill.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Closing Caption and CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center pt-8 border-t border-[#111827] dark:border-[#2a2a2a] border-opacity-10"
        >
          <p className="text-[#111827] dark:text-white opacity-70 mb-6 italic">
            "Each step shaped the next — from creativity to community to code."
          </p>
          <Button
            onClick={scrollToProjects}
            className="bg-[#FF7A59] text-white hover:bg-[#2563EB] transition-colors"
          >
            View My Projects
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
