"use client";

// コミュニティ掲示板（みんなの投稿）を管理するProvider。
// 現時点ではlocalStorageのモックで、自分のブラウザの中でのみ「みんなの投稿」が見える。
// 将来バックエンド（DB）を繋いだときに、ここを実際のAPI呼び出しに差し替える想定。
// シェアされた投稿は、将来的にクロードの学習データ（つなぐられしさ）へつながっていく入り口になる。
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { SharedPost, SharedPostDraft } from "./types";

type CommunityContextValue = {
  posts: SharedPost[];
  addPost: (draft: SharedPostDraft) => SharedPost;
};

const CommunityContext = createContext<CommunityContextValue | null>(null);
const storageKey = "tsunagu-community-posts";

const seedPosts: SharedPost[] = [
  {
    id: "post-seed-001",
    recordId: "record-001",
    nickname: "たかし",
    theme: "期待",
    insight: "期待は悪いものではなく、自分が大切にしたい価値観を教えてくれるサインだと気づいた。",
    tomorrowAction: "朝の予定確認で、相手への期待を一つだけ具体的なお願いに変える。",
    message: "同じ「期待」で悩んでいる人の参考になれば嬉しいです。",
    createdAt: "2026-07-08T10:00:00.000Z"
  }
];

export function CommunityProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<SharedPost[]>(seedPosts);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) return;
    const parsed = JSON.parse(saved) as SharedPost[];
    if (Array.isArray(parsed)) {
      setPosts(parsed);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(posts));
  }, [posts]);

  const value = useMemo<CommunityContextValue>(
    () => ({
      posts,
      addPost: (draft) => {
        const post: SharedPost = {
          ...draft,
          id: `post-${crypto.randomUUID()}`,
          createdAt: new Date().toISOString()
        };
        setPosts((current) => [post, ...current]);
        return post;
      }
    }),
    [posts]
  );

  return <CommunityContext.Provider value={value}>{children}</CommunityContext.Provider>;
}

export function useCommunity() {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error("useCommunity must be used inside CommunityProvider");
  }
  return context;
}
