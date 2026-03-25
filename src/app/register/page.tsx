import { RegisterForm } from "@/components/forms/RegisterForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function RegisterPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <SectionHeading
        eyebrow="Registration"
        title="참가 신청"
        description="이름, 교회, 연락처, 이메일을 입력하면 참가 신청 정보가 저장됩니다."
      />
      <RegisterForm />
    </main>
  );
}
