import { NextResponse } from "next/server";
import { createNotice, listNotices } from "@/lib/repositories";

export async function GET() {
  const notices = await listNotices();
  return NextResponse.json({ notices });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.title?.trim() || !body.content?.trim()) {
    return NextResponse.json({ message: "제목과 내용을 모두 입력하세요." }, { status: 400 });
  }

  const notice = await createNotice({
    title: body.title.trim(),
    content: body.content.trim()
  });

  return NextResponse.json({ notice }, { status: 201 });
}
