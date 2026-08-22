import { ImageResponse } from "next/og";
import { siteName } from "@/lib/seo";

export const alt = "The Odoh Publishers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#0044F1",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "2px solid rgba(255,255,255,0.5)",
            borderRadius: 8,
            padding: "12px 20px",
            marginBottom: 40,
          }}
        >
          <span style={{ fontSize: 16, letterSpacing: 4, color: "rgba(255,255,255,0.7)" }}>
            THE
          </span>
          <span style={{ fontSize: 40, fontWeight: 800, color: "#FFFFFF" }}>ODOH</span>
          <span style={{ fontSize: 14, letterSpacing: 3, color: "rgba(255,255,255,0.7)" }}>
            PUBLISHERS
          </span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 700,
            color: "#FFFFFF",
            maxWidth: 900,
            lineHeight: 1.15,
          }}
        >
          {siteName}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "rgba(255,255,255,0.85)",
            marginTop: 20,
            maxWidth: 800,
          }}
        >
          Nigerian voices, published with care.
        </div>
      </div>
    ),
    { ...size }
  );
}
