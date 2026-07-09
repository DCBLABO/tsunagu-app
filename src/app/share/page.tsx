"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ActionMessage } from "@/components/ActionMessage";
import { AppShell } from "@/components/AppShell";
import { useCommunity } from "@/data/CommunityProvider";
import { useRecords } from "@/data/RecordsProvider";
import { buildCommunityMessage } from "@/lib/shareText";

// 自分の振り返りをコミュニティ掲示板へシェアする画面。
// ここで投稿された内容が、将来的にクロードの学習データ（つなぐられしさ）へつながっていく想定。
export default function ShareNewPage() {
  const router = useRouter();
  const { records, latestRecord, getRecord, updateRecord } = useRecords();
  const { addPost } = useCommunity();
  const [selectedId, setSelectedId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    setSelectedId(id || latestRecord?.id || "");
  }, [latestRecord?.id]);

  const record = useMemo(() => getRecord(selectedId) ?? latestRecord, [getRecord, latestRecord, selectedId]);

  function submit(form: HTMLFormElement) {
    if (!record) return;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const nickname = String(data.get("nickname") || "名前未設定");
    const communityMessage = String(data.get("message") || buildCommunityMessage(record));

    const post = addPost({
      recordId: record.id,
      nickname,
      theme: record.theme,
      insight: record.insight,
      tomorrowAction: record.tomorrowAction || record.nextAction,
      message: communityMessage
    });

    updateRecord(record.id, { sharedToCommunity: true, communityPostId: post.id });
    setMessage("みんなの掲示板にシェアしました");
    router.push("/community");
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
          submit(event.currentTarget);
        }}
      >
        <p className="font-bold text-orange-700">🤝 みんなにシェア</p>
        <h1 className="mt-1 text-3xl font-bold text-stone-950">この振り返りをシェアする</h1>
        <p className="mt-3 leading-7 text-stone-700">
          あなたの気づきは、同じテーマで悩んでいる誰かの支えになります。ニックネームで投稿できるので、気負わず共有してみてください。
        </p>

        <div className="mt-5 rounded-lg bg-orange-50 p-4">
          <p className="text-sm font-bold text-orange-700">テーマ：{record.theme}</p>
          <p className="mt-2 text-sm leading-6 text-stone-700">{record.insight || "（気づきが未入力です）"}</p>
        </div>

        <label className="mt-5 block">
          <span className="mb-2 block font-bold text-stone-800">表示するニックネーム</span>
          <input
            name="nickname"
            placeholder="例：たかし"
            required
            className="w-full rounded-lg border border-orange-200 bg-white px-4 py-3 outline-none focus:focus-ring"
          />
        </label>

        <label className="mt-5 block">
          <span className="mb-2 block font-bold text-stone-800">ひとことメッセージ</span>
          <textarea
            name="message"
            rows={3}
            defaultValue={buildCommunityMessage(record)}
            className="w-full resize-y rounded-lg border border-orange-200 bg-white px-4 py-3 leading-7 outline-none focus:focus-ring"
          />
        </label>

        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-orange-500 px-5 py-4 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
        >
          この内容でシェアする
        </button>
        {message ? <ActionMessage>{message}</ActionMessage> : null}
      </form>
    </AppShell>
  );
}
