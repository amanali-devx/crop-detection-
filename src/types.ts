export interface PredictionResult {
  id: string;
  isCropImage?: boolean;
  cropName: string;
  diseaseName: string;
  scientificName: string;
  isHealthy: boolean;
  confidence: number; // e.g. 96.8
  severity: 'Healthy' | 'Mild' | 'Moderate' | 'Severe';
  detectedAt: string;
  imageUrl: string;
  symptoms: string[];
  treatment: {
    organic: string[];
    chemical: string[];
    prevention: string[];
  };
  cropHealthScore: number; // 0-100
  spreadRisk: 'Low' | 'Medium' | 'High';
  rejectionReason?: string;
}

export interface SampleLeaf {
  id: string;
  crop: string;
  condition: string;
  type: 'Healthy' | 'Diseased';
  imageUrl: string;
  description: string;
  defaultResult: Omit<PredictionResult, 'id' | 'detectedAt' | 'imageUrl'>;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  metric?: string;
  metricLabel?: string;
}

export interface CropKnowledge {
  id: string;
  name: string;
  scientificName: string;
  tagline: string;
  imageUrl: string;
  commonDiseases: string[];
  symptoms: string[];
  preventionTips: string[];
  optimalConditions: {
    temp: string;
    soil: string;
    water: string;
  };
}

export interface TimelineStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  tag: string;
}

export interface ArchitectureNode {
  id: string;
  title: string;
  role: string;
  technology: string;
  description: string;
  iconName: string;
  latency?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  sihRole: string;
  avatar: string;
  initials: string;
  bio: string;
  githubUrl?: string;
  linkedinUrl?: string;
  skills: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'Farmer / Grower' | 'Agronomist / Scientist' | 'SIH Evaluator / Student';
  farmLocation?: string;
  primaryCrops?: string[];
  avatarUrl?: string;
  memberSince: string;
  savedScansCount?: number;
}

