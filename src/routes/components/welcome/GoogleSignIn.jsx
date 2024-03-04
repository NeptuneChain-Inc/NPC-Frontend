import React, { useEffect, useState } from "react";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import configs from "../../../../configs";

// Configure FirebaseUI sign-in options

function GoogleSignIn() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    const fetchFirebaseConfig = async () => {
      try {
        const response = await axios.get(`${configs.server_url}/firebase/config`);
        const firebaseConfig = response.data;

        if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
        }

        // Now that Firebase is initialized, we can set up the observer and UI config
        setFirebaseInitialized(true);

        const unregisterAuthObserver = firebase
          .auth()
          .onAuthStateChanged((user) => {
            setIsSignedIn(!!user);
          });

        return () => unregisterAuthObserver();
      } catch (error) {
        console.error("Error fetching Firebase config:", error);
        // Handle error, maybe show user-friendly message or retry logic
      }
    };

    fetchFirebaseConfig();
  }, []);

  if (!firebaseInitialized) {
    return <div>Loading...</div>; // or any loading animation/component
  }

  if (!isSignedIn) {
    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true;
        },
        uiShown: function () {
          // The widget is rendered.
        },
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: "popup",
      signInSuccessUrl: "<url-to-redirect-to-on-success>",
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      // Terms of service url.
      tosUrl: "<your-tos-url>",
      // Privacy policy url.
      privacyPolicyUrl: "<your-privacy-policy-url>",
    };
    return (
      <div>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }
}

export default GoogleSignIn;
