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
import MapBox from "../elements/MapBox";
import { FaCertificate, FaLeaf } from "react-icons/fa6";
import styled from "styled-components";



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

  });

  // Initialize checkout cart
  const checkoutItems = [
    {
      priceID: presaleProducer.priceId,
      quantity: NUMBERS.toNumber(amount),
    },
  ];

  const handlePayment = async () => {
    setIsPaying(true);
  };

  return (
    <FULL_PAGE_CONTAINER
 
    >
      <div id="checkout"></div>

      <MapBox />
      <CARD_WRAPPER>
        <CARD_SECTION>
        </CARD_SECTION>

        {/* Loads payment processing component if isPaying, otherwise load ProductPage. */}
        {transitions((style, isPaying) =>
          !isPaying ? (
            <ProductDisplay supplyManagement={{amount, setAmount}} handlePayment={handlePayment} />
          ) : (
            <CARD_SECTION style={style}>
              <Payment setIsPaying={setIsPaying} checkoutItems={checkoutItems} />
            </CARD_SECTION>
          )
        )}
      </CARD_WRAPPER>

      <div className="features">

      <div className="features-section">
        <FaLeaf />
        <div className="features-section-title">Eliminate Pollution</div>
        <div className="features-section-paragraph">
          Enhance water quality and reduce pollution. Each purchase includes a
          real-time tracking certificate, ensuring verified digital impacts.
        </div>
      </div>
      <div className="features-section">
        <FaCertificate />
        <div className="features-section-title">
          Nutrient Pollution Certificates
        </div>
        <div className="features-section-paragraph">
          Each credit offsets 1 pound of mixed nutrient pollutants in the
          watershed, supporting vital environmental conservation and restoration
          efforts.
        </div>
      </div>
</div>
    </FULL_PAGE_CONTAINER>
  );
};



export default Presale;
