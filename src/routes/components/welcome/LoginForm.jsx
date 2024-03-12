import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";

/** ICONS */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

import Notification from "../../../components/popups/NotificationPopup";
import {
  BUTTON,
  INPUT,
  LOADING_ANIMATION,
  PROMPT_CARD,
  PROMPT_FORM,
  TEXT_LINK,
} from "../../../components/lib/styled";

import {
  formVariant,
  loadingVariant,
} from "./motion_variants";
import { CardLogo, logoImage, logoVariants } from "../../Welcome";

import {
  environmentalRotation,
  successAnimation,
} from "../../../assets/animations";

/** #BACKEND */
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

import "firebase/app"; 
import "firebase/auth" //

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { firebaseAPI } from "../../../scripts/back_door";
import { GoogleSignIn } from "../../../scripts";

// import { FORM_DATA } from "../../../scripts/helpers";

const InputGroup = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #0077b6;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #ccc;
`;

const Icon = styled(FontAwesomeIcon)`
  margin: auto;
  min-width: 30px;
  color: #fff;
`;

const LoginForm = ({ APP, onSuccess, onSwitchToRegister, updateUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { logNotification } = APP?.ACTIONS || {};

  const [auth, setAuth] = useState(null);

  useEffect(() => {
    getAuth();
  }, []);

console.log(auth)
  

  useEffect(() => {
    if (auth) {
      // Listen to the Firebase Auth state and set the local state.
      const unregisterAuthObserver = auth.onAuthStateChanged(async (user) => {
        console.log("user", user);
        setIsSuccess(Boolean(await updateUser?.(user?.uid)));
      });

      // configAuthUI();

      return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }

    console.log('Auth', auth)
  }, [auth]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }
  }, [isSuccess]);

  // // Configure FirebaseUI.
  // const uiConfig = {
  //   // Popup signin flow rather than redirect flow.
  //   signInFlow: "popup",
  //   // We will display Google and Facebook as auth providers.
  //   signInOptions: [
  //     auth?.EmailAuthProvider?.PROVIDER_ID,
  //     auth?.GoogleAuthProvider?.PROVIDER_ID,
  //   ],
  //   callbacks: {
  //     // Avoid redirects after sign-in.
  //     signInSuccessWithAuthResult: () => false,
  //   },
  // };

  const getAuth = async () => {
    try {
      const auth = await firebaseAPI.get.auth();
      setAuth(auth);
    } catch (e) {
      console.error('Failed Auth!!', e);
      setError("Failed to configure authentication");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userData = await signInWithEmailAndPassword(auth, email, password);
      setIsSuccess(Boolean(await updateUser?.(userData?.user?.uid)));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (FORM_DATA.isValidEmail(email)) {
      try {
        await sendPasswordResetEmail(auth, email);
        logNotification("alert", `Password reset email sent to ${email}!`);
      } catch (error) {
        setError(`Error sending password reset email: ${error.message}`);
        logNotification("error", "Error sending password reset email");
      }
    } else {
      logNotification("error", "Please Enter a Valid Email");
    }
  };

  return (
    <AnimatePresence>
      <Notification type="error" message={error} />

      <PROMPT_CARD>
        {isSuccess ? (
          <LOADING_ANIMATION
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={loadingVariant}
          >
            <Player
              autoplay
              loop
              src={successAnimation}
              style={{ height: 100, width: 100 }}
            />
          </LOADING_ANIMATION>
        ) : !isLoading && auth ? (
          // <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
          <>
                    <PROMPT_FORM
            variants={formVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            onSubmit={handleSubmit}
          >
            <CardLogo
              src={logoImage}
              alt="NeptuneChain Logo"
              variants={logoVariants}
              initial="hidden"
              animate="visible"
            />
            <InputGroup>
              <Icon icon={faEnvelope} />
              <INPUT
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputGroup>

            <InputGroup>
              <Icon icon={faLock} />
              <INPUT
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </InputGroup>

            <BUTTON type="submit">Log In</BUTTON>
            <TEXT_LINK type="button" onClick={handleResetPassword}>
              Forgot Password?
            </TEXT_LINK>
            <TEXT_LINK type="button" onClick={onSwitchToRegister}>
              Need an account? Register
            </TEXT_LINK>
          </PROMPT_FORM>
          <BUTTON onClick={GoogleSignIn}>Log in with Google</BUTTON>
          </>
        ) : (

          <LOADING_ANIMATION
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={loadingVariant}
          >
            <Player
              autoplay
              loop
              src={environmentalRotation}
              style={{ height: 100, width: 100 }}
            />
          </LOADING_ANIMATION>
        )}
      </PROMPT_CARD>
    </AnimatePresence>
  );
};

export default LoginForm;
