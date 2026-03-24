import { ResultClient } from "@/components/test/ResultClient";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function ResultPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <SectionHeading eyebrow="Result" title="시험 결과" description="총점, 정오답, 정답 비교를 한 화면에서 확인할 수 있습니다." />
      <ResultClient />
    </main>
  );
}

