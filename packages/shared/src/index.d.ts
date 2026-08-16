export interface AllegoricalSymbol {
  title: string;
  desc: string;
}

export interface CaseStudy {
  id?: string;
  domain: string;
  title: string;
  claim: string;
  deconstruction: string;
  correction: string;
}

export interface Fallacy {
  id: string;
  slug?: string;
  name: string;
  subtitle: string;
  category: string;
  color: string;
  description: string;
  viral_example: string;
  reflection_prompt: string;
  metacognition_prompt?: string;
  psychology: string;
  sift_strategy: string;
  mil_competency: string;
  allegorical_symbols?: AllegoricalSymbol[];
  case_studies?: CaseStudy[];
}

export interface QuizScenarioOption {
  id: string;
  text?: string;
  name?: string;
  isCorrect?: boolean;
}

export interface QuizScenario {
  id: string;
  headline: string;
  scenario?: string;
  platform?: string;
  context: string;
  options: QuizScenarioOption[];
  correct_fallacy_id: string;
  correctFallacyId?: string;
  correct_fallacy_name?: string;
  explanation?: string;
  sift_reflection?: string;
  sift_recommendation?: string;
  sift_tip?: string;
}

export interface DetectedFallacyMatch {
  id: string;
  name: string;
  confidence: number;
  snippet?: string;
  explanation: string;
}

export interface HeuristicScanResult {
  score: number;
  flags: string[];
  sensationalismIndex: number;
  detectedFallacies: DetectedFallacyMatch[];
}

export interface PublisherDossier {
  name: string;
  bias: string;
  reliability: string;
  notes: string;
}

export interface LateralLink {
  label: string;
  url: string;
}

export declare const fallacies: Fallacy[];
export declare const scenarios: QuizScenario[];
export declare const FALLACY_ILLUSTRATIONS: Record<string, string>;

export declare function idToSlug(id: string): string;
export declare function slugToId(slug: string): string;
export declare function getFallacyBySlug(slug: string): Fallacy | undefined;

export declare function scanText(text: string): DetectedFallacyMatch[];
export declare function calculateSensationalismIndex(text: string, matches?: DetectedFallacyMatch[]): number;
export declare function lookupPublisher(domain: string): PublisherDossier | null;
export declare function buildLateralLinks(quote: string, domain?: string): { factCheckUrl: string; lateralGoogleUrl: string; domainInvestigateUrl: string };
