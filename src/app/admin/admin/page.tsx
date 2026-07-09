"use client";

import { AppShell } from "@/components/AppShell";
import { dailyThemes } from "@/data/dailyThemes";
import { useRecords } from "@/data/RecordsProvider";

// 「今日のテーマ」を手動で切り替えるための管理画面（バックヤード）。
// 通常は日付から自動でテーマが決まるが、運営側の意図でテーマを固定したいときに使う。
// 今はログインなどはなく、このURLを知っている人だけが使える簡易な管理画面。
export default function AdminPage() {
  const { today, isThemeOverridden, setTodayThemeOverride, clearTodayThemeOverride } = useRecords();

  return (
    <AppShell>
      <div className="space-y-5">
        <div>
          <p className="font-bold text-orange-700">⚙️ バックヤード</p>
          <h1 className="mt-1 text-3xl font-bold text-stone-950">今日のテーマを設定する</h1>
          <p className="mt-3 leading-7 text-stone-700">
            通常は日付に応じて自動でテーマが切り替わりますが、ここから運営側が今日のテーマを手動で固定できます。この設定は、このブラウザ・この端末にのみ反映されます。
          </p>
        </div>

        <div className="warm-panel rounded-lg p-5">
          <p className="text-sm font-bold text-orange-700">現在表示中のテーマ</p>
          <p className="mt-2 text-2xl font-bold text-stone-950">
            <span className="mr-2">{today.icon}</span>
            {today.theme}
          </p>
          <p className="mt-2 text-sm text-stone-600">
            {isThemeOverridden ? "（手動で固定されています）" : "（自動切り替え中）"}
          </p>
        </div>

        <div className="warm-panel rounded-lg p-5">
          <p className="mb-3 font-bold text-stone-800">テーマを選んで固定する</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {dailyThemes.map((theme) => (
              <button
                key={theme.theme}
                type="button"
                onClick={() => setTodayThemeOverride(theme.theme)}
                className={`rounded-lg border px-4 py-3 text-left transition ${
                  today.theme === theme.theme && isThemeOverridden
                    ? "border-orange-400 bg-orange-100 font-bold text-orange-800"
                    : "border-orange-200 bg-white hover:bg-orange-50"
                }`}
              >
                <span className="mr-2">{theme.icon}</span>
                {theme.theme}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={clearTodayThemeOverride}
          disabled={!isThemeOverridden}
          className="w-full rounded-full border border-orange-200 bg-white px-5 py-3 font-bold text-orange-800 transition hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          自動切り替えに戻す
        </button>
      </div>
    </AppShell>
  );
}
