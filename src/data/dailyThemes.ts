import type { DailyTheme } from "./types";

export const dailyThemes: DailyTheme[] = [
  {
    theme: "期待",
    icon: "🌱",
    question: "最近、相手に期待して苦しくなった出来事はありましたか？",
    shortQuestion: "相手への期待の奥に、どんな願いがありましたか？",
    tsunagunMessage: "期待は、あなたが大切にしたいものを教えてくれる小さなサインです。"
  },
  {
    theme: "ご機嫌",
    icon: "☀️",
    question: "自分がご機嫌でいられる時、どんな状態が整っていますか？",
    shortQuestion: "ご機嫌でいるために、今日ひとつ整えられることは何ですか？",
    tsunagunMessage: "ご機嫌は、誰かに作ってもらうものではなく、自分で戻ってこられる場所です。"
  },
  {
    theme: "時間",
    icon: "⏰",
    question: "最近、時間の使い方に自分らしさはありましたか？",
    shortQuestion: "時間の使い方に、自分らしさはありましたか？",
    tsunagunMessage: "時間は「余ったら使うもの」ではなく「何に使うか決めるもの」です。"
  },
  {
    theme: "ありがとう",
    icon: "🤲",
    question: "今日、まだ言葉にできていないありがとうはありますか？",
    shortQuestion: "まだ言葉にできていないありがとうはありますか？",
    tsunagunMessage: "ありがとうは、関係の中にある温度を少し上げてくれる言葉です。"
  },
  {
    theme: "約束",
    icon: "🧡",
    question: "自分との小さな約束を守れた場面はありましたか？",
    shortQuestion: "自分との小さな約束を、今日はどう扱いましたか？",
    tsunagunMessage: "小さな約束を守ることは、自分への信頼を育てる静かな練習です。"
  },
  {
    theme: "怒り",
    icon: "🔥",
    question: "最近の怒りの奥には、どんな大切な願いがありましたか？",
    shortQuestion: "怒りの奥にある、本当は大切にしたかったものは何ですか？",
    tsunagunMessage: "怒りは悪者ではありません。大切なものが傷ついたことを知らせてくれます。"
  },
  {
    theme: "与える",
    icon: "🎁",
    question: "見返りを求めずに渡せたものはありましたか？",
    shortQuestion: "今日、見返りを求めずに渡せるものは何ですか？",
    tsunagunMessage: "与えることは、大きなことではなく、目の前の人に少し余白を渡すことから始まります。"
  },
  {
    theme: "余白",
    icon: "🫧",
    question: "自分の中に余白がある時、周りとの関わりはどう変わりますか？",
    shortQuestion: "自分の中に余白がある時、関わり方はどう変わりますか？",
    tsunagunMessage: "余白は、何もしない時間ではなく、自分を取り戻すためのスペースです。"
  },
  {
    theme: "信頼",
    icon: "🤝",
    question: "信頼したいのに、少し握りしめていることはありますか？",
    shortQuestion: "信頼したいのに、少し握りしめていることはありますか？",
    tsunagunMessage: "信頼は、全部を任せることではなく、少し手をゆるめてみることから育ちます。"
  },
  {
    theme: "挑戦",
    icon: "🚶",
    question: "小さく挑戦できることを一つ選ぶなら何ですか？",
    shortQuestion: "今日、小さく挑戦できることを一つ選ぶなら何ですか？",
    tsunagunMessage: "挑戦は、怖くないことをするのではなく、怖さと一緒に一歩進むことです。"
  },
  {
    theme: "素直さ",
    icon: "🌿",
    question: "本当は素直に伝えたい気持ちはありますか？",
    shortQuestion: "本当は素直に伝えたい気持ちはありますか？",
    tsunagunMessage: "素直さは、弱さではなく、関係をあたためる勇気です。"
  },
  {
    theme: "健康",
    icon: "🫶",
    question: "今日の自分の心と体は、何を求めていますか？",
    shortQuestion: "今日の心と体は、何を求めていますか？",
    tsunagunMessage: "体の声を聞くことも、人間力を育てる大切な対話です。"
  },
  {
    theme: "お金",
    icon: "💫",
    question: "お金との向き合い方に、自分の価値観は表れていますか？",
    shortQuestion: "お金の使い方に、自分の価値観は表れていますか？",
    tsunagunMessage: "お金は不安の種にも、応援の形にもなります。どんな気持ちで扱うかを見てみましょう。"
  },
  {
    theme: "家族",
    icon: "🏠",
    question: "家族との関わりで、少し整えたいことはありますか？",
    shortQuestion: "家族との関わりで、少し整えたいことはありますか？",
    tsunagunMessage: "近い関係ほど、やさしさを言葉にする練習が必要なことがあります。"
  },
  {
    theme: "仲間",
    icon: "🌳",
    question: "仲間に対して、どんな関わりを増やしたいですか？",
    shortQuestion: "仲間に対して、どんな関わりを増やしたいですか？",
    tsunagunMessage: "仲間との関係は、正しさよりも、関心を向けることから深まります。"
  }
];

export function getTodayTheme(date = new Date()): DailyTheme {
  const dayNumber = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000);
  return dailyThemes[dayNumber % dailyThemes.length];
}
