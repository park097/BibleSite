import { sampleQuestions } from "@/lib/data";
import { getDbPool } from "@/lib/db";
import type {
  Question,
  RankingRow,
  Submission,
  SubmissionDetail,
  TestSubmissionPayload,
  User
} from "@/types";

type RegisterInput = Omit<User, "id" | "createdAt">;

let memoryUsers: User[] = [
  {
    id: 1,
    name: "홍길동",
    church: "샘물교회",
    email: "sample@example.com",
    phone: "010-0000-0000",
    createdAt: new Date().toISOString()
  }
];

let memoryQuestions: Question[] = [...sampleQuestions];
let memorySubmissions: Submission[] = [
  {
    id: 1,
    userId: 1,
    questionId: 1,
    answer: "부족함",
    score: 20,
    createdAt: new Date().toISOString()
  }
];

function normalizeText(value: string) {
  return value.replace(/\s+/g, "").trim().toLowerCase();
}

function scoreAnswer(answer: string, correctAnswer: string) {
  return normalizeText(answer) === normalizeText(correctAnswer) ? 20 : 0;
}

export async function listQuestions() {
  const pool = getDbPool();

  if (!pool) {
    return [...memoryQuestions];
  }

  const result = await pool.query(
    "SELECT id, question, answer, created_at FROM questions ORDER BY id ASC"
  );

  return result.rows.map((row) => ({
    id: row.id,
    question: row.question,
    answer: row.answer,
    createdAt: row.created_at.toISOString()
  })) as Question[];
}

export async function createQuestion(input: { question: string; answer: string }) {
  const pool = getDbPool();

  if (!pool) {
    const question: Question = {
      id: memoryQuestions.length ? Math.max(...memoryQuestions.map((item) => item.id)) + 1 : 1,
      question: input.question,
      answer: input.answer,
      createdAt: new Date().toISOString()
    };
    memoryQuestions.push(question);
    return question;
  }

  const result = await pool.query(
    "INSERT INTO questions (question, answer) VALUES ($1, $2) RETURNING id, question, answer, created_at",
    [input.question, input.answer]
  );
  const row = result.rows[0];

  return {
    id: row.id,
    question: row.question,
    answer: row.answer,
    createdAt: row.created_at.toISOString()
  } as Question;
}

export async function updateQuestionById(
  id: number,
  input: { question: string; answer: string }
) {
  const pool = getDbPool();

  if (!pool) {
    memoryQuestions = memoryQuestions.map((item) =>
      item.id === id ? { ...item, question: input.question, answer: input.answer } : item
    );
    return memoryQuestions.find((item) => item.id === id) ?? null;
  }

  const result = await pool.query(
    "UPDATE questions SET question = $1, answer = $2 WHERE id = $3 RETURNING id, question, answer, created_at",
    [input.question, input.answer, id]
  );

  if (!result.rowCount) {
    return null;
  }

  const row = result.rows[0];
  return {
    id: row.id,
    question: row.question,
    answer: row.answer,
    createdAt: row.created_at.toISOString()
  } as Question;
}

export async function deleteQuestionById(id: number) {
  const pool = getDbPool();

  if (!pool) {
    const before = memoryQuestions.length;
    memoryQuestions = memoryQuestions.filter((item) => item.id !== id);
    memorySubmissions = memorySubmissions.filter((item) => item.questionId !== id);
    return before !== memoryQuestions.length;
  }

  const result = await pool.query("DELETE FROM questions WHERE id = $1", [id]);
  return Boolean(result.rowCount);
}

export async function registerUser(input: RegisterInput) {
  const pool = getDbPool();

  if (!pool) {
    const existing = memoryUsers.find((item) => item.email === input.email);
    if (existing) {
      return existing;
    }
    const user: User = {
      id: memoryUsers.length ? Math.max(...memoryUsers.map((item) => item.id)) + 1 : 1,
      ...input,
      createdAt: new Date().toISOString()
    };
    memoryUsers.push(user);
    return user;
  }

  const existing = await pool.query(
    "SELECT id, name, church, email, phone, created_at FROM users WHERE email = $1",
    [input.email]
  );

  if (existing.rowCount) {
    const row = existing.rows[0];
    return {
      id: row.id,
      name: row.name,
      church: row.church,
      email: row.email,
      phone: row.phone,
      createdAt: row.created_at.toISOString()
    } as User;
  }

  const result = await pool.query(
    "INSERT INTO users (name, church, email, phone) VALUES ($1, $2, $3, $4) RETURNING id, name, church, email, phone, created_at",
    [input.name, input.church, input.email, input.phone]
  );
  const row = result.rows[0];

  return {
    id: row.id,
    name: row.name,
    church: row.church,
    email: row.email,
    phone: row.phone,
    createdAt: row.created_at.toISOString()
  } as User;
}

