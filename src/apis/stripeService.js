// src/stripeService.js
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY);

const stripeService = {
  createPaymentIntent: async (amount, currency) => {
    try {
      const stripe = await stripePromise;
      const elements = stripe.elements();
      const cardElement = elements.create('card');
      cardElement.mount('#card-element');
      const { error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        return error;
      }

      const { clientSecret } = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, currency, paymentMethodId: error.paymentMethod.id }),
      }).then((res) => res.json());

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

  createCheckoutSession: async (lineItems) => {
    try {
      const stripe = await stripePromise;
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'https://yourwebsite.com/success',
        cancel_url: 'https://yourwebsite.com/cancel',
      });

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      return result;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};

export default stripeService;