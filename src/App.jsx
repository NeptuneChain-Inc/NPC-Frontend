import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
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
  const [routePath, setRoutePath] = useState(""); // record all routes of accessed components
  const [showSubItems, setShowSubItems] = useState(false); // New state for sub-items visibility

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

  /**
   * #NB: BACKEND
   */
  const connectSigner = async () => {
    try {
      const connection = EthereumAPI.get.signer();
      setNetworkProvider(connection.provider);
      const _signer = connection.signer;
      setSigner(_signer);
      console.log("Eth connection", connection);
      const signerAddress = _signer.address;
      setSignedUser(signerAddress);
      setSignedMarketInteractions(getMarketInteractions(_signer));
    } catch (error) {
      throw error;
    }
  };

  // ACTIONS
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

  const toggleEnvironmentSubItems = () => {
    setShowSubItems(!showSubItems);
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
      result,
      showSubItems, // Add showSubItems to the state object
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
      toggleEnvironmentSubItems, // Add toggleEnvironmentSubItems to the actions object
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
          </>
        )}

        {user && <Sidebar key={window.location.pathname} APP={APP} />}
        <Routes>
          <Route path="/" element={<Welcome APP={APP} />} />
          {user?.uid && (
            <Route element={<Main isSidebarOpen={sidebarOpen} />}>
              <Route
                path="/features/verification"
                element={<VerificationUI APP={APP} open={verificationUIOpen} />}
              />
              <Route path="/dashboard/:dashID" element={<Home APP={APP} />} />
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
              <Route path="/marketplace" element={<Marketplace APP={APP} />} />
              <Route
                path="/marketplace/listing/:id"
                element={<ListingPage APP={APP} />}
              />
              <Route
                path="/marketplace/seller-dashboard"
                element={<SellerDashboard APP={APP} />}
              />
            </Route>
          )}

          {/* Registry Project Routes */}
          <Route path="/recent-removals" element={<RecentRemoval />} />
          <Route path="/certificate/:id" element={<CertificatePage />} />
          <Route path="/registry" element={<Registry />} />
          <Route path="/purchase" element={<PurchaseScreen APP={APP} />} />
          <Route path="/map" element={<Map />} />
          <Route path="/presale" element={<Presale APP={APP} />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

const SidebarMenu = ({ APP }) => {
  return (
    <nav>
      <ul>
        <li onClick={APP.ACTIONS.toggleEnvironmentSubItems}>Environment</li>
        {APP.STATES.showSubItems ? (
          <>
            <li>Nutrient Calculator</li>
            <li>Broadcast Live</li>
            <li>Upload Media</li>
            <li>Verification</li>
          </>
        ) : (
          <>
            <li>Marketplace</li>
            <li>Finance</li>
            <li>Dashboard</li>
          </>
        )}
      </ul>
    </nav>
  );
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  @media (min-width: 1024px) {
    height: 100vh;
    width: 100vw;
  }
  @media (min-width: 1200px) {
    flex-direction: row;
  }
`;

const Flex = styled.div`
  ${({ config }) =>
    config === "row"
      ? style_template.flex_display.row_custom("flex-start", "flex-start")
      : config === "column"
      ? style_template.flex_display.column_custom("flex-start", "center")
      : style_template.flex_display.row_centered}
`;

const StyledMain = styled.div`
  width: 100%;
  height: 100%;
  padding: 0px 24px;

  box-sizing: border-box;
  background: white;

  overflow: auto;

  transition: 0.3s ease-in-out;

  @media (max-width: 767px) {
    width: 100vw;
  }

  @media (min-width: 768px) {
    padding: 32px 64px;
  }
`;

export default App;

function Main() {
  return (
    <StyledMain>
      <Outlet />
    </StyledMain>
  );
}
