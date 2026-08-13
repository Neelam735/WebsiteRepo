import { ImageResponse } from "next/og";

import { site } from "@/content/site";

/**
 * Social share card, rendered at build/request time and inherited by every
 * route that doesn't define its own. Generated rather than shipped as a PNG so
 * it stays in sync with the brand colours and never goes stale.
 */
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #14100d 0%, #7a2f1a 55%, #b9481d 100%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "30px",
            }}
          >
            🏪
          </div>
          <div style={{ color: "#ffffff", fontSize: "30px", fontWeight: 700 }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: "68px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Software that works as hard as you do
          </div>
          <div style={{ color: "#f3d998", fontSize: "30px", marginTop: "24px", maxWidth: "900px" }}>
            Websites, online ordering and booking systems for local businesses
          </div>
        </div>

        <div style={{ display: "flex", gap: "28px", color: "#e7dcd0", fontSize: "24px" }}>
          <span>Fixed quotes</span>
          <span>·</span>
          <span>Live in weeks</span>
          <span>·</span>
          <span>You own everything</span>
        </div>
      </div>
    ),
    size,
  );
}
