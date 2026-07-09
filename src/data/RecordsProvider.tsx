"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dailyThemes, getTodayTheme } from "./dailyThemes";
import { mockRecords } from "./mockRecords";
import type { DailyTheme, RecordDraft, RecordItem } from "./types";

type RecordsContextValue = {
  records: RecordItem[];
  today: DailyTheme;
  isThemeOverridden: boolean;
  setTodayThemeOverride: (themeName: string) => void;
  clearTodayThemeOverride: () => void;
  currentStreak: number;
  monthlyCount: number;
  addRecord: (draft: RecordDraft) => RecordItem;
  updateRecord: (id: string, patch: Partial<RecordDraft>) => RecordItem | undefined;
  getRecord: (id: string) => RecordItem | undefined;
  latestRecord: RecordItem | undefined;
};

const RecordsContext = createContext<RecordsContextValue | null>(null);
const storageKey = "tsunagu-five-minute-records";
const themeOverrideKey = "tsunagu-today-theme-override";

export function RecordsProvider({ children }: { children: React.ReactNode }) {
  const [records, setRecords] = useState<RecordItem[]>(mockRecords);
  const [themeOverrideName, setThemeOverrideName] = useState<string | null>(null);
  const currentStreak = getCurrentStreak(records);
  const monthlyCount = getMonthlyCount(records);

  const autoTheme = getTodayTheme();
  const overriddenTheme = themeOverrideName ? dailyThemes.find((theme) => theme.theme === themeOverrideName) : undefined;
  const today = overriddenTheme ?? autoTheme;

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved) as Partial<RecordItem>[];
      if (parsed.every((record) => record.id && record.theme && record.chatgptSummary !== undefined)) {
        setRecords(
          parsed.map((record) => ({
            sharedToCommunity: false,
            ...record
          })) as RecordItem[]
        );
      }
    }

    const savedOverride = window.localStorage.getItem(themeOverrid
