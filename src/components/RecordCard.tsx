import Link from "next/link";
import type { RecordItem } from "@/data/types";

export function RecordCard({ record }: { record: RecordItem }) {
  return (
    <Link href={`/records/${record.id}`} className="warm-panel block rounded-lg p-5 transition hover:-translate-y-0.5 hover:shadow-orange-200/70">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
        <span className="rounded-full bg-orange-100 px-3 py-1 font-bold text-orange-800">{record.theme}</span>
        <span className="text-stone-500">{record.date}</span>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${record.tsunagunResponse ? "bg-green-100 text-green-800" : "bg-stone-100 text-stone-600"}`}>
          {record.tsunagunResponse ? "クロード相談済み" : "未相談"}
        </span>
        {record.sharedToCommunity ? (
          <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-pink-800">シェア済み</span>
        ) : null}
      </div>
      <h3 className="text-lg font-bold text-stone-950">{record.title}</h3>
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-600">{record.insight}</p>
      <p className="mt-4 text-sm font-bold text-orange-700">詳細を見る</p>
    </Link>
  );
}
