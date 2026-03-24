import { NextResponse } from "next/server";
import { createQuestion, listQuestions } from "@/lib/repositories";

export async function GET() {
  const questions = await listQuestions();
  return NextResponse.json({ questions });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.question?.trim() || !body.answer?.trim()) {
    return NextResponse.json({ message: "문제와 정답을 모두 입력하세요." }, { status: 400 });
  }

  const question = await createQuestion({
    question: body.question,
    answer: body.answer
  });

  return NextResponse.json({ question }, { status: 201 });
}

