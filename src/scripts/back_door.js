import axios from "axios";
import configs from "../../configs";

/*************************ACOUNT_ENDPOINTS************************************* */
const createAccount = async (params = { uid, email, username, type, PIN }) =>
  (await axios.post(`${configs.server_url}/account/create`, params))?.data;

const registerAccount = async (params = { accountID, role, txAddress }) =>
  (await axios.post(`${configs.server_url}/account/register`, params))?.data;

const verifyAccountRole = async (params = { accountID, role }) =>
  (await axios.post(`${configs.server_url}/account/verifyRole`, params))?.data;

const verifyAccountIsRegistered = async (params = { accountID }) =>
  (await axios.post(`${configs.server_url}/account/isRegistered`, params))
    ?.data;
const verifyAccountIsNotBlacklisted = async (params = { accountID }) =>
  (await axios.post(`${configs.server_url}/account/isNotBlacklisted`, params))
    ?.data;

const getAccountData = async (params = { accountID }) =>
  (await axios.post(`${configs.server_url}/account/data`, params))?.data;

const AccountAPI = {
  create: createAccount,
  register: registerAccount,
  verify: {
    role: verifyAccountRole,
    isRegistered: verifyAccountIsRegistered,
    isNotBlacklisted: verifyAccountIsNotBlacklisted,
  },
  data: getAccountData
};

/*************************USER_DATABASE_ENDPOINTS************************************* */

const getUserFromUID = async (uid) =>
  (await axios.post(`${configs.server_url}/db/user/get/from/uid`, { uid }))
    ?.data;
const getUserFromUsername = async (uid) =>
  (await axios.post(`${configs.server_url}/db/user/get/from/username`, { uid }))
    ?.data;
const getUIDFromUsername = async (username) =>
  (
    await axios.post(`${configs.server_url}/db/user/get/uid/from/username`, {
      username,
    })
  )?.data;

/** USER_MEDIA */
const getUserMedia = async (userUID) =>
  (
    await axios.post(`${configs.server_url}/db/user/get/media`, {
      userUID,
    })
  )?.data;
const getUserStreams = async (userUID) =>
  (
    await axios.post(`${configs.server_url}/db/user/get/streams`, {
      userUID,
    })
  )?.data;

/** USER_ASSETS */
const getUserAssets = async (userUID) =>
  (
    await axios.post(`${configs.server_url}/db/user/get/assets`, {
      userUID,
    })
  )?.data;

const getUserAssetDisputes = async (userUID) =>
  (
    await axios.post(`${configs.server_url}/db/user/get/asset/disputes`, {
      userUID,
    })
  )?.data;
const getUserAssetApprovals = async (userUID) =>
  (
    await axios.post(`${configs.server_url}/db/user/get/asset/approvals`, {
      userUID,
    })
  )?.data;

const UserAPI = {
  account: {
    getUserFromUID,
    getUserFromUsername,
    getUIDFromUsername,
  },
  media: {
    getUserMedia,
    getUserStreams,
  },
  assets: {
    getUserAssets,
    getUserAssetDisputes,
    getUserAssetApprovals,
  },
};


/*************************MEDIA_ENDPOINTS************************************* */

const getMedia = async (params = { assetID }) => {
  try {
    const response = await axios.post(`${configs.server_url}/db/media/get`, params);
    return response?.data;
  } catch (error) {
    console.error("Error fetching media:", error);
    throw error;
  }
};

const getMediaStream = async (params = { streamID }) => {
  try {
    const response = await axios.post(`${configs.server_url}/db/media/get/stream`, params);
    return response?.data;
  } catch (error) {
    console.error("Error fetching media stream:", error);
    throw error;
  }
};

const createMedia = async (params = { newAssetPayload, userUID }) => {
  try {
    const response = await axios.post(`${configs.server_url}/db/media/create`, params);
    return response?.data;
  } catch (error) {
    console.error("Error creating media:", error);
    throw error;
  }
};

const createMediaStream = async (params = { userUID, streamData }) => {
  try {
    const response = await axios.post(`${configs.server_url}/db/media/create/stream`, params);
    return response?.data;
  } catch (error) {
    console.error("Error creating media stream:", error);
    throw error;
  }
};

