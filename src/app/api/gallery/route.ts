import { NextResponse } from "next/server";
import { createGalleryItem, listGalleryItems } from "@/lib/repositories";

export async function GET() {
  const gallery = await listGalleryItems();
  return NextResponse.json({ gallery });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.title?.trim() || !body.imageUrl?.trim()) {
    return NextResponse.json({ message: "제목과 미디어 URL을 모두 입력하세요." }, { status: 400 });
  }

  const item = await createGalleryItem({
    title: body.title.trim(),
    imageUrl: body.imageUrl.trim()
  });

  return NextResponse.json({ item }, { status: 201 });
}
