"use client";

import { AppShell } from "@/components/AppShell";
import { useRecords } from "@/data/RecordsProvider";

export default function GrowthPage() {
  const { records, currentStreak, monthlyCount } = useRecords();
  const recentThemes = Array.from(new Set(records.slice(0, 5).map((record) => record.theme)));
  const practiceCount = records.filter((record) => record.tomorrowAction || record.nextAction).length;
  const sharedCount = records.filter((record) => record.sharedToCommunity).length;

  return (
    <AppShell>
      <section className="space-y-5">
        <div>
          <p className="font-bold text-orange-700">🌳 成長</p>
          <h1 className="mt-1 text-3xl font-bold text-stone-950">小さな5分が、積み重なっています。</h1>
          <p className="mt-3 leading-7 text-stone-700">がんばりを採点する場所ではなく、続いている自分に気づくための場所です。</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Stat label="今月の記録数" value={`${monthlyCount}回`} />
          <Stat label="連続記録" value={`${currentStreak || 1}日`} />
          <Stat label="実践回数" value={`${practiceCount}回`} />
          <Stat label="シェアした回数" value={`${sharedCount}回`} />
          <div className="warm-panel rounded-lg p-5 sm:col-span-2">
            <p className="text-sm font-bold text-orange-700">最近のテーマ</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(recentThemes.length ? recentThemes : ["期待"]).map((theme) => (
                <span key={theme} className="rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-orange-800">
                  {theme}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="warm-panel rounded-lg p-5">
      <p className="text-sm font-bold text-orange-700">{label}</p>
      <p className="mt-2 text-4xl font-bold text-stone-950">{value}</p>
    </div>
  );
}
