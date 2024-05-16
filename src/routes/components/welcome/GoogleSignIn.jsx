import React, { useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../apis/firebase";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { getUser } from "../../../apis/database";

const Icon = styled(FontAwesomeIcon)`
      display: inline-block;
      vertical-align: middle;
      width: 1rem;
      color: white;
`;

const GoogleButton = styled.div`
      background: #DB4437e6;
      backdrop-filter: blur(10px);
      color: #444;
      //width: 190px;
      border-radius: 5px;
      border: 0.1rem solid rgba(255, 255, 255, 1);
      box-shadow: 0 4px 6px 0px rgba(0, 0, 0, 0.5);
      white-space: nowrap;
      padding: 0.4rem 1rem;
      box-sizing: border-box;
      transition: 0.3s ease-in-out;

      &:hover {
        cursor: pointer;
        background: #DB4437;
        scale: 1.05;
      }

      span.buttonText {
        display: inline-block;
        vertical-align: middle;
        padding-left: 10px;
        font-size: 1rem;
        font-weight: bold;
        font-family: 'Roboto', sans-serif;
        color: white
      }
`;

const provider = new GoogleAuthProvider();

// Configure FirebaseUI sign-in options
function GoogleSignIn({APP, setCardState, setGoogleData, enterDash}) {
  const [error, setError] = useState(null);
  const { updateUser, handleLogout} = APP.ACTIONS || {};

  const handleSubmit = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result?.user;
        console.log("User", user)
        
        //Check if user is in database then login or register
        if(await updateUser?.(user?.uid)){
          //Logged In
          setCardState("");
        } else {
          //Redirect to register with user email
          setGoogleData({
            uid: user?.uid,
            name: user?.displayName,
            gmail: user?.email,
          })
          setCardState("register");
        }

        setError(null)
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        setError("Could Not Continue :/")
      });
  }

    return (
      <GoogleButton onClick={handleSubmit}>
        <Icon icon={faGoogle} />
        <span className="buttonText">Continue With Google</span>
      </GoogleButton>
    );
}

export default GoogleSignIn;
