export default {
  server_url: "https://us-central1-app-neptunechain.cloudfunctions.net/app",
  blockchain: {
    MODE: "test",
    NETWORKS: {
      testnet: {
        token: "MATIC",
        chainId: "80002",
        explorer: "https://amoy.polygonscan.com",
        rpc: "https://polygon-amoy.g.alchemy.com/v2/xNT0Vs-Kpgg3Lgdlqjd_Qlg9XNQNfl75",
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
