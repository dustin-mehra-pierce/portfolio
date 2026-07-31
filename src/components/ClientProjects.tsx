import React, { useState } from 'react';
import { CLIENT_PROJECTS } from '../data';
import { ExternalLink, CheckCircle2, ChevronRight, Code, Database, Layers, ClipboardList, HelpCircle, Sparkles } from 'lucide-react';

// Epics drafted through a Technical PM lens
const PM_EPICS: Record<string, {
  epicTitle: string;
  userStory: string;
  acceptanceCriteria: string[];
  priority: 'HIGH' | 'CRITICAL' | 'MEDIUM';
  points: number;
  tradeoff: string;
}> = {
  "stat-diagnosis": {
    epicTitle: "AI-Powered Diagnostics & Cost-Optimized Analytical Modeling",
    userStory: "As a co-founder and lead engineer of Stat Diagnosis, I want to structure a highly performant, cost-efficient clinical analytical dashboard that handles our rapid growth of 1.78k unique visitors in the last 30 days and 31.81k requests, while keeping our daily API budget tightly optimized for our sustainable relaunch.",
    acceptanceCriteria: [
      "Must scale seamlessly to support rapid growth, processing over 1.78k unique visitors and 31.81k requests smoothly.",
      "Must implement local caching and debounced API requests to keep daily running budgets highly cost-optimized.",
      "Must securely process predictive AI diagnostics using optimized, low-overhead server endpoints."
    ],
    priority: 'CRITICAL',
    points: 13,
    tradeoff: "Collaboratively designed and built with colleagues, prioritizing local cache middleware and smart query budgeting over live polling to reduce high API-invocation costs ($10/day down to sustainable margins)."
  },
  "new-leaf-sobriety": {
    epicTitle: "Digital Onboarding & Progress Timeline Tracking",
    userStory: "As a wellness coordinator at New Leaf Sobriety, I want the system to structure a personalized progress timeline based on the client's intake responses and milestones, so that we can monitor their sober days and recovery track.",
    acceptanceCriteria: [
      "Must parse and save intake answers securely using relational DB schemas.",
      "Requires interactive timeline rendering to display key milestone markers clearly.",
      "Must track sober milestones with a strict daily streak-tracking algorithm."
    ],
    priority: 'HIGH',
    points: 8,
    tradeoff: "Chose structured, highly predictable milestone formulas over arbitrary metrics to ensure compliance with NARR level 2 sober living operational standards."
  },
  "one-two-llc": {
    epicTitle: "AI Categorization Engine for Multi-Source Datasets",
    userStory: "As a business operations lead at One Two LLC, I want our incoming client files automatically categorized and tagged by metadata, so that we can reduce manual sorting labor by 80%.",
    acceptanceCriteria: [
      "AI model must process and output categories with a confidence score >= 92%.",
      "Files below the confidence threshold must route to a manual triage dashboard.",
      "The ingestion batch tool must handle PDF, CSV, and TXT formats up to 15MB each."
    ],
    priority: 'HIGH',
    points: 13,
    tradeoff: "Sacrificed minor model accuracy for processing speed by utilizing a specialized distilled light classifier, keeping system overhead low and server costs highly optimized."
  },
  "tech-powered-websites": {
    epicTitle: "AI-Powered Real-Time SEO & Content Optimizer",
    userStory: "As a web client utilizing Tech Powered Websites, I want immediate suggestions on my draft layouts to improve search ranking and compliance, so that my sites convert faster upon launch.",
    acceptanceCriteria: [
      "Provides live analysis of page headers, meta-tags, and alternative descriptions on page save.",
      "Generates immediate compliance rating aligned with current Google SEO algorithms.",
      "Ensures responsive visual updates trigger in under 200ms."
    ],
    priority: 'MEDIUM',
    points: 5,
    tradeoff: "Selected local debounce parsing for on-keystroke draft feedback, avoiding persistent server calls until the client explicitly requests a full index audit."
  },
  "ecoshield-initiative": {
    epicTitle: "Bipartisan Wildfire Elimination Initiative - Interactive Congressional Overview",
    userStory: "As the sole creator of the Eco Shield Initiative, I want to present an interactive, high-fidelity overview of our bipartisan forest fire elimination system to members of Congress and the House of Representatives, so that they can visualize how satellite heat mapping, drone swarms, robot brush cutters, and charging stations operate in tandem while maintaining ecosystem-saving prescribed burns.",
    acceptanceCriteria: [
      "Must model real-time interactive dashboards showing simulated satellite heat mapping alerts and drone swarm charge levels.",
      "Provides toggles to illustrate robotic brush cutter activity and prescribed burn target zones required for a healthy forest ecosystem.",
      "Optimizes layout responsiveness to ensure pristine presentation quality during laptop or tablet-based legislative reviews."
    ],
    priority: 'CRITICAL',
    points: 8,
    tradeoff: "Engineered the entire application end-to-end from ideation to launch as a solo developer, prioritizing client-side interactive speed to ensure flawless, highly responsive presentations to high-profile stakeholders."
  },
  "government-sector": {
    epicTitle: "Secure Role-Based Access & Content Workflow Ingestion",
    userStory: "As an authorized government program supervisor, I want to review, revise, and approve drafted public announcements through a secure Wagtail pipeline, so that we prevent unauthorized document modification.",
    acceptanceCriteria: [
      "Must enforce rigid role-based access control (RBAC) across all Angular views.",
      "Requires Django audit logs to capture all document creation, modifications, and state transitions.",
      "Content publishing must go through a dual-signature approval step."
    ],
    priority: 'CRITICAL',
    points: 8,
    tradeoff: "Implemented complete state locking upon document submission, trading off editor drafting freedom to guarantee bulletproof regulatory audit compliance."
  },
  "texas-roadhouse": {
    epicTitle: "High-Traffic Digital Campaigns & Technical Lead Architecture",
    userStory: "As the Technical Lead of the Texas Roadhouse website, I want to optimize web architectures and manage multiple simultaneous Mother's Day promotional campaigns, so that our platform scales seamlessly to deliver the single largest revenue day in company history to that date.",
    acceptanceCriteria: [
      "Must scale web and ordering ingestion pipelines to support massive concurrent visitor spikes during high-profile holiday campaigns.",
      "Requires static assets compiled cleanly using Angular and Ionic with zero layout shifts under high stress.",
      "Menu API endpoints must remain highly responsive (CLS < 0.1, query times under 300ms) to prevent checkout bottlenecks."
    ],
    priority: 'CRITICAL',
    points: 13,
    tradeoff: "Opted for aggressively pre-rendered campaign assets and client-side menu state caching over persistent server reconciliation to preserve platform stability during the largest traffic day in company history."
  },
  "peets-coffee": {
    epicTitle: "Commuter Loyalty & Offline Checkout Buffer",
    userStory: "As a Peet's Coffee loyalty customer, I want to use my rewards code at checkout even when cell reception is unstable in commuter areas, so that I don't miss out on reward points.",
    acceptanceCriteria: [
      "Must persist user loyalty token locally using secure Ionic storage state.",
      "Requires transactional PostgreSQL queue buffer on AWS that retries sync as soon as network is active.",
      "Gracefully handles network timeout without blocking the customer check-out flow."
    ],
    priority: 'CRITICAL',
    points: 8,
    tradeoff: "Prioritized local transaction buffering over immediate central database verification, accepting eventual ledger synchronization to prevent long customer queues."
  },
  "bubbas-33": {
    epicTitle: "PostgreSQL Database Schema Optimization",
    userStory: "As a Bubba's 33 franchise general manager, I want the system to isolate database traffic between store locations, so that busy dinner rushes at one branch do not slow down order processing at other stores.",
    acceptanceCriteria: [
      "Must establish isolated schema shards on PostgreSQL databases using AWS clusters.",
      "All active transactional records must carry validated indexes to speed up SQL query times.",
      "Enforces a strict connection pool limit to prevent database memory leaks."
    ],
    priority: 'HIGH',
    points: 8,
    tradeoff: "Chose distinct database schema boundaries per store over a shared unified table, trading off complex global reporting queries for massive gains in localized write-speed."
  },
  "boston-market": {
    epicTitle: "Secure Store Payment & Routing Ingestion",
    userStory: "As a Boston Market delivery customer, I want my digital payment securely processed and routed to the closest local store franchise so my food arrives fresh and warm.",
    acceptanceCriteria: [
      "Must integrate secure, PCI-compliant payment gateways with direct API callbacks in Angular.",
      "Requires store coordinate validation utilizing PostgreSQL geography queries on AWS.",
      "POS routing system must confirm receipt in under 2.5 seconds."
    ],
    priority: 'CRITICAL',
    points: 5,
    tradeoff: "Implemented strict server-side address validation using localized geo-coordinates, accepting a minor 1.2s delay to prevent incorrect franchise routing errors."
  }
};

