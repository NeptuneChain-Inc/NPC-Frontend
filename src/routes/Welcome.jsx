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


export const logoImage = new URL("../assets/logo.png", import.meta.url).href;
("./assets/");

// Styled components
const FullScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
.navbar { 
  display: flex; 
  justify-content: space-between;
  img { 
    width: 180px;
  }
}
`;

const Wallpaper = styled.div`

`;

const StyledLogo = styled(motion.img)`

`;

export const CardLogo = styled(StyledLogo)`

`;

const GoogleSignInWrapper = styled(motion.div)`

`;

const HomeIcon = styled(FontAwesomeIcon)`

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

  const enterDash = () => navigate("/dashboard/environmental");


  return (
    <FullScreenWrapper>
      <div className="navbar">
      <StyledLogo
        
        src={logoImage}
        alt="NeptuneChain Logo"
        variants={logoVariants}
        initial="hidden"
        animate="visible"
        />
        <div>
          <ButtonPrimary>
            Sign up
          </ButtonPrimary>
          <ButtonSecondary>
            Sign in
          </ButtonSecondary>
        </div>
        </div>

          <WelcomeHome
            key="welcome"
            user={user}
            setCardState={setCardState}
            enterDash={enterDash}
          />
        <AnimatePresence mode="wait">
          <LoginForm
            key="login"
            onSuccess={enterDash}
            updateUser={updateUser}
            onSwitchToRegister={() => setCardState("register")}
            APP={APP}
          />
        </AnimatePresence>
{cardState === "register" && (
        <AnimatePresence mode="wait">
          <RegisterForm
            key="register"
            onSuccess={enterDash}
            updateUser={updateUser}
            onSwitchToLogin={() => setCardState("login")}
            googleData={googleData}
          />
        </AnimatePresence>
)}
  
      {!user && (
        <AnimatePresence mode="wait">
          <GoogleSignInWrapper variants={contentVariants} initial="hidden" animate="visible">
            <GoogleSignIn APP={APP} setGoogleData={setGoogleData} setCardState={setCardState} enterDash={enterDash} />
          </GoogleSignInWrapper>
        </AnimatePresence>
      )}

      {cardState !== "" && (
        <AnimatePresence mode="wait">
          <HomeIcon icon={faHome} onClick={() => setCardState("")} />
        </AnimatePresence>
      )}
    </FullScreenWrapper>
  );
};

export default Welcome;
