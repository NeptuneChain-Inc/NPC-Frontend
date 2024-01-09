import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Welcome, Home, Marketplace, NotFound } from './routes'
import { Notification, Confirmation } from './components/popups'
import { Livepeer } from './components/elements/livepeer'
import styled from 'styled-components'
import { Navbar, NotificationBar, NutrientCalculator, SettingsMenu, Sidebar } from './components'
import { getUser } from './apis/database'
import { VerificationUI } from './components/elements/contractUI'
import { getSigner } from './apis/ethers'
import { getMarketInteractions } from './apis/contracts/marketplaceInteractions'
import configs from './configs'
import { ethers } from 'ethers'
import SellerDashboard from './components/elements/marketplace/SellerDashboard'
import ListingPage from './components/elements/marketplace/ListingPage'
import { style_template } from './components/lib/style_templates'
import FloatingMenu from './components/FloatingMenu'
import { faInfo } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import { colors } from './styles/colors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Registry, RecentRemoval, CertificatePage, PurchaseScreen, Map} from "./components/routes"; //Registry Imports


const AppContainer = styled.div`
${style_template.flex_display.column_custom('center', 'flex-start')}
width: 100vw;
height: 100vh;
`;

const FlexRow = styled.div`
  ${style_template.flex_display.row_custom('flex-start', 'center')}
  
  //background: black;
`;

const Main = styled.div`
// position: fixed;
  width: ${({ isSidebarOpen }) => isSidebarOpen ? '80vw' : "100vw"};
  height: 100vh;
  display: flex;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  align-items: flex-start;
  flex-direction: column;
  padding-bottom: 25px;
  justify-content: flex-start;
  box-sizing: border-box;
  transition: 0.3s ease-in-out;

  overflow: auto;

  @media(max-width: 767px) {
    width:100vw;
  }

`;

const FloatingButton = styled(motion.button)`
position: fixed;
bottom: 50px;
left: -10px;
width: 50px;
padding: 10px 20px;
border: none;
border-radius: 30px;
background-color: ${colors.deepBlue};
color: white;
font-size: 0.8rem;
cursor: pointer;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
transition: 0.3s;

&:hover {
    transform: translateY(-2px);
    left: 20px;
}

z-index: 1000; 

@media (max-width: 768px) {
    width: 40px;
    bottom: 10px;
    left: 5px;
    padding: 10px;
}
`;


const Footer = styled.footer`
  width: 100%;
  bottom: 0;
  height: 20px;
  display: flex;
  position: fixed;
  box-shadow: 0px -2px 2px 0px #d4d4d4;
  align-items: center;
  padding-top: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 0.5rem;
  justify-content: space-between;
  background-color: #fff;

  z-index: 999;

  @media(max-width: 767px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  @media(max-width: 479px) {
    padding: 1rem;
    flex-direction: column;
  }
`;

const FooterContent = styled.span`
  font-size: 0.7rem;

  @media(max-width: 767px) {
    text-align: center;
    margin-left: 1rem;
    margin-right: 1rem;
  }

  @media(max-width: 479px) {
    margin-left: 0px;
    margin-right: 0px;
    margin-bottom: 1rem;
  }
`;

const FooterIconGroup = styled.div`
  height: auto;
  display: flex;
  align-items: center;
  padding-top: 0px;
  padding-left: 0px;
  padding-right: 0px;
  flex-direction: row;
  padding-bottom: 0px;
  justify-content: space-between;
`;

if (typeof global === 'undefined') {
  window.global = window;
}

