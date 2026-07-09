import type { DailyTheme, RecordItem, SharedPost } from "@/data/types";

export function buildChappyPrompt(today: DailyTheme) {
  return [
    "今日は人間力向上委員会の振り返りをしたいです。",
    "",
    `今日のテーマは「${today.theme}」です。`,
    "",
    "私はこのテーマについて、自分の経験を振り返りたいです。",
    "以下の順番で、1問ずつ質問してください。",
    "",
    "1. 最近、このテーマに関係する出来事はありましたか？",
    "2. その時、どんな気持ちになりましたか？",
    "3. その奥には、どんな期待や大切にしたい価値観がありましたか？",
    "4. 相手を変えるのではなく、自分を整えるとしたら何ができますか？",
    "5. 明日、小さく実践できることは何ですか？",
    "",
    "最後に、以下の形でまとめてください。",
    "",
    "【今日の学び】",
    "【気づき】",
    "【実践】",
    "【次の行動】",
    "【LINE共有用まとめ】"
  ].join("\n");
}

export function buildTsunagunPrompt(record: RecordItem) {
  return [
    "以下は、TSUNAGU DAOメンバーが5分の振り返りを通じて整理した内容です。",
    "",
    "人間力向上委員会の視点（ご機嫌・かっこいい大人・4学期の循環）から、温かくコーチングしてください。",
    "",
    "以下の形で返してください。",
    "",
    "1. 学びの整理",
    "2. ご機嫌の視点",
    "3. かっこいい大人に近づくための問い",
    "4. 明日の小さな実践",
    "5. LINE共有用の文章",
    "",
    "【今日のテーマ】",
    record.theme,
    "",
    "【振り返りの内容】",
    record.chatgptSummary,
    "",
    "【今日の気づき】",
    record.insight,
    "",
    "【次の行動】",
    record.nextAction
  ].join("\n");
}

export function buildLineShareText(record: RecordItem) {
  return [
    "【今日のテーマ】",
    record.theme,
    "",
    "【今日の学び】",
    record.chatgptSummary,
    "",
    "【気づき】",
    record.insight,
    "",
    "【つなぐんからの問い】",
    record.tsunagunResponse || "これから保存します。",
    "",
    "【明日の小さな実践】",
    record.tomorrowAction || record.nextAction
  ].join("\n");
}

// コミュニティ掲示板へ投稿するときの下書きテキストを作る
export function buildCommunityMessage(record: RecordItem) {
  return `「${record.theme}」について振り返りました。${record.insight}`;
}

export function buildCommunityLineShareText(post: SharedPost) {
  return [
    `【${post.nickname}さんの振り返り／テーマ：${post.theme}】`,
    post.insight,
    "",
    "【明日の一歩】",
    post.tomorrowAction
  ].join("\n");
}
