import { NextResponse } from "next/server";
import { deleteGalleryItemById, listGalleryItems, updateGalleryItemById } from "@/lib/repositories";

export async function GET() {
  const gallery = await listGalleryItems();
  return NextResponse.json({ gallery });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();

  if (!body.title?.trim() || !body.imageUrl?.trim()) {
    return NextResponse.json({ message: "제목과 미디어 URL을 모두 입력하세요." }, { status: 400 });
  }

  const item = await updateGalleryItemById(Number(id), {
    title: body.title.trim(),
    imageUrl: body.imageUrl.trim()
  });

  if (!item) {
    return NextResponse.json({ message: "갤러리 항목을 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json({ item });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deleted = await deleteGalleryItemById(Number(id));

  if (!deleted) {
    return NextResponse.json({ message: "갤러리 항목을 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
