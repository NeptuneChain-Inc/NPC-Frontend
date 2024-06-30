import { logDev } from "../scripts/helpers";
import { DataCard, OverviewCard } from "./elements";
import {
  ChartCard,
  StatusCard,
  TransactionHistoryCard,
} from "./elements/cards";
import { motion } from "framer-motion";

export const renderCard = (card, refStates = {}) => {
  logDev("Rendering Card", { card });
  const { type, data } = card || {};
  const { id } = data || {};

  const { refFocus, setRefFocus } = refStates || {};

  const { deviceID } = refFocus || {};

  switch (type) {
    case "overview": {
      if (data) {
        return <OverviewCard {...{ data }} />;
      }
    }
    case "device_details": {
      if (id) {
        return <StatusCard {...{ deviceID: id, setRefFocus}}/>;
      }
    }
    case "device_data": {
      if (deviceID) {
        return <ChartCard {...{ deviceID }} />;
      } else {
        return <p>No Device Selected</p>
      }
    }
    case "tx-history": {
      if (data) {
        return <TransactionHistoryCard {...{ data }} />;
      }
    }
    default:
      break;
  }

  return <p>Data Not Available</p>;
};
