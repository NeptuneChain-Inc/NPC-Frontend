import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import Notification from "../../../components/popups/NotificationPopup";
import { environmentalRotation, successAnimation } from "../../../assets/animations";
import {
  BUTTON,
  LOADING_ANIMATION,
  PROMPT_CARD,
  PROMPT_FORM,
  TEXT_LINK,
} from "../../../components/lib/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { formVariant, loadingVariant } from "./motion_variants";
import { CardLogo, logoImage, logoVariants } from "../../Welcome";
import { Player } from "@lottiefiles/react-lottie-player";

/** #BACKEND */
import { createUserWithEmailAndPassword } from "firebase/auth";

/** FIREBASE AUTH */
import { auth } from "../../../apis/firebase";
import { createUser } from "../../../apis/database";
import { Input } from "../../../components/shared/input/Input";
import FormSection from "../../../components/shared/FormSection/FormSection";
import { ButtonLink, ButtonPrimary } from "../../../components/shared/button/Button";



const Icon = styled(FontAwesomeIcon)`
  color: #0077b6;
  margin-right: 10px;
`;

const Dropdown = styled.select`
  height: 40px;
  background: ${({theme}) => theme.colors.ui50}; 
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.ui300};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: 0 8px;
  font-size: 14px; 
  color: ${({ theme }) => theme.colors.ui800};
  font-weight: 500;  
`;

const RegisterForm = ({ onSuccess, onSwitchToLogin, updateUser, googleData }) => {
  const [username, setUsername] = useState(googleData?.name || "");
  const [email, setEmail] = useState(googleData?.gmail || "");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("farmer");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      let newUser = null;
      if (googleData?.gmail) {
        newUser = {
          uid: googleData.uid,
          username: username.toLowerCase(),
          email: googleData.gmail,
          type: accountType,
        };
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const userData = userCredential.user;

        newUser = {
          uid: userData.uid,
          username: username.toLowerCase(),
          email: userData.email.toLowerCase(),
          type: accountType,
        };
      }

      if (await createUser(newUser)) {
        setIsSuccess(Boolean(await updateUser?.(newUser.uid)));
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
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
       
            <FormSection label="Username">
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FormSection>

            <FormSection label="Email">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormSection>

            <FormSection label={"Password"}>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormSection>

            <FormSection label={"Account type"}>
              <Dropdown
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                required
              >
                <option value="farmer">Farmer</option>
                <option value="distributor">Distributor</option>
                <option value="retailer">Retailer</option>
              </Dropdown>
            </FormSection>

            <ButtonPrimary type="submit">Register</ButtonPrimary>
            <div>

            <ButtonLink type="button" onClick={onSwitchToLogin}>
              Already have an account? Log in
            </ButtonLink>
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
    </AnimatePresence>
  );
};

export default RegisterForm;
