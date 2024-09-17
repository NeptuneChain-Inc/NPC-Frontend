import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";

import { Welcome, Home, Marketplace, NotFound } from "./routes";
import {
  Registry,
  RecentRemoval,
  CertificatePage,
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

import {
  SellerDashboard,
  ListingPage,
} from "./components/elements/marketplace";

import { Livepeer } from "./components/elements/livepeer";
import { VerificationUI } from "./components/elements/contractUI";
import { Notification, Confirmation, ResultPopup } from "./components/popups";
import { useAppContext } from "./context/AppContext";

function App() {
  const { STATES } = useAppContext();
  const { user } = STATES || {};
  return (
    <Router>
      <AppContainer>
        <Popups />
        <Routes>
          <Route path="/" element={<Welcome />} />

          {user?.uid && (
            <>
              <Route
                path="/features/verification"
                element={<VerificationUI />}
              />
              <Route path="/dashboard/:dashID" element={<Home />} />
              <Route
                path="/features/nutrient-calculator"
                element={<NutrientCalculator />}
              />
              <Route path="/features/:serviceID" element={<Livepeer />} />
              <Route path="/media/:playbackID" element={<Livepeer />} />
              <Route path="/media/live/:liveID" element={<Livepeer />} />
              <Route
                path="/marketplace/seller-dashboard"
                element={<SellerDashboard />}
              />
            </>
          )}

          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/listing/:id" element={<ListingPage />} />
          <Route path="/recent-removals" element={<RecentRemoval />} />
          <Route path="/certificate/:id" element={<CertificatePage />} />
          <Route path="/registry" element={<Registry />} />
          <Route path="/map" element={<Map />} />
          <Route path="/presale" element={<Presale />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

const Popups = () => {
  return (
    <>
      <Notification />
      <Confirmation />
      <ResultPopup />
      {/* User Only */}
      <Sidebar key={window.location.pathname} />
      <NotificationBar />
      <SettingsMenu />
    </>
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

export default App;
