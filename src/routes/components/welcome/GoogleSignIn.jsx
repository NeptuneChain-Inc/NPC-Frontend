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
      width: 30px;
      height: 30px;
      color: white;
`;

const GoogleButton = styled.div`
margin-top: 10px;
      background: #DB4437e6;
      backdrop-filter: blur(10px);
      color: #444;
      width: 190px;
      border-radius: 5px;
      border: thin solid #888;
      box-shadow: 1px 1px 1px grey;
      white-space: nowrap;
      padding: 10px;
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
        font-size: 14px;
        font-weight: bold;
        font-family: 'Roboto', sans-serif;
        color: white
      }
`;

const provider = new GoogleAuthProvider();

// Configure FirebaseUI sign-in options
function GoogleSignIn({APP, setCardState, setGoogleName, setGoogleEmail, enterDash}) {
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
        } else {
          //Redirect to register with user email
          setGoogleName(user?.displayName);
          setGoogleEmail(user?.email);
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
