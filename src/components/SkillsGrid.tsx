import React from 'react';
import { CORE_CAPABILITIES, TECHNICAL_SKILLS } from '../data';
import { Briefcase, Users, Code, Database, TrendingUp, Award, CheckCircle2 } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  Briefcase: Briefcase,
  Users: Users,
  Code: Code,
  Database: Database,
  TrendingUp: TrendingUp,
  Award: Award,
};

export default function SkillsGrid() {
  return (
    <div className="space-y-12 mb-16" id="capabilities">
      {/* 1. Core PM Competencies Grid */}
      <div className="space-y-6">
        <div className="text-left max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tighter uppercase text-editorial-text font-display">
            Core PM &amp; Technical Capabilities
          </h2>
          <p className="text-editorial-muted mt-2 text-sm italic font-serif">
            Bridging structured product strategy with solid computer science fundamentals and disciplined team execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_CAPABILITIES.map((cap, i) => {
            const IconComponent = iconMap[cap.icon] || Code;
            return (
              <div 
                key={i} 
                id={`capability-card-${i}`}
                className="bg-editorial-card rounded-none border border-editorial-border hover:border-[#FF4E00]/40 hover:bg-[#FF4E00]/5 transition-all duration-300 p-6 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-none bg-editorial-panel border border-editorial-border flex items-center justify-center text-editorial-text group-hover:bg-[#FF4E00]/10 group-hover:text-[#FF4E00] group-hover:border-[#FF4E00]/20 transition-all">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-editorial-text text-lg font-display uppercase tracking-tight group-hover:text-[#FF4E00] transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-editorial-muted/80 text-xs md:text-sm leading-relaxed font-serif italic">
                    {cap.description}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-editorial-border flex items-center text-[10px] font-mono text-editorial-muted/50 group-hover:text-[#FF4E00]/80 transition-colors uppercase tracking-widest">
                  Verified Capability &bull; PM Focus
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Technical Skills Matrix */}
      <div className="bg-editorial-card rounded-none border border-editorial-border p-6 md:p-8 space-y-6">
        <h3 className="text-xl font-bold uppercase tracking-tight text-editorial-text font-display border-b border-editorial-border pb-3">
          Technical &amp; PM Tool Matrix
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Column 1: Engineering Foundations */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FF4E00] font-mono flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5" /> Languages &amp; Front-end
            </h4>
            <div className="flex flex-wrap gap-2">
              {TECHNICAL_SKILLS.languages.map((lang, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-editorial-panel text-editorial-text text-[10px] font-mono border border-editorial-border uppercase">
                  {lang}
                </span>
              ))}
              {TECHNICAL_SKILLS.frontend.map((f, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-editorial-panel text-editorial-text text-[10px] font-mono border border-editorial-border uppercase">
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Column 2: Backend, Cloud & Data */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FF4E00] font-mono flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" /> Backend, Database &amp; Cloud
            </h4>
            <div className="flex flex-wrap gap-2">
              {TECHNICAL_SKILLS.backend.map((b, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-editorial-panel text-editorial-text text-[10px] font-mono border border-editorial-border uppercase">
                  {b}
                </span>
              ))}
              {TECHNICAL_SKILLS.databases.map((db, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-editorial-panel text-editorial-text text-[10px] font-mono border border-editorial-border uppercase">
                  {db}
                </span>
              ))}
              {TECHNICAL_SKILLS.cloudTools.map((tool, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-editorial-panel text-editorial-text text-[10px] font-mono border border-editorial-border uppercase">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Column 3: Product Management Competencies */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FF4E00] font-mono flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" /> PM &amp; Leadership Focus
            </h4>
            <div className="flex flex-wrap gap-2">
              {TECHNICAL_SKILLS.pmSkills.map((skill, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-[#FF4E00]/5 text-[#FF4E00] text-[10px] font-mono border border-[#FF4E00]/20 uppercase font-semibold">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
