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
    } catch (e) {
      throw e;
    }
  },

  createCheckoutSession: async (lineItems, lastCertId, clientName) => {
    try {
      const result = await stripe.redirectToCheckout({
        lineItems: lineItems,
        mode: "payment",
        successUrl: `http://app.neptunechain.io/certificate?id=${
          lastCertId + 1
        }`,
        clientReferenceId: clientName
          ? clientName
          : "Anonymous" + Date.now.toString(), // generate order id
      });

      return result;
    } catch (e) {
      throw e;
    }
  },
});

export default stripeServices;
