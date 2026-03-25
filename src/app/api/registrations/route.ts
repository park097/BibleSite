import { NextResponse } from "next/server";
import { listRegistrations } from "@/lib/repositories";

export async function GET() {
  const registrations = await listRegistrations();
  return NextResponse.json({ registrations });
}
