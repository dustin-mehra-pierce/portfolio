import React from 'react';
import { FEATURED_CASE_STUDY } from '../data';
import { ExternalLink, AlertTriangle, Bot, TrendingUp, Code } from 'lucide-react';

export default function FeaturedCaseStudy() {
  const cs = FEATURED_CASE_STUDY;

  return (
    <section className="py-16 md:py-20 border-b border-editorial-border" id="case-study">
      <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-10">

        {/* Section label */}
        <div className="text-center space-y-2">
          <span className="text-[10px] font-bold text-[#FF4E00] uppercase tracking-widest font-mono">
            Featured Case Study
          </span>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tighter uppercase text-editorial-text font-display">
            {cs.productName}
          </h2>
          <p className="text-editorial-muted text-sm md:text-base italic font-serif max-w-xl mx-auto">
            {cs.tagline}
          </p>
        </div>

        {/* Meta strip: Role | Tech | Timeframe | Stage | Link */}
        <div className="bg-editorial-card border border-editorial-border p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div>
              <span className="block text-editorial-muted/70 uppercase tracking-widest text-[9px] mb-1">Role</span>
              <span className="text-editorial-text font-semibold">{cs.role}</span>
            </div>
            <div>
              <span className="block text-editorial-muted/70 uppercase tracking-widest text-[9px] mb-1">Timeframe</span>
              <span className="text-editorial-text font-semibold">{cs.timeframe}</span>
            </div>
            <div>
              <span className="block text-editorial-muted/70 uppercase tracking-widest text-[9px] mb-1">Stage</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#FF4E00]/10 text-[#FF4E00] font-bold uppercase tracking-wider text-[10px] border border-[#FF4E00]/20">
                {cs.stage}
              </span>
            </div>
          </div>
          {cs.projectUrl && (
            <a
              href={cs.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2 border border-editorial-border bg-editorial-panel text-editorial-text text-[10px] font-mono uppercase tracking-widest hover:bg-[#FF4E00] hover:text-white hover:border-[#FF4E00] transition-all"
            >
              View Live <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Alpha/Beta stage note */}
        <div className="flex items-start gap-3 bg-[#FF4E00]/5 border border-[#FF4E00]/15 p-4 md:p-5">
          <AlertTriangle className="w-4 h-4 text-[#FF4E00] shrink-0 mt-0.5" />
          <p className="text-xs md:text-sm text-editorial-muted leading-relaxed">
            <span className="font-bold text-editorial-text uppercase tracking-wider text-[11px] block mb-1">Current Status: {cs.stage}</span>
            {cs.stageNote}
          </p>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-editorial-muted uppercase font-mono tracking-widest mr-1">
            <Code className="w-3.5 h-3.5 text-[#FF4E00]" /> Stack:
          </span>
          {cs.techStack.map((t, i) => (
            <span key={i} className="px-2.5 py-1 bg-editorial-panel text-editorial-text text-[10px] font-mono border border-editorial-border uppercase">
              {t}
            </span>
          ))}
        </div>

        {/* Problem */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-editorial-text uppercase tracking-tight font-display border-b border-editorial-border pb-2">
            The Problem
          </h3>
          <p className="text-sm md:text-base text-editorial-muted leading-relaxed">
            {cs.problem}
          </p>
        </div>

        {/* Process / steps taken */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-editorial-text uppercase tracking-tight font-display border-b border-editorial-border pb-2">
            The Steps I Took
          </h3>
          <div className="space-y-4">
            {cs.process.map((step, i) => (
              <div key={i} className="flex gap-4 bg-editorial-card border border-editorial-border p-4 md:p-5">
                <div className="shrink-0 w-8 h-8 rounded-none border border-[#FF4E00]/30 bg-[#FF4E00]/10 text-[#FF4E00] flex items-center justify-center font-display font-bold text-sm">
                  {i + 1}
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-editorial-text font-mono">
                    {step.label.replace(/^\d+\.\s*/, '')}
                  </h4>
                  <p className="text-xs md:text-sm text-editorial-muted leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-editorial-text uppercase tracking-tight font-display border-b border-editorial-border pb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#FF4E00]" /> Results So Far
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cs.results.map((r, i) => (
              <div key={i} className="bg-editorial-panel border border-editorial-border p-5 text-center space-y-1">
                <div className="text-2xl md:text-3xl font-black text-[#FF4E00] font-display">{r.value}</div>
                <div className="text-[10px] text-editorial-muted uppercase tracking-wider font-mono">{r.description}</div>
              </div>
            ))}
          </div>

          {/* Traffic composition note */}
          <div className="flex items-start gap-3 bg-editorial-card border border-editorial-border p-4 md:p-5">
            <Bot className="w-4 h-4 text-[#FF4E00] shrink-0 mt-0.5" />
            <p className="text-xs md:text-sm text-editorial-muted leading-relaxed font-serif italic">
              {cs.indexingNote}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
