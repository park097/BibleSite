import { TestClient } from "@/components/test/TestClient";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function TestPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <SectionHeading
        eyebrow="Memorization Test"
        title="암송 시험"
        description="빈칸에 들어갈 말씀을 입력하고 마지막 문항에서 제출하면 자동으로 점수가 계산됩니다."
      />
      <TestClient />
    </main>
  );
}

