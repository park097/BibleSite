import { RegisterForm } from "@/components/forms/RegisterForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function RegisterPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <SectionHeading
        eyebrow="Registration"
        title="참가 신청"
        description="참가자 정보를 입력하면 DB에 저장되며, 이후 시험과 랭킹에 연결됩니다."
      />
      <RegisterForm />
    </main>
  );
}

