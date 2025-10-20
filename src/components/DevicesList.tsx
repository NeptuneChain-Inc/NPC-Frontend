import React from "react";
import { fetchDevices, type Device } from "../lib/api";

export const DevicesList: React.FC = () => {
  const [devices, setDevices] = React.useState<Device[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchDevices()
      .then(setDevices)
      .catch((e) => setErr(String(e)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading devices…</p>;
  if (err) return <p style={{ color: "crimson" }}>Error: {err}</p>;
  if (!devices.length) return <p>No devices yet.</p>;

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th align="left">Device</th><th>Last Seen</th><th>Total</th><th>Status</th>
        </tr>
      </thead>
      <tbody>
        {devices.map((d) => (
          <tr key={d.id}>
            <td><a href={`#/devices/${encodeURIComponent(d.id)}`}>{d.id}</a></td>
            <td align="center">{d.last_seen ?? "—"}</td>
            <td align="center">{d.total}</td>
            <td align="center">{d.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
