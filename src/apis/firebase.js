import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDIbFUYETjr9k2j1qjwV793zSSmJdjjzbc",
    authDomain: "app-neptunechain.firebaseapp.com",
    databaseURL: "https://app-neptunechain-default-rtdb.firebaseio.com",
    projectId: "app-neptunechain",
    storageBucket: "app-neptunechain.appspot.com",
    messagingSenderId: "477231879849",
    appId: "1:477231879849:web:90b49665fce2d4660b7bb8",
    measurementId: "G-WN6DP7ZHWC"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Initialize Firebase Auth
const auth = getAuth();

export { auth, db };