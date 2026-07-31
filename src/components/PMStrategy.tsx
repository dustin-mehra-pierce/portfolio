import React, { useState } from 'react';
import { 
  TrendingUp, Compass, Target, ShieldAlert, Award, 
  Sparkles, Zap, Brain, Users, CheckCircle2, ChevronRight, Briefcase
} from 'lucide-react';

export default function PMStrategy() {
  const [activeStage, setActiveStage] = useState<'1year' | '5year' | '10year'>('1year');

  const strategyData = {
    '1year': {
      title: "1-Year Horizon: Product Stabilization, AI-Quickwins & Velocity",
      tagline: "Unlocking immediate development output and solving critical user pain points.",
      objectives: [
        {
          label: "Developer-Product Alignment",
          text: "Conduct a 30-day technical audit of existing codebase and pipeline. Establish a common language between product requirements and engineering output, eliminating standard 'Product-to-Dev translation lag'."
        },
        {
          label: "Incorporate Generative AI Assistants",
          text: "Embed low-latency AI-driven workflows (like search guidance or smart intake assistants) into critical user journeys to immediately reduce friction and customer-support tickets."
        },
        {
          label: "Agile Process Revamp",
          text: "Introduce high-discipline Scrum/Kanban backlogs, clear definition of done, and automated deployment checks to increase product delivery speed."
        }
      ],
      businessImpact: {
        metric: "Increase Release Frequency",
        description: "Accelerating the release of iterative features directly shortens client feedback loops and drives early engagement.",
        outcome: "Lowers development costs and captures early validation of new product concepts."
      },
      customerSatisfaction: {
        metric: "Decrease User Intake Friction",
        description: "Using intuitive interfaces and smart pre-filled flows ensures clients complete tasks without getting stuck.",
        outcome: "Drastically improves Net Promoter Scores (NPS) and reduces initial drop-off rate."
      }
    },
    '5year': {
      title: "5-Year Horizon: Ecosystem Scale, Modular APIs & Predictive Intelligence",
      tagline: "Transitioning from a single tool to an integrated, AI-first predictive platform.",
      objectives: [
        {
          label: "Ecosystem Integration Strategy",
          text: "Architect public API hooks and third-party integrations, allowing clients to plug the product directly into their custom CRMs and enterprise data stores."
        },
        {
          label: "Cognitive Personalization Layers",
          text: "Shift product mechanics from passive UI to proactive AI recommendation systems. Utilize user interaction telemetry to dynamically personalize navigation, shortcuts, and insights."
        },
        {
          label: "Modular Feature Scaling",
          text: "Deprecate monolithic code structures in favor of modular microservices, ensuring the core platform can support 10x user scaling with zero degraded performance."
        }
      ],
      businessImpact: {
        metric: "Increase Customer Lifetime Value (LTV)",
        description: "By becoming an indispensable ecosystem hub rather than a point solution, we maximize user dependency and expand contract sizes.",
        outcome: "Powers sustainable expansion and opens reliable upselling pathways."
      },
      customerSatisfaction: {
        metric: "Increase Customer Retention",
        description: "Predictive recommendations solve problems before users notice them, transforming customer support from reactive to proactive.",
        outcome: "Reduces user churn to historic lows and turns clients into brand advocates."
      }
    },
    '10year': {
      title: "10-Year Horizon: Market Dominance, Relentless Compliance & Autonomous Systems",
      tagline: "Future-proofing the organization and unlocking highly regulated high-value sectors.",
      objectives: [
        {
          label: "Regulated Sector Expansion",
          text: "Leverage compliance-first engineering standards to scale software into federal, state, and highly-regulated enterprise accounts (healthcare, public sector, defense)."
        },
        {
          label: "Autonomous Decision Pipelines",
          text: "Pioneer fully autonomous workflow chains where agents handle complex scheduling, data categorization, and report dispatching with human-in-the-loop oversight."
        },
        {
          label: "Perpetual Technology Modernization",
          text: "Maintain a self-updating system blueprint that isolates legacy services and adopts emerging tech with minimal downtime, securing absolute market durability."
        }
      ],
      businessImpact: {
        metric: "Enterprise Market Capture & Moat",
        description: "Securing military, government, and multi-national enterprise accounts creates an unshakeable market position that competitors cannot easily duplicate.",
        outcome: "Stabilizes recurring revenue and establishes the brand as the absolute industry standard."
      },
      customerSatisfaction: {
        metric: "Uncompromising Trust & Reliability",
        description: "Perfect system uptimes, secure single-tenant database schemas, and bank-grade encryption give customers absolute confidence.",
        outcome: "Guarantees peace of mind for high-compliance stakeholders handling critical operations."
      }
    }
  };

  const activeData = strategyData[activeStage];

  return (
    <div id="pm-strategy-panel" className="space-y-12 animate-fade-in">
      
      {/* SECTION INTRO */}
      <div className="border-b border-editorial-border pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF4E00]/10 text-[#FF4E00] text-[9px] font-mono uppercase tracking-[0.2em] border border-[#FF4E00]/20 mb-4">
          <Compass className="w-3.5 h-3.5" />
          Strategic Vision Blueprint
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase font-display text-editorial-text leading-tight">
          Product Roadmap &amp; Business Strategy
        </h2>
        <p className="text-sm md:text-base text-editorial-muted font-serif italic mt-2 max-w-3xl leading-relaxed">
          How to scale product capabilities, drive long-term business returns, maximize user satisfaction, and why Dustin Pierce is uniquely equipped to spearhead this execution.
        </p>
      </div>

      {/* ROADMAP TIMELINE CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="tablist" aria-label="Strategy Horizon Horizons">
        {[
          { id: '1year' as const, label: "1-Year Horizon", subtitle: "Velocity & Stabilization", desc: "Targeting friction & quick wins" },
          { id: '5year' as const, label: "5-Year Horizon", subtitle: "Ecosystem & AI Intelligence", desc: "Predictive scaling & APIs" },
          { id: '10year' as const, label: "10-Year Horizon", subtitle: "Dominance & Compliance", desc: "Regulated sectors & autonomy" },
        ].map((tab) => {
          const isSelected = activeStage === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveStage(tab.id)}
              role="tab"
              aria-selected={isSelected}
              aria-controls="pm-strategy-panel"
              className={`p-5 text-left border transition-all duration-300 relative group cursor-pointer ${
                isSelected 
                  ? 'bg-editorial-card border-[#FF4E00] shadow-md' 
                  : 'bg-editorial-panel border-editorial-border hover:border-editorial-text/40'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 left-0 w-full h-[3px] bg-[#FF4E00]" />
              )}
              <div className="flex justify-between items-start">
                <span className={`text-[10px] font-mono uppercase tracking-wider ${isSelected ? 'text-[#FF4E00]' : 'text-editorial-muted'}`}>
                  {tab.label}
                </span>
                <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isSelected ? 'text-[#FF4E00] translate-x-1' : 'text-editorial-muted/30 group-hover:translate-x-0.5'}`} />
              </div>
              <h3 className="text-sm font-bold text-editorial-text uppercase mt-2 tracking-wide font-display">
                {tab.subtitle}
              </h3>
              <p className="text-[11px] text-editorial-muted mt-1 leading-snug">
                {tab.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* HORIZON CONTENT CARD */}
      <div className="bg-editorial-card border border-editorial-border p-6 md:p-10 space-y-8 relative overflow-hidden">
        {/* Subtle decorative background indicator */}
        <div className="absolute top-[-40px] right-[-20px] text-8xl md:text-9xl font-black text-editorial-text/[0.02] select-none pointer-events-none uppercase font-display">
          {activeStage}
        </div>

        {/* Title Block */}
        <div className="space-y-2">
          <div className="text-[10px] text-[#FF4E00] font-mono uppercase tracking-widest font-bold">Roadmap Milestone</div>
          <h3 className="text-xl md:text-2.5xl font-bold tracking-tight text-editorial-text font-display uppercase leading-tight">
            {activeData.title}
          </h3>
          <p className="text-xs md:text-sm text-editorial-muted font-serif italic">
            &ldquo;{activeData.tagline}&rdquo;
          </p>
        </div>

        {/* Strategy Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-editorial-border/60">
          {activeData.objectives.map((obj, idx) => (
            <div key={idx} className="space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#FF4E00]/10 text-[#FF4E00] flex items-center justify-center font-mono text-[9px] font-bold">
                  {idx + 1}
                </div>
                <h4 className="text-[11px] font-bold text-editorial-text uppercase tracking-wider font-mono">
                  {obj.label}
                </h4>
              </div>
              <p className="text-xs text-editorial-muted leading-relaxed">
                {obj.text}
              </p>
            </div>
          ))}
        </div>

        {/* Impact Matrices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-editorial-border/60">
          
          {/* Business Impact */}
          <div className="bg-editorial-panel p-5 border border-editorial-border/80 space-y-3">
            <div className="flex items-center gap-2 text-[#FF4E00]">
              <TrendingUp className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Business Drivers</span>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-black text-editorial-text font-display">
                {activeData.businessImpact.metric}
              </div>
              <p className="text-xs text-editorial-muted leading-relaxed mt-1.5">
                {activeData.businessImpact.description}
              </p>
              <div className="mt-2 text-[10px] font-mono text-editorial-text/90 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#FF4E00] rounded-full inline-block" />
                Value: {activeData.businessImpact.outcome}
              </div>
            </div>
          </div>

          {/* Customer Satisfaction */}
          <div className="bg-editorial-panel p-5 border border-editorial-border/80 space-y-3">
            <div className="flex items-center gap-2 text-emerald-500">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Customer Satisfaction (CSAT)</span>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-black text-editorial-text font-display">
                {activeData.customerSatisfaction.metric}
              </div>
              <p className="text-xs text-editorial-muted leading-relaxed mt-1.5">
                {activeData.customerSatisfaction.description}
              </p>
              <div className="mt-2 text-[10px] font-mono text-editorial-text/90 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block" />
                Value: {activeData.customerSatisfaction.outcome}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* WHY DUSTIN IS THE IDEAL CANDIDATE FOR THIS POSITION */}
      <section className="bg-editorial-panel border border-editorial-border p-6 md:p-10 space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-editorial-text text-editorial-bg text-[9px] font-mono uppercase tracking-widest font-bold">
            <Award className="w-3.5 h-3.5" />
            Candidate Alignment Matrix
          </div>
          <h3 className="text-2xl md:text-3.5xl font-black tracking-tight uppercase font-display text-editorial-text">
            Why Dustin Pierce is Built to Execute This Strategy
          </h3>
          <p className="text-xs md:text-sm text-editorial-muted font-serif italic max-w-2xl">
            A standard Product Manager knows how to write tickets. An elite Technical Product Manager understands the engineering reality, holds radical customer empathy, and drives teams to victory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          
          {/* Pillar 1: No Translation Lag */}
          <div className="space-y-3 border-t border-editorial-border/80 pt-4">
            <div className="flex items-center gap-2 text-[#FF4E00]">
              <Brain className="w-4 h-4" />
              <h4 className="text-xs font-bold text-editorial-text uppercase tracking-widest font-mono">B.S. CS + Product &amp; Tech Mastery</h4>
            </div>
            <p className="text-xs text-editorial-muted leading-relaxed">
              Having designed fluid frontend solutions for household brands like <strong>Texas Roadhouse</strong> and <strong>Peet&apos;s Coffee</strong>, and served as Technical Product Manager &amp; Full Stack Engineer on multi-year secure government applications, Dustin speaks fluent developer code. He estimates task complexities flawlessly, drafts precise technical requirements, and commands mutual respect from engineering squads.
            </p>
          </div>

          {/* Pillar 2: High-Volume Outbound Discovery */}
          <div className="space-y-3 border-t border-editorial-border/80 pt-4">
            <div className="flex items-center gap-2 text-[#FF4E00]">
              <Users className="w-4 h-4" />
              <h4 className="text-xs font-bold text-editorial-text uppercase tracking-widest font-mono">Outbound Grit &amp; Discovery</h4>
            </div>
            <p className="text-xs text-editorial-muted leading-relaxed">
              With current self-employed experience conducting <strong>high-volume cold-outbound calls</strong> and negotiating deals, Dustin holds radical, boots-on-the-ground customer empathy. He qualifies customer pain points with relentless discipline—translating vague user demands into structured product roadmaps.
            </p>
          </div>

          {/* Pillar 3: Resilient Athletic Composure */}
          <div className="space-y-3 border-t border-editorial-border/80 pt-4">
            <div className="flex items-center gap-2 text-[#FF4E00]">
              <Zap className="w-4 h-4" />
              <h4 className="text-xs font-bold text-editorial-text uppercase tracking-widest font-mono">Elite Performance Pressure</h4>
            </div>
            <p className="text-xs text-editorial-muted leading-relaxed">
              Refined by over 14 years competing in <strong>professional and semi-professional sports</strong> (hockey &amp; soccer) in front of hundreds of thousands of accumulated fans, Dustin thrives under intense stress. He is built to manage product fire drills, navigate shifting client priorities, and maintain absolute alignment without losing composure.
            </p>
          </div>

        </div>

        {/* Summary Footer */}
        <div className="p-4 bg-editorial-card border border-editorial-border text-center text-xs text-editorial-muted font-serif italic">
          &ldquo;Product Management isn&apos;t about being a gatekeeper; it&apos;s about removing friction for developers so they can build value, and qualifying market signals so we build the right thing first. That is the execution Dustin brings.&rdquo;
        </div>
      </section>

    </div>
  );
}
