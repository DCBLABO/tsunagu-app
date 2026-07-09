"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ActionMessage } from "@/components/ActionMessage";
import { AppShell } from "@/components/AppShell";
import { CopyBox } from "@/components/CopyBox";
import { useRecords } from "@/data/RecordsProvider";
import { buildTsunagunPrompt } from "@/lib/shareText";

export default function TsunagunPage() {
  const { records, latestRecord, getRecord, updateRecord } = useRecords();
  const [selectedId, setSelectedId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    setSelectedId(id || latestRecord?.id || "");
  }, [latestRecord?.id]);

  const record = useMemo(() => getRecord(selectedId) ?? latestRecord, [getRecord, latestRecord, selectedId]);
  const prompt = record ? buildTsunagunPrompt(record) : "";

  async function copyPrompt() {
    if (!record) return;
    updateRecord(record.id, { tsunagunPrompt: prompt });
    await navigator.clipboard.writeText(prompt);
    setMessage("クロード用プロンプトをコピーしました");
  }

  return (
    <AppShell>
      <div className="space-y-5">
        <div>
          <p className="font-bold text-orange-700">クロードに相談</p>
          <h1 className="mt-1 text-3xl font-bold text-stone-950">クロードに渡す問いを作る</h1>
          <p className="mt-3 leading-7 text-stone-700">
            今日の振り返りをもとに、クロードから温かいコーチングを受けるためのプロンプトを作ります。今は下のプロンプトをコピーしてClaude.aiに貼り付ける形ですが、将来はこの画面から直接会話できるようにしていきます。
          </p>
        </div>

        {records.length ? (
          <label className="block warm-panel rounded-lg p-5">
            <span className="mb-2 block font-bold text-stone-800">使う記録</span>
            <select
              value={record?.id ?? ""}
              onChange={(event) => setSelectedId(event.target.value)}
              className="w-full rounded-lg border border-orange-200 bg-white px-4 py-3 outline-none focus:focus-ring"
            >
              {records.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.date} / {item.theme} / {item.title}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        {record ? (
          <>
            <a
              href="https://claude.ai/new"
              target="_blank"
              rel="noopener noreferrer"
              onClick={copyPrompt}
              className="block rounded-full bg-orange-500 px-5 py-4 text-center font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
            >
              プロンプトをコピーしてクロードを開く
            </a>
            <Link
              href={`/tsunagun-response?id=${record.id}`}
              className="block rounded-full border border-orange-200 bg-white px-5 py-4 text-center font-bold text-orange-800 transition hover:bg-orange-50"
            >
              クロードからの回答を貼り付ける
            </Link>
            {message ? <ActionMessage>{message}</ActionMessage> : null}
            <CopyBox label="クロード用プロンプト" text={prompt} />
          </>
        ) : (
          <div className="warm-panel rounded-lg p-5">
            <p className="leading-7 text-stone-700">まだ保存された振り返りがありません。先に今日の振り返りを書いてください。</p>
            <div className="mt-4">
              <Link className="font-bold text-orange-700" href="/reflection/new">
                振り返りを書く
              </Link>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
