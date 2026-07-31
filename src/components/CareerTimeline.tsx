import React, { useState } from 'react';
import { TIMELINE } from '../data';
import { Briefcase, Code, Award, GitBranch, CheckCircle2, TrendingUp, Users } from 'lucide-react';

export default function CareerTimeline() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'pm' | 'lead' | 'engineering'>('all');

  const filteredEvents = TIMELINE.filter(event => {
    if (activeFilter === 'all') return true;
    return event.type === activeFilter;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'pm':
        return Briefcase;
      case 'lead':
        return Award;
      case 'engineering':
        return Code;
      default:
        return Briefcase;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'pm':
        return 'bg-editorial-bg text-[#FF4E00] border-[#FF4E00]/30';
      case 'lead':
        return 'bg-editorial-bg text-amber-500 border-amber-500/30';
      case 'engineering':
        return 'bg-editorial-bg text-editorial-text border-editorial-border';
      default:
        return 'bg-editorial-bg text-editorial-muted border-editorial-border';
    }
  };

  return (
    <div className="mb-16" id="experience">
      {/* Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter uppercase text-editorial-text font-display">
            Professional &amp; Athletic Career Timeline
          </h2>
          <p className="text-editorial-muted text-xs md:text-sm font-semibold uppercase tracking-wider font-mono mt-1">
            Dustin&apos;s factual background: full-stack engineering, frontend development, and business leadership.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="inline-flex flex-wrap p-1 bg-editorial-bg rounded-none border border-editorial-border self-start" role="tablist" aria-label="Filter Career Timeline">
          <button
            onClick={() => setActiveFilter('all')}
            role="tab"
            aria-selected={activeFilter === 'all'}
            aria-controls="experience"
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-all rounded-none font-mono cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#FF4E00] text-white border border-[#FF4E00]/20 shadow-sm'
                : 'text-editorial-muted hover:text-editorial-text'
            }`}
          >
            All Experience
          </button>
          <button
            onClick={() => setActiveFilter('pm')}
            role="tab"
            aria-selected={activeFilter === 'pm'}
            aria-controls="experience"
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-all rounded-none font-mono cursor-pointer ${
              activeFilter === 'pm'
                ? 'bg-[#FF4E00] text-white border border-[#FF4E00]/20 shadow-sm'
                : 'text-editorial-muted hover:text-editorial-text'
            }`}
          >
            PM &amp; Business
          </button>
          <button
            onClick={() => setActiveFilter('engineering')}
            role="tab"
            aria-selected={activeFilter === 'engineering'}
            aria-controls="experience"
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-all rounded-none font-mono cursor-pointer ${
              activeFilter === 'engineering'
                ? 'bg-[#FF4E00] text-white border border-[#FF4E00]/20 shadow-sm'
                : 'text-editorial-muted hover:text-editorial-text'
            }`}
          >
            Engineering
          </button>
          <button
            onClick={() => setActiveFilter('lead')}
            role="tab"
            aria-selected={activeFilter === 'lead'}
            aria-controls="experience"
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-all rounded-none font-mono cursor-pointer ${
              activeFilter === 'lead'
                ? 'bg-[#FF4E00] text-white border border-[#FF4E00]/20 shadow-sm'
                : 'text-editorial-muted hover:text-editorial-text'
            }`}
          >
            Athletics &amp; Other
          </button>
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative border-l border-editorial-border ml-4 md:ml-6 space-y-10">
        {filteredEvents.map((event, idx) => {
          const Icon = getIcon(event.type);
          const badgeClass = getColor(event.type);
          return (
            <div key={idx} className="relative pl-8 md:pl-10 group" id={`timeline-event-${idx}`}>
              
              {/* Vertical timeline node dot icon */}
              <div className={`absolute -left-4 md:-left-5 top-1.5 w-8 h-8 rounded-none border bg-editorial-bg flex items-center justify-center shadow-sm z-10 transition-transform duration-300 group-hover:scale-110 ${badgeClass}`}>
                <Icon className="w-4 h-4" />
              </div>

              {/* Event Content card */}
              <div className="bg-editorial-card rounded-none border border-editorial-border p-6 hover:border-editorial-hover transition-all duration-300 space-y-4">
                
                {/* Meta details */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-editorial-border pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-[#FF4E00] block font-mono tracking-widest uppercase">
                      {event.year}
                    </span>
                    <h3 className="text-lg font-bold text-editorial-text mt-1 leading-tight font-display uppercase tracking-wider">
                      {event.role}
                    </h3>
                    <span className="text-xs font-semibold text-editorial-muted block font-mono uppercase tracking-widest mt-0.5">
                      {event.company}
                    </span>
                  </div>

                  <span className={`px-2.5 py-1 text-[9px] font-bold uppercase rounded-none border self-start sm:self-center tracking-widest font-mono ${badgeClass}`}>
                    {event.type === 'pm' ? 'PM & Business' : event.type === 'lead' ? 'Athletics & Leadership' : 'Software Engineering'}
                  </span>
                </div>

                {/* Brief blurb */}
                <p className="text-sm text-editorial-muted/90 leading-relaxed font-serif italic">
                  {event.description}
                </p>

                {/* Bullet Highlights */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-editorial-muted/70 font-mono">
                    Key Highlights &amp; Accomplishments
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.highlights.map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="flex items-start gap-2.5 text-xs text-editorial-muted leading-relaxed font-mono uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4 text-[#FF4E00] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
