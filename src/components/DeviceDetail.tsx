import React from "react";
import { fetchLatest, fetchReadings, type Latest, type Reading } from "../lib/api";

export const DeviceDetail: React.FC<{ deviceId: string }> = ({ deviceId }) => {
  const [latest, setLatest] = React.useState<Latest | null>(null);
  const [rows, setRows] = React.useState<Reading[]>([]);
  const [err, setErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [l, r] = await Promise.all([fetchLatest(deviceId), fetchReadings(deviceId, 100)]);
        if (!mounted) return;
        setLatest(l); setRows(r);
      } catch (e: any) {
        if (mounted) setErr(String(e));
      }
    })();
    return () => { mounted = false; };
  }, [deviceId]);

  if (err) return <p style={{ color: "crimson" }}>Error: {err}</p>;

  return (
    <div>
      <h2>Device: {deviceId}</h2>
      {latest ? (
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div><b>TS</b><div>{latest.ts}</div></div>
          <div><b>pH</b><div>{latest.ph}</div></div>
          <div><b>NTU</b><div>{latest.ntu}</div></div>
          <div><b>TDS</b><div>{latest.tds_ppm}</div></div>
          <div><b>N</b><div>{latest.npk_n}</div></div>
          <div><b>P</b><div>{latest.npk_p}</div></div>
          <div><b>K</b><div>{latest.npk_k}</div></div>
          <div><b>Temp °C</b><div>{latest.temp_c}</div></div>
        </div>
      ) : <p>No latest reading.</p>}

      <h3 style={{ marginTop: 20 }}>Recent readings</h3>
      <div style={{ maxHeight: 300, overflow: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th align="left">ts</th><th>pH</th><th>NTU</th><th>TDS</th>
              <th>N</th><th>P</th><th>K</th><th>Temp</th><th>FW</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.ts}</td>
                <td align="center">{r.ph}</td>
                <td align="center">{r.ntu}</td>
                <td align="center">{r.tds_ppm}</td>
                <td align="center">{r.npk_n}</td>
                <td align="center">{r.npk_p}</td>
                <td align="center">{r.npk_k}</td>
                <td align="center">{r.temp_c}</td>
                <td align="center">{r.fw_version}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
