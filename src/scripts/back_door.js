import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import configs from "../../../configs";

/** * @returns firebase config object */
const getFirebaseConfig = async () =>
  (await axios.post(`${configs.server_url}/firebase/config`, {}))?.data;

const initAuth = async () =>
  await getFirebaseConfig().then((firebaseConfig) =>
    getAuth(initializeApp(firebaseConfig))
  );

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

/** * @returns signer or error object */
const getSigner = async () =>
  (await axios.post(`${configs.server_url}/ethereum/get/signer`, {}))?.data;

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

/** * @returns wallet_nfts or error object */
const getWalletNFTs = async (address) =>
  (
    await axios.post(`${configs.server_url}/moralis/get/wallet_nfts`, {
      address,
    })
  )?.data;
/** * @returns nft_metadata or error object */
const getNFT_metadata = async (address, tokenId) =>
  (
    await axios.post(`${configs.server_url}/moralis/get/nft_metadata`, {
      address,
      tokenId,
    })
  )?.data;

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

export {
  firebaseAPI,
  UserAPI,
  MediaAPI,
  EthereumAPI,
  LivepeerAPI,
  MapsAPI,
  NFT_API,
  StripeAPI,
};
