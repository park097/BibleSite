import { NextResponse } from "next/server";
import { updateSubmissionScore } from "@/lib/repositories";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const score = Number(body.score);

  if (Number.isNaN(score)) {
    return NextResponse.json({ message: "유효한 점수를 입력하세요." }, { status: 400 });
  }

  const submission = await updateSubmissionScore(Number(id), score);

  if (!submission) {
    return NextResponse.json({ message: "제출 결과를 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json({ submission });
}
