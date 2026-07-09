"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getTodayTheme } from "./dailyThemes";
import { mockRecords } from "./mockRecords";
import type { DailyTheme, RecordDraft, RecordItem } from "./types";

type RecordsContextValue = {
  records: RecordItem[];
  today: DailyTheme;
  currentStreak: number;
  monthlyCount: number;
  addRecord: (draft: RecordDraft) => RecordItem;
  updateRecord: (id: string, patch: Partial<RecordDraft>) => RecordItem | undefined;
  getRecord: (id: string) => RecordItem | undefined;
  latestRecord: RecordItem | undefined;
};

const RecordsContext = createContext<RecordsContextValue | null>(null);
const storageKey = "tsunagu-five-minute-records";

export function RecordsProvider({ children }: { children: React.ReactNode }) {
  const [records, setRecords] = useState<RecordItem[]>(mockRecords);
  const today = getTodayTheme();
  const currentStreak = getCurrentStreak(records);
  const monthlyCount = getMonthlyCount(records);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) return;

    const parsed = JSON.parse(saved) as Partial<RecordItem>[];
    if (parsed.every((record) => record.id && record.theme && record.chatgptSummary !== undefined)) {
      setRecords(
        parsed.map((record) => ({
          sharedToCommunity: false,
          ...record
        })) as RecordItem[]
      );
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(records));
  }, [records]);

  const value = useMemo<RecordsContextValue>(
    () => ({
      records,
      today,
      currentStreak,
      monthlyCount,
      addRecord: (draft) => {
        const now = new Date().toISOString();
        const record: RecordItem = {
          ...draft,
          id: `record-${crypto.randomUUID()}`,
          createdAt: now,
          updatedAt: now
        };
        setRecords((current) => [record, ...current]);
        return record;
      },
      updateRecord: (id, patch) => {
        let updated: RecordItem | undefined;
        setRecords((current) =>
          current.map((record) => {
            if (record.id !== id) return record;
            updated = { ...record, ...patch, updatedAt: new Date().toISOString() };
            return updated;
          })
        );
        return updated;
      },
      getRecord: (id) => records.find((record) => record.id === id),
      latestRecord: records[0]
    }),
    [records, today, currentStreak, monthlyCount]
  );

  return <RecordsContext.Provider value={value}>{children}</RecordsContext.Provider>;
}

function getMonthlyCount(records: RecordItem[]) {
  const now = new Date();
  const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  return records.filter((record) => record.date.startsWith(monthKey)).length;
}

function getCurrentStreak(records: RecordItem[]) {
  const dates = new Set(records.map((record) => record.date));
  let streak = 0;
  const cursor = new Date();

  while (dates.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak || (records.length ? 1 : 0);
}

export function useRecords() {
  const context = useContext(RecordsContext);
  if (!context) {
    throw new Error("useRecords must be used inside RecordsProvider");
  }
  return context;
}
