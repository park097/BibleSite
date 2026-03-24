"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";

type RankingRow = {
  userId: number;
  name: string;
  church: string;
  totalScore: number;
};

export function RankingBoard() {
  const [rows, setRows] = useState<RankingRow[]>([]);
  const [churches, setChurches] = useState<string[]>([]);
  const [church, setChurch] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    async function loadData() {
      try {
        setStatus("loading");
        const query = church ? `?church=${encodeURIComponent(church)}` : "";
        const response = await fetch(`/api/ranking${query}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message ?? "랭킹을 불러오지 못했습니다.");
        }
        setRows(data.ranking);
        setChurches(data.churches);
        setStatus("ready");
      } catch {
        setStatus("error");
      }
    }

    loadData();
  }, [church]);

  if (status === "error") {
    return <Card>랭킹 데이터를 불러오지 못했습니다.</Card>;
  }

  return (
    <Card className="overflow-hidden p-0">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary/10 px-6 py-5">
        <div>
          <h3 className="text-2xl font-semibold text-ink">순위표</h3>
          <p className="text-sm text-ink/70">점수 기준으로 자동 정렬됩니다.</p>
        </div>
        <select
          value={church}
          onChange={(event) => setChurch(event.target.value)}
          className="rounded-lg border border-primary/15 bg-parchment px-4 py-2 text-sm outline-none"
        >
          <option value="">전체 교회</option>
          {churches.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-parchment/80 text-ink/70">
            <tr>
              <th className="px-6 py-4">순위</th>
              <th className="px-6 py-4">이름</th>
              <th className="px-6 py-4">교회</th>
              <th className="px-6 py-4">점수</th>
            </tr>
          </thead>
          <tbody>
            {status === "loading" ? (
              <tr>
                <td className="px-6 py-5" colSpan={4}>
                  랭킹을 불러오는 중입니다.
                </td>
              </tr>
            ) : rows.length ? (
              rows.map((row, index) => (
                <tr key={row.userId} className="border-t border-primary/10">
                  <td className="px-6 py-4 font-semibold text-primary">{index + 1}</td>
                  <td className="px-6 py-4">{row.name}</td>
                  <td className="px-6 py-4">{row.church}</td>
                  <td className="px-6 py-4 font-semibold">{row.totalScore}점</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-5" colSpan={4}>
                  표시할 랭킹 데이터가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
