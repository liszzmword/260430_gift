"use client";

import Link from "next/link";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function Celebration({ giftName }: { giftName: string }) {
  useEffect(() => {
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 },
    });
    const t = setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 70,
        startVelocity: 35,
        origin: { y: 0.5 },
      });
    }, 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="flex-1 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          축하합니다!!
        </h1>
        <p className="mt-4 text-lg text-purple-900">
          <span className="font-bold">{giftName}</span> 준비할게요 :)
        </p>

        <div className="mt-10 space-y-3">
          <Link
            href="/"
            onClick={() => {
              window.gtag?.("event", "click_gift_to_friend", {
                event_category: "engagement",
                event_label: "celebration_cta",
              });
            }}
            className="block w-full rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-4 text-base font-bold text-white shadow-md shadow-pink-300/50 active:scale-[0.98]"
          >
            나도 친구에게 선물하기
          </Link>
          <p className="text-xs text-purple-900/40">
            친구한테 똑같이 골탕먹여 보내주기
          </p>
        </div>
      </div>
    </main>
  );
}
