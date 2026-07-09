"use client";

import { useEffect, useMemo, useState } from "react";
import { ActionMessage } from "@/components/ActionMessage";
import { AppShell } from "@/components/AppShell";
import { CopyBox } from "@/components/CopyBox";
import { useRecords } from "@/data/RecordsProvider";
import { buildLineShareText } from "@/lib/shareText";

export default function LinePage() {
  const { records, latestRecord, getRecord } = useRecords();
  const [selectedId, setSelectedId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    setSelectedId(id || latestRecord?.id || "");
  }, [latestRecord?.id]);

  const record = useMemo(() => getRecord(selectedId) ?? latestRecord, [getRecord, latestRecord, selectedId]);
  const text = record ? record.lineShareText || buildLineShareText(record) : "";

  async function copyLineText() {
    await navigator.clipboard.writeText(text);
    setMessage("LINE共有文をコピーしました");
  }

  return (
    <AppShell>
      <div className="space-y-5">
        <div>
          <p className="font-bold text-orange-700">LINE共有</p>
          <h1 className="mt-1 text-3xl font-bold text-stone-950">仲間に貼りやすく整える</h1>
        </div>

        {records.length ? (
          <label className="block warm-panel rounded-lg p-5">
            <span className="mb-2 block font-bold text-stone-800">共有する記録</span>
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
            <button
              type="button"
              onClick={copyLineText}
              className="w-full rounded-full bg-orange-500 px-5 py-4 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
            >
              LINE共有文をコピー
            </button>
            {message ? <ActionMessage>{message}</ActionMessage> : null}
            <CopyBox label="LINE共有文" text={text} />
          </>
        ) : (
          <div className="warm-panel rounded-lg p-5 text-stone-700">まだ共有できる記録がありません。</div>
        )}
      </div>
    </AppShell>
  );
}
