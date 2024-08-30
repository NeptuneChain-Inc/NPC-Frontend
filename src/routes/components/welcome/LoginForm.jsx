import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../apis/firebase";

import { Player } from "@lottiefiles/react-lottie-player";

import successAnimation from "../../../assets/animations/success-animation.json";
import environmentalRotation from "../../../assets/animations/environmental-friendly-animation.json";
import Notification from "../../../components/popups/NotificationPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import {
  BUTTON,
  INPUT,
  LOADING_ANIMATION,
  PROMPT_CARD,
  PROMPT_FORM,
  TEXT_LINK,
} from "../../../components/lib/styled";
import { formVariant, loadingVariant } from "./motion_variants";
import { CardLogo, logoImage, logoVariants } from "../../Welcome";
import FormSection from "../../../components/shared/FormSection/FormSection";
import { Input } from "../../../components/shared/input/Input";
import {
  ButtonLink,
  ButtonPrimary,
  ButtonSecondary,
} from "../../../components/shared/button/Button";
import GoogleSignIn from "./GoogleSignIn";
import { useNavigate } from "react-router-dom";

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

function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

const StyledLoginForm = styled.div`
  .input-section {
  }

  ${ButtonPrimary} {
    margin-top: 40px;
    width: 100%;
  }

  ${ButtonSecondary} {
    width: 100%;
  }

  .secondary-actions {
    .secondary-action-text {
      font-weight: 500;
      font-size: 14px;
      color: ${({ theme }) => theme.colors.ui600};
    }
  }
`;

const LoginForm = ({ onSuccess, onSwitchToRegister, updateUser }) => {
  const { ACTIONS } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { logNotification } = ACTIONS || {};

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }
  }, [isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userData = await signInWithEmailAndPassword(auth, email, password);
      setIsSuccess(Boolean(await updateUser?.(userData?.user?.uid)));
      navigate("/dashboard/environmental");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (isValidEmail(email)) {
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
    <StyledLoginForm>
      <Notification type="error" message={error} />

      <PROMPT_CARD>
        {isLoading ? (
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
        ) : !isSuccess ? (
          <PROMPT_FORM
            variants={formVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            onSubmit={handleSubmit}
          >
            <div className="input-section">
              <FormSection label={"Email"}>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormSection>
            </div>
            <div className="input-section">
              <FormSection label={"Password"}>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormSection>
            </div>
            <div className="button-area">
              <ButtonPrimary type="submit">Log In</ButtonPrimary>
            </div>
            <div className="secondary-actions">
              <div className="secondary-action-text">
                <ButtonLink type="button" onClick={handleResetPassword}>
                  Forgot Password?
                </ButtonLink>
              </div>
              <div className="secondary-action-text">
                Need an account?{" "}
                <ButtonLink type="button" onClick={onSwitchToRegister}>
                  {" "}
                  Register
                </ButtonLink>
              </div>
            </div>
          </PROMPT_FORM>
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
              src={successAnimation}
              style={{ height: 100, width: 100 }}
            />
          </LOADING_ANIMATION>
        )}
      </PROMPT_CARD>
    </StyledLoginForm>
  );
};

export default LoginForm;
