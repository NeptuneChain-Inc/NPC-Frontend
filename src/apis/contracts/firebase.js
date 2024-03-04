import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import configs from "../../../configs";

async function getFirebaseConfig() {
  const response = await axios.post(`${configs.server_url}/firebase/config`, {});
  return response.data.firebaseConfig;
}

const initAuth = async () => await getFirebaseConfig().then((firebaseConfig) => getAuth(initializeApp(firebaseConfig)));

export { initAuth };
