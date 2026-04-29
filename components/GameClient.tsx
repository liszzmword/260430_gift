"use client";

import { useRef, useState } from "react";
import EvasiveGiftB from "./EvasiveGiftB";
import Celebration from "./Celebration";

type Phase = "choosing" | "celebrating";

export default function GameClient({ a, b }: { a: string; b: string }) {
  const [phase, setPhase] = useState<Phase>("choosing");
  const giftARef = useRef<HTMLButtonElement | null>(null);

  if (phase === "celebrating") {
    return <Celebration giftName={a} />;
  }

  return (
    <main className="flex-1 relative overflow-hidden">
      <div className="px-6 pt-10 pb-4 text-center">
        <h1 className="text-xl sm:text-2xl font-extrabold leading-tight bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          친구가 선물 두 개 준비했어!
        </h1>
        <p className="mt-2 text-sm text-purple-900/60">마음에 드는 거 골라봐</p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <button
          ref={giftARef}
          type="button"
          onClick={() => setPhase("celebrating")}
          className="relative z-10 w-56 rounded-2xl border-2 border-pink-300 bg-white px-5 py-4 text-center shadow-xl shadow-pink-200/60 active:scale-[0.98]"
        >
          <div className="font-bold text-purple-900 truncate">{a}</div>
          <div className="mt-1 text-[10px] uppercase tracking-wide text-pink-400">
            선물 A
          </div>
        </button>
      </div>

      <EvasiveGiftB label={b} giftARef={giftARef} />
    </main>
  );
}
