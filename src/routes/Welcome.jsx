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

const backgroundImage = new URL(
  "../assets/wallpapers/welcome_wallpaper.jpg",
  import.meta.url
).href;
export const logoImage = new URL("../assets/logo.png", import.meta.url).href;
("./assets/");

// Styled components
const FullScreenWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  // ${({ isOnboarding }) => isOnboarding ? "filter: blur(5px);" : ''}
  // background-image: url(${backgroundImage});
  // background-size: cover;
  // background-position: center;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid black;
`;

const Wallpaper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  ${({ isOnboarding }) => isOnboarding ? "filter: blur(5px);" : ''}
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid black;
`;

const StyledLogo = styled(motion.img)`
z-index: 1000;
  width: 25vw;
  //max-width: 250px;
  margin-bottom: 1rem;

  background: rgba(230, 236, 213, 0.7);
backdrop-filter: blur(5px);
padding: 0.2rem 1rem;
border-radius: 5px;
  box-sizing: border-box;
  box-shadow: 0 4px 6px 0px rgba(0, 0, 0, 0.5);

  @media (max-width: 980px) {
    width: 30vw;
  }
  @media (max-width: 767px) {
    width: 50vw;
  }
`;

export const CardLogo = styled(StyledLogo)`
  width: 50vw;
  display: none;
  @media (max-width: 980px) {
    display: flex;
  }
`;

const GoogleSignInWrapper = styled(motion.div)`
margin-top: 0.5rem;
background: rgba(230, 236, 213, 0.4);
backdrop-filter: blur(5px);
  padding: 0.1rem;
  border-radius: 5px;
  transition: 0.3s ease-in-out;

  &:hover {
    scale: 1.05;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }
`;

const HomeIcon = styled(FontAwesomeIcon)`
  background: rgba(255, 255, 255, 0.8);
  padding: 0.5rem;
  border-radius: 50%;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  margin-top: 0.8rem;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  z-index: 10;

  &:hover {
    scale: 1.1;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }
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

  console.log("onboarding", Boolean(cardState !== ""))

  return (
    <FullScreenWrapper>
      <Wallpaper isOnboarding={Boolean(cardState !== "")} />
      <StyledLogo
        src={logoImage}
        alt="NeptuneChain Logo"
        variants={logoVariants}
        initial="hidden"
        animate="visible"
      />

      {cardState === "login" ? (
        <AnimatePresence mode="wait">
          <LoginForm
            key="login"
            onSuccess={enterDash}
            updateUser={updateUser}
            onSwitchToRegister={() => setCardState("register")}
            APP={APP}
          />
        </AnimatePresence>
      ) : cardState === "register" ? (
        <AnimatePresence mode="wait">
          <RegisterForm
            key="register"
            onSuccess={enterDash}
            updateUser={updateUser}
            onSwitchToLogin={() => setCardState("login")}
            googleData={googleData}
          />
        </AnimatePresence>
      ) : (
        <AnimatePresence mode="wait">
          <WelcomeHome
            key="welcome"
            user={user}
            setCardState={setCardState}
            enterDash={enterDash}
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
