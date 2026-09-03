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
          // Black, matching the site. This card was still on the old warm palette,
          // so a shared link previewed in colours that appear nowhere on the page.
          background: "linear-gradient(135deg, #000000 0%, #141414 60%, #2b2b2b 100%)",
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
            }}
          >
            {/* The storefront mark drawn inline, matching Logo and icon.svg.
                It was an emoji, which the card renderer has no font for — the
                tile came out blank white on every shared link. */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M3 8.5 5 4h14l2 4.5" stroke="#1c1c1c" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M3 8.5h18" stroke="#1c1c1c" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M4.5 8.5V20h15V8.5" stroke="#1c1c1c" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M9.5 20v-6h5v6" stroke="#1c1c1c" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
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
            Restaurant & gym management systems
          </div>
          <div style={{ color: "#cfcfcf", fontSize: "30px", marginTop: "24px", maxWidth: "900px" }}>
            Ordering, menus and kitchen. Memberships, classes and check-in.
          </div>
        </div>

        <div style={{ display: "flex", gap: "28px", color: "#9e9e9e", fontSize: "24px" }}>
          <span>Fixed quotes</span>
          <span>·</span>
          <span>Scoped first</span>
          <span>·</span>
          <span>Your data stays yours</span>
        </div>
      </div>
    ),
    size,
  );
}
