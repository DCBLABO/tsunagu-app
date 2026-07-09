"use client";

import { useMemo, useState } from "react";
import { ActionMessage } from "@/components/ActionMessage";
import { AppShell } from "@/components/AppShell";
import { CopyBox } from "@/components/CopyBox";
import { useRecords } from "@/data/RecordsProvider";
import { buildChappyPrompt } from "@/lib/shareText";

export default function ChappyPage() {
  const { today } = useRecords();
  const [message, setMessage] = useState("");
  const prompt = useMemo(() => buildChappyPrompt(today), [today]);

  async function handleCopyAndOpen() {
    await navigator.clipboard.writeText(prompt);
    setMessage("プロンプトをコピーしました。ChatGPTに貼り付けて送信してください。");
    window.open("https://chatgpt.com/", "_blank", "noopener,noreferrer");
  }

  return (
    <AppShell>
      <div className="space-y-5">
        <div>
          <p className="font-bold text-orange-700">チャッピー準備（ChatGPT版）</p>
          <h1 className="mt-1 text-3xl font-bold text-stone-950">今日の問いをコピーする</h1>
          <p className="mt-3 leading-7 text-stone-700">
            じっくり対話しながら振り返りたいときは、こちらからChatGPTと話せます。ボタンを押すと今日の問いがコピーされます。開いたChatGPTに貼り付けて、対話を始めてください。対話が終わったら「まとめを保存する」に内容を貼り付けましょう。
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopyAndOpen}
          className="w-full rounded-full bg-orange-500 px-5 py-4 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
        >
          プロンプトをコピーしてChatGPTを開く
        </button>
        {message ? <ActionMessage>{message}</ActionMessage> : null}

        <CopyBox label="ChatGPT用プロンプト" text={prompt} />
      </div>
    </AppShell>
  );
}
