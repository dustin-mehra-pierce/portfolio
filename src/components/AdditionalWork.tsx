import React from 'react';
import { OTHER_PM_PROJECTS, FEATURED_CASE_STUDY } from '../data';
import { ExternalLink, Briefcase } from 'lucide-react';

export default function AdditionalWork() {
  const totalCount = OTHER_PM_PROJECTS.length + 1; // +1 for the featured case study itself

  return (
    <section className="py-16 md:py-20" id="other-work">
      <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-8">

        <div className="text-center space-y-2">
          <span className="text-[10px] font-bold text-[#FF4E00] uppercase tracking-widest font-mono">
            Beyond {FEATURED_CASE_STUDY.productName}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter uppercase text-editorial-text font-display">
            More Work as a Technical Product Manager
          </h2>
          <p className="text-editorial-muted text-sm md:text-base italic font-serif max-w-2xl mx-auto">
            {FEATURED_CASE_STUDY.productName} is one of {totalCount} products I've led as a Technical Product Manager.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {OTHER_PM_PROJECTS.map((p) => (
            <div key={p.id} className="bg-editorial-card border border-editorial-border p-5 md:p-6 space-y-3 hover:border-[#FF4E00]/40 transition-all group">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-editorial-text uppercase tracking-tight font-display group-hover:text-[#FF4E00] transition-colors">
                    {p.name}
                  </h3>
                  <span className="text-[10px] text-[#FF4E00] font-mono uppercase tracking-widest">
                    {p.role}
                  </span>
                </div>
                {p.projectUrl && (
                  <a
                    href={p.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 p-1.5 border border-editorial-border text-editorial-muted hover:text-[#FF4E00] hover:border-[#FF4E00]/40 transition-all"
                    aria-label={`View ${p.name}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <p className="text-xs md:text-sm text-editorial-muted leading-relaxed">
                {p.blurb}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {p.techStack.map((t, i) => (
                  <span key={i} className="px-2 py-0.5 bg-editorial-panel text-editorial-muted text-[9px] font-mono border border-editorial-border uppercase">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 text-[10px] text-editorial-muted/70 font-mono uppercase tracking-widest pt-2">
          <Briefcase className="w-3.5 h-3.5 text-[#FF4E00]" />
          {totalCount} Products &bull; Technical Product Manager
        </div>

      </div>
    </section>
  );
}
