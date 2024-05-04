// src/pages/Presale.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { animated, useTransition } from "react-spring";

import MapBox from "../elements/MapBox";
import Payment from "../payment/Payment";

import { NUMBERS } from "../../scripts/helpers";

import { colors } from "../../data/styles";

const presaleProducer = {
  producer: "TBD/TBA",
  verifier: "npc network",
  type: "mitigation",
  location: "Minnesota, USA",
  supply: 0,
  totalLandArea: "3,300",
  priceId: "price_1OefwvFnymUk0uH4x5faSkF9",
};

const Presale = ({ APP }) => {
  const [amount, setAmount] = useState(1);

  const [loading, setLoading] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState("");

  const { setRoutePath } = APP?.ACTIONS || {};

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

  const lineItems = [
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
          <MapBox />

          <InfoBox>
            <CardContent>
              <h3>A farmer near you is selling now</h3>
            </CardContent>
            <CardContent>
              <Flex direction="row" justify="space-between">
                <p>{presaleProducer?.location}</p>
                <p>{presaleProducer?.totalLandArea} acres</p>
              </Flex>
            </CardContent>
            <CardContent>
              <p className="subtext">
                Supplier: {presaleProducer?.producer.toUpperCase()}
              </p>
            </CardContent>

            <CardContent>
              <span className="link">About this project</span>
            </CardContent>
          </InfoBox>

          <span className="disclaimer">
            This is a pre-order for verified impact certificates. Detailed information
            about the farmer and supply will be provided with the launch of our marketplace.
          </span>
        </CARD_SECTION>

        {transitions((style, isPaying) =>
          !isPaying ? (
            <CARD_SECTION style={style}>
              <Title>Eliminate Pollution</Title>

              <Description>
                Enhance water quality and reduce pollution. 
                Each purchase includes a real-time tracking certificate, ensuring verified digital impacts.
                <br />
              </Description>
              <FormWrapper>
                <FormInfo>
                  <h3>Nutrient Pollution Certificates</h3>
                  Each credit offsets 1 pound of mixed nutrient pollutants in the watershed,
                  supporting vital environmental conservation and restoration efforts. 
                </FormInfo>

                <FormInputs>
                  <InputBox
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter your amount"
                  />
                </FormInputs>

                <Button
                  id="remove-carbon-button"
                  className="py-1.5 px-6 text-sm md:py-2.5 md:px-7 font-bold rounded focus:ring-4 focus:ring-teal-700 focus:ring-opacity-50 text-center text-gray-900 bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 w-full"
                  onClick={handlePayment}
                >
                  {loading ? "Processing..." : "Buy Offsets"}
                </Button>
              </FormWrapper>
            </CARD_SECTION>
          ) : (
            <CARD_SECTION style={style}>
              <Payment setIsPaying={setIsPaying} lineItems={lineItems} />
            </CARD_SECTION>
          )
        )}
      </CARD_WRAPPER>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FULL_PAGE_CONTAINER>
  );
};

const FULL_PAGE_CONTAINER = styled(motion.div)`
  position: fixed;
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 2rem 1rem;
  box-sizing: border-box;

  overflow: auto;
  overflow-x: hidden;

  transition: 0.5s ease-in-out;
`;

const CARD_WRAPPER = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 1080px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;

  padding: 1rem;
  box-sizing: border-box;

  ${({ popup }) => popup && "filter: blur(20px);"}

  overflow: hidden;

  border-radius: 10px;
  // box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow: auto;
  }
`;

const CARD_SECTION = styled(animated.div)`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 1rem;
  box-sizing: border-box;

  border-radius: 10px;
  // box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;

  @media (max-width: 767px) {
    width: 100%;
    padding: 0.5rem;
  }
`;

const Flex = styled.div`
  width: ${({ width }) => (width ? width : "50%")};
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : "row")};
  align-items: ${({ align }) => (align ? align : "flex-start")};
  justify-content: ${({ justify }) => (justify ? justify : "flex-start")};
`;

const InfoBox = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;

  padding: 0.5rem 0;

  margin-bottom: 30px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  border: 2px solid black;
  border-top: none;

  h3 {
    margin: 0 0 10px;
    font-size: 16px;
    font-weight: bold;
    color: ${colors.accent};
  }

  p {
    margin: 0;
  }
`;

const CardContent = styled.div`
  width: 80%;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;

  padding: 0.1rem;

  h3 {
    margin: 0;
  }

  .subtext {
    margin: 0;
  }

  .link {
    color: ${colors.accent};
    font-weight: 500;
    margin: 0;
    font-size: 0.9rem;
    transition: 0.3s ease;
    cursor: pointer;
  }

  .link:hover {
    text-decoration: underline;
  }
`;

const Title = styled.h1`
  font-size: 1.7rem;
  color: #123456;
`;

const Description = styled.p`
  margin: 0;
  text-align: justify;
  font-size: 0.9rem;
`;

export const FormWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: justify;

  overflow: auto;

  margin: 0;
  padding: 10px;
  box-sizing: border-box;
`;

export const FormInfo = styled(Description)`
  text-align: justify;
  width: 80%;
  font-style: italic;
  font-size: 0.8rem;
  margin: 0;
`;

export const FormInputs = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;

  box-sizing: border-box;
`;

export const inputGlobalStyles = `
width: 95%;
display: block;

font-family: inherit;
font-size: 0.8rem;
line-height: 1.5rem;
font-weight: 700;
color: rgba(31, 33, 35, 1);

outline: none;
appearance: none;
background-color: rgb(255, 255, 255);
border: 1px solid rgba(228, 231, 233, 1);
box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
border-radius: 0.25rem;

margin: 0.2rem 0;
padding: 0.75rem;
box-sizing: border-box;
`;

export const InputBox = styled.input`
  ${inputGlobalStyles}
`;

export const Button = styled.button`
  border: 0px solid;
  box-sizing: border-box;
  border-color: rgba(250, 251, 251, 1);
  margin: 0px;
  font-family: inherit;
  text-transform: none;
  background-image: none;
  cursor: pointer;
  padding: 0px;
  appearance: button;
  //width: 90%;
  border-radius: 0.25rem;
  background: ${colors.accent};
  text-align: center;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 700;
  color: white;
  padding-left: 1.75rem;
  padding-right: 1.75rem;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  margin-top: 20px;
  transition: 0.3s ease-in-out;

  &:hover {
    scale: 1.1;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  margin: 10px 0;
`;

export default Presale;
