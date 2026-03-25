import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { guideSections } from "@/lib/data";

export default function CompetitionPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <SectionHeading
        eyebrow="Competition Guide"
        title="대회 안내"
        description="시험 일정, 진행 방식, 준비물과 유의사항을 안내합니다."
      />
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <h3 className="text-2xl font-semibold text-primary">시험 일정</h3>
          <div className="mt-4 space-y-3 text-sm leading-7 text-ink/80">
            <p>접수 기간: 2026년 5월 1일 ~ 2026년 5월 14일</p>
            <p>예선 진행: 2026년 5월 18일 ~ 2026년 5월 20일</p>
            <p>본선 및 시상: 2026년 5월 24일 / 2026년 5월 31일</p>
            <p>장소: 샘물교회 본당 및 교육관</p>
          </div>
        </Card>
        <Card>
          <h3 className="text-2xl font-semibold text-primary">시험 방식</h3>
          <div className="mt-4 space-y-3">
            {guideSections.examFormat.map((rule) => (
              <div key={rule} className="rounded-lg bg-parchment p-4 text-sm leading-7 text-ink">
                {rule}
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="text-2xl font-semibold text-primary">준비물</h3>
          <div className="mt-4 space-y-3">
            {guideSections.materials.map((item) => (
              <div key={item} className="rounded-lg bg-parchment p-4 text-sm leading-7 text-ink">
                {item}
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="text-2xl font-semibold text-primary">유의사항</h3>
          <div className="mt-4 space-y-3">
            {guideSections.cautions.map((item) => (
              <div key={item} className="rounded-lg bg-parchment p-4 text-sm leading-7 text-ink">
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