export default function ClientProjects() {
  const [activeClientId, setActiveClientId] = useState<string>("stat-diagnosis");
  
  const activeProject = CLIENT_PROJECTS.find(p => p.id === activeClientId) || CLIENT_PROJECTS[0];
  const activeEpic = PM_EPICS[activeClientId] || PM_EPICS["stat-diagnosis"];

  return (
    <div className="space-y-8 animate-fade-in" id="client-case-studies">
      
      {/* Dynamic Tab Bar to avoid one massive scrolling page */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-editorial-border pb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter uppercase text-editorial-text font-display">
            Selected Work &amp; Project Experience
          </h2>
          <p className="text-editorial-muted text-xs md:text-sm font-semibold uppercase tracking-wider font-mono mt-1">
            Browse Dustin&apos;s product management, AI integration, full-stack, and lead engineering portfolios.
          </p>
        </div>

        {/* Client Selector Buttons */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-editorial-bg rounded-none border border-editorial-border max-w-full overflow-x-auto" role="tablist" aria-label="Select Client Project Case Study">
          {CLIENT_PROJECTS.map(p => (
            <button
              key={p.id}
              onClick={() => setActiveClientId(p.id)}
              role="tab"
              aria-selected={activeClientId === p.id}
              aria-controls="client-case-studies"
              className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all rounded-none font-mono cursor-pointer ${
                activeClientId === p.id
                  ? 'bg-[#FF4E00] text-white border border-[#FF4E00]/20 shadow-sm font-semibold'
                  : 'text-editorial-muted hover:text-editorial-text hover:bg-editorial-panel'
              }`}
            >
              {p.clientName.replace(" Applications", "")}
            </button>
          ))}
        </div>
      </div>

      {/* Main Client Profile Container */}
      <div className="bg-editorial-card rounded-none border border-editorial-border overflow-hidden">
        <div className="p-1 bg-[#FF4E00]"></div>
        <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Client Summary and Achievements */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#FF4E00] uppercase tracking-widest font-mono flex items-center gap-1.5">
                {activeProject.technologies.includes("AI Integration") || activeProject.technologies.includes("AI Automation") ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    AI-Powered Solutions &bull; Core Delivery
                  </>
                ) : (
                  <>
                    <Code className="w-3.5 h-3.5" />
                    Project Profile &amp; Role Context
                  </>
                )}
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-editorial-border pb-3">
                <h3 className="text-2xl md:text-3xl font-black uppercase text-editorial-text font-display tracking-tight">
                  {activeProject.clientName}
                </h3>
                
                {/* External Link directly to project url */}
                {activeProject.projectUrl ? (
                  <a 
                    href={activeProject.projectUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-editorial-panel text-editorial-text border border-editorial-border text-[10px] font-mono uppercase tracking-widest hover:bg-[#FF4E00] hover:text-white hover:border-[#FF4E00] transition-all cursor-pointer"
                  >
                    Visit Official Site <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-editorial-panel text-editorial-muted border border-editorial-border text-[9px] font-mono uppercase tracking-widest">
                    Internal/Secure Site
                  </span>
                )}
              </div>
              <p className="text-editorial-muted font-semibold text-xs font-mono uppercase tracking-wider">
                Assigned Role: <span className="text-[#FF4E00] font-bold">{activeProject.role}</span>
              </p>
            </div>

            <p className="text-editorial-muted/80 text-sm md:text-base leading-relaxed font-serif italic">
              {activeProject.description}
            </p>

            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-editorial-muted/70 font-mono">
                Delivered Solutions &amp; Scope of Work
              </h4>
              <ul className="space-y-2.5">
                {activeProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-editorial-muted leading-relaxed font-mono uppercase tracking-wider">
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#FF4E00] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Technical Stack Details */}
          <div className="lg:col-span-5 bg-editorial-panel p-6 border border-editorial-border space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-editorial-muted/50 border-b border-editorial-border pb-2 font-mono">
                Project Technical Footprint
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-[#FF4E00]" />
                  <span className="text-[10px] font-bold text-editorial-text font-mono uppercase tracking-wider">Primary Stack:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.technologies.map((t, i) => (
                    <span key={i} className="px-2 py-1 bg-editorial-bg text-editorial-text text-[10px] font-mono border border-editorial-border uppercase">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-editorial-border/60">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#FF4E00]" />
                  <span className="text-[10px] font-bold text-editorial-text font-mono uppercase tracking-wider">Scope &amp; Impact:</span>
                </div>
                <p className="text-[11px] text-editorial-muted leading-relaxed font-serif italic">
                  Oversaw sprint specifications, timeline management, requirement reviews, and custom component implementation ensuring robust code integration and seamless user-facing performance.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-editorial-border text-center">
              <span className="text-[9px] font-bold text-[#FF4E00] uppercase tracking-wider font-mono">
                Active Production Environment &bull; Verified Rollout
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PM Deliverable Showcase: Interactive Backlog Specification */}
      <div className="bg-editorial-card rounded-none border border-editorial-border p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-editorial-border pb-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#FF4E00] uppercase tracking-widest font-mono flex items-center gap-1.5">
              <ClipboardList className="w-4 h-4" /> PM Deliverable Spec
            </span>
            <h4 className="text-lg font-bold text-editorial-text tracking-tight uppercase font-display">
              Agile User Epic &amp; Backlog Specification
            </h4>
            <p className="text-xs text-editorial-muted font-serif italic">
              Inspect how Dustin translates {activeProject.clientName} business constraints into structured technical specifications.
            </p>
          </div>
          
          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-editorial-muted">
            <span className="px-2 py-1 bg-editorial-panel border border-editorial-border text-[#FF4E00] font-bold">
              Priority: {activeEpic.priority}
            </span>
            <span className="px-2 py-1 bg-editorial-panel border border-editorial-border text-editorial-text">
              Size: {activeEpic.points} SP
            </span>
          </div>
        </div>

        {/* Story details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-editorial-muted font-mono uppercase block">Active Epic Title:</span>
              <span className="text-base font-bold text-editorial-text uppercase tracking-tight font-display">{activeEpic.epicTitle}</span>
            </div>

            <div className="bg-editorial-panel p-4 border border-editorial-border space-y-2">
              <div className="flex items-center gap-1.5 text-[9px] text-editorial-muted font-bold uppercase font-mono">
                <HelpCircle className="w-3.5 h-3.5 text-[#FF4E00]" /> PM Draft User Story:
              </div>
              <p className="text-xs md:text-sm text-editorial-muted font-serif italic leading-relaxed">
                &ldquo;{activeEpic.userStory}&rdquo;
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-editorial-muted font-mono uppercase block">Technical Acceptance Criteria (PM Spec):</span>
              <div className="space-y-2">
                {activeEpic.acceptanceCriteria.map((criteria, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-editorial-muted font-mono uppercase tracking-wider">
                    <span className="text-[#FF4E00] font-bold mt-0.5">[{i + 1}]</span>
                    <span>{criteria}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-editorial-border">
              <div className="bg-[#FF4E00]/5 p-3 border border-[#FF4E00]/10">
                <span className="text-[9px] font-bold text-[#FF4E00] block uppercase font-mono tracking-wider mb-1">PM Trade-Off Decision:</span>
                <p className="text-[11px] text-editorial-muted leading-relaxed font-serif italic">
                  {activeEpic.tradeoff}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
