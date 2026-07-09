"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ActionMessage } from "@/components/ActionMessage";
import { AppShell } from "@/components/AppShell";
import { useRecords } from "@/data/RecordsProvider";
import { buildTsunagunPrompt } from "@/lib/shareText";

// 「今日の5分振り返り」を直接入力するページ。
// ここで書いた内容がそのままチャッピー（自分専属AI）への蓄積になる。
// 保存後は、そのままクロードに相談する画面へ進める。
export default function ReflectionNewPage() {
  const router = useRouter();
  const { addRecord, today } = useRecords();
  const [message, setMessage] = useState("");

  function saveForm(form: HTMLFormElement, goToClaude: boolean) {
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const base = {
      date: new Date().toISOString().slice(0, 10),
      theme: today.theme,
      question: today.question,
      title: String(data.get("title") || `今日のテーマ「${today.theme}」の振り返り`),
      chatgptSummary: String(data.get("content") || ""),
      insight: String(data.get("insight") || ""),
      nextAction: String(data.get("nextAction") || ""),
      tsunagunPrompt: "",
      tsunagunResponse: "",
      tomorrowAction: "",
      lineShareText: "",
      sharedToCommunity: false
    };
    const record = addRecord({ ...base, tsunagunPrompt: buildTsunagunPrompt({ ...base, id: "", createdAt: "", updatedAt: "" }) });
    setMessage("今日の振り返りをチャッピーに蓄積しました");
    if (goToClaude) router.push(`/tsunagun?id=${record.id}`);
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
        <p className="font-bold text-orange-700">🌱 今日の5分振り返り</p>
        <h1 className="mt-1 text-3xl font-bold text-stone-950">
          <span className="mr-2">{today.icon}</span>
          {today.theme}
        </h1>
        <p className="mt-3 rounded-lg bg-amber-50 p-4 text-lg font-bold leading-8 text-stone-900">「{today.question}」</p>

        <Field label="タイトル（自由に）" name="title" placeholder={`例：今日のテーマ「${today.theme}」の振り返り`} required={false} />
        <TextArea label="今、感じていること・気づいたこと" name="content" rows={6} placeholder="5分で大丈夫。思いつくままに書いてみましょう。" />
        <TextArea label="今日の気づき（一言でOK）" name="insight" rows={3} />
        <TextArea label="明日、小さくできそうなこと" name="nextAction" rows={3} />

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            className="rounded-full border border-orange-200 bg-white px-5 py-3 font-bold text-orange-800 transition hover:bg-orange-50"
            type="submit"
            name="intent"
            value="save"
          >
            保存する
          </button>
          <button
            className="rounded-full bg-orange-500 px-5 py-3 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
            type="submit"
            name="intent"
            value="next"
          >
            クロードに相談してみる
          </button>
        </div>
        {message ? <ActionMessage>{message}</ActionMessage> : null}
      </form>
    </AppShell>
  );
}

function Field({
  label,
  name,
  placeholder,
  required = true
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="mt-5 block">
      <span className="mb-2 block font-bold text-stone-800">{label}</span>
      <input
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-orange-200 bg-white px-4 py-3 outline-none focus:focus-ring"
      />
    </label>
  );
}

function TextArea({ label, name, rows, placeholder }: { label: string; name: string; rows: number; placeholder?: string }) {
  return (
    <label className="mt-5 block">
      <span className="mb-2 block font-bold text-stone-800">{label}</span>
      <textarea
        name={name}
        rows={rows}
        placeholder={placeholder}
        required
        className="w-full resize-y rounded-lg border border-orange-200 bg-white px-4 py-3 leading-7 outline-none focus:focus-ring"
      />
    </label>
  );
}