export async function submitTest(payload: TestSubmissionPayload) {
  const user = await registerUser({
    name: payload.name,
    church: payload.church,
    email: payload.email,
    phone: payload.phone
  });

  const questions = await listQuestions();
  const byId = new Map(questions.map((question) => [question.id, question]));
  const pool = getDbPool();
  const details: SubmissionDetail[] = [];

  for (const item of payload.answers) {
    const question = byId.get(item.questionId);
    if (!question) {
      continue;
    }

    const score = scoreAnswer(item.answer, question.answer);

    if (!pool) {
      const submission: Submission = {
        id: memorySubmissions.length ? Math.max(...memorySubmissions.map((entry) => entry.id)) + 1 : 1,
        userId: user.id,
        questionId: item.questionId,
        answer: item.answer,
        score,
        createdAt: new Date().toISOString()
      };
      memorySubmissions.push(submission);
      details.push({
        submissionId: submission.id,
        questionId: question.id,
        question: question.question,
        correctAnswer: question.answer,
        userAnswer: item.answer,
        score
      });
      continue;
    }

    const result = await pool.query(
      "INSERT INTO submissions (user_id, question_id, answer, score) VALUES ($1, $2, $3, $4) RETURNING id",
      [user.id, item.questionId, item.answer, score]
    );
    details.push({
      submissionId: result.rows[0].id,
      questionId: question.id,
      question: question.question,
      correctAnswer: question.answer,
      userAnswer: item.answer,
      score
    });
  }

  const totalScore = details.reduce((sum, item) => sum + item.score, 0);

  return {
    user,
    totalScore,
    correctCount: details.filter((item) => item.score > 0).length,
    wrongCount: details.filter((item) => item.score === 0).length,
    details
  };
}

export async function listSubmissions() {
  const pool = getDbPool();

  if (!pool) {
    return memorySubmissions.map((submission) => {
      const user = memoryUsers.find((item) => item.id === submission.userId);
      const question = memoryQuestions.find((item) => item.id === submission.questionId);
      return {
        ...submission,
        name: user?.name ?? "알 수 없음",
        church: user?.church ?? "-",
        question: question?.question ?? "",
        correctAnswer: question?.answer ?? ""
      };
    });
  }

  const result = await pool.query("SELECT submissions.id, submissions.user_id, submissions.question_id, submissions.answer, submissions.score, submissions.created_at, users.name, users.church, questions.question, questions.answer AS correct_answer FROM submissions JOIN users ON users.id = submissions.user_id JOIN questions ON questions.id = submissions.question_id ORDER BY submissions.created_at DESC");

  return result.rows.map((row) => ({
    id: row.id,
    userId: row.user_id,
    questionId: row.question_id,
    answer: row.answer,
    score: row.score,
    createdAt: row.created_at.toISOString(),
    name: row.name,
    church: row.church,
    question: row.question,
    correctAnswer: row.correct_answer
  }));
}

export async function updateSubmissionScore(id: number, score: number) {
  const pool = getDbPool();

  if (!pool) {
    memorySubmissions = memorySubmissions.map((item) => (item.id === id ? { ...item, score } : item));
    return memorySubmissions.find((item) => item.id === id) ?? null;
  }

  const result = await pool.query(
    "UPDATE submissions SET score = $1 WHERE id = $2 RETURNING id, user_id, question_id, answer, score, created_at",
    [score, id]
  );

  if (!result.rowCount) {
    return null;
  }

  const row = result.rows[0];
  return {
    id: row.id,
    userId: row.user_id,
    questionId: row.question_id,
    answer: row.answer,
    score: row.score,
    createdAt: row.created_at.toISOString()
  } as Submission;
}

export async function getRanking(church?: string) {
  const pool = getDbPool();

  if (!pool) {
    const rankingMap = new Map<number, RankingRow>();

    for (const submission of memorySubmissions) {
      const user = memoryUsers.find((item) => item.id === submission.userId);
      if (!user) {
        continue;
      }
      if (church && user.church !== church) {
        continue;
      }

      const current = rankingMap.get(user.id) ?? {
        userId: user.id,
        name: user.name,
        church: user.church,
        totalScore: 0
      };
      current.totalScore += submission.score;
      rankingMap.set(user.id, current);
    }

    return [...rankingMap.values()].sort((a, b) => b.totalScore - a.totalScore);
  }

  const params = church ? [church] : [];
  const filter = church ? "WHERE users.church = $1" : "";
  const result = await pool.query(
    `
      SELECT
        users.id AS user_id,
        users.name,
        users.church,
        COALESCE(SUM(submissions.score), 0) AS total_score
      FROM users
      LEFT JOIN submissions ON submissions.user_id = users.id
      ${filter}
      GROUP BY users.id, users.name, users.church
      ORDER BY total_score DESC, users.name ASC
    `,
    params
  );

  return result.rows.map((row) => ({
    userId: row.user_id,
    name: row.name,
    church: row.church,
    totalScore: Number(row.total_score)
  })) as RankingRow[];
}

export async function getChurches() {
  const pool = getDbPool();

  if (!pool) {
    return [...new Set(memoryUsers.map((item) => item.church))];
  }

  const result = await pool.query("SELECT DISTINCT church FROM users ORDER BY church ASC");
  return result.rows.map((row) => row.church as string);
}

