

const express = require("express");
const app = express();
const { resolve } = require("path");
const dotenv = require("dotenv");
const { getWalletNFTs, getNFTMetadata } = require("./apis/moralis");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

dotenv.config();

app.use(express.json());

app.use(express.static(process.env.STATIC_DIR || 'public'));

// ##NB Set which addresses have access to server.
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

/* #MORALIS# */
app.post('/moralis/wallet-nfts', async (req, res) => {
    try {
        const { address } = req.body || {};
        const nfts = await getWalletNFTs(address);
        res.json(nfts);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.post('/moralis/nft-metadata', async (req, res) => {
    try {
        const { address, tokenId } = req.body || {};
        const metadata = await getNFTMetadata(address, tokenId);
        res.json(metadata);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

//
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { currency, amount } = req.body || {};
    const paymentIntent = await stripe.paymentIntents.create({
      currency: currency || "USD",
      amount: amount,
      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

app.get("/get-stripe-price/:priceID", async (req, res) => {
  try {
    const price = await stripe.prices.retrieve(req.params.priceID);
    console.log(price);
    res.send({
      price: price,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

// app.listen(5252, () =>
//   console.log(`Node server listening at http://localhost:5252`)
// );

// exports.app = require("firebase-functions").https.onRequest(app);

const isFirebaseEnv =
  process.env.FUNCTIONS_EMULATOR === "true" ||
  process.env.NODE_ENV === "production";

if (isFirebaseEnv) {
  exports.app = require("firebase-functions").https.onRequest(app);
} else {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`Node server listening at http://localhost:${PORT}`)
  );
}
