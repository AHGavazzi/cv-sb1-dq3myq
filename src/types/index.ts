export interface MatchResult {
  filename: string;
  score: number;
  emoji: string;
  label: string;
  matchReasons: string[];
  website?: string;
  redFlags: {
    '🚩': string[];
    '📍': string[];
    '⛳': string[];
  };
  aiAnalysis?: {
    interviewer: {
      questions: string[];
      recommendations: string[];
    };
    careerCounselor: {
      careerPaths: string[];
      skillGaps: string[];
      recommendations: string[];
    };
    recruiter: {
      cvImprovements: string[];
      potentialRoles: string[];
      marketInsights: string[];
    };
  };
}