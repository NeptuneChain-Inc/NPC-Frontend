

const express = require("express");
const app = express();
const { resolve } = require("path");
const dotenv = require("dotenv");

/** Handle Fubctions Import */

/** API IMPORTS */
const database = require("./apis/database");
const ethereum = require("./apis/ethereum");
const moralis = require("./apis/moralis");
const livepeer = require("./apis/livepeer");
const maps = require("./apis/maps");
const stripe = require("./apis/stripe");

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

/***********************************#MORALIS*ROUTES******************************************* */
app.post('/moralis/wallet-nfts', async (req, res) => {
    try {
        const { address } = req.body || {};
        const nfts = await moralis.getWalletNFTs(address);
        res.json(nfts);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.post('/moralis/nft-metadata', async (req, res) => {
    try {
        const { address, tokenId } = req.body || {};
        const metadata = await moralis.getNFTMetadata(address, tokenId);
        res.json(metadata);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});


/***********************************#STIPE*ROUTES******************************************* */
app.get("/stripe/config", (req, res) => {
   return res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});


app.post("/stripe/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.createPaymentIntent(req.body);
    const { clientSecret } = paymentIntent || {};

    return clientSecret && res.send({ clientSecret });
  } catch (error) {
    return res.status(400).send({error});
  }
});

app.get("/stripe/get-price/:priceID", async (req, res) => {
  try {
    const price = await stripe.getPrice(req.params);
    return price && res.send({price});
  } catch (error) {
    return res.status(400).send({error});
  }
});
/****************************************************************************************** */

const isFirebaseEnv =
  process.env.FUNCTIONS_EMULATOR === "true" ||
  process.env.NODE_ENV === "production";

if (isFirebaseEnv) {
  exports.app = require("firebase-functions").https.onRequest(app);
  console.log(`SERVER IS LIVE!!`)
} else {
  app.listen(process.env.TEST_PORT || 3000, () =>
    console.log(`Node server listening at http://localhost:${PORT}`)
  );
}
