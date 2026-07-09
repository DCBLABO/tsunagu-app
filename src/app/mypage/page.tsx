import { AppShell } from "@/components/AppShell";
import { ButtonLink } from "@/components/ButtonLink";

export default function MyPage() {
  return (
    <AppShell>
      <section className="warm-panel rounded-lg p-5 md:p-7">
        <p className="font-bold text-orange-700">👤 マイページ</p>
        <h1 className="mt-1 text-3xl font-bold text-stone-950">自分のペースで大丈夫。</h1>
        <p className="mt-3 leading-7 text-stone-700">
          ログインや個人設定は次のフェーズで追加します。今は、毎日5分だけ自分と向き合う入口として使ってください。
        </p>
        <div className="mt-6">
          <ButtonLink href="/">今日の一歩へ戻る</ButtonLink>
        </div>
      </section>
    </AppShell>
  );
}
