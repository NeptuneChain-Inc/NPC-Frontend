import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import configs from "../../configs";
import { ethers } from "ethers";
import { Network, Alchemy } from "alchemy-sdk";
import { alchemyAPI, mumbaiRPC, privateKey } from "../contracts/ref";

/** * @returns firebase config object */
const getFirebaseConfig = async () =>
  (await axios.post(`${configs.server_url}/firebase/config`, {}))?.data;

const initAuth = async () =>
  await getFirebaseConfig().then((result) => {
    const { firebaseConfig } = result || {};
    return getAuth(initializeApp(firebaseConfig));
  });

const firebaseAPI = {
  get: {
    firebaseConfig: getFirebaseConfig,
    auth: initAuth,
  },
};

const createEmailUser = async (email, username, type, password) =>
  (
    await axios.post(`${configs.server_url}/auth/email/create`, {
      email,
      username,
      type,
      password,
    })
  )?.data;

const createDBUser = async (userdata = { uid, email, username, type }) =>
  (await axios.post(`${configs.server_url}/db/user/create/user`, userdata))
    ?.data;
const handleResetPassword = async (email) =>
  (
    await axios.post(`${configs.server_url}/auth/email/password_reset`, {
      email,
    })
  )?.data;
const getUser = async (uid) =>
  (await axios.post(`${configs.server_url}/db/user/get/user`, { uid }))?.data;
const getUsername = async (username) =>
  (await axios.post(`${configs.server_url}/db/user/get/username`, { username }))
    ?.data;
const getDashbord = async (uid) =>
  (response = await axios.post(`${configs.server_url}/db/user/get/dashboard`, {
    uid,
  }))?.data;
const getUserVideos = async (uid) =>
  (await axios.post(`${configs.server_url}/db/user/get/media/videos`, { uid }))
    ?.data;
const getUserStreams = async (uid) =>
  (await axios.post(`${configs.server_url}/db/user/get/media/streams`, { uid }))
    ?.data;

const UserAPI = {
  get: {
    user: getUser,
    username: getUsername,
    dashboard: getDashbord,
    videos: getUserVideos,
    streams: getUserStreams,
  },
  create: {
    emailUser: createEmailUser,
    dbUser: createDBUser,
  },
  request: {
    passwordReset: handleResetPassword,
  },
};

/** * @returns video or error object */
const getVideo = async (playbackId) =>
  (await axios.post(`${configs.server_url}/db/media/get/video`, { playbackId }))
    ?.data;
/** * @returns stream or error object */
const getStream = async (playbackId) =>
  (
    await axios.post(`${configs.server_url}/db/media/get/stream`, {
      playbackId,
    })
  )?.data;
/** * @returns result object */
const createVideo = async (videoAsset, creatorUID) =>
  (
    await axios.post(`${configs.server_url}/db/media/create/video`, {
      videoAsset,
      creatorUID,
    })
  )?.data;
/** * @returns result object */
const createStream = async (streamData, creatorUID) =>
  (
    await axios.post(`${configs.server_url}/db/media/create/stream`, {
      streamData,
      creatorUID,
    })
  )?.data;

const MediaAPI = {
  get: {
    video: getVideo,
    stream: getStream,
  },
  create: {
    video: createVideo,
    stream: createStream,
  },
};

const getSigner = () => {
  try {
    const provider = new ethers.JsonRpcProvider(mumbaiRPC);
    const wallet = new ethers.Wallet(privateKey, provider);
    const signer = wallet.connect(provider);
    return { provider, signer };
  } catch (error) {
    throw error;
  }
};

/** * @returns signer or error object */
// const getSigner = async () => {
//   const { signer, error } = (
//     await axios.post(`${configs.server_url}/ethereum/get/signer`, {})
//   )?.data;
//   if (signer) {
//     const { provider, wallet } = signer;
//     const _provider = new ethers.providers.JsonRpcProvider(
//       process.env[`${network.toUpperCase()}_RPC`]
//     );
//     const _wallet = new ethers.Wallet(process.env.APP_WALLET_KEY, provider);
//     return wallet.connect(provider);
//   }
// };

const EthereumAPI = {
  get: {
    signer: getSigner,
  },
};

/** * @returns livepeerClient or error object */
const getLivepeerClient = async () =>
  (await axios.post(`${configs.server_url}/livepeer/get/client`, {}))?.data;
/** * @returns viewership or error object */
const getLivepeerViewership = async (playbackId) =>
  (
    await axios.post(`${configs.server_url}/livepeer/get/viewership`, {
      playbackId,
    })
  )?.data;
/** * @returns asset_metrics or error object */
const getLivepeerAssetMetrics = async (assetId) =>
  (
    await axios.post(`${configs.server_url}/livepeer/get/asset_metrics`, {
      assetId,
    })
  )?.data;

