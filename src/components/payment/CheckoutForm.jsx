/**
 * Checkout component
 * 
 * Purpose:
 * Handle and process transactions
 * Only triggered when a checkoutItem is set
 * 
 */
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import Spinner from "./Spinner"; 
import { configs } from "./configs";
import { unitToString } from "./OrderConfirmation";
import { sContract } from "../../contracts/contractRef";

const presaleProducer = {
  producer: "to be announced",
  verifier: "npc network",
  type: "mitigation",
  location: "MN, USA",
  supply: 10000, //Dummy
  totalLandArea: 3600,
};

const Form = ({ item }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  const { payAmount } = item || {};

  const amount = 1; //Test

  useEffect(() => {
    // Logic to enable/disable the submit button
    setCanSubmit(stripe !== null && elements !== null && !isProcessing);
  }, [stripe, elements, isProcessing]);

  const onSuccess = async () => {
    try {
      const _lastCertId = await sContract.getTotalCertificates();
      const { producer, verifier, type } = presaleProducer;
      await sContract.buyCredits("Test", producer, verifier, type, amount, 50);
      return _lastCertId;
    } catch (error) {
      setError(error.message);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsProcessing(true);
    setMessage(null); // Clear previous messages

    const newCert = await onSuccess();

    //##TO-DO onSuccess should be run in order completion
    if (newCert) {
      const { error } = await stripe.confirmPayment({
        elements,
        //confirmParams: { return_url: `http://app.neptunechain.io/certificate/${newCert + 1}` },
        confirmParams: { return_url: `${window.location.origin}/completion` },
      });

      if (error) {
        const message =
          error.type === "card_error" || error.type === "validation_error"
            ? error.message
            : "An unexpected error occurred.";
        setMessage(message);
      } else {
        // Successful Payment
      }
    }

    setIsProcessing(false);
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    disabled: { opacity: 0.5 },
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      style={{ maxWidth: "400px", margin: "0 auto", position: "relative" }}
    >
      <p>Payments are handled by Stripe</p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        id="payment-element-container"
      >
        <PaymentElement id="payment-element" />
      </motion.div>

      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        animate={isProcessing ? "disabled" : ""}
        disabled={!canSubmit}
        id="submit"
        style={{ marginTop: "20px", width: "100%" }}
      >
        {isProcessing ? (
          <Spinner />
        ) : (
          `Pay ${item?.data?.currency?.toUpperCase?.()} ${unitToString(
            payAmount
          )}`
        )}
      </motion.button>

      {message && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          id="payment-message"
          style={{ marginTop: "20px", color: "red", textAlign: "center" }}
        >
          {message}
        </motion.div>
      )}
    </form>
  );
};

const CheckoutForm = ({ item }) => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const { serverUrl } = configs || {};
  const stripe_config = { stripePromise, clientSecret };

  const { payAmount } = item || {};

  useEffect(() => {
    console.log("stripe_config", stripe_config);
  }, [stripe_config]);

  // Load Stripe
  useEffect(() => {
    fetch(`${serverUrl}/stripe/config`, {
      method: "POST",
    }).then(async (r) => {
      const { publishableKey } = await r.json();
      console.log("publishableKey", publishableKey);
      setStripePromise(loadStripe(publishableKey));
    });
  }, [serverUrl]);

  // Create Payment Intent
  useEffect(() => {
    //#REQ# SERVER, STRIPE, AND PAY AMOUNT (ABOVE $0.50 [50 CENTS]) SHOULD BE DEFINED.
    console.log(
      "isIntentful",
      serverUrl && stripePromise && payAmount >= 50,
      serverUrl,
      stripePromise,
      payAmount
    );
    if (serverUrl && stripePromise && payAmount >= 50) {
      fetch(`${serverUrl}/stripe/create/payment_intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currency: "USD",
          amount: payAmount,
        }),
      }).then(async (result) => {
        const { payment_intent } = await result.json();
        setClientSecret(payment_intent?.clientSecret);
      });
    }
  }, [stripePromise, item]);

  //#REQ# STRIPE, CLIENT SECRET AND ITEM SHOULD BE DEFINED.
  if (!stripePromise || !clientSecret || !item) {
    return;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <Form item={item} />
    </Elements>
  );
};

export default CheckoutForm;
