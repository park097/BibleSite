import { NextResponse } from "next/server";
import { submitTest } from "@/lib/repositories";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.name?.trim() || !body.church?.trim() || !body.email?.trim() || !body.phone?.trim()) {
    return NextResponse.json({ message: "참가자 정보를 모두 입력하세요." }, { status: 400 });
  }

  if (!Array.isArray(body.answers) || !body.answers.length) {
    return NextResponse.json({ message: "제출할 답안이 없습니다." }, { status: 400 });
  }

  const result = await submitTest(body);
  return NextResponse.json(result, { status: 201 });
}

