import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sculpted by Larry — Personal Training & Online Coaching in Tampa, FL";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F1525",
          padding: "80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 20% 20%, rgba(201,168,76,0.18) 0%, transparent 45%), radial-gradient(circle at 80% 80%, rgba(201,168,76,0.12) 0%, transparent 50%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 500,
              color: "#C9A84C",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            ISSA Certified Trainer
          </div>
          <div
            style={{
              fontSize: 120,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              lineHeight: 1,
              fontFamily: "serif",
            }}
          >
            Sculpted
          </div>
          <div
            style={{
              fontSize: 72,
              fontStyle: "italic",
              color: "#C9A84C",
              marginTop: 8,
              fontFamily: "serif",
            }}
          >
            by Larry
          </div>
          <div
            style={{
              width: 120,
              height: 4,
              background: "#C9A84C",
              marginTop: 32,
              marginBottom: 32,
            }}
          />
          <div
            style={{
              fontSize: 32,
              color: "#B8B5AE",
              textAlign: "center",
            }}
          >
            Personal Training & Online Coaching · Tampa, FL
          </div>
        </div>
      </div>
    ),
    size,
  );
}
