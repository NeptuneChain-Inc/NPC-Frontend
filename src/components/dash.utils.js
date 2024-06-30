import { DeviceAPI, MetricAPI } from "../scripts/back_door";
import { handleError } from "../scripts/lib";

export const getMetric = async (metric, uid) => {
  try {
    switch (metric) {
      case "credit_balance":
        return {
          title: "Credit Balance",
          value: await MetricAPI.getMetric(metric, uid),
          unit: "credits",
          icon: "wallet",
        };

      case "credit_price":
        return {
          title: "Credit Price",
          value: `$${await MetricAPI.getMetric(metric, uid)}`,
          unit: "USD",
          icon: "money-bill-1",
        };

      case "equity":
        return {
          title: "Total Equity",
          value: `$${await MetricAPI.getMetric(metric, uid)}`,
          unit: "USD",
          icon: "sack-dollar",
        };

      case "tx_pending":
        return {
          title: "Pending Transactions",
          value: await MetricAPI.getMetric(metric, uid),
          unit: "pending",
          icon: "hourglass-half",
        };

      default:
        break;
    }
  } catch (error) {
    handleError(error.message, error);
  }
};

/**
 * Adds id as key for obtained device data
 * @param {{id: number | string}} card
 * @param {React.Dispatch<React.SetStateAction<{}>>} setDeviceData
 */
export const fetchDeviceData = async (id, setDeviceData) => {
  try {
    const deviceData = await DeviceAPI.data(id);
    if (deviceData) {
      setDeviceData(deviceData);
    } else {
      alert(`Device #${id} Data Unavailable`)
    }
  } catch (error) {
    handleError(error.message, error);
  }
};

/**
 * Generates a random color in hex format.
 * @returns {string} A random color in the format #RRGGBB.
 */
export function getRandomColor() {
  // Generate random values for red, green, and blue
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Convert the RGB values to a hexadecimal string
  const color = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;

  return color;
}