const MediaAPI = {
  getMedia,
  getStream: getMediaStream,
  createMedia,
  createStream: createMediaStream,
};

/*************************ASSET_ENDPOINTS************************************* */

const addAssetMetadata = async (params = { assetID, metadata }) => {
  try {
    const response = await axios.post(`${configs.server_url}/db/asset/create/metadata`, params);
    return response?.data;
  } catch (error) {
    console.error("Error adding asset metadata:", error);
    throw error;
  }
};

const submitAsset = async (params = { userUID, assetID }) => {
  try {
    const response = await axios.post(`${configs.server_url}/db/asset/create/submit`, params);
    return response?.data;
  } catch (error) {
    console.error("Error submitting asset:", error);
    throw error;
  }
};

const disputeAsset = async (params = { userUID, assetID, reason }) => {
  try {
    const response = await axios.post(`${configs.server_url}/db/asset/create/dispute`, params);
    return response?.data;
  } catch (error) {
    console.error("Error disputing asset:", error);
    throw error;
  }
};

const closeAssetDispute = async (params = { userUID, disputeID, solution, status }) => {
  try {
    const response = await axios.post(`${configs.server_url}/db/asset/create/dispute/close`, params);
    return response?.data;
  } catch (error) {
    console.error("Error closing asset dispute:", error);
    throw error;
  }
};

const approveAsset = async (params = { userUID, assetID, params: updateParams }) => {
  try {
    const response = await axios.post(`${configs.server_url}/db/asset/create/approve`, { userUID, assetID, params: updateParams });
    return response?.data;
  } catch (error) {
    console.error("Error approving asset:", error);
    throw error;
  }
};

const AssetAPI = {
  addMetadata: addAssetMetadata,
  submit: submitAsset,
  dispute: disputeAsset,
  closeDispute: closeAssetDispute,
  approve: approveAsset,
};

/*************************LIVEPEER_ENDPOINTS************************************* */

