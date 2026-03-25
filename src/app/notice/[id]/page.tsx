import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getNoticeById } from "@/lib/repositories";

export default async function NoticeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const notice = await getNoticeById(Number(id));

  if (!notice) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 md:px-6">
      <SectionHeading
        eyebrow="Notice Detail"
        title={notice.title}
        description={new Date(notice.createdAt).toLocaleDateString("ko-KR")}
      />
      <Card className="rounded-[32px] border border-white/60 bg-white/70 p-8">
        <div className="whitespace-pre-wrap text-base leading-8 text-ink/82">{notice.content}</div>
      </Card>
    </main>
  );
}
