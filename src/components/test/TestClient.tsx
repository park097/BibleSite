"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Question } from "@/types";

type Participant = {
  name: string;
  church: string;
  email: string;
  phone: string;
};

const initialParticipant: Participant = {
  name: "",
  church: "",
  email: "",
  phone: ""
};

export function TestClient() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [participant, setParticipant] = useState<Participant>(initialParticipant);
  const [status, setStatus] = useState<"loading" | "ready" | "submitting" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadQuestions() {
      try {
        const response = await fetch("/api/questions");
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message ?? "문제를 불러오지 못했습니다.");
        }
        setQuestions(data.questions);
        setStatus("ready");
      } catch (error) {
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "문제를 불러오지 못했습니다.");
      }
    }

    loadQuestions();
  }, []);

  const currentQuestion = questions[currentIndex];

  async function handleSubmit() {
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/test/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...participant,
          answers: questions.map((question) => ({
            questionId: question.id,
            answer: answers[question.id] ?? ""
          }))
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message ?? "시험 제출에 실패했습니다.");
      }
      sessionStorage.setItem("test-result", JSON.stringify(data));
      router.push("/result");
    } catch (error) {
      setStatus("ready");
      setMessage(error instanceof Error ? error.message : "시험 제출에 실패했습니다.");
    }
  }

  if (status === "loading") {
    return <Card>문제를 불러오는 중입니다.</Card>;
  }

  if (status === "error") {
    return <Card>{message}</Card>;
  }

  if (!currentQuestion) {
    return <Card>등록된 문제가 없습니다. 관리자 페이지에서 문제를 추가하세요.</Card>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { key: "name", label: "이름", type: "text" },
            { key: "church", label: "교회", type: "text" },
            { key: "email", label: "이메일", type: "email" },
            { key: "phone", label: "전화번호", type: "tel" }
          ].map((field) => (
            <label key={field.key} className="space-y-2 text-sm font-medium text-ink">
              <span>{field.label}</span>
              <input
                required
                type={field.type}
                value={participant[field.key as keyof Participant]}
                onChange={(event) =>
                  setParticipant((current) => ({
                    ...current,
                    [field.key]: event.target.value
                  }))
                }
                className="w-full rounded-lg border border-primary/15 bg-parchment px-4 py-3 outline-none transition focus:border-secondary"
              />
            </label>
          ))}
        </div>
      </Card>

      <Card className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-secondary">
            문제 {currentIndex + 1}/{questions.length}
          </p>
          <div className="h-2 w-40 rounded-lg bg-primary/10">
            <div
              className="h-2 rounded-lg bg-secondary transition-all"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="rounded-lg bg-parchment p-6">
          <p className="text-lg leading-8 text-ink">{currentQuestion.question}</p>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-ink">정답 입력</span>
          <input
            value={answers[currentQuestion.id] ?? ""}
            onChange={(event) =>
              setAnswers((current) => ({
                ...current,
                [currentQuestion.id]: event.target.value
              }))
            }
            className="w-full rounded-lg border border-primary/15 bg-white px-4 py-3 outline-none transition focus:border-secondary"
            placeholder="빈칸에 들어갈 말씀을 입력하세요"
          />
        </label>

        <div className="flex flex-wrap justify-between gap-3">
          <Button
            variant="secondary"
            onClick={() => setCurrentIndex((index) => Math.max(index - 1, 0))}
            disabled={currentIndex === 0 || status === "submitting"}
          >
            이전
          </Button>
          <div className="flex gap-3">
            {currentIndex < questions.length - 1 ? (
              <Button
                onClick={() => setCurrentIndex((index) => Math.min(index + 1, questions.length - 1))}
                disabled={status === "submitting"}
              >
                다음
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={
                  status === "submitting" ||
                  !participant.name ||
                  !participant.church ||
                  !participant.email ||
                  !participant.phone
                }
              >
                제출
              </Button>
            )}
          </div>
        </div>

        {message ? <p className="text-sm text-red-700">{message}</p> : null}
      </Card>
    </div>
  );
}