const getLivepeerOriginDetails = async () => {
  try {
    const response = await axios.post(`${configs.server_url}/livepeer_origin`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching Livepeer origin details:", error);
    throw error;
  }
};

const getLivepeerAsset = async (params = { assetID }) => {
  try {
    const response = await axios.post(`${configs.server_url}/livepeer/asset/get`, params);
    return response?.data;
  } catch (error) {
    console.error("Error fetching Livepeer asset:", error);
    throw error;
  }
};

const updateLivepeerAsset = async (params = { assetID, updateData }) => {
  try {
    const response = await axios.post(`${configs.server_url}/livepeer/asset/update`, params);
    return response?.data;
  } catch (error) {
    console.error("Error updating Livepeer asset:", error);
    throw error;
  }
};

const deleteLivepeerAsset = async (params = { assetID }) => {
  try {
    const response = await axios.post(`${configs.server_url}/livepeer/asset/delete`, params);
    return response?.data;
  } catch (error) {
    console.error("Error deleting Livepeer asset:", error);
    throw error;
  }
};

const getLivepeerAssetPlaybackInfo = async (params = { playbackID }) => {
  try {
    const response = await axios.post(`${configs.server_url}/livepeer/asset/info/playback`, params);
    return response?.data;
  } catch (error) {
    console.error("Error fetching Livepeer playback info:", error);
    throw error;
  }
};

const LivepeerAPI = {
  getOriginDetails: getLivepeerOriginDetails,
  getAsset: getLivepeerAsset,
  updateAsset: updateLivepeerAsset,
  deleteAsset: deleteLivepeerAsset,
  getPlaybackInfo: getLivepeerAssetPlaybackInfo,
};

/*************************MAPS_ENDPOINTS************************************* */

const getMapsAPI = async () => {
  try {
    const response = await axios.post(`${configs.server_url}/maps/get/api`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching Maps API:", error);
    throw error;
  }
};

const MapsAPI = {
  getAPI: getMapsAPI,
};

/*************************MORALIS_ENDPOINTS************************************* */

const getWalletNFTs = async (params = { address }) => {
  try {
    const response = await axios.post(`${configs.server_url}/alchemy/get/wallet_nfts`, params);
    return response?.data;
  } catch (error) {
    console.error("Error fetching wallet NFTs:", error);
    throw error;
  }
};

const getNFTMetadata = async (params = { address, tokenId }) => {
  try {
    const response = await axios.post(`${configs.server_url}/alchemy/get/nft_metadata`, params);
    return response?.data;
  } catch (error) {
    console.error("Error fetching NFT metadata:", error);
    throw error;
  }
};

const NFT_API = {
  get: {
    wallet_nfts: getWalletNFTs,
    nft_metadata: getNFTMetadata,
  },
};

/*************************NEPTUNE_CHAIN_CREDITS_ENDPOINTS************************************* */

const issueCredits = async (params = { senderID, nftTokenId, producer, verifier, creditType, amount }) => {
  try {
    const response = await axios.post(`${configs.server_url}/credits/issue`, params);
    return response?.data;
  } catch (error) {
    console.error("Error issuing credits:", error);
    throw error;
  }
};

const buyCredits = async (params = { accountID, producer, verifier, creditType, amount, price }) => {
  try {
    const response = await axios.post(`${configs.server_url}/credits/buy`, params);
    return response?.data;
  } catch (error) {
    console.error("Error buying credits:", error);
    throw error;
  }
};

const transferCredits = async (params = { senderID, recipientID, producer, verifier, creditType, amount, price }) => {
  try {
    const response = await axios.post(`${configs.server_url}/credits/transfer`, params);
    return response?.data;
  } catch (error) {
    console.error("Error transferring credits:", error);
    throw error;
  }
};

const donateCredits = async (params = { senderID, producer, verifier, creditType, amount }) => {
  try {
    const response = await axios.post(`${configs.server_url}/credits/donate`, params);
    return response?.data;
  } catch (error) {
    console.error("Error donating credits:", error);
    throw error;
  }
};

const getNFTOwner = async (tokenId) => {
  try {
    const response = await axios.get(`${configs.server_url}/nft/owner/${tokenId}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching NFT owner:", error);
    throw error;
  }
};

const getCreditTypes = async (tokenId) => {
  try {
    const response = await axios.get(`${configs.server_url}/nft/credit-types/${tokenId}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching credit types:", error);
    throw error;
  }
};

const getCreditSupplyLimit = async (tokenId, creditType) => {
  try {
    const response = await axios.get(`${configs.server_url}/nft/credit-supply-limit/${tokenId}/${creditType}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching credit supply limit:", error);
    throw error;
  }
};

const getTotalCertificates = async () => {
  try {
    const response = await axios.get(`${configs.server_url}/credits/total-certificates`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching total certificates:", error);
    throw error;
  }
};

const getTotalSold = async () => {
  try {
    const response = await axios.get(`${configs.server_url}/credits/total-sold`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching total sold:", error);
    throw error;
  }
};

const isProducerRegistered = async (producer) => {
  try {
    const response = await axios.get(`${configs.server_url}/credits/producer-registered/${producer}`);
    return response?.data;
  } catch (error) {
    console.error("Error checking producer registration:", error);
    throw error;
  }
};

const isVerifierRegistered = async (producer, verifier) => {
  try {
    const response = await axios.get(`${configs.server_url}/credits/verifier-registered/${producer}/${verifier}`);
    return response?.data;
  } catch (error) {
    console.error("Error checking verifier registration:", error);
    throw error;
  }
};

const getProducerVerifiers = async (producer) => {
  try {
    const response = await axios.get(`${configs.server_url}/credits/verifiers/${producer}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching producer verifiers:", error);
    throw error;
  }
};

const getSupply = async (producer, verifier, creditType) => {
  try {
    const response = await axios.get(`${configs.server_url}/credits/supply/${producer}/${verifier}/${creditType}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching supply:", error);
    throw error;
  }
};

const getCertificateById = async (certificateId) => {
  try {
    const response = await axios.get(`${configs.server_url}/certificates/${certificateId}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching certificate:", error);
    throw error;
  }
};

const getAccountCertificates = async (accountID) => {
  try {
    const response = await axios.get(`${configs.server_url}/credits/account-certificates/${accountID}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching account certificates:", error);
    throw error;
  }
};

const getAccountCreditBalance = async (params = { accountID, producer, verifier, creditType }) => {
  try {
    const response = await axios.get(`${configs.server_url}/credits/account-balance/${params.accountID}/${params.producer}/${params.verifier}/${params.creditType}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching account credit balance:", error);
    throw error;
  }
};

const getAllProducers = async () => {
  try {
    const response = await axios.get(`${configs.server_url}/credits/all-producers`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching all producers:", error);
    throw error;
  }
};

const getRecoveryDuration = async () => {
  try {
    const response = await axios.get(`${configs.server_url}/credits/recovery-duration`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching recovery duration:", error);
    throw error;
  }
};

const NPCCreditsAPI = {
  issueCredits,
  buyCredits,
  transferCredits,
  donateCredits,
  getNFTOwner,
  getCreditTypes,
  getCreditSupplyLimit,
  getTotalCertificates,
  getTotalSold,
  isProducerRegistered,
  isVerifierRegistered,
  getProducerVerifiers,
  getSupply,
  getCertificateById,
  getAccountCertificates,
  getAccountCreditBalance,
  getAllProducers,
  getRecoveryDuration,
};

/*************************STRIPE_ENDPOINTS************************************* */

const getStripeConfig = async () => {
  try {
    const response = await axios.post(`${configs.server_url}/stripe/config`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching Stripe config:", error);
    throw error;
  }
};

const createPaymentIntent = async (params = { amount, currency, optional_params }) => {
  try {
    const response = await axios.post(`${configs.server_url}/stripe/create/payment_intent`, params);
    return response?.data;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
};

const getStripePrice = async (params = { priceID }) => {
  try {
    const response = await axios.post(`${configs.server_url}/stripe/get/price`, params);
    return response?.data;
  } catch (error) {
    console.error("Error fetching Stripe price:", error);
    throw error;
  }
};

const StripeAPI = {
  getConfig: getStripeConfig,
  createPaymentIntent,
  getPrice: getStripePrice,
};

/*************************DEVICE_MANAGEMENT_ENDPOINTS************************************* */

const getDevices = async () => {
  try {
    const response = await axios.post(`${configs.server_url}/devices`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching devices:", error);
    throw error;
  }
};

const addDevice = async (params = { devicePayload }) => {
  try {
    const response = await axios.post(`${configs.server_url}/device/add`, params);
    return response?.data;
  } catch (error) {
    console.error("Error adding device:", error);
    throw error;
  }
};

const editDevice = async (params = { deviceID, updateData }) => {
  try {
    const response = await axios.post(`${configs.server_url}/device/edit`, params);
    return response?.data;
  } catch (error) {
    console.error("Error editing device:", error);
    throw error;
  }
};

const removeDevice = async (params = { deviceID }) => {
  try {
    const response = await axios.post(`${configs.server_url}/device/remove`, params);
    return response?.data;
  } catch (error) {
    console.error("Error removing device:", error);
    throw error;
  }
};

const getDeviceDetails = async (params = { deviceID }) => {
  try {
    const response = await axios.post(`${configs.server_url}/device/details`, params);
    return response?.data;
  } catch (error) {
    console.error("Error fetching device details:", error);
    throw error;
  }
};

const emulateDevice = async (params = { deviceID, interval }) => {
  try {
    const response = await axios.post(`${configs.server_url}/device/emulate`, params);
    return response?.data;
  } catch (error) {
    console.error("Error emulating device:", error);
    throw error;
  }
};

const getDeviceData = async (params = { deviceID }) => {
  try {
    const response = await axios.post(`${configs.server_url}/device/data`, params);
    return response?.data;
  } catch (error) {
    console.error("Error fetching device data:", error);
    throw error;
  }
};

const DeviceAPI = {
  getDevices,
  addDevice,
  editDevice,
  removeDevice,
  getDeviceDetails,
  emulateDevice,
  getDeviceData,
};

//MetricsAPI

const allMetrics = ["credit_balance", "credit_price", "equity", "tx_pending"];

const getMetric = async (metric, uid) => "10";
// String(
//   (await axios.post(`${configs.server_url}/metrics`, { metric, uid }))
//     ?.data || 10
// );

const MetricsAPI = {
  allMetrics,
  getMetric,
};

export {
  AccountAPI,
  UserAPI,
  MediaAPI,
  AssetAPI,
  LivepeerAPI,
  MapsAPI,
  NPCCreditsAPI,
  NFT_API,
  StripeAPI,
  DeviceAPI,
  MetricsAPI,
};
