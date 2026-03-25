import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "업로드할 파일이 필요합니다." }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const extension = path.extname(file.name) || ".bin";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${extension}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");

  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, safeName), buffer);

  return NextResponse.json({ url: `/uploads/${safeName}` });
}
