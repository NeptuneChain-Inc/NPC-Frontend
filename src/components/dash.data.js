// NB: retrieve list of ids from database and render all details and data for those ids in the appropriate sections.

import {DeviceAPI, MetricAPI} from "../scripts/back_door";
import {logDev} from "../scripts/helpers";
import { getMetric } from "./dash.utils";

const dashDataInit = async (uid) => {
  const devices = await DeviceAPI.devices();
  const metrics = MetricAPI.allMetrics;
  const metric_overviews = await Promise.all(metrics.map(async (metric) => await getMetric(metric, uid)));

  logDev('metric_overviews', {metric_overviews})
  return ({
  environmental: {
    name: "environmental",
    sections: [
      {
        cards: devices.map((id) => ({
          type: "device_details",
          data: {id},
        })),
      },
      {
        cards: [{
          type: "device_data",
        }],
      },
    ],
  },
  financial: {
    name: "Finacial Metrics",
    sections: [
      {
        cards: metric_overviews.map((overview) => ({
            type: "overview",
            data: overview,
          })),
      },
      {
        cards: [
          {
            type: "tx-history",
            data: {
              title: "Transaction History",
              // Dummy transaction data
              transactions: [
                { id: 1, type: "Minted", amount: "10 NPC", date: "2024-01-01" },
                { id: 2, type: "Sold", amount: "5 NPC", date: "2024-01-02" },
                { id: 3, type: "Withdrawal", amount: "$70", date: "2024-01-03" },
                // ... more transactions
              ],
            },
          },
        ],
      },
    ],
  },
  marketplace: {},
})
};

export {
  dashDataInit
}
