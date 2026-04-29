"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { isTouchDevice } from "@/lib/isTouch";

const ACTIVATION_RADIUS = 180;
const MAX_FORCE = 1.8;
const MAX_SPEED = 14;
const FRICTION = 0.82;
const MARGIN = 16;

type Props = {
  label: string;
  giftARef: RefObject<HTMLElement | null>;
};

export default function EvasiveGiftB({ label, giftARef }: Props) {
  const elRef = useRef<HTMLButtonElement | null>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ vx: 0, vy: 0 });
  const pointerRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number | null>(null);
  const [touch, setTouch] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTouch(isTouchDevice());
    setMounted(true);
  }, []);

  // Initial position: right-ish side, vertically center.
  useEffect(() => {
    if (!mounted) return;
    const el = elRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const startX = Math.min(vw - rect.width - MARGIN, vw * 0.62);
    const startY = Math.max(MARGIN, vh / 2 - rect.height / 2 + 40);
    posRef.current = { x: startX, y: startY };
    el.style.transform = `translate3d(${startX}px, ${startY}px, 0)`;
  }, [mounted]);

  // Desktop drift loop.
  useEffect(() => {
    if (!mounted || touch) return;
    const el = elRef.current;
    if (!el) return;

    function onMove(e: MouseEvent) {
      pointerRef.current.x = e.clientX;
      pointerRef.current.y = e.clientY;
    }
    function onLeave() {
      pointerRef.current.x = -9999;
      pointerRef.current.y = -9999;
    }
    function onResize() {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const p = posRef.current;
      p.x = Math.min(Math.max(p.x, MARGIN), vw - rect.width - MARGIN);
      p.y = Math.min(Math.max(p.y, MARGIN), vh - rect.height - MARGIN);
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);
    window.addEventListener("resize", onResize);

    function frame() {
      if (!el) {
        rafRef.current = requestAnimationFrame(frame);
        return;
      }
      const rect = el.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const elW = rect.width;
      const elH = rect.height;
      const cx = posRef.current.x + elW / 2;
      const cy = posRef.current.y + elH / 2;
      const dx = cx - pointerRef.current.x;
      const dy = cy - pointerRef.current.y;
      const dist = Math.hypot(dx, dy);

      if (dist < ACTIVATION_RADIUS && dist > 0.001) {
        const strength = MAX_FORCE * (1 - dist / ACTIVATION_RADIUS);
        velRef.current.vx += (dx / dist) * strength;
        velRef.current.vy += (dy / dist) * strength;
      } else {
        velRef.current.vx *= FRICTION;
        velRef.current.vy *= FRICTION;
      }

      const speed = Math.hypot(velRef.current.vx, velRef.current.vy);
      if (speed > MAX_SPEED) {
        velRef.current.vx = (velRef.current.vx / speed) * MAX_SPEED;
        velRef.current.vy = (velRef.current.vy / speed) * MAX_SPEED;
      }

      posRef.current.x += velRef.current.vx;
      posRef.current.y += velRef.current.vy;

      if (posRef.current.x < MARGIN) {
        posRef.current.x = MARGIN;
        velRef.current.vx = Math.abs(velRef.current.vx) * 0.5;
      }
      if (posRef.current.x > vw - elW - MARGIN) {
        posRef.current.x = vw - elW - MARGIN;
        velRef.current.vx = -Math.abs(velRef.current.vx) * 0.5;
      }
      if (posRef.current.y < MARGIN) {
        posRef.current.y = MARGIN;
        velRef.current.vy = Math.abs(velRef.current.vy) * 0.5;
      }
      if (posRef.current.y > vh - elH - MARGIN) {
        posRef.current.y = vh - elH - MARGIN;
        velRef.current.vy = -Math.abs(velRef.current.vy) * 0.5;
      }

      el.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [mounted, touch]);

  function teleport() {
    const el = elRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const elW = rect.width;
    const elH = rect.height;
    const aRect = giftARef.current?.getBoundingClientRect() ?? null;

    let nextX = posRef.current.x;
    let nextY = posRef.current.y;
    for (let i = 0; i < 20; i++) {
      const x = MARGIN + Math.random() * Math.max(0, vw - elW - MARGIN * 2);
      const y = MARGIN + Math.random() * Math.max(0, vh - elH - MARGIN * 2);
      const overlaps =
        aRect &&
        x < aRect.right + 8 &&
        x + elW > aRect.left - 8 &&
        y < aRect.bottom + 8 &&
        y + elH > aRect.top - 8;
      nextX = x;
      nextY = y;
      if (!overlaps) break;
    }
    posRef.current.x = nextX;
    posRef.current.y = nextY;
    el.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`;
  }

  function handleTouchTap(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    e.stopPropagation();
    teleport();
  }

  return (
    <button
      ref={elRef}
      type="button"
      aria-label={`선물 B: ${label}`}
      onClick={touch ? handleTouchTap : (e) => e.preventDefault()}
      onTouchStart={touch ? handleTouchTap : undefined}
      className="fixed left-0 top-0 z-20 w-56 select-none rounded-2xl border-2 border-purple-300 bg-white px-5 py-4 text-center shadow-xl shadow-purple-200/60 will-change-transform"
      style={{
        transform: "translate3d(-9999px, -9999px, 0)",
        touchAction: "none",
      }}
    >
      <div className="font-bold text-purple-900 truncate">{label}</div>
      <div className="mt-1 text-[10px] uppercase tracking-wide text-purple-400">
        선물 B
      </div>
    </button>
  );
}
