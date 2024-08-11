
const DEV_MODE = false;
const SERVER_PORT = 5252;
const LIVE_SERVER_DOMAIN = "https://us-central1-neptunechain-network.cloudfunctions.net/app";


export const configs =  {
    serverUrl: DEV_MODE ? `http://localhost:${SERVER_PORT}` : LIVE_SERVER_DOMAIN,

}

export const presaleProducer = {
  producer: "TBD/TBA",
  verifier: "npc network",
  type: "mitigation",
  location: "Minnesota, USA",
  supply: 0,
  totalLandArea: "3,300",
  priceId: "price_1OefwvFnymUk0uH4x5faSkF9",
};