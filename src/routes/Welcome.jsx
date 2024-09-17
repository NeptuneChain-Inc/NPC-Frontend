import React, { useEffect, useState } from "react";
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
import {
  ButtonPrimary,
  ButtonSecondary,
} from "../components/shared/button/Button";
import { BackgroundImage } from "framer/render/types/BackgroundImage.js";
import Footer from "../components/shared/Footer/Footer";
import {useAppContext} from "../context/AppContext";

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

  .form-elements-wrap {
    max-width: 400px;
    width: 90%;
    margin: 0 auto;
    button {
    }

    @media (min-width: 1024px) {
      margin: 0 0;
    }
  }

  .separator {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 0px;
    .separator-line {
      width: 100%;
      height: 1px;
      background: ${({ theme }) => theme.colors.ui100};
    }
    .separator-text {
      font-size: 14px;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.ui600};
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
  .content {
    overflow-y: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: calc(100vh - 24px);
    @media (max-width: 1024px) {
      flex-direction: column;
    }
  }

  .content-logo img {
    width: 120px;
    margin-top: 40px;
    margin-bottom: 24px;
    display: none;
    margin-left: 24px;
    @media (min-width: 1024px) {
      display: block;
      margin-bottom: 40px;
    }
  }

  .section-left {
    width: 100%;
    display: none;

    @media (min-width: 1024px) {
      max-width: 45vw;
      display: block;
      height: calc(100vh - 24px);
    }
    img {
      border-radius: 40px;
      height: 100%;
      width: 100%;
      padding: 24px;
    }
    .section-left-image {
      overflow: hidden;
      object-fit: cover;
      width: 100%;
    }
  }

  .sign-in-form-section {
    width: 100%;
    display: flex;
    flex-direction: column;

    @media (min-width: 1024px) {
      padding-left: 64px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-left: 0px;
    }
    .form-content {
      max-width: 400px;
    }
  }
`;

const Wallpaper = styled.div``;

const StyledLogo = styled.img``;

export const CardLogo = styled(StyledLogo)``;

export const logoVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1 } },
};

const Welcome = () => {
  const { STATES, ACTIONS } = useAppContext();
  const navigate = useNavigate();
  const [cardState, setCardState] = useState("");
  const [googleData, setGoogleData] = useState({});
  const { user } = STATES || {};
  const { updateUser } = ACTIONS || {};

  useEffect(() => {
    if (user) {
      enterDash();
    }
  }, [navigate, user]);

  const enterDash = () => {
    navigate("/dashboard/environmental");
  };

  return (
    <FullScreenWrapper>
      <div className="content">
        <div className="sign-in-form-section">
          <WelcomeHome
            key="welcome"
            user={user}
            setCardState={setCardState}
            enterDash={enterDash}
          />
          <div className="form-elements-wrap">
            {!user && (
              <GoogleSignIn
                setGoogleData={setGoogleData}
                setCardState={setCardState}
                enterDash={enterDash}
              />
            )}
            <div className="separator">
              <div className="separator-line"></div>
              <div className="separator-text">Or</div>
              <div className="separator-line"></div>
            </div>
            <div className="form-content">
              <AnimatePresence mode="wait">
                {cardState !== "register" && (
                  <LoginForm
                    key="login"
                    onSuccess={enterDash}
                    updateUser={updateUser}
                    onSwitchToRegister={() => setCardState("register")}
                  />
                )}
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
        </div>
        <div className="section-left">
          <img className="section-left-image" src={backgroundImage} />
        </div>
      </div>
      <Footer />
    </FullScreenWrapper>
  );
};

export default Welcome;
