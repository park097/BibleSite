import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <SectionHeading
        eyebrow="Admin"
        title="관리자 페이지"
        description="공지사항, 갤러리, 참가 신청 데이터를 한 곳에서 관리할 수 있습니다."
      />
      <AdminDashboard />
    </main>
  );
}
