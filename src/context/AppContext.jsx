import React, { createContext, useContext, useState, useEffect } from "react";
import { UserAPI } from "../scripts/back_door";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [routePath, setRoutePath] = useState("");
  const [showSubItems, setShowSubItems] = useState(false);
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

  useEffect(() => {
    const isMobileScreen = () => window.innerWidth <= 768;
    setIsMobile(isMobileScreen());
    window.addEventListener("resize", () => setIsMobile(isMobileScreen()));
    return () =>
      window.removeEventListener("resize", () => setIsMobile(isMobileScreen()));
  }, []);

  useEffect(() => {
    const loggedUser = sessionStorage.getItem("user");
    const { uid } = loggedUser || {};
    if (uid) updateUser(uid);
  }, []);

  const updateUser = async (uid, _userdata = {}) => {
    console.log('USER', uid)
    try {
      var userdata;
      if (_userdata?.uid) {
        userdata = _userdata;
      } else {
        userdata = (await UserAPI.account.getUserFromUID(uid))?.userdata;
      }
      console.log('USERDATA', userdata)
      if (userdata?.uid) {
        sessionStorage.setItem("user", JSON.stringify(userdata));
        setUser(userdata);
        console.log("Set User", userdata)
        return true;
      }
    } catch (error) {
      logNotification("error", error.message);
    }
    return null;
  };

  const handleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleNotificationsBar = () =>
    setNotificationBarOpen(!notificationBarOpen);
  const handleVerificationUI = () => setVerificationUIOpen(!verificationUIOpen);
  const handleSettingsMenu = () => setSettingsMenuOpen(!settingsMenuOpen);
  const handleSettingsTab = (tab) => {
    setSettingsTab(tab);
    setSettingsMenuOpen(true);
  };
  const toggleCalculator = () => setCalculatorOpen(!calculatorOpen);
  const logConfirmation = (message, action) =>
    setConfirmation({ msg: message, action });
  const cancelConfirmation = (accepted) => {
    setConfirmation(null);
    if (!accepted) logNotification("error", "Action Denied");
  };
  const logNotification = (type, message) =>
    setNotification({ [type]: message });
  const clearNotification = () => setNotification({});
  const handleLogOut = () => {
    logConfirmation("Are you sure you want to log out?", () => {
      setUser(null);
      sessionStorage.removeItem("user");
      window.location.href = "/";
    });
  };
  const toggleEnvironmentSubItems = () => setShowSubItems(!showSubItems);

  const APP = {
    STATES: {
      isMobile,
      user,
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
      showSubItems,
    },
    ACTIONS: {
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
      clearNotification,
      setResult,
      setTxPopupVisible,
      cancelConfirmation,
      logNotification,
      handleLogOut,
      toggleEnvironmentSubItems,
    },
  };

  return <AppContext.Provider value={APP}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
