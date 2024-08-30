import axios from 'axios';

// Configurations
const configs = {
  server_url: 'http://localhost:3000', // Replace with your actual backend server URL
};

/*************************ACCOUNT_ENDPOINTS************************************* */
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
  getData: getAccountData,
};

/*************************USER_DATABASE_ENDPOINTS************************************* */
const getUserFromUID = async (uid) =>
  (await axios.post(`${configs.server_url}/db/user/get/from/uid`, { uid }))
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

/*************************ASSET_DATABASE_ENDPOINTS************************************* */

const getAsset = async (assetID) =>
  (await axios.post(`${configs.server_url}/db/asset/get`, { assetID }))?.data;

const createAsset = async (params = { newAssetPayload, userUID }) =>
  (await axios.post(`${configs.server_url}/db/asset/create`, params))?.data;

const addAssetMetadata = async (params = { assetID, metadata }) =>
  (await axios.post(`${configs.server_url}/db/asset/create/metadata`, params))
    ?.data;

const submitAsset = async (params = { userUID, assetID }) =>
  (await axios.post(`${configs.server_url}/db/asset/create/submit`, params))
    ?.data;

const disputeAsset = async (params = { userUID, assetID, reason }) =>
  (await axios.post(`${configs.server_url}/db/asset/create/dispute`, params))
    ?.data;

const closeAssetDispute = async (params = { userUID, disputeID, solution, status }) =>
  (await axios.post(`${configs.server_url}/db/asset/create/dispute/close`, params))
    ?.data;

const approveAsset = async (params = { userUID, assetID, creditTypes, creditSupplyLimits }) =>
  (await axios.post(`${configs.server_url}/db/asset/create/approve`, { userUID, assetID, params }))
    ?.data;

const AssetAPI = {
  get: getAsset,
  create: createAsset,
  addMetadata: addAssetMetadata,
  submit: submitAsset,
  dispute: disputeAsset,
  closeDispute: closeAssetDispute,
  approve: approveAsset,
};

/*************************EXPORTING_APIS************************************* */

export { AccountAPI, UserAPI, AssetAPI };
