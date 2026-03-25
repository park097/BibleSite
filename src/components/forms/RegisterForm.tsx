"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const initialState = {
  name: "",
  church: "",
  email: "",
  phone: ""
};

export function RegisterForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "참가 신청에 실패했습니다.");
      }

      setStatus("success");
      setMessage("참가 신청이 완료되었습니다. 행사 전 안내 문자를 보내드릴 예정입니다.");
      setForm(initialState);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.");
    }
  }

  return (
    <Card className="mx-auto max-w-2xl">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
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
                value={form[field.key as keyof typeof form]}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    [field.key]: event.target.value
                  }))
                }
                className="w-full rounded-lg border border-primary/15 bg-parchment px-4 py-3 outline-none transition focus:border-secondary"
              />
            </label>
          ))}
        </div>
        <div className="rounded-3xl border border-primary/15 bg-white/50 p-4 text-sm leading-7 text-ink/75">
          신청 정보는 참가자 확인과 행사 안내를 위해 저장됩니다. DB 연결 전에는 메모리 저장으로 동작하므로
          서버 재시작 시 데이터가 유지되지 않을 수 있습니다.
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-ink/70">
            {status === "loading" ? "신청 정보를 저장하는 중입니다." : message}
          </p>
          <Button type="submit" disabled={status === "loading"}>
            참가 신청
          </Button>
        </div>
      </form>
    </Card>
  );
}