const LivepeerAPI = {
  get: {
    livepeerClient: getLivepeerClient,
    viewership: getLivepeerViewership,
    asset_metrics: getLivepeerAssetMetrics,
  },
};

/** * @returns api or error object */
const getMapsAPI = async () =>
  (await axios.post(`${configs.server_url}/maps/get/api`, {}))?.data;

const MapsAPI = {
  get: {
    api: getMapsAPI,
  },
};

// Alchemy Config object
const settings = {
  apiKey: alchemyAPI,
  network: Network.MATIC_AMOY,
};

const alchemy = new Alchemy(settings);

/** * @returns wallet_nfts or error object */
const getWalletNFTs = async (address) => {
  console.log("fetching NFTs for address:", address);
  console.log("...");
  // Print total NFT count returned in the response:
  const nftsForOwner = await alchemy.nft.getNftsForOwner(address);
  console.log("number of NFTs found:", nftsForOwner.totalCount);
  console.log("...");

  const wallet_nfts = [];

  // Print contract address and tokenId for each NFT:
  for (const nft of nftsForOwner.ownedNfts) {
    console.log("===");
    console.log("contract address:", nft.contract.address);
    console.log("token ID:", nft.tokenId);
    wallet_nfts.push(nft);
  }
  console.log("===");
  console.log(wallet_nfts);
  return wallet_nfts;
};
// (
//   await axios.post(`${configs.server_url}/moralis/get/wallet_nfts`, {
//     address,
//   })
// )?.data;
/** * @returns nft_metadata or error object */
const getNFT_metadata = async (address, tokenId) => {
  // Fetch metadata for a particular NFT:
  const response = await alchemy.nft.getNftMetadata(address, tokenId);

  // Print some commonly used fields:
  const metadata = {
    name: response.contract.name,
    symbol: response.contract.symbol,
    type: response.tokenType,
    tokenUri: response.tokenUri,
  };

  return metadata;
};
// (
//   await axios.post(`${configs.server_url}/moralis/get/nft_metadata`, {
//     address,
//     tokenId,
//   })
// )?.data;

const NFT_API = {
  get: {
    wallet_nfts: getWalletNFTs,
    nft_metadata: getNFT_metadata,
  },
};

/** * @returns publishableKey or error object */
const getPublishableKey = async () =>
  (await axios.post(`${configs.server_url}/stripe/config`, {}))?.data;
/** * @returns payment_intent or error object */
const createPaymentIntent = async (body = { amount }) =>
  (await axios.post(`${configs.server_url}/stripe/create/payment_intent`, body))
    ?.data;
/** * @returns price or error object */
const getStripePrice = async (priceID) =>
  (await axios.post(`${configs.server_url}/stripe/get/price`, { priceID }))
    ?.data;

const StripeAPI = {
  get: {
    publishableKey: getPublishableKey,
    price: getStripePrice,
  },
  create: {
    payment_intent: createPaymentIntent,
  },
};

/**
 *
 * @param {*} data object with device data including id { id, name, status, icon }
 * @returns run result
 */
const addDevice = async (data) =>
  (await axios.post(`${configs.server_url}/device`, data))?.data;

const editDevice = async (deviceId, update) =>
  deviceId > 0
    ? (
        await axios.post(`${configs.server_url}/device/edit`, {
          deviceId,
          update,
        })
      )?.data
    : null;

const removeDevice = async (deviceId) =>
  deviceId > 0
    ? (await axios.post(`${configs.server_url}/device/remove`, { deviceId }))
        ?.data
    : null;

//Get all devices
const getDevices = async () => (await axios.post(`${configs.server_url}/devices`,  {}))?.data?.devices;

// *NB: update endpont
const getDeviceData = async (deviceId) =>
  deviceId > 0
    ? (await axios.post(`${configs.server_url}/device/details`, { deviceId }))
        ?.data
    : null;

const emulateDevice = async (deviceId, interval) =>
  deviceId > 0
    ? (
        await axios.post(`${configs.server_url}/device/emulate`, {
          deviceId,
          interval,
        })
      )?.data
    : null;

const DeviceAPI = {
  devices: getDevices,
  add: addDevice,
  edit: editDevice,
  remove: removeDevice,
  emulate: emulateDevice,
  data: getDeviceData,
};

//MetricAPI

const allMetrics = ["credit_balance", "credit_price", "equity", "tx_pending"];

const getMetric = async (metric, uid) => "10";
// String(
//   (await axios.post(`${configs.server_url}/metrics`, { metric, uid }))
//     ?.data || 10
// );

const MetricAPI = {
  allMetrics,
  getMetric,
};

export {
  firebaseAPI,
  UserAPI,
  MediaAPI,
  EthereumAPI,
  LivepeerAPI,
  MapsAPI,
  NFT_API,
  StripeAPI,
  DeviceAPI,
  MetricAPI,
};
