export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  const coarse =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: coarse)").matches;
  const touchEvents = "ontouchstart" in window;
  return coarse || touchEvents;
}
