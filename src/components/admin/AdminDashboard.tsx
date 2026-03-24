"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type Question = {
  id: number;
  question: string;
  answer: string;
};

type SubmissionRow = {
  id: number;
  name: string;
  church: string;
  question: string;
  answer: string;
  correctAnswer: string;
  score: number;
};

const emptyQuestion = { question: "", answer: "" };

export function AdminDashboard() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [submissions, setSubmissions] = useState<SubmissionRow[]>([]);
  const [form, setForm] = useState(emptyQuestion);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [status, setStatus] = useState("불러오는 중입니다.");

  async function loadData() {
    setStatus("불러오는 중입니다.");
    const [questionResponse, submissionResponse] = await Promise.all([
      fetch("/api/questions"),
      fetch("/api/submissions")
    ]);
    const questionData = await questionResponse.json();
    const submissionData = await submissionResponse.json();
    setQuestions(questionData.questions ?? []);
    setSubmissions(submissionData.submissions ?? []);
    setStatus("관리자 데이터를 불러왔습니다.");
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleQuestionSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch(editingId ? `/api/questions/${editingId}` : "/api/questions", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (response.ok) {
      setForm(emptyQuestion);
      setEditingId(null);
      await loadData();
    }
  }

  async function handleDeleteQuestion(id: number) {
    const response = await fetch(`/api/questions/${id}`, { method: "DELETE" });
    if (response.ok) {
      await loadData();
    }
  }

  async function handleScoreUpdate(id: number, score: number) {
    const response = await fetch(`/api/submissions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score })
    });
    if (response.ok) {
      await loadData();
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-ink">문제 관리</h3>
            <p className="text-sm text-ink/70">{status}</p>
          </div>
        </div>
        <form className="grid gap-4 md:grid-cols-[1fr_220px_auto]" onSubmit={handleQuestionSubmit}>
          <input
            value={form.question}
            onChange={(event) => setForm((current) => ({ ...current, question: event.target.value }))}
            className="rounded-lg border border-primary/15 bg-parchment px-4 py-3 outline-none"
            placeholder="문제 문장을 입력하세요"
            required
          />
          <input
            value={form.answer}
            onChange={(event) => setForm((current) => ({ ...current, answer: event.target.value }))}
            className="rounded-lg border border-primary/15 bg-parchment px-4 py-3 outline-none"
            placeholder="정답"
            required
          />
          <Button type="submit">{editingId ? "문제 수정" : "문제 등록"}</Button>
        </form>
        <div className="mt-6 space-y-3">
          {questions.map((question) => (
            <div
              key={question.id}
              className="flex flex-col gap-3 rounded-lg border border-primary/10 bg-parchment/60 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-primary">#{question.id}</p>
                <p className="mt-1 text-sm text-ink">{question.question}</p>
                <p className="mt-1 text-xs text-ink/65">정답: {question.answer}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setEditingId(question.id);
                    setForm({ question: question.question, answer: question.answer });
                  }}
                >
                  수정
                </Button>
                <Button variant="primary" onClick={() => handleDeleteQuestion(question.id)}>
                  삭제
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="border-b border-primary/10 px-6 py-5">
          <h3 className="text-2xl font-semibold text-ink">제출 결과 및 점수 수정</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-parchment text-ink/70">
              <tr>
                <th className="px-6 py-4">참가자</th>
                <th className="px-6 py-4">문제</th>
                <th className="px-6 py-4">답안</th>
                <th className="px-6 py-4">정답</th>
                <th className="px-6 py-4">점수</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id} className="border-t border-primary/10">
                  <td className="px-6 py-4">
                    {submission.name}
                    <p className="text-xs text-ink/55">{submission.church}</p>
                  </td>
                  <td className="px-6 py-4">{submission.question}</td>
                  <td className="px-6 py-4">{submission.answer}</td>
                  <td className="px-6 py-4">{submission.correctAnswer}</td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      defaultValue={submission.score}
                      className="w-24 rounded-lg border border-primary/15 bg-parchment px-3 py-2"
                      onBlur={(event) => handleScoreUpdate(submission.id, Number(event.target.value))}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
