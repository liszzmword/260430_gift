"use client";

import { useState } from "react";
import { encodePayload } from "@/lib/payload";

const MAX_LEN = 80;

export default function HomePage() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [link, setLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const canSubmit = a.trim().length > 0 && b.trim().length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    const d = encodePayload({ a: a.trim(), b: b.trim() });
    const url = `${window.location.origin}/play/${d}`;
    setLink(url);
    setCopied(false);
  }

  async function handleCopy() {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }

  function handleReset() {
    setA("");
    setB("");
    setLink(null);
    setCopied(false);
  }

  return (
    <main className="flex-1 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <header className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            갖고 싶은 선물 있어??
            <br />
            내가 사줄게!!
          </h1>
          <p className="mt-3 text-sm text-purple-900/60">
            선물 두 개 적고 친구한테 링크 보내봐
          </p>
        </header>

        {!link ? (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white/70 backdrop-blur rounded-3xl p-6 shadow-lg shadow-pink-200/40"
          >
            <label className="block">
              <span className="text-sm font-semibold text-purple-900">
                선물 A
              </span>
              <input
                type="text"
                value={a}
                onChange={(e) => setA(e.target.value)}
                maxLength={MAX_LEN}
                placeholder="예: 양말"
                className="mt-1 w-full rounded-xl border border-pink-200 bg-white px-4 py-3 text-base outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                required
              />
            </label>
            <label className="block">
              <span className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-purple-900">
                  선물 B
                </span>
                <span className="text-xs text-purple-900/50">
                  선물 B는 고를 수 없어요
                </span>
              </span>
              <input
                type="text"
                value={b}
                onChange={(e) => setB(e.target.value)}
                maxLength={MAX_LEN}
                placeholder="예: 샤넬백"
                className="mt-1 w-full rounded-xl border border-pink-200 bg-white px-4 py-3 text-base outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                required
              />
            </label>
            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-3 text-base font-bold text-white shadow-md shadow-pink-300/50 transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
            >
              링크 만들기
            </button>
          </form>
        ) : (
          <div className="space-y-4 bg-white/70 backdrop-blur rounded-3xl p-6 shadow-lg shadow-pink-200/40">
            <div className="text-center">
              <h2 className="text-lg font-bold text-purple-900">
                링크 준비 완료!
              </h2>
              <p className="text-sm text-purple-900/60 mt-1">
                친구한테 이 링크 보내봐
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={link}
                className="flex-1 min-w-0 rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm text-purple-900"
                onFocus={(e) => e.currentTarget.select()}
              />
              <button
                type="button"
                onClick={handleCopy}
                className="shrink-0 rounded-xl bg-purple-600 px-4 py-2 text-sm font-bold text-white shadow active:scale-95"
              >
                {copied ? "복사됨!" : "복사"}
              </button>
            </div>
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="block text-center text-sm text-purple-700 underline underline-offset-2"
            >
              미리보기 (새 탭으로 열기)
            </a>
            <button
              type="button"
              onClick={handleReset}
              className="w-full rounded-xl border border-pink-300 bg-white px-4 py-3 text-sm font-semibold text-purple-700"
            >
              다시 만들기
            </button>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-purple-900/40">
          친구가 어떤 걸 고를지 두고 봐요
        </p>
      </div>
    </main>
  );
}
