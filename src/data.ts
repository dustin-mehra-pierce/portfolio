import { CaseStudy, TimelineEvent } from './types';

export const PERSONAL_INFO = {
  name: "Dustin Pierce",
  location: "Sandpoint, ID",
  phone: "(208) 946-7592",
  email: "dustin.mehra.pierce@gmail.com",
  linkedin: "https://www.linkedin.com/in/dustin-mehra-pierce/",
  github: "https://github.com/",
};

export const EXECUTIVE_SUMMARY = {
  headline: "Technical Product Manager & Full Stack Engineer",
  subheadline: "Bridging the gap between engineering execution and client-focused product strategy to deliver high-impact web and mobile solutions.",
  blurb: "I am a Technical Product Manager and Full Stack Engineer with a B.S. in Computer Science and strong hands-on experience designing, developing, and deploying applications from concept to production. In my career, I served as a Frontend Web Developer for enterprise restaurant brands, and transitioned into a Technical Product Manager & Full Stack Engineer for complex government contracts and recent advanced software applications. I excel at translating complex client requirements into structured, robust technical roadmaps. My background combines deep engineering literacy in modern frameworks (Angular, React, Ionic, Django, AWS, Node.js) with product-facing skills such as requirement gathering, roadmap planning, stakeholder management, and team collaboration. I also possess substantial experience working directly with AI tools and integrating AI services into modern applications. I bring an analytical, disciplined, and resilient approach shaped by years of competing in high-performance team environments as a professional and semi-professional athlete."
};

export const CORE_CAPABILITIES = [
  {
    title: "Product Lifecycle Management",
    description: "Experienced in managing multiple client software products and government contracts from early planning and backlog definition through testing, delivery, and post-launch maintenance.",
    icon: "Briefcase"
  },
  {
    title: "AI Integration & Development",
    description: "Skilled at incorporating generative AI, predictive models, and smart assistants into production applications while leveraging AI engineering workflows.",
    icon: "Sparkles"
  },
  {
    title: "Client & Stakeholder Communication",
    description: "Skilled at conducting deep requirement gathering sessions, qualifying user needs, aligning expectations, and presenting high-level technical solutions to non-technical partners.",
    icon: "Users"
  },
  {
    title: "Full-Stack Tech Fluency",
    description: "Fluent in React, Angular, Ionic, Django, Node.js, and AWS, enabling seamless collaboration with engineering teams and highly accurate feature estimation.",
    icon: "Code"
  },
  {
    title: "Structured Databases & Cloud",
    description: "Hands-on experience configuring PostgreSQL, Firebase, and cloud instances on AWS, ensuring secure and scalable data storage schemas.",
    icon: "Database"
  },
  {
    title: "High-Performance Collaboration",
    description: "A disciplined team player who thrives under pressure, bringing leadership, adaptability, and resilience refined through professional athletics and customer-facing roles.",
    icon: "Award"
  }
];

