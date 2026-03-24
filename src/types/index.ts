export type User = {
  id: number;
  name: string;
  church: string;
  email: string;
  phone: string;
  createdAt: string;
};

export type Question = {
  id: number;
  question: string;
  answer: string;
  createdAt: string;
};

export type Submission = {
  id: number;
  userId: number;
  questionId: number;
  answer: string;
  score: number;
  createdAt: string;
};

export type RankingRow = {
  userId: number;
  name: string;
  church: string;
  totalScore: number;
};

export type SubmissionDetail = {
  submissionId: number;
  questionId: number;
  question: string;
  correctAnswer: string;
  userAnswer: string;
  score: number;
};

export type TestSubmissionPayload = {
  name: string;
  church: string;
  email: string;
  phone: string;
  answers: Array<{
    questionId: number;
    answer: string;
  }>;
};

