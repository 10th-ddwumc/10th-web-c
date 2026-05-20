import { useState, useEffect, useRef } from "react";
import { useThrottle } from "../hooks/useThrottle";

export function ThrottledScroll() {
  const INTERVAL = 200;
  const USE_THROTTLE = true; 

  const [scrollY, setScrollY] = useState(0);
  const rawCountRef = useRef(0);
  const [rawCount, setRawCount] = useState(0);

  const throttledScrollY = useThrottle(scrollY, INTERVAL);
  const activeScrollY = USE_THROTTLE ? throttledScrollY : scrollY;

  const throttledCountRef = useRef(0);
  const [throttledCount, setThrottledCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      rawCountRef.current += 1;
      setRawCount(rawCountRef.current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (activeScrollY === 0 && throttledCountRef.current === 0) return;
    throttledCountRef.current += 1;
    setThrottledCount(throttledCountRef.current);
  }, [activeScrollY]);

  useEffect(() => {
    console.log("[raw] scrollY:", scrollY);
  }, [scrollY]);

  useEffect(() => {
    console.log("[throttled] scrollY:", throttledScrollY);
  }, [throttledScrollY]);

  return (
    <div style={{ fontFamily: "monospace" }}>
      <div
        style={{
          position: "fixed", top: 0, left: 0, right: 0,
          background: "#0f172a", color: "#f8fafc",
          padding: "16px 24px", zIndex: 100,
          borderBottom: "1px solid #334155",
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          gap: "16px", alignItems: "center",
        }}
      >
        <Stat label="실제 scrollY" value={`${Math.round(scrollY)}px`} />
        <Stat
          label={`throttle된 scrollY (${INTERVAL}ms)`}
          value={`${Math.round(activeScrollY)}px`}
          accent
        />
        <div style={{ display: "flex", gap: "24px" }}>
          <Stat label="raw 이벤트 수" value={rawCount} />
          <Stat label="throttle 이벤트 수" value={throttledCount} accent />
          <Stat
            label="절감율"
            value={
              rawCount > 0
                ? `${(((rawCount - throttledCount) / rawCount) * 100).toFixed(0)}%`
                : "—"
            }
          />
        </div>
      </div>

      <div
        style={{
          position: "fixed", top: 80, right: 24,
          background: USE_THROTTLE ? "#166534" : "#7f1d1d",
          color: "#fff", padding: "6px 14px",
          borderRadius: 6, fontSize: 12, zIndex: 100,
        }}
      >
        {USE_THROTTLE ? "🟢 Throttle ON" : "🔴 Throttle OFF"}
      </div>

      <div
        style={{
          height: 3000, paddingTop: 120, paddingLeft: 24,
          background: "linear-gradient(to bottom, #0f172a, #1e293b)",
          color: "#94a3b8", fontSize: 14, lineHeight: 2,
        }}
      >
        <p style={{ color: "#38bdf8", fontSize: 18, marginBottom: 8 }}>
          ↕ 스크롤을 내려보세요
        </p>
       
        {Array.from({ length: 40 }, (_, i) => (
          <p key={i} style={{ opacity: 0.4 }}>— 스크롤 영역 {i + 1} / 40 —</p>
        ))}
      </div>
    </div>
  );
}

function Stat({
  label, value, accent,
}: {
  label: string; value: string | number; accent?: boolean;
}) {
  return (
    <div>
      <div style={{ fontSize: 10, color: "#64748b", marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: "bold", color: accent ? "#38bdf8" : "#f8fafc" }}>
        {value}
      </div>
    </div>
  );
}