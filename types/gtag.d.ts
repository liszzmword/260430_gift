export {};

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "set" | "js",
      targetId: string | Date,
      params?: Record<string, unknown>,
    ) => void;
    dataLayer?: unknown[];
  }
}
