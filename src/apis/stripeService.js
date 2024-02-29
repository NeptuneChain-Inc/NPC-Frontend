/**
 * Creates a stripe service object.
 *
 * @param {Object} stripe - The stripe object.
 * @returns {Object} The stripe services object.
 *
 * @property {Function} createPaymentIntent - Creates a payment intent.
 * @param {number} amount - The amount of the payment.
 * @param {string} currency - The currency of the payment.
 * @param {Object} cardElement - The card element.
 * @returns {Promise<Object>} The payment intent object.
 *
 * @property {Function} createCheckoutSession - Creates a checkout session.
 * @param {Array} lineItems - The line items for the checkout session.
 * @param {number} lastCertId - The last certificate ID.
 * @param {string} clientName - The client name.
 * @returns {Promise<Object>} The checkout session result.
 */
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
