import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

const projects = [
  {
    title: 'Kifaru',
    description: 'A virtual Merchant POS system that allows merchants to receive payment in stablecoins.',
    image: 'https://res.cloudinary.com/ochanda-portfolio-website/image/upload/v1768377891/Kifaru_merchant_diagram_o0dqsh.png',
    tech: ['TypeScript'],
    github: 'https://github.com/Ochanda-Charles/kifaruSwypt',
    live: 'https://kifaru-swypt.vercel.app/',
  },
  {
    title: '15 days of Sui Bootcamp',
    description: 'A beginner-friendly bootcamp that guides developers through Sui Move fundamentals using hands-on smart contract examples.',
    image: 'https://res.cloudinary.com/ochanda-portfolio-website/image/upload/v1768375688/WALRUS_1_mphd5s.png',
    tech: ['Sui Move'],
    github: 'https://github.com/Sui-Community-Network/sui-bootcamp',
    live: '#',
  }
];

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="projects" className="min-h-screen bg-[#F9FAFB] dark:bg-black py-24 px-6">
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
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
