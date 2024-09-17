import axios from "axios";
import configs from "../../configs";

/*************************ACOUNT_ENDPOINTS************************************* */
const createAccount = async (userdata) =>
  (await axios.post(`${configs.server_url}/account/create`, userdata))?.data;

const registerAccount = async (accountID, role, txAddress) =>
  (await axios.post(`${configs.server_url}/account/register`, { accountID, role, txAddress }))?.data;

const verifyAccountRole = async (accountID, role) =>
  (await axios.post(`${configs.server_url}/account/verifyRole`, { accountID, role }))?.data;

const verifyAccountIsRegistered = async (accountID) =>
  (await axios.post(`${configs.server_url}/account/isRegistered`, {accountID}))
    ?.data;
const verifyAccountIsNotBlacklisted = async (accountID) =>
  (await axios.post(`${configs.server_url}/account/isNotBlacklisted`, {accountID}))
    ?.data;

const getAccountData = async (accountID) =>
  (await axios.post(`${configs.server_url}/account/data`, {accountID}))?.data;

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
  (await axios.post(`${configs.server_url}/db/user/get/from/uid`, { userUID: uid }))
    ?.data;
const getUserFromUsername = async (username) =>
  (await axios.post(`${configs.server_url}/db/user/get/from/username`, { username }))
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

const getLivepeerKey = async () => {
  try {
    const response = await axios.post(`${configs.server_url}/livepeer/key`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching Livepeer key:", error);
    throw error;
  }
};

const getLivepeerOriginDetails = async () => {
  try {
    const response = await axios.post(`${configs.server_url}/livepeer/origin`);
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
  getKey: getLivepeerKey,
  getOriginDetails: getLivepeerOriginDetails,
  getAsset: getLivepeerAsset,
  updateAsset: updateLivepeerAsset,
  deleteAsset: deleteLivepeerAsset,
  getPlaybackInfo: getLivepeerAssetPlaybackInfo,
};

/*************************MAPS_ENDPOINTS************************************* */

const getMapsKey = async () => {
  try {
    const response = await axios.post(`${configs.server_url}/maps/get/key`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching Maps key:", error);
    throw error;
  }
};

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
  getKey: getMapsKey,
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
    const response = await axios.post(`${configs.server_url}/npc_credits/issue`, params);
    return response?.data;
  } catch (error) {
    console.error("Error issuing credits:", error);
    throw error;
  }
};

const buyCredits = async (params = { accountID, producer, verifier, creditType, amount, price }) => {
  try {
    const response = await axios.post(`${configs.server_url}/npc_credits/buy`, params);
    return response?.data;
  } catch (error) {
    console.error("Error buying credits:", error);
    throw error;
  }
};

const transferCredits = async (params = { senderID, recipientID, producer, verifier, creditType, amount, price }) => {
  try {
    const response = await axios.post(`${configs.server_url}/npc_credits/transfer`, params);
    return response?.data;
  } catch (error) {
    console.error("Error transferring credits:", error);
    throw error;
  }
};

const donateCredits = async (params = { senderID, producer, verifier, creditType, amount }) => {
  try {
    const response = await axios.post(`${configs.server_url}/npc_credits/donate`, params);
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
    const response = await axios.get(`${configs.server_url}/npc_credits/total-certificates`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching total certificates:", error);
    throw error;
  }
};

const getTotalSold = async () => {
  try {
    const response = await axios.get(`${configs.server_url}/npc_credits/total-sold`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching total sold:", error);
    throw error;
  }
};

const isProducerRegistered = async (producer) => {
  try {
    const response = await axios.get(`${configs.server_url}/npc_credits/producer-registered/${producer}`);
    return response?.data;
  } catch (error) {
    console.error("Error checking producer registration:", error);
    throw error;
  }
};

const isVerifierRegistered = async (producer, verifier) => {
  try {
    const response = await axios.get(`${configs.server_url}/npc_credits/verifier-registered/${producer}/${verifier}`);
    return response?.data;
  } catch (error) {
    console.error("Error checking verifier registration:", error);
    throw error;
  }
};

const getProducerVerifiers = async (producer) => {
  try {
    const response = await axios.get(`${configs.server_url}/npc_credits/verifiers/${producer}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching producer verifiers:", error);
    throw error;
  }
};

const getSupply = async (producer, verifier, creditType) => {
  try {
    const response = await axios.get(`${configs.server_url}/npc_credits/supply/${producer}/${verifier}/${creditType}`);
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
    const response = await axios.get(`${configs.server_url}/npc_credits/account-certificates/${accountID}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching account certificates:", error);
    throw error;
  }
};

const getAccountCreditBalance = async (params = { accountID, producer, verifier, creditType }) => {
  try {
    const response = await axios.get(`${configs.server_url}/npc_credits/account-balance/${params.accountID}/${params.producer}/${params.verifier}/${params.creditType}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching account credit balance:", error);
    throw error;
  }
};

const getAllProducers = async () => {
  try {
    const response = await axios.get(`${configs.server_url}/npc_credits/all-producers`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching all producers:", error);
    throw error;
  }
};

const getRecoveryDuration = async () => {
  try {
    const response = await axios.get(`${configs.server_url}/npc_credits/recovery-duration`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching recovery duration:", error);
    throw error;
  }
};

const getNPCCreditEvents = async () =>
  (await axios.post(`${configs.server_url}/npc_credits/events`))
    ?.data;

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
  getNPCCreditEvents
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
    const response = await axios.post(`${configs.server_url}/device/all`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching devices:", error);
    throw error;
  }
};

const addDevice = async (devicePayload) => {
  try {
    const response = await axios.post(`${configs.server_url}/device/add`, {devicePayload});
    return response?.data;
  } catch (error) {
    console.error("Error adding device:", error);
    throw error;
  }
};

const editDevice = async (deviceID, updateData) => {
  try {
    const response = await axios.post(`${configs.server_url}/device/edit`, {deviceID, updateData});
    return response?.data;
  } catch (error) {
    console.error("Error editing device:", error);
    throw error;
  }
};

const removeDevice = async (deviceID) => {
  try {
    const response = await axios.post(`${configs.server_url}/device/remove`, {deviceID});
    return response?.data;
  } catch (error) {
    console.error("Error removing device:", error);
    throw error;
  }
};

const getDeviceDetails = async (deviceID) => {
  try {
    const response = await axios.post(`${configs.server_url}/device/details`, {deviceID});
    return response?.data;
  } catch (error) {
    console.error("Error fetching device details:", error);
    throw error;
  }
};

const emulateDevice = async (deviceID, interval) => {
  try {
    const response = await axios.post(`${configs.server_url}/device/emulate`, {deviceID, interval});
    return response?.data;
  } catch (error) {
    console.error("Error emulating device:", error);
    throw error;
  }
};

const getDeviceData = async (deviceID) => {
  try {
    const response = await axios.post(`${configs.server_url}/device/data`, {deviceID});
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
