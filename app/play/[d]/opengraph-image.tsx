import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "갖고 싶은 선물 있어?? 내가 사줄게!!";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #6366f1 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 86,
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.15,
            padding: "0 60px",
          }}
        >
          갖고 싶은 선물 있어??
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 56,
            fontWeight: 700,
            opacity: 0.95,
          }}
        >
          내가 사줄게!!
        </div>
      </div>
    ),
    { ...size },
  );
}
