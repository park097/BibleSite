import { NextResponse } from "next/server";
import { listSubmissions } from "@/lib/repositories";

export async function GET() {
  const submissions = await listSubmissions();
  return NextResponse.json({ submissions });
}

