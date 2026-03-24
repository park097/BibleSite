"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type ResultState = {
  user: { name: string; church: string };
  totalScore: number;
  correctCount: number;
  wrongCount: number;
  details: Array<{
    submissionId: number;
    questionId: number;
    question: string;
    correctAnswer: string;
    userAnswer: string;
    score: number;
  }>;
};

export function ResultClient() {
  const [result, setResult] = useState<ResultState | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("test-result");
    if (stored) {
      setResult(JSON.parse(stored));
    }
  }, []);

  if (!result) {
    return (
      <Card className="text-center">
        <p className="mb-4 text-ink/75">시험 결과가 없습니다. 시험 페이지에서 먼저 제출하세요.</p>
        <Button href="/test">시험 페이지로 이동</Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-primary to-[#5d3e27] text-white">
        <p className="text-sm uppercase tracking-[0.3em] text-white/70">Test Result</p>
        <h2 className="mt-3 text-4xl font-semibold">{result.totalScore}점</h2>
        <p className="mt-2 text-white/80">
          {result.user.name} · {result.user.church}
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-white/10 p-4">
            <p className="text-sm text-white/70">맞은 문제</p>
            <p className="mt-2 text-2xl font-semibold">{result.correctCount}개</p>
          </div>
          <div className="rounded-lg bg-white/10 p-4">
            <p className="text-sm text-white/70">틀린 문제</p>
            <p className="mt-2 text-2xl font-semibold">{result.wrongCount}개</p>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {result.details.map((item, index) => (
          <Card key={item.submissionId}>
            <p className="text-sm font-semibold text-secondary">문제 {index + 1}</p>
            <p className="mt-2 text-base leading-7 text-ink">{item.question}</p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-lg bg-parchment p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-ink/50">내 답안</p>
                <p className="mt-2 text-sm text-ink">{item.userAnswer || "-"}</p>
              </div>
              <div className="rounded-lg bg-parchment p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-ink/50">정답</p>
                <p className="mt-2 text-sm text-ink">{item.correctAnswer}</p>
              </div>
              <div className="rounded-lg bg-parchment p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-ink/50">점수</p>
                <p className="mt-2 text-sm text-ink">{item.score}점</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button href="/test">다시하기</Button>
        <Button href="/" variant="secondary">
          홈으로
        </Button>
      </div>
    </div>
  );
}
