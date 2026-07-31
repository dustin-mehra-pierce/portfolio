import React from 'react';
import { EXECUTIVE_SUMMARY, PERSONAL_INFO } from '../data';
import { Briefcase, Code, Award, Users, Phone, Mail, Linkedin, MapPin } from 'lucide-react';

export default function ExecutiveSummary() {
  return (
    <div className="bg-editorial-card rounded-none border border-editorial-border p-8 md:p-12 mb-12" id="about-me">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left column: Typography and copy */}
        <div className="lg:col-span-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF4E00]/10 text-[#FF4E00] text-[10px] font-mono uppercase tracking-widest border border-[#FF4E00]/20">
            <span className="w-1.5 h-1.5 bg-[#FF4E00] rounded-full animate-pulse"></span>
            Technical Product Manager Portfolio
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase text-editorial-text font-display leading-tight">
            {EXECUTIVE_SUMMARY.headline}
          </h2>
          
          <p className="text-lg font-serif italic text-editorial-muted leading-relaxed">
            {EXECUTIVE_SUMMARY.subheadline}
          </p>
          
          <div className="h-px bg-editorial-border"></div>
          
          <p className="text-editorial-muted/80 leading-relaxed text-sm md:text-base">
            {EXECUTIVE_SUMMARY.blurb}
          </p>

          {/* Quick Contact Links Row */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono uppercase tracking-wider text-editorial-muted">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FF4E00]" />
              <span>{PERSONAL_INFO.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#FF4E00]" />
              <span>{PERSONAL_INFO.phone}</span>
            </div>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-2 hover:text-[#FF4E00] transition-colors">
              <Mail className="w-4 h-4 text-[#FF4E00]" />
              <span className="underline">{PERSONAL_INFO.email}</span>
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#FF4E00] transition-colors">
              <Linkedin className="w-4 h-4 text-[#FF4E00]" />
              <span className="underline">LinkedIn Profile</span>
            </a>
          </div>
        </div>

        {/* Right column: Highlights Grid & Metrics */}
        <div className="lg:col-span-4 bg-editorial-panel rounded-none p-6 border border-editorial-border space-y-6 self-stretch flex flex-col justify-between">
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-editorial-muted/70 border-b border-editorial-border pb-2 font-mono">
              Professional Foundation
            </h3>
            
            <div className="space-y-5 mt-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-editorial-bg text-[#FF4E00] border border-editorial-border rounded-none">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-black text-editorial-text font-display uppercase">Requirements &amp; PM</div>
                  <div className="text-[10px] text-editorial-muted uppercase font-mono tracking-wider mt-0.5">Planning &amp; Client Roadmaps</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-editorial-bg text-[#FF4E00] border border-editorial-border rounded-none">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-black text-editorial-text font-display uppercase">CS Degree &amp; Engineering</div>
                  <div className="text-[10px] text-editorial-muted uppercase font-mono tracking-wider mt-0.5">B.S. Computer Science | Full-Stack</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-editorial-bg text-[#FF4E00] border border-editorial-border rounded-none">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-black text-editorial-text font-display uppercase">Client &amp; CRM Pipeline</div>
                  <div className="text-[10px] text-editorial-muted uppercase font-mono tracking-wider mt-0.5">High-volume communication &amp; sales</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-editorial-bg text-[#FF4E00] border border-editorial-border rounded-none">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-black text-editorial-text font-display uppercase">Elite Athletic Background</div>
                  <div className="text-[10px] text-editorial-muted uppercase font-mono tracking-wider mt-0.5">Collaborative Team Leadership</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-editorial-border mt-4">
            <div className="p-4 bg-editorial-bg rounded-none border border-editorial-border text-center">
              <div className="text-xl font-black text-editorial-text tracking-wide font-display uppercase">B.S. CS + PM</div>
              <div className="text-[10px] text-editorial-muted uppercase font-mono tracking-wider mt-1">Unified Technical Product Leadership</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
