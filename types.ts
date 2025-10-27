
export interface UserInput {
  question: string;
  discipline: string;
  studentAnswer: string;
}

export interface QuestionBreakdown {
  commandVerb: string;
  rephrasedQuestion: string;
  answerRequirement: string;
}

export interface AnswerPlan {
  introduction: string;
  bodyPoints: string[];
  conclusion: string;
}

export interface MentorResponse {
  questionBreakdown: QuestionBreakdown;
  answerPlan: AnswerPlan;
  modelAnswer: string;
  constructiveFeedback: string | null;
  selfEvaluationChecklist: { point: string }[];
}

export enum Discipline {
  BUSINESS = "Business / Management",
  HUMANITIES = "Humanities / Social Science",
  STEM = "STEM",
  LAW = "Law",
  GENERAL = "General / Other"
}
