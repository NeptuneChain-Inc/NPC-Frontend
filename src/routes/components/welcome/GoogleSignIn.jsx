import React, { useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../apis/firebase";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";

const Icon = styled(FontAwesomeIcon)`
  display: inline-block;
  vertical-align: middle;
  width: 1rem;
  color: black;
`;

const GoogleButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.ui300};
  border-radius: 10px;
  height: 40px;
  display: inline-flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.ui800};
  background: white;
  svg {
    font-size: 16px;
  }
`;

const provider = new GoogleAuthProvider();

// Configure FirebaseUI sign-in options
function GoogleSignIn({ setCardState, setGoogleData, enterDash }) {
  const { ACTIONS } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { updateUser } = ACTIONS || {};
  console.log({ACTIONS});

  const handleSubmit = async () => {
    setIsLoading(true);
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result?.user;
        console.log("User", user);

        if (user?.uid) {
          //Check if user is in database then login or register
          if (await updateUser?.(user.uid)) {
            //Logged In
            setCardState("");
            navigate("/dashboard/environmental");
          } else {
            //Redirect to register with user email
            setGoogleData({
              uid: user?.uid,
              name: user?.displayName,
              gmail: user?.email,
            });
            setCardState("register");
          }
        } else {
          setError("Could Not Get User :/");
        }

        setError(null);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        setError("Could Not Continue :/");
      }).finally(() => setIsLoading(false));
  };

  return (
    <GoogleButton onClick={handleSubmit} disabled={error || isLoading}>
      <FcGoogle />
      <span className="buttonText">{isLoading ? "Please Wait..." : error ? String(error) : "Continue With Google"}</span>
    </GoogleButton>
  );
}

export default GoogleSignIn;
