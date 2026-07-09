"use client";

import { AppShell } from "@/components/AppShell";
import { ButtonLink } from "@/components/ButtonLink";
import { useCommunity } from "@/data/CommunityProvider";
import { useRecords } from "@/data/RecordsProvider";

// みんなの振り返りが集まる掲示板。
// 今はこのブラウザの中だけのモック表示だが、将来バックエンドを繋いだときに
// 本当の意味で「TSUNAGU DAOみんなの掲示板」になり、ここに集まった声がクロードの学習データにもつながっていく。
export default function CommunityPage() {
  const { posts } = useCommunity();
  const { latestRecord } = useRecords();

  return (
    <AppShell>
      <div className="mb-6 space-y-3">
        <p className="font-bold text-orange-700">🤝 みんなの掲示板</p>
        <h1 className="text-3xl font-bold text-stone-950">仲間の5分振り返り</h1>
        <p className="leading-7 text-stone-700">
          同じテーマで悩んでいる仲間の気づきが、あなたの一歩の後押しになるかもしれません。あなたの振り返りも、誰かの支えになります。
        </p>
        {latestRecord ? (
          <ButtonLink href={`/share/new?id=${latestRecord.id}`}>自分の振り返りをシェアする</ButtonLink>
        ) : (
          <ButtonLink href="/reflection/new">まずは今日の振り返りを書く</ButtonLink>
        )}
      </div>

      {posts.length ? (
        <div className="grid gap-4">
          {posts.map((post) => (
            <article key={post.id} className="warm-panel rounded-lg p-5">
              <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
                <span className="rounded-full bg-orange-100 px-3 py-1 font-bold text-orange-800">{post.theme}</span>
                <span className="font-bold text-stone-700">{post.nickname}</span>
                <span className="text-stone-500">{post.createdAt.slice(0, 10)}</span>
              </div>
              <p className="leading-7 text-stone-800">{post.message}</p>
              {post.tomorrowAction ? (
                <p className="mt-3 rounded-lg bg-amber-50 p-3 text-sm leading-6 text-stone-700">
                  <span className="font-bold text-amber-800">明日の一歩：</span>
                  {post.tomorrowAction}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      ) : (
        <div className="warm-panel rounded-lg p-5 text-stone-700">まだ投稿がありません。最初のシェアをしてみませんか？</div>
      )}
    </AppShell>
  );
}
