// src/stripeService.js
import { loadStripe } from "@stripe/stripe-js";
import { AppConfigs } from "./database";

const stripeServices = (stripe) => ({
  createPaymentIntent: async (amount, currency, cardElement) => {
    try {
      const { error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        return error;
      }

      const clientSecret = (
        await stripe.paymentIntents.create({
          amount,
          currency,
          payment_method: error.paymentMethod.id,
          confirm: true,
        })
      )?.client_secret;

      const paymentIntent = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      return paymentIntent;
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  createCheckoutSession: async (lineItems, lastCertId, clientName) => {
    try {
      // const session = await stripe.checkout.sessions.create({
      //   payment_method_types: ["card"],
      // });

      // const result = await stripe.redirectToCheckout({
      //   sessionId: session?.id,
      // });

      const result =  await stripe.redirectToCheckout({
        lineItems: lineItems,
        mode: "payment",
        successUrl: `http://app.neptunechain.io/certificate?id=${lastCertId + 1}`,
        clientReferenceId: clientName ? clientName : "Anonymous" + Date.now.toString(), // generate order id
      });

      // // Create a Checkout Session
      // const session = await stripe.checkout.sessions.create({
      //   // payment_method_types: ['card'],
      //   lineItems: lineItems,
      //   mode: "payment",
      //   discounts: [
      //     {
      //       coupon: "uEmkqOr8",
      //     },
      //   ],
      //   successUrl: `http://app.neptunechain.io/certificate?id=${
      //     lastCertId + 1
      //   }`,
      //   clientReferenceId: clientName
      //     ? clientName
      //     : "Anonymous" + Date.now.toString(), // generate order id
      // });
      // var result = undefined;
      // if (session) {
      //   result = await stripe.redirectToCheckout({
      //     sessionId: session.id,
      //   });
      // }

      return result;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
});

export default stripeServices;
