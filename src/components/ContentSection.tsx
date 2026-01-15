import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

const XIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const MediumIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
);

const content = [
  {
    title: 'Buybacks',
    platform: 'X',
    icon: XIcon,
    summary: 'Breaking down of how Full Sail executes buybacks.',
    image: 'https://res.cloudinary.com/ochanda-portfolio-website/image/upload/v1768379922/buybacks_kjmlwg.jpg',
    link: 'https://x.com/0x_Ochanda/status/1970554045409452077?s=20',
  },
  {
    title: 'Prediction Markets paired up with DeFi governance',
    platform: 'X',
    icon: XIcon,
    summary: 'How prediction markets can be used to create a new form of DeFi governance',
    image: 'https://res.cloudinary.com/ochanda-portfolio-website/image/upload/v1768380880/prediction_markets_a3vmu0.jpg',
    link: 'https://x.com/0x_Ochanda/status/1962830082902200742?s=20',
  },
  {
    title: 'ROE metric',
    platform: 'X',
    icon: XIcon,
    summary: 'What is Full Sail ROE metric and how does it contribute towards it being a capital efficient DEX',
    image: 'https://res.cloudinary.com/ochanda-portfolio-website/image/upload/v1768380132/ROE_jrpvwc.jpg',
    link: 'https://x.com/0x_Ochanda/status/1966174889628545262?s=20',
  },
  {
    title: 'What is Agentify AI',
    platform: 'X',
    icon: XIcon,
    summary: 'A breakdown of why Agentify AI is such a breakthrough',
    image: 'https://res.cloudinary.com/ochanda-portfolio-website/image/upload/v1768379490/Agenrify_AI_wvh7ly.jpg',
    link: 'https://x.com/0x_Ochanda/status/1981718112287277286?s=20',
  },
  {
    title: 'Hoisting in Javascript',
    platform: 'Medium',
    icon: MediumIcon,
    summary: 'A breakdown of how Javascript hoisting works',
    image: 'https://res.cloudinary.com/ochanda-portfolio-website/image/upload/v1768474013/Screenshot_2026-01-15_134627_clenzt.png',
    link: 'https://medium.com/@ochanda.charles.16/hoisting-in-javascript-9e07c5e7c1c3',
  },
  {
    title: 'Amazon Inspector',
    platform: 'Medium',
    icon: MediumIcon,
    summary: 'A breakdown of how to utilise Amazon Inspector for your AWS security',
    image: 'https://res.cloudinary.com/ochanda-portfolio-website/image/upload/v1768473417/M_L_Jungle_Explorer_Costume_Crocodile_Hunter_Mens_Australian_Fancy_Dress_Outfit___Men_s_Fancy_Dress___Fancy_Dress_jvkama.jpg',
    link: 'https://medium.com/@ochanda.charles.16/brief-walkthrough-through-amazon-inspector-689d852e003',
  }
];

export function ContentSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="content" className="min-h-screen bg-[#F9FAFB] dark:bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-[#111827] dark:text-white mb-4">How I Explain Tech</h2>
          <p className="text-[#111827] dark:text-white opacity-70 max-w-2xl mx-auto">
            Educational content making Tech and Web3 accessible to everyone
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border-2 border-transparent hover:border-[#2563EB] transition-all duration-300 group cursor-pointer h-full">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="aspect-video overflow-hidden relative">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-white dark:bg-[#1a1a1a] rounded-full p-2">
                      <item.icon />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-[#111827] dark:text-white mb-3 group-hover:text-[#2563EB] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[#111827] dark:text-white opacity-70 mb-4">{item.summary}</p>
                    <span className="inline-flex items-center gap-2 text-[#2563EB]">
                      Read Post
                      <ExternalLink className="w-4 h-4" />
                    </span>
                  </div>
                </a>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
