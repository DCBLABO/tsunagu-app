export type DailyTheme = {
  theme: string;
  question: string;
  icon: string;
  shortQuestion: string;
  tsunagunMessage: string;
};

export type RecordItem = {
  id: string;
  date: string;
  theme: string;
  question: string;
  title: string;
  // 5分振り返りの本文（自分で書いた内容。ChatGPTを使った場合はそのまとめもここに入る）
  chatgptSummary: string;
  insight: string;
  nextAction: string;
  tsunagunPrompt: string;
  tsunagunResponse: string;
  tomorrowAction: string;
  lineShareText: string;
  // コミュニティ掲示板に共有したかどうか
  sharedToCommunity: boolean;
  // 共有した場合、対応するSharedPostのid
  communityPostId?: string;
  createdAt: string;
  updatedAt: string;
};

export type RecordDraft = Omit<RecordItem, "id" | "createdAt" | "updatedAt">;

// みんなの投稿（コミュニティ掲示板用）。今はlocalStorageのモックで、
// 将来バックエンドを繋いだときに全ユーザー共有のデータに置き換える想定。
export type SharedPost = {
  id: string;
  recordId: string;
  nickname: string;
  theme: string;
  insight: string;
  tomorrowAction: string;
  message: string;
  createdAt: string;
};

export type SharedPostDraft = Omit<SharedPost, "id" | "createdAt">;
