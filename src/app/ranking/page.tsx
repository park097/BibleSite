import { RankingBoard } from "@/components/ranking/RankingBoard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function RankingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <SectionHeading
        eyebrow="Ranking"
        title="랭킹"
        description="점수 기준 순위표와 교회별 필터를 통해 참가 현황을 확인합니다."
      />
      <RankingBoard />
    </main>
  );
}

