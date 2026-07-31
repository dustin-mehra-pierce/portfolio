export interface CaseStudy {
  id: string;
  productName: string;
  domain: string;
  challenge: string;
  roleAndTradeoffs: string;
  metricsAndOutcomes: {
    label: string;
    value: string;
    description: string;
  }[];
}

export interface PRDSection {
  title: string;
  content: string;
}

export interface Diagnosis {
  id: string;
  name: string;
  probability: number; // percentage
  criticality: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  redFlag: boolean;
  rationale: string;
  keyTriad: string;
  requiredNegativeFindings: string[]; // findings that, if present as negative, will exclude/reduce this diagnosis
}

export interface ClinicalCase {
  id: string;
  title: string;
  presentation: string;
  vitals: {
    temp: string;
    hr: string;
    bp: string;
    spo2: string;
  };
  diagnoses: Diagnosis[];
}

export interface TimelineEvent {
  year: string;
  role: string;
  company: string;
  description: string;
  highlights: string[];
  type: 'pm' | 'engineering' | 'lead';
}
