"use client";

import { useState } from "react";

export function CopyBox({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section className="warm-panel rounded-lg p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="font-bold text-stone-950">{label}</h2>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-600"
        >
          {copied ? "コピー済み" : "コピー"}
        </button>
      </div>
      <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-lg bg-stone-950 p-4 text-sm leading-6 text-orange-50">{text}</pre>
    </section>
  );
}
