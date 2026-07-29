'use client';

import React from 'react';
import { Trophy, Award, CheckCircle, Code, Lightbulb } from 'lucide-react';

const RIBBON_ITEMS = [
  {
    icon: Trophy,
    title: 'Smart India Hackathon',
    desc: '2025 - Participant',
  },
  {
    icon: Trophy,
    title: 'Hackathon 360 3.0 (KPR)',
    desc: '2025 - Participant',
  },
  {
    icon: Award,
    title: '100+ Certificates',
    desc: 'Across Multiple Domains',
  },
  {
    icon: CheckCircle,
    title: 'Consistent Learner',
    desc: 'Every Single Day',
  },
  {
    icon: Code,
    title: 'Building Projects',
    desc: 'Turning Ideas into Reality',
  },
];

export default function AchievementsRibbon() {
  return (
    <section id="achievements" className="relative py-12 bg-transparent select-none">
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass-card rounded-3xl p-6 md:p-8 flex flex-wrap gap-8 items-center justify-around">
          {RIBBON_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-4 text-left group hover:scale-[1.03] transition-transform duration-300 min-w-[200px]"
              >
                {/* Accent Icon Container */}
                <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-[0_0_10px_rgba(255,106,0,0.15)] group-hover:shadow-[0_0_15px_rgba(255,106,0,0.4)]">
                  <Icon size={18} />
                </div>
                
                {/* Details */}
                <div className="flex flex-col font-sans">
                  <span className="text-xs font-bold text-white group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-text-secondary mt-0.5">
                    {item.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
