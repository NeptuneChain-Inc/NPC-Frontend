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

  transition: 0.5s ease-in-out;
`;

const CARD_WRAPPER = styled.div`
  width: 100%;
  max-width: 1080px;
  height: 100vh;

  display: flex;
  flex-direction: row;
  align-items: flex-start;

  padding: 0.5rem;
  box-sizing: border-box;

  ${({ popup }) => popup && "filter: blur(20px);"}

  overflow: hidden;

  //border: 2px solid green;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    overflow: auto;
  }
`;

const CARD_SECTION_01 = styled.div`
  width: 50%;

  margin-bottom: 1rem;
  margin-right: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  //border: 2px solid blue;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const CARD_SECTION_02 = styled.div`
  width: 100%;
  height: 100%;

  padding: 1rem;
  box-sizing: border-box;

  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;

    overflow: auto;

  //border: 2px solid blue;

  @media (min-width: 769px) {
    width: 50%;
  }
  @media (max-width: 769px) {
    height: auto;
    overflow: visible;
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
  //box-sizing: border-box;
  margin-bottom: 30px;
  background-color: #fff;
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

`;


const CardContent = styled.p`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
  justify-content: center;
  margin: 0;
  font-size: 0.8rem;

  .link {
    color: ${colors.accent};
    font-weight: 500;
    text-decoration: underline;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .link:hover {
    font-size: 0.95rem;
  }
`;

const Title = styled.h1`
font-size: 1.7rem;
  color: #123456;
`;

const Description = styled.p`
  margin-bottom: 1rem;
  text-align: justify;
  font-size: 0.9rem;
`;

const PurchaseForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  width: 100%;
  text-align: left;
  padding: 10px;
  box-sizing: border-box;

`;

const CheckoutInfo = styled(Description)`
  text-align: justify;
  width: 80%;
  font-style: italic;
  font-size: 0.8rem;
  margin: 0;
`;

const FormInputs = styled.div`
width: 100%;
padding: 0.5rem 1rem;

box-sizing: border-box;

`;

const inputGlobalStyles = `
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

const InputSelect = styled.select`
  ${inputGlobalStyles}
`;

const InputBox = styled.input`
  ${inputGlobalStyles}
`;

const Button = styled.button`
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
  width: 90%;
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
`;

const ErrorMessage = styled.div`
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

//const mitigationCredits_priceID = "price_1OefwvFnymUk0uH4x5faSkF9"; //Test
const mitigationCredits_priceID = "price_1OaOZBFd0vZYtswya23NAAor";

const PresaleScreen = ({APP}) => {
  const [amount, setAmount] = useState(1);
  const [selectedType, setSelectedType] = useState(certificateTypes[0]);
  const [name, setName] = useState("Presale");
  const [selectedProducer, setSelectedProducer] = useState(presaleProducer);
  // const [cardElement, setCardElement] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastCertId, setlastCertId] = useState(null);

  const stripe = useStripe();
  console.log("stripe", stripe);

 // const { routePath } = APP?.STATES || {};
  const { setRoutePath } = APP?.ACTIONS || {};

  useEffect(() => {
    console.log("SelectedType", selectedType);
  }, [selectedType]);

  useEffect(() => {
    setRoutePath('presale')
    // //load stripe on mount
    // loadStripeElement()

    fetchChainData();

    const { producer, verifier, type } = selectedProducer;
    fetchIssuedSupply(producer,verifier,type)
  }, []);

  useEffect(() => {
    
  }, [selectedProducer])
  

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
      setError(`Error fetching data. Please try again later. - [${error.message}]`);
    }
  };

  const fetchIssuedSupply = async (producer, verifier, creditType) => {
    try {
      const supply = await sContract.getSupply(producer, verifier, creditType);
      const _availableSupply = NUMBERS.toNumber(supply?.available);
      setSelectedProducer({...selectedProducer, supply: _availableSupply})
    } catch (error) {
      console.error("Error fetching issued supply:", error);
      setError(`Error fetching credit supply. Please try again later. - [${error.message}]`);
    }
  };

  const onSuccess = async () => {
    try {
      const { producer, verifier, type } = selectedProducer;
      await sContract.buyCredits(
        name,
        producer,
        verifier,
        type,
        amount,
        50,
      );
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  };

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
      const stripe_services = stripeServices(stripe);

      const getlineItem = [
        {
          price: mitigationCredits_priceID, // id of the price to purchase
          quantity: NUMBERS.toNumber(amount),
        },
      ];

      //TO-DO: FOR DEV ___ TO BE REMOVED
     if(await onSuccess()){
      console.log("Payment processed");
     }

      const checkout = await stripe_services.createCheckoutSession(getlineItem, lastCertId, name);
      console.log(
        "Processing payment for:",
        selectedType.name,
        "Amount:",
        amount,
        "Checkout:",
        checkout
      );

      // const paymentIntent = await stripe_services.createPaymentIntent(amount, "usd", cardElement);

      //await createPaymentIntent(amount, selectedType.id);
      // console.log("Processing payment for:", selectedType.id, "Amount:", amount, "Intent:", paymentIntent);

    } catch (error) {
      console.error("Error:", error);
      setError(`Failed to process payment. Please try again: [${error.message}]`);
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

        <CARD_SECTION_01>
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
                    <p style={{fontSize: '0.7rem', marginTop: '0.5rem'}}>Supplier: {selectedProducer?.producer.toUpperCase()}</p>
                  </CardContent>
                  
                  <CardContent>
                    <span className="link">About this project</span>
                  </CardContent>
                </InfoBox>
                
                <span className="disclaimer">This purchase is a pre-order. Farmer details and initial supply information will be available upon the launch of our marketplace.</span>
        </CARD_SECTION_01>

        <CARD_SECTION_02>
          <Title>Nutrient Removal Certificates Presale</Title>

          <Description>
            Remove pollution, support the environment, and create an impact you can count on. All NeptuneChain Nutrient Pollution Credits™, are third-party verified and quantified. 
            <br/><br/>
            Each purchase comes with a certificate that transparently confirms your contribution to pollution removal and tracks your environmental impact in real-time.
          </Description>

          <PurchaseForm >
              <CheckoutInfo>
                <h3>Regenerative Pollution offsets</h3>
                Each NeptuneChain Nutrient Pollution Credit™ signifies the removal of 1 pound (lbs) of nutrient pollution, 
                with a unique mix of Nitrogen, Phosphorus, and other pollutants, fostering environmental regeneration.
              </CheckoutInfo>

              <FormInputs>
                {/* <InputSelect
                  value={selectedType.id}
                  onChange={(e) =>
                    setSelectedType(
                      certificateTypes.find(
                        (type) => type.id === e.target.value
                      )
                    )
                  }
                >
                  {certificateTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </InputSelect> */}

                {/* <InputBox
                      type="text"
                      id="name"
                      value={name}
                      placeholder="Name on certificate (optional)"
                      onChange={(e) => setName(e.target.value)}
                    /> */}

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
              {loading ? "Processing..." : "Buy Regenerative Pollution Offsets"}
            </Button>
          </PurchaseForm>
        </CARD_SECTION_02>
      </CARD_WRAPPER>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FULL_PAGE_CONTAINER>
  );
};

const Presale = ({APP}) => {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    if (!stripePromise) {
      loadStripePromise();
    }
  }, []);

  const loadStripePromise = async () => {
    try {
      //Initiate Stripe
      const liveStripe = await AppConfigs.getAPI("stripe");
      //const testStripe = 'pk_test_51NTLlPFnymUk0uH4vxETrYPfIgizozEwByB2uPCcjZFJhBLR45bYS20M3a7KTI4PTwZKg6eMPDbeOPF1PBQr0OBa000EGQPaAB'
      setStripePromise(loadStripe(liveStripe));
    } catch (error) {
      console.error(error);
    }
  };

  if (!stripePromise) {
    return;
  }

  return (
    <Elements stripe={stripePromise}>
      <PresaleScreen APP={APP} />
    </Elements>
  );
};

export default Presale;
