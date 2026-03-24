import { NextResponse } from "next/server";
import { registerUser } from "@/lib/repositories";

export async function POST(request: Request) {
  const body = await request.json();
  const fields = ["name", "church", "email", "phone"] as const;

  for (const field of fields) {
    if (!body[field]?.trim()) {
      return NextResponse.json({ message: `${field} 값이 필요합니다.` }, { status: 400 });
    }
  }

  const user = await registerUser(body);
  return NextResponse.json({ user }, { status: 201 });
}

