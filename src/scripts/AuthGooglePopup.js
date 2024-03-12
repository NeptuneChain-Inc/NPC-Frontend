import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseAPI } from "./back_door";

const GoogleSignIn = async () => {
  const auth = await firebaseAPI.get.auth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      //   const credential = GoogleAuthProvider.credentialFromResult(result);
      //   const token = credential.accessToken;

      // The signed-in user info.
      const { user } = result;
      return user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      console.error(error);
    });
};

import { signOut } from "firebase/auth";

const SignOut = async () => {
  const auth = await firebaseAPI.get.auth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

export default GoogleSignIn;