export const CLIENT_PROJECTS = [
  {
    id: "stat-diagnosis",
    clientName: "Stat Diagnosis",
    projectUrl: "https://statdiagnosis.ai.studio/",
    role: "Co-Founder, Product Designer & Lead Engineer",
    description: "Conceived, designed, and launched an AI-powered statistical analytics and clinical diagnostics platform experiencing rapid growth, securing 1.78k unique visitors in the last 30 days and 31.81k requests. Spearheaded the product lifecycle alongside colleagues, achieving rapid viral traction with 1.5k unique users in its first 21 days. Currently in the process of republishing the application with a highly optimized, low-overhead server configuration and smart API budgeting.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Gemini API", "Vite"],
    highlights: [
      "Collaborated closely with colleagues to design, engineer, and deploy the platform, successfully scaling it to support 1.78k unique visitors in the last 30 days and 31.81k requests.",
      "Achieved rapid growth and viral user acquisition, securing over 1.5k unique active users within the initial 21 days of launch.",
      "Re-engineered backend data processing and model calls to transition from a high-overhead cost structure ($10/day) to a lean, budget-friendly operational model."
    ]
  },
  {
    id: "ecoshield-initiative",
    clientName: "Eco Shield Initiative",
    projectUrl: "https://ecoshieldinitiative.ai.studio/",
    role: "Founder, Product Designer & Lead Engineer (Solo Creator)",
    description: "Conceived, designed, and engineered a proposed bipartisan initiative to eliminate devastating forest fires in the Western United States. Serving as an interactive overview to present before Congress and the House of Representatives, the platform models a cohesive technological ecosystem—integrating satellite heat mapping, autonomous suppression drone swarms, robotic brush cutters, smart charging and refueling stations, and targeted prescribed burns required for balanced ecosystem health.",
    technologies: ["React", "TypeScript", "D3/Recharts", "Vite", "Tailwind CSS"],
    highlights: [
      "Solely built and designed the product end-to-end, managing the full lifecycle from early concept and design requirements to full-stack code implementation and launch.",
      "Architected the interactive systems modeling satellite heat mapping alerts, autonomous Suppression Drone Swarm tracking, and robotic brush cutter locations.",
      "Implemented localized telemetry layouts illustrating where prescribed burns are needed to maintain forest health once wildfire risks are eliminated."
    ]
  },
  {
    id: "new-leaf-sobriety",
    clientName: "New Leaf Sobriety",
    projectUrl: "https://newleafsobriety.com/",
    role: "Technical Product Manager & Full Stack Engineer",
    description: "Product managed and built the custom web application for an aspiring Level 2 NARR sober living home. Engineered a digital wellness and progress tracking platform from technical architecture to frontend deployment, incorporating a structured onboarding pipeline, client recovery milestones, and dynamic progress timelines.",
    technologies: ["React", "Django", "PostgreSQL", "Tailwind CSS", "AWS"],
    highlights: [
      "Translated business operational goals into clear technical milestones, roadmap targets, and managed end-to-end sprint backlogs.",
      "Architected relational PostgreSQL database models, Django REST API schemas, and customized server-side workflows.",
      "Built interactive client progress dashboards and automated milestone trackers based on sober day calculations."
    ]
  },
  {
    id: "tech-powered-websites",
    clientName: "Tech Powered Websites",
    projectUrl: "https://techpoweredwebsites.com/",
    role: "Technical Product Manager & Full Stack Engineer",
    description: "Designed and engineered a modular website building application that empowers clients to rapidly deploy custom sites. Directed the product roadmap, created flexible UI components, and built automated SEO and accessibility verification utilities.",
    technologies: ["React", "Tailwind CSS", "AI Copilot", "Cloudflare"],
    highlights: [
      "Product managed sprint schedules, stakeholder alignments, and mapped secure domain and DNS configurations.",
      "Built the full-stack website builder system architecture, enabling modular theme variations and dynamic layout adjustments.",
      "Integrated AI automation layers that dynamically recommend SEO changes based on live keyword trends."
    ]
  },
  {
    id: "government-sector",
    clientName: "Government Sector Applications",
    projectUrl: "",
    role: "Technical Product Manager & Full Stack Engineer",
    description: "Dedicated 2.5 years to the planning, development, and release of custom software solutions for government sector entities. Structured project backlogs to align with rigorous safety, role-based access control (RBAC), and compliance standards.",
    technologies: ["Angular", "Django", "Docker", "PostgreSQL", "Wagtail"],
    highlights: [
      "Led the end-to-end delivery lifecycle as PM, maintaining close coordination with compliance officers, structuring backlogs, and defining strict definitions of done.",
      "Architected and engineered highly secure full-stack workflows using Django and Wagtail CMS with secure, relational PostgreSQL database schemas.",
      "Configured containerized Docker environments and deployment pipelines to meet strict government security guidelines."
    ]
  },
  {
    id: "texas-roadhouse",
    clientName: "Texas Roadhouse",
    projectUrl: "https://www.texasroadhouse.com/",
    role: "Technical Lead & Frontend Engineer",
    description: "Served as the Technical Lead for the public-facing website and production web ordering applications. Directed critical high-traffic digital campaigns, including orchestrating web systems for Mother's Day—which achieved the single largest revenue day in company history to that date.",
    technologies: ["Angular", "Ionic", "CSS", "HTML", "AWS"],
    highlights: [
      "Acted as Technical Lead for the website, directing the frontend engineering, modular menu architecture, and core order ingestion flows.",
      "Prepared and scaled the platform for several concurrent promotional campaigns on Mother's Day, safely supporting their largest revenue day to that date.",
      "Programmed fluid menu interfaces and optimized client-side state managers using Angular and Ionic to eliminate lag during massive holiday order surges."
    ]
  },
  {
    id: "peets-coffee",
    clientName: "Peet's Coffee",
    projectUrl: "https://www.peets.com/",
    role: "Frontend Web Developer",
    description: "Served as a Frontend Web Developer for mobile checkout interfaces and customer loyalty portals. Refactored checkout widgets to prevent network lag and lock-ups.",
    technologies: ["Angular", "Ionic", "CSS", "HTML"],
    highlights: [
      "Led frontend engineering refactoring and client state optimization on Angular and Ionic.",
      "Polished customer loyalty checkouts and secure layout styles to streamline morning user conversions.",
      "Collaborated with backend developers to cleanly consume transaction and product catalog APIs."
    ]
  },
  {
    id: "bubbas-33",
    clientName: "Bubba's 33",
    projectUrl: "https://www.bubbas33.com/",
    role: "Frontend Web Developer",
    description: "Worked as a Frontend Web Developer to construct and maintain critical, highly responsive customer portal views and menu configurations.",
    technologies: ["Angular", "Ionic", "CSS", "HTML"],
    highlights: [
      "Developed web views and menu configurations utilizing modern Angular and Ionic templates.",
      "Styled mobile-responsive components and improved asset load workflows for optimal frontend presentation.",
      "Collaborated with full-stack developers to integrate customer profiles and secure frontend menu structures."
    ]
  },
  {
    id: "boston-market",
    clientName: "Boston Market",
    projectUrl: "https://www.bostonmarket.com/",
    role: "Frontend Web Developer",
    description: "Served as a Frontend Web Developer to optimize and support digital menu displays and order validation services.",
    technologies: ["Angular", "Ionic", "CSS", "HTML"],
    highlights: [
      "Assisted in crafting reusable Angular components for mobile-responsive storefront menu ingestion.",
      "Verified storefront layouts and local validation states to align with user checkout selections.",
      "Helped troubleshoot customer portal frontend issues during peak seasonal web demand hours."
    ]
  }
];

