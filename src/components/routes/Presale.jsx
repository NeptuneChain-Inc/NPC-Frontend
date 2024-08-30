/**
 * Presale Component for the initial offering of credit offsets
 * 
 * Purpose:
 * Retrieves data about the featured producer including producerUsername, verifierUsername, type, location, supply, totalLandArea, priceId
 * Creates a lineItems with the featured producer's item/priceID and quantity
 * Load checkout process if isPaying.
 */
import React, { useEffect, useState } from "react";
import { useTransition } from "react-spring";
import Payment from "../payment/Payment";

import { NUMBERS } from "../../scripts/helpers";

import {ProductDisplay, ProductOrder} from "../payment";
import {CARD_SECTION, CARD_WRAPPER, ErrorMessage, FULL_PAGE_CONTAINER} from "../payment/styled";
import {presaleProducer} from "../payment/data";

// ##TO_DO Check if amount is available from credit supply
const isValidAmount = (amount) => {
  return !isNaN(amount);
}

const Presale = () => {
  const { ACTIONS } = useAppContext();
  const [amount, setAmount] = useState(1);

  const [loading, setLoading] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState("");

  const { setRoutePath } = ACTIONS || {};

  useEffect(() => {
    setRoutePath("presale");
  }, []);

  //#Animation
  const transitions = useTransition(isPaying, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { display: "none" },
    config: { duration: 500 },
  });

  // Initialize checkout cart
  const checkoutItems = [
    {
      priceID: presaleProducer.priceId,
      quantity: NUMBERS.toNumber(amount),
    },
  ];

  const handlePayment = async () => {
    if (!isValidAmount(amount)) {
      setError("Please enter a valid amount.");
      return;
    }
    setError("");
    setIsPaying(true);
  };

  return (
    <FULL_PAGE_CONTAINER
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div id="checkout"></div>

      <CARD_WRAPPER>
        <CARD_SECTION>
        <ProductDisplay />
        </CARD_SECTION>

        {/* Loads payment processing component if isPaying, otherwise load ProductPage. */}
        {transitions((style, isPaying) =>
          !isPaying ? (
            <CARD_SECTION style={style}>
              <ProductOrder isLoading={loading} supplyManagement={{amount, setAmount}} handlePayment={handlePayment} />
            </CARD_SECTION>
          ) : (
            <CARD_SECTION style={style}>
              <Payment setIsPaying={setIsPaying} checkoutItems={checkoutItems} />
            </CARD_SECTION>
          )
        )}
      </CARD_WRAPPER>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FULL_PAGE_CONTAINER>
  );
};



export default Presale;