function App() {
  const [isMobile,] = useState(isMobileScreen());
  const [user, setUser] = useState(null);
  const [signer, setSigner] = useState(null);
  const [networkProvider, setNetworkProvider] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  const [marketInteractions,] = useState(getMarketInteractions(new ethers.JsonRpcProvider(configs.networks.polygon.testnet)));
  const [signedMarketInteractions, setSignedMarketInteractions] = useState(null);
  const [signedUser, setSignedUser] = useState(null);

  const [notificationBarOpen, setNotificationBarOpen] = useState(false);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const [verificationUIOpen, setVerificationUIOpen] = useState(false);
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  const [settingsTab, setSettingsTab] = useState('Profile Settings');
  const [confirmation, setConfirmation] = useState(null);
  const [notification, setNotification] = useState('');
  const [alert, setAlert] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile])

  useEffect(() => {
    getUserSave();
    connectSigner();
  }, [])

  useEffect(() => {
    console.log(user);
    if (user?.uid) {

    }
  }, [user])

  function isMobileScreen() {
    const maxWidth = 768;
    return window.innerWidth <= maxWidth;
  }

  const connectSigner = async () => {
    try {
      const connection = await getSigner();
      setNetworkProvider(connection.provider)
      const _signer = connection.signer;
      setSigner(_signer)

      const signerAddress = await _signer.getAddress();
      setSignedUser(signerAddress);
      setSignedMarketInteractions(getMarketInteractions(_signer));
    } catch (error) {
      //Handle Error
      console.error(error)
      throw error
    }
  }

  //ACTIONS
  const getUserSave = () => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
      return true;
    } else {
      return false;
    }
  }

  const updateUser = async (uid) => {
    try {
      const _userUpdate = await getUser(uid);
      localStorage.setItem('user', JSON.stringify(_userUpdate))
      setUser(_userUpdate);
      return true;
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const handleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }

  const handleNotificationsBar = () => {
    setNotificationBarOpen(!notificationBarOpen);
  }

  const handleVerificationUI = () => {
    setVerificationUIOpen(!verificationUIOpen);
  }

  const handleSettingsMenu = () => {
    setSettingsMenuOpen(!settingsMenuOpen);
  }

  const handleSettingsTab = (tab) => {
    setSettingsTab(tab);
    setSettingsMenuOpen(true);
  }

  const toggleCalculator = () => setCalculatorOpen(!calculatorOpen);

  const logConfirmation = (message, action) => {
    const confirmation_obj = {
      msg: message,
      action
    }
    setConfirmation(confirmation_obj);
  }

  const cancelConfirmation = (accepted) => {
    setConfirmation(null);
    if (!accepted) {
      setError('Action Denied');
    }
  }

  const logNotification = (type, message) => {
    switch (type) {
      case 'alert':
        setAlert(message)
        break;
      case 'error':
        setError(message)
        break;
      default:
        setNotification(message)
        break;
    }
  }

  const clearNotification = (type) => {
    switch (type) {
      case 'alert':
        setAlert('')
        break;
      case 'error':
        setError('')
        break;
      default:
        setNotification('')
        break;
    }
  }

  const handleLogOut = () => {
    const logOut = () => {
      setUser(null);
      localStorage.removeItem('user')
      window.location.href = '/';
    }
    logConfirmation('Are you sure you want to log out?', logOut);
  }

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
      sidebarOpen,
      notificationBarOpen,
      verificationUIOpen,
      settingsMenuOpen,
      calculatorOpen,
      settingsTab,
      confirmation,
      notification,
      alert,
      error
    },
    ACTIONS: {
      getUserSave,
      updateUser,
      setSearchResults,
      handleSidebar,
      handleNotificationsBar,
      handleVerificationUI,
      handleSettingsMenu,
      handleSettingsTab,
      toggleCalculator,
      logConfirmation,
      cancelConfirmation,
      logNotification,
      handleLogOut,
    }
  }

  useEffect(() => {
    console.log({ APP })
  }, [APP])


  return (
    <Router>
      <AppContainer>
        <Notification type='notification' message={notification} clearNotification={clearNotification} />
        <Notification type='alert' message={alert} clearNotification={clearNotification} />
        <Notification type='error' message={error} clearNotification={clearNotification} />
        <Confirmation message={confirmation?.msg} onConfirm={confirmation?.action} onCancel={cancelConfirmation} />

        {settingsMenuOpen && (
          <SettingsMenu APP={APP} />
        )}

        {user && (
          <>
            <Navbar APP={APP} />
            {/* <Sidebar APP={APP} /> */}
            <NotificationBar APP={APP} />
            <NutrientCalculator isOpen={calculatorOpen} onClose={toggleCalculator} />
            {settingsMenuOpen && <SettingsMenu APP={APP} />}
            {signer && <VerificationUI signer={signer} open={verificationUIOpen} APP={APP} />}
          </>
        )}


        <FlexRow>
          {user && <Sidebar APP={APP} />}
          <Main isSidebarOpen={sidebarOpen}>
            <Routes>
              <Route path="/" element={<Welcome APP={APP} />} />
              {user?.uid && <Route path="/dashboard/:dashID" element={<Home APP={APP} />} />}
              {user?.uid && <Route path="/features/:serviceID" element={<Livepeer APP={APP} />} />}
              {user?.uid && <Route path="/media/:playbackID" element={<Livepeer APP={APP} />} />}
              {user?.uid && <Route path="/media/live/:liveID" element={<Livepeer APP={APP} />} />}
              {user?.uid && <Route path="/marketplace" element={<Marketplace APP={APP} />} />}
              {user?.uid && <Route path="/marketplace/listing/:id" element={<ListingPage APP={APP} />} />}
              {user?.uid && <Route path="/marketplace/seller-dashboard" element={<SellerDashboard APP={APP} />} />}

              {/* Registy Project Routes */}
              <Route path="/" element={<Registry />} />
              <Route path="/recent-removals" element={<RecentRemoval />} />
              <Route path="/certificate/:id" element={<CertificatePage />} />
              <Route path="/registry" element={<Registry />} />
              <Route path="/purchase" element={<PurchaseScreen />} />
              <Route path="/map" element={<Map />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Main>
        </FlexRow>

        {/* <FloatingMenu handleCalculatorClick={toggleCalculator}/> */}
        <FloatingButton onClick={() => console.log('Assistant Clicked')}>
          <FontAwesomeIcon icon={faInfo} />
        </FloatingButton>

        <Footer>
          <FooterContent>© 2023 NeptuneChain, All Rights Reserved.</FooterContent>
          <FooterIconGroup>
            {/* ICONS HERE */}
          </FooterIconGroup>
        </Footer>
      </AppContainer>
    </Router>
  )
}

export default App
