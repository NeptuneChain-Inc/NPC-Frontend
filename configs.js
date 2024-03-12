export default {
  server_url: "https://us-central1-app-neptunechain.cloudfunctions.net/app",
  blockchain: {
    MODE: "test",
    NETWORKS: {
      testnet: {
        token: "MATIC",
        chainId: "80001",
        explorer: "https://mumbai.polygonscan.com",
        rpc: "https://polygon-mumbai.g.alchemy.com/v2/demo",
      },
      mainnet: {
        token: "MATIC",
        chainId: "137",
        explorer: "https://polygonscan.com",
        rpc: "https://polygon-mainnet.g.alchemy.com/v2/demo",
      },
    },
  },
};
