"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ActionMessage } from "@/components/ActionMessage";
import { AppShell } from "@/components/AppShell";
import { useRecords } from "@/data/RecordsProvider";
import { buildTsunagunPrompt } from "@/lib/shareText";

// ChatGPTでの対話を終えた後、その内容を貼り付けて保存するページ。
// （直接自分の言葉で書きたい場合は /reflection/new を使う）
export default function SummaryPage() {
  const router = useRouter();
  const { addRecord, today } = useRecords();
  const [message, setMessage] = useState("");

  function saveForm(form: HTMLFormElement, goNext: boolean) {
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const base = {
      date: new Date().toISOString().slice(0, 10),
      theme: String(data.get("theme") || today.theme),
      question: today.question,
      title: String(data.get("title") || "今日の5分対話"),
      chatgptSummary: String(data.get("chatgptSummary") || ""),
      insight: String(data.get("insight") || ""),
      nextAction: String(data.get("nextAction") || ""),
      tsunagunPrompt: "",
      tsunagunResponse: "",
      tomorrowAction: "",
      lineShareText: "",
      sharedToCommunity: false
    };
    const record = addRecord({ ...base, tsunagunPrompt: buildTsunagunPrompt({ ...base, id: "", createdAt: "", updatedAt: "" }) });
    setMessage("今日の一歩を保存しました");
    if (goNext) router.push(`/tsunagun?id=${record.id}`);
  }

  return (
    <AppShell>
      <form
        className="warm-panel rounded-lg p-5 md:p-7"
        onSubmit={(event) => {
          event.preventDefault();
          const submitter = event.nativeEvent.submitter as HTMLButtonElement | null;
          saveForm(event.currentTarget, submitter?.value === "next");
        }}
      >
        <p className="font-bold text-orange-700">✨ おかえりなさい！</p>
        <h1 className="mt-1 text-3xl font-bold text-stone-950">今日のまとめを保存する</h1>
        <p className="mt-3 leading-7 text-stone-700">
          ChatGPTとの対話、お疲れさまでした。まとめを保存すると、クロードから今日のコーチングを受け取る準備ができます。
        </p>

        <Field label="タイトル" name="title" placeholder="例：期待を手放して、自分を整える" />
        <Field label="今日のテーマ" name="theme" defaultValue={today.theme} />
        <TextArea label="ChatGPTからのまとめ" name="chatgptSummary" rows={7} />
        <TextArea label="今日の気づき" name="insight" rows={4} />
        <TextArea label="次の行動" name="nextAction" rows={4} />

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button className="rounded-full border border-orange-200 bg-white px-5 py-3 font-bold text-orange-800 transition hover:bg-orange-50" type="submit" name="intent" value="save">
            今日のまとめを保存する
          </button>
          <button
            className="rounded-full bg-orange-500 px-5 py-3 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
            type="submit"
            name="intent"
            value="next"
          >
            クロード用プロンプトを作る
          </button>
        </div>
        {message ? <ActionMessage>{message}</ActionMessage> : null}
      </form>
    </AppShell>
  );
}

function Field({ label, name, defaultValue, placeholder }: { label: string; name: string; defaultValue?: string; placeholder?: string }) {
  return (
    <label className="mt-5 block">
      <span className="mb-2 block font-bold text-stone-800">{label}</span>
      <input
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required
        className="w-full rounded-lg border border-orange-200 bg-white px-4 py-3 outline-none focus:focus-ring"
      />
    </label>
  );
}

function TextArea({ label, name, rows }: { label: string; name: string; rows: number }) {
  return (
    <label className="mt-5 block">
      <span className="mb-2 block font-bold text-stone-800">{label}</span>
      <textarea name={name} rows={rows} required className="w-full resize-y rounded-lg border border-orange-200 bg-white px-4 py-3 leading-7 outline-none focus:focus-ring" />
    </label>
  );
}
