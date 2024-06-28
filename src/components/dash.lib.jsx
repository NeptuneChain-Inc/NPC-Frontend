import { logDev } from "../scripts/helpers";
import { DataCard, OverviewCard } from "./elements";
import {
  ChartCard,
  StatusCard,
  TransactionHistoryCard,
} from "./elements/cards";
import { motion } from "framer-motion";

const Card = ({ card }) => {
  logDev("Rendering Card", { card });
  const { type, data } = card || {};
  const { id } = data || {};

  switch (type) {
    case "overview": {
      if (data) {
        return <OverviewCard {...{ data }} />;
      }
    }
    case "device_details": {
      if (id) {
        return <StatusCard deviceID={id} />;
      }
    }
    case "device_data": {
      if (id) {
        return <ChartCard deviceID={id} />;
      }
    }
    case "tx-history": {
      if (data) {
        return <TransactionHistoryCard {...{data}} />;
      }
    }
    default:
      break;
  }

  return <p>Data Not Available</p>;
};

export const renderCard = (card, index) => (
  <motion.div key={index}>
    <Card {...{ card }} />
  </motion.div>
);
