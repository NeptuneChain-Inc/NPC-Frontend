// src/pages/Presale.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { AppConfigs } from "../../apis/database";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useStripe } from "@stripe/react-stripe-js";
import { colors } from "../../data/styles";

import stripeServices from "../../apis/stripeService";
import MapBox from "../elements/MapBox";

import { sContract } from "../../contracts/contractRef";
import { NUMBERS } from "../../functions/helpers";

import Payment from "../payment/Payment";

//For animation
import { useSpring, animated, useTransition } from "react-spring";

// Dummy certificate types for demonstration
const certificateTypes = [
  {
    id: "nitrogen",
    name: "Nitrogen Removal Certificate",
    description: "Nitrogen Removal Certificate",
    priceId: "price_1OaOZBFd0vZYtswya23NAAor",
  },
  {
    id: "phosphorus",
    name: "Phosphorus Removal Certificate",
    description: "Phosphorus Removal Certificate",
    priceId: "price_1OaOZ6Fd0vZYtswyZ04AwbNi",
  },
];

const createLineItems = (certificateType, currency, quantity, price) => [
  {
    price_data: {
      currency,
      product_data: {
        name: certificateType.name,
        description: certificateType.description,
      },
      unit_amount: price * 100, // cents,
    },
    quantity,
  },
];

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

  @media (max-width: 767px){
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

const presaleProducer = {
  producer: "TBD/TBA",
  verifier: "npc network",
  type: "mitigation",
  location: "MN, USA",
  supply: 0,
  totalLandArea: 3600,
};

const mitigationCredits_priceID = "price_1OefwvFnymUk0uH4x5faSkF9"; //Test
//const mitigationCredits_priceID = "price_1OaOZBFd0vZYtswya23NAAor";

const PresaleScreen = ({ APP }) => {
  const [amount, setAmount] = useState(1);
  const [selectedType, setSelectedType] = useState(certificateTypes[0]);
  const [name, setName] = useState("Presale");
  const [selectedProducer, setSelectedProducer] = useState(presaleProducer);
  // const [cardElement, setCardElement] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState("");
  const [lastCertId, setlastCertId] = useState(null);

  // const stripe = useStripe();
  // console.log("stripe", stripe);

  // const { routePath } = APP?.STATES || {};
  const { setRoutePath } = APP?.ACTIONS || {};

  //#Animation
  const transitions = useTransition(isPaying, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { display: "none" },
    config: { duration: 500 },
  });

  useEffect(() => {
    console.log("SelectedType", selectedType);
  }, [selectedType]);

  useEffect(() => {
    setRoutePath("presale");
    // //load stripe on mount
    // loadStripeElement()

    fetchChainData();

    const { producer, verifier, type } = selectedProducer;
    fetchIssuedSupply(producer, verifier, type);
  }, []);

  useEffect(() => {}, [selectedProducer]);

  // useEffect(() => {
  //   if(stripe){
  //     //Initiate Card Element
  //     setCardElement(stripe.elements().create("card"));
  //   }
  // }, [stripe])

  // useEffect(() => {
  //   if (cardElement) {
  //     cardElement.mount("#card-element");
  //   }
  // }, [cardElement]);

  // const loadStripeElement = async () => {
  //   try {
  //     //Initiate Stripe
  //     setStripe(await loadStripe(await AppConfigs.getAPI("stripe_test")));
  //   } catch (error) {
  //     setError(`Could not load stripe: ${error.message}`);
  //   }
  // };

  const isValidAmount = (amount) => {
    return !isNaN(amount) && amount > 0;
  };

  const fetchChainData = async () => {
    try {
      const _lastCertId = await sContract.getTotalCertificates();

      setlastCertId(NUMBERS.toNumber(_lastCertId));
    } catch (error) {
      console.error("Error fetching producers:", error);
      setError(
        `Error fetching data. Please try again later. - [${error.message}]`
      );
    }
  };

  const fetchIssuedSupply = async (producer, verifier, creditType) => {
    try {
      const supply = await sContract.getSupply(producer, verifier, creditType);
      const _availableSupply = NUMBERS.toNumber(supply?.available);
      setSelectedProducer({ ...selectedProducer, supply: _availableSupply });
    } catch (error) {
      console.error("Error fetching issued supply:", error);
      setError(
        `Error fetching credit supply. Please try again later. - [${error.message}]`
      );
    }
  };

  const onSuccess = async () => {
    try {
      const { producer, verifier, type } = selectedProducer;
      await sContract.buyCredits(name, producer, verifier, type, amount, 50);
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  };

  const getlineItems = [
    {
      priceID: mitigationCredits_priceID, // id of the price to purchase
      quantity: NUMBERS.toNumber(amount),
    },
  ];

  const handlePayment = async () => {
    if (!isValidAmount(amount)) {
      setError("Please enter a valid amount.");
      return;
    }

    // if(!cardElement){
    //   setError("Payment element not available");
    // }

    setLoading(true);
    setError("");

    try {
      // Call function to handle payment logic

      //const stripe_services = stripeServices(stripe);

      //   //TO-DO: FOR DEV ___ TO BE REMOVED
      //  if(await onSuccess()){
      //   console.log("Payment processed");
      //  }

      // const checkout = await stripe_services.createCheckoutSession(getlineItems, lastCertId, name);
      // console.log(
      //   "Processing payment for:",
      //   selectedType.name,
      //   "Amount:",
      //   amount,
      //   "Checkout:",
      //   checkout
      // );

      // const paymentIntent = await stripe_services.createPaymentIntent(amount, "usd", cardElement);

      //await createPaymentIntent(amount, selectedType.id);
      // console.log("Processing payment for:", selectedType.id, "Amount:", amount, "Intent:", paymentIntent);

      setIsPaying(true);
    } catch (error) {
      console.error("Error:", error);
      setError(
        `Failed to process payment. Please try again: [${error.message}]`
      );
    } finally {
      setLoading(false);
    }
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
                <p>{selectedProducer?.location}</p>
                <p>{selectedProducer?.totalLandArea} acres</p>
              </Flex>
            </CardContent>
            <CardContent>
              <p className="subtext">
                Supplier: {selectedProducer?.producer.toUpperCase()}
              </p>
            </CardContent>

            <CardContent>
              <span className="link">About this project</span>
            </CardContent>
          </InfoBox>

          <span className="disclaimer">
            This purchase is a pre-order. Farmer details and initial supply
            information will be available upon the launch of our marketplace.
          </span>
        </CARD_SECTION>

        {transitions((style, isPaying) =>
          !isPaying ? (
            <CARD_SECTION style={style}>
              <Title>Water Quality Credit Presale</Title>

              <Description>
                Remove pollution, support the environment, and create an impact
                you can count on. All NeptuneChain Nutrient Pollution Credits™,
                are third-party verified and quantified.
                <br />
                <br />
                Each purchase comes with a certificate that transparently
                confirms your contribution to pollution removal and tracks your
                environmental impact in real-time.
              </Description>
              <FormWrapper>
                <FormInfo>
                  <h3>Regenerative Pollution offsets</h3>
                  Each NeptuneChain Nutrient Pollution Credit™ signifies the
                  removal of 1 pound (lbs) of nutrient pollution, with a unique
                  mix of Nitrogen, Phosphorus, and other pollutants, fostering
                  environmental regeneration.
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
                  {loading
                    ? "Processing..."
                    : "Buy Offsets"}
                </Button>
              </FormWrapper>
            </CARD_SECTION>
          ) : (
            <CARD_SECTION style={style}>
              <Payment setIsPaying={setIsPaying} lineItems={getlineItems} />
            </CARD_SECTION>
          )
        )}
      </CARD_WRAPPER>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FULL_PAGE_CONTAINER>
  );
};

// const Presale = ({ APP }) => {
//   const [stripePromise, setStripePromise] = useState(null);

//   useEffect(() => {
//     if (!stripePromise) {
//       loadStripePromise();
//     }
//   }, []);

//   const loadStripePromise = async () => {
//     try {
//       //Initiate Stripe
//       const liveStripe = await AppConfigs.getAPI("stripe");
//       //const testStripe = 'pk_test_51NTLlPFnymUk0uH4vxETrYPfIgizozEwByB2uPCcjZFJhBLR45bYS20M3a7KTI4PTwZKg6eMPDbeOPF1PBQr0OBa000EGQPaAB'
//       setStripePromise(loadStripe(liveStripe));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (!stripePromise) {
//     return;
//   }

//   return (
//     <Elements stripe={stripePromise}>
//       <PresaleScreen APP={APP} />
//     </Elements>
//   );
// };

const Presale = ({ APP }) => {
  return <PresaleScreen APP={APP} />;
};

export default Presale;
