"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ActionMessage } from "@/components/ActionMessage";
import { AppShell } from "@/components/AppShell";
import { useRecords } from "@/data/RecordsProvider";
import { buildLineShareText } from "@/lib/shareText";

export default function TsunagunResponsePage() {
  const router = useRouter();
  const { latestRecord, getRecord, updateRecord } = useRecords();
  const [selectedId, setSelectedId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    setSelectedId(id || latestRecord?.id || "");
  }, [latestRecord?.id]);

  const record = useMemo(() => getRecord(selectedId) ?? latestRecord, [getRecord, latestRecord, selectedId]);

  function save(form: HTMLFormElement, goShare: boolean) {
    if (!record) return;
    const data = new FormData(form);
    const patch = {
      tsunagunResponse: String(data.get("tsunagunResponse") || ""),
      tomorrowAction: String(data.get("tomorrowAction") || ""),
      lineShareText: String(data.get("lineShareText") || "")
    };
    const updated = { ...record, ...patch };
    updateRecord(record.id, { ...patch, lineShareText: patch.lineShareText || buildLineShareText(updated) });
    setMessage("クロードからの回答を保存しました");
    if (goShare) router.push(`/share/new?id=${record.id}`);
  }

  if (!record) {
    return (
      <AppShell>
        <div className="warm-panel rounded-lg p-5">先に今日の振り返りを保存してください。</div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <form
        className="warm-panel rounded-lg p-5 md:p-7"
        onSubmit={(event) => {
          event.preventDefault();
          save(event.currentTarget, false);
        }}
      >
        <p className="font-bold text-orange-700">クロード回答保存</p>
        <h1 className="mt-1 text-3xl font-bold text-stone-950">クロードの言葉を残す</h1>
        <p className="mt-3 leading-7 text-stone-700">クロードから返ってきた回答と、明日の小さな実践を貼り付けます。</p>

        <TextArea label="クロードからの回答" name="tsunagunResponse" rows={8} defaultValue={record.tsunagunResponse} />
        <TextArea label="明日の小さな実践" name="tomorrowAction" rows={4} defaultValue={record.tomorrowAction} />
        <TextArea label="LINE共有用文章" name="lineShareText" rows={5} defaultValue={record.lineShareText} />

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button className="rounded-full border border-orange-200 bg-white px-5 py-3 font-bold text-orange-800 transition hover:bg-orange-50" type="submit">
            保存する
          </button>
          <button
            className="rounded-full bg-orange-500 px-5 py-3 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
            type="button"
            onClick={(event) => event.currentTarget.form && save(event.currentTarget.form, true)}
          >
            みんなにシェアする
          </button>
        </div>
        {message ? <ActionMessage>{message}</ActionMessage> : null}
        <p className="mt-4 text-center text-sm text-stone-500">
          <Link className="font-bold text-orange-700" href={`/line?id=${record.id}`}>
            LINEで個人的に共有する場合はこちら
          </Link>
        </p>
      </form>
    </AppShell>
  );
}

function TextArea({
  label,
  name,
  rows,
  defaultValue
}: {
  label: string;
  name: string;
  rows: number;
  defaultValue?: string;
}) {
  return (
    <label className="mt-5 block">
      <span className="mb-2 block font-bold text-stone-800">{label}</span>
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        required
        className="w-full resize-y rounded-lg border border-orange-200 bg-white px-4 py-3 leading-7 outline-none focus:focus-ring"
      />
    </label>
  );
}
