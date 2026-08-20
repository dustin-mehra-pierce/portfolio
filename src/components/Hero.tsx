import React from 'react';
import { HERO, PERSONAL_INFO } from '../data';
import { Mail, Linkedin, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <section className="border-b border-editorial-border py-16 md:py-24 relative overflow-hidden" id="about">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,78,0,0.05),transparent_70%)] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto px-4 md:px-8 text-center space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF4E00]/10 text-[#FF4E00] text-[10px] font-mono tracking-[0.2em] uppercase border border-[#FF4E00]/20">
          <span className="w-1.5 h-1.5 bg-[#FF4E00] rounded-full animate-pulse"></span>
          {PERSONAL_INFO.name}
        </div>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase text-editorial-text font-display leading-tight">
          {HERO.headline}
        </h1>

        <p className="text-base md:text-lg text-editorial-muted font-serif italic leading-relaxed max-w-2xl mx-auto">
          {HERO.bio}
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono uppercase tracking-wider text-editorial-muted">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#FF4E00]" />
            <span>{PERSONAL_INFO.location}</span>
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
    </section>
  );
}
