"use client";

import { AppShell } from "@/components/AppShell";
import { ButtonLink } from "@/components/ButtonLink";
import { RecordCard } from "@/components/RecordCard";
import { useRecords } from "@/data/RecordsProvider";

export default function RecordsPage() {
  const { records } = useRecords();

  return (
    <AppShell>
      <div className="mb-6">
        <p className="font-bold text-orange-700">記録一覧</p>
        <h1 className="mt-1 text-3xl font-bold text-stone-950">過去の5分振り返り</h1>
        <p className="mt-3 leading-7 text-stone-700">日々の小さな気づきと、クロードへの相談・シェアの状況を見返せます。</p>
      </div>

      {records.length ? (
        <div className="grid gap-4">
          {records.map((record) => (
            <RecordCard key={record.id} record={record} />
          ))}
        </div>
      ) : (
        <div className="warm-panel rounded-lg p-5">
          <p className="leading-7 text-stone-700">まだ記録がありません。まずは今日の一歩から始めましょう。</p>
          <div className="mt-4">
            <ButtonLink href="/reflection/new">今日の振り返りを書く</ButtonLink>
          </div>
        </div>
      )}
    </AppShell>
  );
}
