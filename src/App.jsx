import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import styled from "styled-components";

import { Welcome, Home, Marketplace, NotFound } from "./routes";
import {
  Registry,
  RecentRemoval,
  CertificatePage,
  PurchaseScreen,
  Map,
  Presale,
} from "./components/routes";

import {
  Navbar,
  NotificationBar,
  NutrientCalculator,
  SettingsMenu,
  Sidebar,
} from "./components";

import SellerDashboard from "./components/elements/marketplace/SellerDashboard";
import ListingPage from "./components/elements/marketplace/ListingPage";

import { Livepeer } from "./components/elements/livepeer";
import { VerificationUI } from "./components/elements/contractUI";
import { Notification, Confirmation, ResultPopup } from "./components/popups";

import { style_template } from "./components/lib/style_templates";
import { colors } from "./styles/colors";

import configs from "../configs";

import { EthereumAPI, UserAPI } from "./scripts/back_door";
import { getMarketInteractions } from "./smart_contracts/interactions";
import { getUser } from "./apis/database";

const NAVLESS_ROUTES = ["presale", "purchase"];

const { MODE, NETWORKS } = configs.blockchain;

if (typeof global === "undefined") {
  window.global = window;
}

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState(null);
  const [signer, setSigner] = useState(null);
  const [networkProvider, setNetworkProvider] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [routePath, setRoutePath] = useState(""); //record all routes of accessed components
  const [navlessRoutes, setNavlessRoutes] = useState(false);

  const [marketInteractions] = useState(
    getMarketInteractions(
      new ethers.JsonRpcProvider(NETWORKS?.[`${MODE?.toLowerCase()}net`]?.rpc)
    )
  );
  const [signedMarketInteractions, setSignedMarketInteractions] =
    useState(null);
  const [signedUser, setSignedUser] = useState(null);

  const [notificationBarOpen, setNotificationBarOpen] = useState(false);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const [verificationUIOpen, setVerificationUIOpen] = useState(false);
  const [verificationData, setVerificationData] = useState({});
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  const [settingsTab, setSettingsTab] = useState("Profile Settings");
  const [confirmation, setConfirmation] = useState(null);
  const [result, setResult] = useState(null);
  const [notification, setNotification] = useState("");

  const [txPopupVisible, setTxPopupVisible] = useState(false);

  const handleTxPopupClose = () => {
    setTxPopupVisible(false);
  };

  /**
   * Try get the user and signer for blockchain transactions
   */
  useEffect(() => {
    getUserSave();
    connectSigner();
  }, []);

  useEffect(() => {
    const isMobileScreen = () => {
      const maxWidth = 768;
      return window.innerWidth <= maxWidth;
    };

    setIsMobile(isMobileScreen());
  }, []);

  /**
   * Automatically close sidebar on mobile due to screen limitations
   */
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  /**
   * Handle routes that should not include a navbar
   */
  useEffect(() => {
    setNavlessRoutes(NAVLESS_ROUTES.includes(routePath));
  }, [routePath]);

  /**
   * #NB: BACKEND
   */
  const connectSigner = async () => {
    try {
      const connection = EthereumAPI.get.signer();
      setNetworkProvider(connection.provider);
      const _signer = connection.signer;
      setSigner(_signer);
      console.log('Eth connection', connection)
      const signerAddress = _signer.address;
      setSignedUser(signerAddress);
      setSignedMarketInteractions(getMarketInteractions(_signer));
    } catch (error) {
      throw error;
    }
  };

  //ACTIONS
  const getUserSave = () => {
    const loggedUser = sessionStorage.getItem("user");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
      return true;
    }
    return null;
  };

  const updateUser = async (uid) => {
    try {
      //const { user, error} = await UserAPI.get.user(uid);
      const user = await getUser(uid);
      if (user) {
        sessionStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        return true;
      }
      return null;

    } catch (error) {
      logNotification("error", error.message);
      return null;
    }
  };

  const handleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNotificationsBar = () => {
    setNotificationBarOpen(!notificationBarOpen);
  };

  const handleVerificationUI = () => {
    setVerificationUIOpen(!verificationUIOpen);
  };

  const handleSettingsMenu = () => {
    setSettingsMenuOpen(!settingsMenuOpen);
  };

  const handleSettingsTab = (tab) => {
    setSettingsTab(tab);
    setSettingsMenuOpen(true);
  };

  const toggleCalculator = () => setCalculatorOpen(!calculatorOpen);

  const logConfirmation = (message, action) => {
    const confirmation_obj = {
      msg: message,
      action,
    };
    setConfirmation(confirmation_obj);
  };

  const cancelConfirmation = (accepted) => {
    setConfirmation(null);
    if (!accepted) {
      logNotification("error", "Action Denied");
    }
  };

  const logNotification = (type, message) => {
    setNotification({ [type]: message });
  };

  const clearNotification = () => {
    setNotification({});
  };

  const handleLogOut = () => {
    const logOut = () => {
      setUser(null);
      sessionStorage.removeItem("user");
      window.location.href = "/";
    };
    logConfirmation("Are you sure you want to log out?", logOut);
  };

  const APP = {
    STATES: {
      isMobile,
      user,
      networkProvider,
      signer,
      signedUser,
      marketInteractions,
      signedMarketInteractions,
      searchResults,
      routePath,
      sidebarOpen,
      notificationBarOpen,
      verificationUIOpen,
      verificationData,
      settingsMenuOpen,
      calculatorOpen,
      settingsTab,
      confirmation,
      notification,
      txPopupVisible,
      result
    },
    ACTIONS: {
      getUserSave,
      updateUser,
      setSearchResults,
      setRoutePath,
      handleSidebar,
      handleNotificationsBar,
      handleVerificationUI,
      setVerificationUIOpen,
      setVerificationData,
      handleSettingsMenu,
      handleSettingsTab,
      toggleCalculator,
      logConfirmation,
      setResult,
      setTxPopupVisible,
      cancelConfirmation,
      logNotification,
      handleLogOut,
    },
  };

  useEffect(() => {
    console.log({ APP });
  }, [APP]);

  return (
    <Router>
      <AppContainer>
        <Notification
          message={notification?.[Object.keys(notification)?.[0]]}
          type={Object.keys(notification)?.[0]}
          clearNotification={clearNotification}
        />
        <Confirmation
          message={confirmation?.msg}
          onConfirm={confirmation?.action}
          onCancel={cancelConfirmation}
        />

        <ResultPopup
          isVisible={Boolean(result?.title)}
          title={result?.title}
          message={result?.message}
          txHash={result?.txHash}
          onRetry={result?.handleRetry}
          onClose={() => setResult(null)}
        />
        {settingsMenuOpen && <SettingsMenu APP={APP} />}

        {user && (
          <>
            <NotificationBar APP={APP} />

            {settingsMenuOpen && <SettingsMenu APP={APP} />}
           {/*  {signer && (
              <VerificationUI
                APP={APP}
                open={verificationUIOpen}
              />
            )} */}
          </>
        )}

          {user && !navlessRoutes && (
            <>
            </>
          )}
            {user && <Sidebar APP={APP} />}
            <Main isSidebarOpen={sidebarOpen}>
              <Routes>
                <Route path="/" element={<Welcome APP={APP} />} />
                {user?.uid && (
                  <>
                  <Route
                  
                    element={<VerificationUI APP={APP}
                    open={verificationUIOpen} />}
                    path="/features/verification" />
                    <Route
                      path="/dashboard/:dashID"
                      element={<Home APP={APP} />}
                    />
                    <Route
                    
                      path="/features/nutrient-calculator"
                      element={<NutrientCalculator APP={APP} />}
                    />

                    <Route
                      path="/features/:serviceID"
                      element={<Livepeer APP={APP} />}
                    />

                    <Route
                      path="/media/:playbackID"
                      element={<Livepeer APP={APP} />}
                    />

                    <Route
                      path="/media/live/:liveID"
                      element={<Livepeer APP={APP} />}
                    />

                    <Route
                      path="/marketplace"
                      element={<Marketplace APP={APP} />}
                    />

                    <Route
                      path="/marketplace/listing/:id"
                      element={<ListingPage APP={APP} />}
                    />

                    <Route
                      path="/marketplace/seller-dashboard"
                      element={<SellerDashboard APP={APP} />}
                    />
                  </>
                )}

                {/* Registy Project Routes */}
                <Route path="/recent-removals" element={<RecentRemoval />} />
                <Route path="/certificate/:id" element={<CertificatePage />} />
                <Route path="/registry" element={<Registry />} />
                <Route
                  path="/purchase"
                  element={<PurchaseScreen APP={APP} />}
                />
                <Route path="/map" element={<Map />} />
                <Route path="/presale" element={<Presale APP={APP} />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Main>
         

        {/* <FloatingButton onClick={() => console.log("Assistant Clicked")}>
          <FontAwesomeIcon icon={faInfo} />
        </FloatingButton> */}
      </AppContainer>
    </Router>
  );
}



