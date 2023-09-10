import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBqSF5-E1DgA5TvBLC1XUv_Pu9dXREXt2I",
    authDomain: "neptunechain-network.firebaseapp.com",
    databaseURL: "https://neptunechain-network-default-rtdb.firebaseio.com",
    projectId: "neptunechain-network",
    storageBucket: "neptunechain-network.appspot.com",
    messagingSenderId: "687724213575",
    appId: "1:687724213575:web:0d49dac7bc09f3c4f5c862",
    measurementId: "G-HTR2VNFMKG"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Auth
const auth = getAuth();

export { auth };
