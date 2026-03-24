import { NextResponse } from "next/server";
import { deleteQuestionById, updateQuestionById } from "@/lib/repositories";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const question = await updateQuestionById(Number(id), {
    question: body.question,
    answer: body.answer
  });

  if (!question) {
    return NextResponse.json({ message: "문제를 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json({ question });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deleted = await deleteQuestionById(Number(id));

  if (!deleted) {
    return NextResponse.json({ message: "문제를 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