const AppContainer = styled.div`
display: flex;
height: 100vh;
width: 100vw;
overflow: hidden;

`;

const Flex = styled.div`
  ${({ config }) =>
    config === "row"
      ? style_template.flex_display.row_custom("flex-start", "flex-start")
      : config === "column"
        ? style_template.flex_display.column_custom("flex-start", "center")
        : style_template.flex_display.row_centered}
`;

const Main = styled.div`
  width: 100%;
  height: 100%;
  ${style_template.flex_display.column_custom("flex-start", "flex-start")}

  padding: 32px 64px;
  box-sizing: border-box;

  overflow: auto;

  transition: 0.3s ease-in-out;

  @media (max-width: 767px) {
    width: 100vw;
  }
`;

const FloatingButton = styled(motion.button)`
  position: fixed;
  bottom: 50px;
  left: -10px;

  width: 50px;

  padding: 10px 20px;
  box-sizing: border-box;

  border: none;
  border-radius: 30px;
  background-color: ${colors.deepBlue};
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  font-size: 0.8rem;

  transition: 0.3s;
  cursor: pointer;
  z-index: 1000;

  &:hover {
    left: 20px;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    bottom: 10px;
    left: 5px;

    width: 40px;

    padding: 10px;
  }
`;

const Footer = styled.footer`
  bottom: 0;

  width: 100%;
  height: 3vh;

  ${style_template.flex_display.row_custom("space-between;", "center")}

  padding: 0.5rem;
  box-sizing: border-box;

  background-color: #ffffffa1;
  box-shadow: 0px -2px 2px 0px #d4d4d4;
  backdrop-filter: blur(10px);

  z-index: 999;

  @media (max-width: 767px) {
    padding: 0;
  }

  @media (max-width: 479px) {
    flex-direction: column;
  }
`;

const FooterContent = styled.span`
  font-size: 0.7rem;
  margin: 0;
  text-align: center;
`;

const FooterIconGroup = styled.div`
  height: auto;

  ${style_template.flex_display.row_custom("space-between;", "center")}
`;

export default App;
