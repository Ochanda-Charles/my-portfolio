import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Code2, Megaphone, Users } from 'lucide-react';

const skills = [
  {
    category: 'Technical Skills',
    icon: Code2,
    iconColor: '#FF7A59',
    bgColor: 'rgba(255, 122, 89, 0.1)',
    caption: 'Where I build',
    items: ['Solidity', 'Sui Move', 'React', 'NextJS', 'TypeScript', 'NodeJS', 'ExpressJS', 'UX Design', 'System Design'],
  },
  {
    category: 'Marketing Skills',
    icon: Megaphone,
    iconColor: '#FF7A59',
    bgColor: 'rgba(255, 122, 89, 0.1)',
    caption: 'Where I connect',
    items: ['Content Strategy', 'Social Media Management', 'Campaign Management', 'Brand Development', 'Technical Writing'],
  },
  {
    category: 'Soft Skills',
    icon: Users,
    iconColor: '#2563EB',
    bgColor: 'rgba(37, 99, 235, 0.1)',
    caption: 'Where I collaborate',
    items: ['Community Building', 'Public Speaking', 'Team Collaboration', 'Mentorship', 'Workshop Facilitation'],
  },
];

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="skills" className="min-h-screen bg-white dark:bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-[#111827] dark:text-white mb-4">My Toolkit</h2>
          <p className="text-[#111827] dark:text-white opacity-70 max-w-2xl mx-auto">
            A blend of creativity, code, and connection
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {skills.map((skillSet, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center"
            >
              {/* Icon */}
              <div className="relative mb-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                  style={{ backgroundColor: skillSet.bgColor }}
                >
                  <skillSet.icon
                    className="w-8 h-8"
                    style={{ color: skillSet.iconColor }}
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              <h3 className="text-[#111827] dark:text-white mb-6">{skillSet.category}</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {skillSet.items.map((skill, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: index * 0.2 + i * 0.05 }}
                    className="px-4 py-2 bg-[#F9FAFB] dark:bg-[#1a1a1a] text-[#111827] dark:text-white rounded-full border border-[#111827] border-opacity-10 dark:border-[#2a2a2a]"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}