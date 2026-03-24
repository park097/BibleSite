import { NextResponse } from "next/server";
import { getChurches, getRanking } from "@/lib/repositories";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const church = searchParams.get("church") ?? undefined;

  const [ranking, churches] = await Promise.all([getRanking(church), getChurches()]);

  return NextResponse.json({ ranking, churches });
}

