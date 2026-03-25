"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { GalleryItem, Notice, Registration, UploadResponse } from "@/types";

const emptyNotice = { title: "", content: "" };
const emptyGallery = { title: "", imageUrl: "" };

export function AdminDashboard() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [noticeForm, setNoticeForm] = useState(emptyNotice);
  const [galleryForm, setGalleryForm] = useState(emptyGallery);
  const [editingNoticeId, setEditingNoticeId] = useState<number | null>(null);
  const [editingGalleryId, setEditingGalleryId] = useState<number | null>(null);
  const [status, setStatus] = useState("불러오는 중입니다.");
  const [uploading, setUploading] = useState(false);

  async function loadData() {
    setStatus("불러오는 중입니다.");
    const [noticeResponse, galleryResponse, registrationResponse] = await Promise.all([
      fetch("/api/notices"),
      fetch("/api/gallery"),
      fetch("/api/registrations")
    ]);
    const noticeData = await noticeResponse.json();
    const galleryData = await galleryResponse.json();
    const registrationData = await registrationResponse.json();
    setNotices(noticeData.notices ?? []);
    setGallery(galleryData.gallery ?? []);
    setRegistrations(registrationData.registrations ?? []);
    setStatus("관리자 데이터를 불러왔습니다.");
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleNoticeSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch(editingNoticeId ? `/api/notices/${editingNoticeId}` : "/api/notices", {
      method: editingNoticeId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(noticeForm)
    });
    if (response.ok) {
      setNoticeForm(emptyNotice);
      setEditingNoticeId(null);
      await loadData();
    }
  }

  async function handleDeleteNotice(id: number) {
    const response = await fetch(`/api/notices/${id}`, { method: "DELETE" });
    if (response.ok) {
      await loadData();
    }
  }

  async function handleGallerySubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch(editingGalleryId ? `/api/gallery/${editingGalleryId}` : "/api/gallery", {
      method: editingGalleryId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(galleryForm)
    });
    if (response.ok) {
      setGalleryForm(emptyGallery);
      setEditingGalleryId(null);
      await loadData();
    }
  }

  async function handleDeleteGallery(id: number) {
    const response = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    if (response.ok) {
      await loadData();
    }
  }

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });
      const data = (await response.json()) as UploadResponse & { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "업로드에 실패했습니다.");
      }

      setGalleryForm((current) => ({ ...current, imageUrl: data.url }));
      setStatus("파일 업로드가 완료되었습니다.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "파일 업로드 중 오류가 발생했습니다.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-ink">공지사항 관리</h3>
            <p className="text-sm text-ink/70">{status}</p>
          </div>
        </div>
        <form className="grid gap-4" onSubmit={handleNoticeSubmit}>
          <input
            value={noticeForm.title}
            onChange={(event) => setNoticeForm((current) => ({ ...current, title: event.target.value }))}
            className="rounded-lg border border-primary/15 bg-parchment px-4 py-3 outline-none"
            placeholder="공지 제목"
            required
          />
          <textarea
            value={noticeForm.content}
            onChange={(event) => setNoticeForm((current) => ({ ...current, content: event.target.value }))}
            className="min-h-40 rounded-lg border border-primary/15 bg-parchment px-4 py-3 outline-none"
            placeholder="공지 내용을 입력하세요"
            required
          />
          <div className="flex justify-end">
            <Button type="submit">{editingNoticeId ? "공지 수정" : "공지 등록"}</Button>
          </div>
        </form>
        <div className="mt-6 space-y-3">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="flex flex-col gap-3 rounded-lg border border-primary/10 bg-parchment/60 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-primary">#{notice.id}</p>
                <p className="mt-1 text-sm font-semibold text-ink">{notice.title}</p>
                <p className="mt-1 line-clamp-2 text-xs text-ink/65">{notice.content}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setEditingNoticeId(notice.id);
                    setNoticeForm({ title: notice.title, content: notice.content });
                  }}
                >
                  수정
                </Button>
                <Button variant="primary" onClick={() => handleDeleteNotice(notice.id)}>
                  삭제
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="border-b border-primary/10 pb-5">
          <h3 className="text-2xl font-semibold text-ink">갤러리 업로드</h3>
          <p className="mt-2 text-sm text-ink/70">이미지 또는 영상 파일을 업로드하거나 외부 URL을 직접 입력할 수 있습니다.</p>
        </div>
        <form className="mt-6 grid gap-4" onSubmit={handleGallerySubmit}>
          <input
            value={galleryForm.title}
            onChange={(event) => setGalleryForm((current) => ({ ...current, title: event.target.value }))}
            className="rounded-lg border border-primary/15 bg-parchment px-4 py-3 outline-none"
            placeholder="갤러리 제목"
            required
          />
          <input
            value={galleryForm.imageUrl}
            onChange={(event) => setGalleryForm((current) => ({ ...current, imageUrl: event.target.value }))}
            className="rounded-lg border border-primary/15 bg-parchment px-4 py-3 outline-none"
            placeholder="업로드된 파일 URL 또는 외부 미디어 URL"
            required
          />
          <label className="rounded-3xl border border-dashed border-primary/30 bg-white/60 px-4 py-6 text-sm text-ink/70">
            <span className="mb-3 block font-medium text-ink">파일 업로드</span>
            <input type="file" accept="image/*,video/*" onChange={handleFileUpload} className="block w-full text-sm" />
            <span className="mt-3 block text-xs text-ink/55">
              {uploading ? "업로드 중입니다." : "Vercel에서는 영구 저장이 필요하면 S3로 교체하는 것이 안전합니다."}
            </span>
          </label>
          <div className="flex justify-end">
            <Button type="submit">{editingGalleryId ? "갤러리 수정" : "갤러리 등록"}</Button>
          </div>
        </form>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {gallery.map((item) => (
            <div key={item.id} className="rounded-3xl border border-primary/10 bg-parchment/60 p-4">
              <p className="text-sm font-semibold text-ink">{item.title}</p>
              <p className="mt-2 truncate text-xs text-ink/60">{item.imageUrl}</p>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setEditingGalleryId(item.id);
                    setGalleryForm({ title: item.title, imageUrl: item.imageUrl });
                  }}
                >
                  수정
                </Button>
                <Button variant="primary" onClick={() => handleDeleteGallery(item.id)}>
                  삭제
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="border-b border-primary/10 px-6 py-5">
          <h3 className="text-2xl font-semibold text-ink">참가 신청자 목록</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-parchment text-ink/70">
              <tr>
                <th className="px-6 py-4">이름</th>
                <th className="px-6 py-4">교회</th>
                <th className="px-6 py-4">전화번호</th>
                <th className="px-6 py-4">이메일</th>
                <th className="px-6 py-4">신청일</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((registration) => (
                <tr key={registration.id} className="border-t border-primary/10">
                  <td className="px-6 py-4">{registration.name}</td>
                  <td className="px-6 py-4">{registration.church}</td>
                  <td className="px-6 py-4">{registration.phone}</td>
                  <td className="px-6 py-4">{registration.email}</td>
                  <td className="px-6 py-4">{new Date(registration.createdAt).toLocaleDateString("ko-KR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
