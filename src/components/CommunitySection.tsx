import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ExternalLink, ChevronDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Event category structure
const eventCategories = [
  {
    id: 'adamur',
    title: 'Adamur Events',
    description: 'Facilitating developer workshops and growing Web3 communities across Kenya.',
    color: '#FF7A59',
    events: [
      {
        title: 'Sui Community Meetup',
        description: 'Introduced developers to Sui, why to build on it, and showcased projects within the ecosystem.',
        role: 'Speaker',
        icon: '🎤',
        gallery: 'https://photos.google.com/share/AF1QipMaNXjTIsxOdKLCbIamR-ps90C2BYH4wumxbx1FIUsbxDdX39Frlsac3N0F37m2bw?key=dHBxems2NHBTVGoyOXhXcVBHak5sZllxUWF1djhR',
        image: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29tbXVuaXR5JTIwZXZlbnR8ZW58MXx8fHwxNzYwNjIxNDA5fDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        title: 'Nights of Code (Series 1)',
        description: '1st Night: Walrus Deep Dive | 2nd Night: Intro to Sui Fundamentals — object-centric design, fast consensus, and Move\'s safety model | 3rd Night: ZkLogin Concept Overview',
        role: 'Lead Instructor',
        icon: '👨‍🏫',
        gallery: 'https://kikicreatives57.pixieset.com/nightsofcode/',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NjA2MjE0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        title: 'Nights of Code (Series 2)',
        description: '1st Night: Suilens (now Presana) showcase | 2nd Night: Walrus Deep Dive',
        role: 'Host / Facilitator',
        icon: '👨‍🏫',
        gallery: 'https://kikicreatives57.pixieset.com/nightsofcode2/',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBldmVudHxlbnwxfHx8fDE3NjA2MjE0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        title: 'Sui Bootcamp',
        description: 'Tutored and mentored students on building their developer brand and enhancing non-technical skills for success.',
        role: 'Mentor & Speaker',
        icon: '🧠',
        gallery: 'https://drive.google.com/drive/folders/1zuIPFvjbIq5AMFHdB6fI4HJjohLMntk7',
        image: 'https://images.unsplash.com/photo-1565687981296-535f09db714e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBib290Y2FtcHxlbnwxfHx8fDE3NjA2MjE0MTB8MA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ]
  },
  {
    id: 'fullsail',
    title: 'Full Sail Events',
    description: 'Bridging education and decentralized finance through community engagement.',
    color: '#2563EB',
    events: [
      {
        title: 'Sui x Full Sail Community Meetup',
        description: 'Introduced the Sui community to Full Sail DEX — a DeFi platform built for sustainability and long-term investors.',
        role: 'Organizer & Speaker',
        icon: '🎤',
        gallery: 'https://drive.google.com/drive/folders/1zuIPFvjbIq5AMFHdB6fI4HJjohLMntk7',
        image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBtZWV0dXB8ZW58MXx8fHwxNzYwNjIxNDA5fDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        title: 'Meru University Career Tour',
        description: 'Covered what Sui is, why developers should build on it, and how they can plug into Full Sail DEX.',
        role: 'University Presenter',
        icon: '🎤',
        gallery: 'https://drive.google.com/drive/folders/1FL8dk5OGTAWhhKmBJktbDkErS7zNMFbj',
        image: 'https://images.unsplash.com/photo-1583062434105-9bef71509685?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwcHJlc2VudGF0aW9ufGVufDF8fHx8MTc2MDYyMTQwOXww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        title: 'Riara University Career Fair',
        description: 'Spoke on "What is Sui?" and "Why Build on It?", introduced Full Sail DEX, and shared insights on building a Web3 career.',
        role: 'Speaker',
        icon: '🎤',
        gallery: 'https://photos.app.goo.gl/3z82whVLPftKJuh58',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJlZXIlMjBmYWlyfGVufDF8fHx8MTc2MDYyMTQwOXww&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ]
  },
  {
    id: 'independent',
    title: 'Independent Sessions',
    description: 'Speaking and contributing to community events outside organizational roles.',
    color: '#10B981',
    events: [
      {
        title: 'Decentrix (BlockMeet 2025)',
        description: 'Delivered keynote on growing your brand as a blockchain developer.',
        role: 'Keynote Speaker',
        icon: '🎤',
        gallery: 'https://photos.app.goo.gl/iGPVqRYLSXaCuunj6',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXlub3RlJTIwc3BlYWtlcnxlbnwxfHx8fDE3NjA2MjE0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ]
  }
];

export function CommunitySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <section id="community" className="min-h-screen bg-white dark:bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-[#111827] dark:text-white mb-4">What I Build Beyond Code</h2>
          <p className="text-[#111827] dark:text-white opacity-70 max-w-2xl mx-auto">
            Communities, connections, and experiences that empower users
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {eventCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex flex-col"
            >
              {/* Category Card */}
              <motion.div
                onClick={() => toggleCategory(category.id)}
                whileHover={{ scale: 1.03 }}
                className="bg-[#F9FAFB] dark:bg-[#1a1a1a] rounded-xl p-6 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-[#2a2a2a]"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-[#111827] dark:text-white">{category.title}</h3>
                  <motion.div
                    animate={{ rotate: expandedCategory === category.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-[#111827] dark:text-white" />
                  </motion.div>
                </div>
                <p className="text-[#6B7280] dark:text-[#a1a1a1] text-sm leading-relaxed">
                  {category.description}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs text-[#6B7280] dark:text-[#a1a1a1]">
                    {category.events.length} {category.events.length === 1 ? 'Event' : 'Events'}
                  </span>
                  <div
                    className="h-1 flex-1 rounded-full"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: category.color,
                        width: '60%'
                      }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Expanded Events */}
              <motion.div
                initial={false}
                animate={{
                  height: expandedCategory === category.id ? 'auto' : 0,
                  opacity: expandedCategory === category.id ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-3">
                  {category.events.map((event, eventIndex) => (
                    <motion.div
                      key={eventIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={expandedCategory === category.id ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: eventIndex * 0.1, duration: 0.3 }}
                      className="bg-white dark:bg-[#1a1a1a] rounded-lg p-4 shadow-sm border border-gray-100 dark:border-[#2a2a2a] hover:border-[#FF7A59] hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex gap-4">
                        {/* Event Thumbnail */}
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <ImageWithFallback
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Event Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[#111827] dark:text-white mb-1" style={{ fontSize: '1rem' }}>
                            {event.title}
                          </h4>
                          <p className="text-[#6B7280] dark:text-[#a1a1a1] text-sm mb-2 line-clamp-2">
                            {event.description}
                          </p>

                          {/* Role Badge */}
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm">{event.icon}</span>
                            <span className="text-xs text-[#6B7280] dark:text-[#a1a1a1]">
                              {event.role}
                            </span>
                          </div>

                          {/* Gallery Link */}
                          {event.gallery && event.gallery !== '#' && (
                            <a
                              href={event.gallery}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm text-[#FF7A59] hover:text-[#2563EB] transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              View Photos
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
