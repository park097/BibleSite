import { NextResponse } from "next/server";
import { deleteNoticeById, getNoticeById, updateNoticeById } from "@/lib/repositories";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const notice = await getNoticeById(Number(id));

  if (!notice) {
    return NextResponse.json({ message: "공지를 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json({ notice });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();

  if (!body.title?.trim() || !body.content?.trim()) {
    return NextResponse.json({ message: "제목과 내용을 모두 입력하세요." }, { status: 400 });
  }

  const notice = await updateNoticeById(Number(id), {
    title: body.title.trim(),
    content: body.content.trim()
  });

  if (!notice) {
    return NextResponse.json({ message: "공지를 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json({ notice });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deleted = await deleteNoticeById(Number(id));

  if (!deleted) {
    return NextResponse.json({ message: "공지를 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
