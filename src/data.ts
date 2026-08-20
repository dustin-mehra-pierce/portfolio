import { FeaturedCaseStudy, Project } from './types';

export const PERSONAL_INFO = {
  name: "Dustin Pierce",
  location: "Sandpoint, ID",
  email: "dustin.mehra.pierce@gmail.com",
  linkedin: "https://www.linkedin.com/in/dustin-mehra-pierce/",
};

export const HERO = {
  headline: "Technical Product Manager & Full-Stack Engineer",
  bio: "I bridge product strategy and engineering execution, translating client and user needs into shipped software across healthcare, wellness, government, and consumer platforms."
};

// The single, deep-dive flagship case study — Stat Diagnosis.
export const FEATURED_CASE_STUDY: FeaturedCaseStudy = {
  productName: "Stat Diagnosis",
  tagline: "An AI-powered statistical analytics & clinical diagnostics platform",
  projectUrl: "https://statdiagnosis.ai.studio/",
  stage: "Alpha / Beta",
  stageNote: "Live and actively iterating. Core flows work end-to-end, and the platform is currently being hardened for cost, performance, and a broader public rollout.",
  role: "Founder, Product Designer & Lead Engineer",
  timeframe: "2024 – Present",
  techStack: ["React", "TypeScript", "Tailwind CSS", "Gemini API", "Vite"],
  problem:
    "Clinicians and students needed a fast way to reason through statistical and diagnostic scenarios without expensive, clunky enterprise tooling. Existing options were either too generic (spreadsheets) or too heavyweight (full EHR-integrated platforms), leaving a gap for a lightweight, AI-assisted diagnostic and analytics companion.",
  process: [
    {
      label: "1. Define the problem & scope an MVP",
      detail: "Defined the core diagnostic workflow, decided what belonged in a v1, and cut everything else to ship a focused alpha quickly."
    },
    {
      label: "2. Architect for low cost & fast iteration",
      detail: "Chose a React/TypeScript/Vite front end with a thin server layer calling the Gemini API, prioritizing a lean, cheap-to-run stack over a heavier backend to iterate daily without burning budget."
    },
    {
      label: "3. Build the core diagnostic & analytics flows",
      detail: "Designed and implemented the interactive analytics dashboards and AI-assisted diagnostic reasoning UI, acting as both product designer and lead engineer."
    },
    {
      label: "4. Launch the alpha & instrument it",
      detail: "Shipped the first public alpha, added lightweight analytics, and started tracking real traffic and request volume from day one so decisions were data-driven rather than guesswork."
    },
    {
      label: "5. Re-optimize for cost & performance",
      detail: "After launch, identified that API usage costs were unsustainable at scale (~$10/day), so re-architected caching and request budgeting to bring that down to a sustainable, ongoing cost."
    }
  ],
  results: [
    { value: "2.04k", description: "Unique visitors in the last 30 days" },
    { value: "20.79k", description: "Total requests processed in the last 30 days" },
    { value: "9,953", description: "SSL requests served all time" }
  ],
  indexingNote:
    "A meaningful share of this traffic is search-engine bots and crawlers rather than human visitors, which is expected at this stage. It reflects a well-indexed SEO structure, sitemap, and semantic markup, laying the groundwork for scaling human traffic ahead of a wider public launch."
};

// Additional projects delivered end-to-end, from planning through launch.
export const OTHER_PROJECTS: Project[] = [
  {
    id: "ecoshield-initiative",
    name: "Eco Shield Initiative",
    role: "Founder, Product Designer & Lead Engineer",
    blurb: "A bipartisan wildfire-mitigation concept platform modeling satellite heat mapping, suppression drone swarms, and prescribed-burn scheduling, built as an interactive overview for policy stakeholders.",
    projectUrl: "https://ecoshieldinitiative.ai.studio/",
    techStack: ["React", "TypeScript", "Recharts", "Vite"]
  },
  {
    id: "new-leaf-sobriety",
    name: "New Leaf Sobriety",
    role: "Full Stack Engineer",
    blurb: "A digital wellness and progress-tracking platform for a Level 2 NARR sober living home, covering onboarding, recovery milestones, and dynamic client timelines.",
    projectUrl: "https://newleafsobriety.com/",
    techStack: ["React", "Django", "PostgreSQL", "AWS"]
  },
  {
    id: "tech-powered-websites",
    name: "Tech Powered Websites",
    role: "Full Stack Engineer",
    blurb: "A modular website-building product letting clients rapidly deploy custom sites, with AI-driven SEO and accessibility checks built into the roadmap.",
    projectUrl: "https://techpoweredwebsites.com/",
    techStack: ["React", "Tailwind CSS", "Cloudflare"]
  },
  {
    id: "government-sector",
    name: "Government Sector Applications",
    role: "Full Stack Engineer",
    blurb: "2.5 years delivering secure government software, with backlogs structured around strict compliance and RBAC requirements.",
    projectUrl: "",
    techStack: ["Angular", "Django", "Docker", "PostgreSQL"]
  },
  {
    id: "texas-roadhouse",
    name: "Texas Roadhouse",
    role: "Technical Lead & Frontend Engineer",
    blurb: "Technical lead for the public-facing site and ordering platform, directing high-traffic campaigns including the company's largest revenue day to date.",
    projectUrl: "https://www.texasroadhouse.com/",
    techStack: ["Angular", "Ionic", "AWS"]
  },
  {
    id: "peets-coffee",
    name: "Peet's Coffee",
    role: "Frontend Web Developer",
    blurb: "Built and refactored mobile checkout interfaces and customer loyalty portals to eliminate network lag and lock-ups during peak traffic.",
    projectUrl: "https://www.peets.com/",
    techStack: ["Angular", "Ionic", "CSS", "HTML"]
  },
  {
    id: "bubbas-33",
    name: "Bubba's 33",
    role: "Frontend Web Developer",
    blurb: "Built and maintained responsive customer portal views and menu configurations for a high-traffic restaurant ordering platform.",
    projectUrl: "https://www.bubbas33.com/",
    techStack: ["Angular", "Ionic", "CSS", "HTML"]
  },
  {
    id: "boston-market",
    name: "Boston Market",
    role: "Frontend Web Developer",
    blurb: "Delivered digital menu displays and order validation services, including reusable components for mobile-responsive storefront ordering.",
    projectUrl: "https://www.bostonmarket.com/",
    techStack: ["Angular", "Ionic", "CSS", "HTML"]
  }
];
