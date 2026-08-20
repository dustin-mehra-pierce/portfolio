export interface PersonalInfo {
  name: string;
  location: string;
  email: string;
  linkedin: string;
}

export interface ProcessStep {
  label: string;
  detail: string;
}

export interface ResultMetric {
  value: string;
  description: string;
}

export interface FeaturedCaseStudy {
  productName: string;
  tagline: string;
  projectUrl: string;
  stage: string;
  stageNote: string;
  role: string;
  timeframe: string;
  techStack: string[];
  problem: string;
  process: ProcessStep[];
  results: ResultMetric[];
  indexingNote: string;
}

export interface PMProject {
  id: string;
  name: string;
  role: string;
  blurb: string;
  projectUrl: string;
  techStack: string[];
}

