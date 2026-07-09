"use client";

import { useMemo, useState } from "react";
import { ActionMessage } from "@/components/ActionMessage";
import { AppShell } from "@/components/AppShell";
import { CopyBox } from "@/components/CopyBox";
import { useRecords } from "@/data/RecordsProvider";
import { buildChappyPrompt, buildChappySetupPrompt } from "@/lib/shareText";

export default function ChappyPage() {
  const { today } = useRecords();
  const [message, setMessage] = useState("");
  const [setupMessage, setSetupMessage] = useState("");
  const prompt = useMemo(() => buildChappyPrompt(today), [today]);
  const setupPrompt = useMemo(() => buildChappySetupPrompt(), []);

  async function handleCopyAndOpen() {
    await navigator.clipboard.writeText(prompt);
    setMessage("プロンプトをコピーしました。ChatGPTに貼り付けて送信してください。");
    window.open("https://chatgpt.com/", "_blank", "noopener,noreferrer");
  }

  async function handleCopySetup() {
    await navigator.clipboard.writeText(setupPrompt);
    setSetupMessage("初期設定プロンプトをコピーしました。新しいチャットの一番最初に貼り付けてください。");
  }

  return (
    <AppShell>
      <div className="space-y-5">
        <div>
          <p className="font-bold text-orange-700">🌱 チャッピーと話す</p>
          <h1 className="mt-1 text-3xl font-bold text-stone-950">今日の問いをコピーする</h1>
          <p className="mt-3 leading-7 text-stone-700">
            ボタンを押すと今日の問いがコピーされ、あなたのChatGPT（チャッピー）が開きます。開いた画面にそのまま貼り付けて送信してください。今日のテーマについて話すか、今の気分から話すか、チャッピーが最初に聞いてくれます。対話が終わったら「まとめを保存する」にその内容を貼り付けましょう。
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

        <div className="warm-panel rounded-lg p-5">
          <p className="font-bold text-orange-700">⚙️ 初めての方・新しいチャットのとき</p>
          <p className="mt-2 text-sm leading-6 text-stone-700">
            チャッピーに人間力向上委員会の理念やスタンスを覚えてもらうための初期設定です。新しくChatGPTのチャットを始めたときは、上のプロンプトより先に、まずこちらを貼り付けてください。一度設定した会話を続けて使う場合は、毎回貼り付ける必要はありません。
          </p>
          <button
            type="button"
            onClick={handleCopySetup}
            className="mt-4 w-full rounded-full border border-orange-200 bg-white px-5 py-3 font-bold text-orange-800 transition hover:bg-orange-50"
          >
            初期設定プロンプトをコピー
          </button>
          {setupMessage ? <ActionMessage>{setupMessage}</ActionMessage> : null}
        </div>
      </div>
    </AppShell>
  );
}
