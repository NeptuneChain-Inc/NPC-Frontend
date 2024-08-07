import React, { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import LoginForm from "./components/welcome/LoginForm";
import RegisterForm from "./components/welcome/RegisterForm";
import { WelcomeHome } from "./components/welcome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import GoogleSignIn from "./components/welcome/GoogleSignIn";
import { contentVariants } from "./components/welcome/WelcomeHome";
import { ButtonPrimary, ButtonSecondary } from "../components/shared/button/Button";
import { BackgroundImage } from "framer/render/types/BackgroundImage.js";


export const logoImage = new URL("../assets/logo.png", import.meta.url).href;
("./assets/");

const backgroundImage = new URL(
  "../assets/wallpapers/welcome_wallpaper.jpg",
  import.meta.url
).href;

// Styled components
const FullScreenWrapper = styled.div`
width: 100%;
width: 100vw;


.separator { 
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0px;
  .separator-line { 
    width: 100%; 
    height: 1px; 
    background: ${({theme}) => theme.colors.ui100};
  }
  .separator-text {
    font-size: 14px;
    font-weight: 500;
    color: ${({theme}) => theme.colors.ui600}
  }
}

.navbar { 
  display: flex; 
  max-width: 1200px;
  margin: 0 auto;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  align-items: center;
  .navbar-buttons {
    display: flex;
    gap: 8px; 
    align-items: center;
  }
  img { 
    width: 180px;
  }
}
.content{
  height: 100vh; 
  overflow-y: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
 }


 .content-logo img {
   width: 200px;
   margin-bottom: 80px;
 }

 .section-left {
   width: 100%; 
  max-width: 45vw;
   height: 100vh;
   img { 
    height: 100vh;
    border-radius: 40px;
    padding: 24px;
  }
   .section-left-image {
      height: 100vh; 
      overflow: hidden;
      object-fit: cover;
      width: 100%;
 
    }

 }

.sign-in-form-section { 
  width: 70%; 
  display: flex;
  flex-direction: column;
  max-width: 400px; 
  margin: 0 auto;
  .form-content { 
    max-width: 400px;
  }
}
`;

const Wallpaper = styled.div`

`;

const StyledLogo = styled.img`

`;

export const CardLogo = styled(StyledLogo)`

`;


export const logoVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1 } },
};

const Welcome = ({ APP }) => {
  const navigate = useNavigate();
  const [cardState, setCardState] = useState("");
  const [googleData, setGoogleData] = useState({});
  const { user } = APP?.STATES || {};
  const { updateUser } = APP?.ACTIONS || {};

  const enterDash = () => {
    navigate("/dashboard/environmental")
  };


  return (
    <FullScreenWrapper>


        <div className="content">

    <div className="sign-in-form-section">
      <div className="content-logo">

    <StyledLogo
        
        src={logoImage}
        alt="NeptuneChain Logo"
        variants={logoVariants}
        initial="hidden"
        animate="visible"
        />
        </div>
          <WelcomeHome
            key="welcome"
            user={user}
            setCardState={setCardState}
            enterDash={enterDash}
            />

{!user && (
        <GoogleSignIn APP={APP} setGoogleData={setGoogleData} setCardState={setCardState} enterDash={enterDash} />
      )}
      <div className="separator">
        <div className="separator-line">

        </div>
        <div className="separator-text">
          Or
        </div>
        <div className="separator-line"></div>
      </div>
      <div className="form-content">

        <AnimatePresence mode="wait">
        {cardState !== "register" && 
          <LoginForm
          key="login"
          onSuccess={enterDash}
          updateUser={updateUser}
          onSwitchToRegister={() => setCardState("register")}
          APP={APP}
          />
        }
        </AnimatePresence>
{cardState === "register" && (
          <RegisterForm
            key="register"
            onSuccess={enterDash}
            updateUser={updateUser}
            onSwitchToLogin={() => setCardState("login")}
            googleData={googleData}
            />
)}
  
      </div>
      </div>
      <div className="section-left">
      <img className="section-left-image" src={backgroundImage} />
      </div>
      </div>
    </FullScreenWrapper>
  );
};

export default Welcome;