export const TIMELINE: TimelineEvent[] = [
  {
    year: "2024 - Present",
    role: "Real Estate Wholesaling & Lead Generation",
    company: "Self-Employed",
    description: "Managing a high-volume outbound calling and sales operation. Spearheading client acquisition, deal negotiation, and CRM data pipeline workflows.",
    highlights: [
      "Conduct high-volume outbound cold calls to property owners to identify and qualify motivated sellers.",
      "Build rapid, genuine rapport to uncover properties, qualifying leads and potential investment opportunities.",
      "Track and manage extensive pipelines, conversations, follow-ups, and lead status using CRM software.",
      "Negotiate preliminary deal terms while consistently maintaining a professional customer experience."
    ],
    type: 'pm'
  },
  {
    year: "2022 - Present",
    role: "Independent Software Development & AI Integration",
    company: "Freelance / Hobby Projects",
    description: "Designing and developing robust full-stack applications and expanding technical mastery in modern web, cloud, and AI frameworks as a PM and Full Stack Engineer.",
    highlights: [
      "Build custom full-stack platforms (e.g. Stat Diagnosis, Eco Shield Initiative, New Leaf Sobriety) using modern React, Django, and AWS.",
      "Integrate generative AI APIs and predictive models directly into applications to enable smart, tailored features.",
      "Maintain active, hands-on programming proficiency across JavaScript, TypeScript, Python, and C/C++."
    ],
    type: 'engineering'
  },
  {
    year: "2019 - 2022",
    role: "Technical Product Manager & Full Stack Engineer",
    company: "Pierce Computer Systems",
    description: "Coordinated secure, multi-year government applications as PM and Full Stack Engineer, and delivered frontend web development solutions for major restaurant brands.",
    highlights: [
      "Led 2.5 years of development on secure Government Sector Applications using Angular, Django, Docker, PostgreSQL, and Wagtail as PM and Full Stack Engineer.",
      "Served as Frontend Web Developer on enterprise-scale ordering platforms for Texas Roadhouse, Peet's Coffee, Bubba's 33, and Boston Market.",
      "Directly gathered compliance and client requirements, mapped technical backlogs, and managed live production checkouts."
    ],
    type: 'pm'
  },
  {
    year: "2010 - 2024",
    role: "Professional & Semi-Professional Athlete",
    company: "Various Teams (Hockey & Soccer)",
    description: "Competed in high-performance sports, cultivating high teamwork, rapid problem solving, and exceptional leadership under pressure.",
    highlights: [
      "Competed at elite professional levels in front of hundreds of thousands of accumulated fans, developing deep resilience under intense public scrutiny.",
      "Worked collaboratively with coaches, teammates, and organizational staff to achieve strategic tactical goals.",
      "Cultivated self-discipline, extreme accountability, and resilience to drive performance in stress-heavy situations.",
      "Served in leadership roles on the field and locker room, facilitating team cohesion and resolving conflicts."
    ],
    type: 'lead'
  },
  {
    year: "2022 - Present",
    role: "Additional Professional Experience",
    company: "Various Employers",
    description: "Held critical customer-facing support roles across healthcare, hospitality, and delivery environments.",
    highlights: [
      "Strengthened interpersonal communication, dispute resolution, and organization across highly fluid service fields.",
      "Coordinated logistics and structured schedules to ensure high client satisfaction in medical support and hospitality.",
      "Collaborated with diverse teams to manage peak traffic and streamline customer experience pipelines."
    ],
    type: 'lead'
  }
];

export const TECHNICAL_SKILLS = {
  languages: ["JavaScript", "TypeScript", "Python", "Java", "C/C++", "HTML", "CSS"],
  frontend: ["Angular", "Ionic", "React", "HTML5", "CSS3", "Tailwind CSS"],
  backend: ["Django", "Node.js", "Express", "Wagtail CMS", "REST APIs"],
  databases: ["PostgreSQL", "Firebase"],
  cloudTools: ["AWS (Amazon Web Services)", "Docker", "Git / GitHub", "Cloudflare", "ESRI (GIS Technologies)"],
  pmSkills: [
    "Technical Product Management",
    "AI Product Development",
    "Requirements Ingestion",
    "Timeline & Agile Sprint Planning",
    "Client Relationship Management",
    "Stakeholder Alignment",
    "Government Compliance (Wagtail / Django)",
    "Lead Qualification",
    "CRM Management",
    "Sales & Negotiation",
    "Remote Collaboration",
    "Team Leadership",
    "High-Volume Outreach"
  ]
};
