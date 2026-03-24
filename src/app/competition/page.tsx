import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

const rules = [
  "시험은 5문항 기준이며 문항당 20점입니다.",
  "빈칸의 단어가 정확히 일치하면 정답 처리됩니다.",
  "띄어쓰기는 자동 보정되지만 맞춤법이 다른 경우 오답 처리됩니다.",
  "시험 제출 후 결과 페이지에서 정답 비교가 가능합니다.",
  "관리자는 제출 결과와 점수를 별도로 확인하고 수정할 수 있습니다."
];

export default function CompetitionPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <SectionHeading
        eyebrow="Competition Guide"
        title="대회 안내"
        description="행사 취지, 참가 방식, 평가 기준을 현대적인 카드 UI로 정리했습니다."
      />
      <div className="grid gap-6">
        <Card>
          <h3 className="text-2xl font-semibold text-primary">대회 상세 설명</h3>
          <p className="mt-4 text-sm leading-8 text-ink/80">
            성경 암송 대회는 참가자가 정해진 범위의 말씀을 반복해서 묵상하고, 빈칸 시험을 통해 정확히
            기억하고 있는지 확인하는 행사입니다. 웹사이트에서 접수, 시험, 결과 확인, 랭킹 조회까지
            한 번에 처리할 수 있으며, 교회 공동체 행사나 부서별 대회 운영에 맞게 확장할 수 있습니다.
          </p>
        </Card>
        <Card>
          <h3 className="text-2xl font-semibold text-primary">규칙 및 안내</h3>
          <div className="mt-4 space-y-3">
            {rules.map((rule) => (
              <div key={rule} className="rounded-lg bg-parchment p-4 text-sm leading-7 text-ink">
                {rule}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
