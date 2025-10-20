import React from "react";
import { useLocation } from "react-router-dom";

export default function LinkBadgePortal() {
  const { pathname } = useLocation();
  // Render ONLY on dashboard route(s). Adjust the prefix if your path differs.
  const show = pathname.startsWith("/dashboard");
  const [state, setState] = React.useState({ status: "checking", count: 0, last: null });

  React.useEffect(() => {
    if (!show) return;
    let cancelled = false;
    async function check() {
      try {
        const r = await fetch("/api/v1/devices", { headers: { Accept: "application/json" } });
        if (!r.ok) throw new Error(String(r.status));
        const js = await r.json();
        if (cancelled) return;
        const devices = js?.devices ?? [];
        setState({
          status: "ok",
          count: devices.length,
          last: devices[0]?.last_seen ?? null,
        });
      } catch {
        if (!cancelled) setState((s) => ({ ...s, status: "down", count: 0, last: null }));
      }
    }
    check();
    const t = setInterval(check, 10000);
    return () => { cancelled = true; clearInterval(t); };
  }, [show]);

  if (!show) return null;

  const { status, count, last } = state;
  const bg = status === "checking" ? "#888" : status === "ok" ? "#0a0" : "#c00";
  const txt = status === "checking" ? "Checking link…" : status === "ok" ? "Cloud linked" : "No link";

  return (
    <div
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        zIndex: 9999,
        background: bg,
        color: "#fff",
        padding: "8px 12px",
        borderRadius: 999,
        fontFamily: "system-ui, sans-serif",
        cursor: "default",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      }}
      title="Neptune cloud connectivity"
    >
      {txt} · {count} device{count === 1 ? "" : "s"}{last ? ` · last ${last}` : ""}
    </div>
  );
}
