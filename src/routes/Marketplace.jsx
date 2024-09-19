import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faSearch } from "@fortawesome/free-solid-svg-icons";
import { MarketBrowser } from "../components/elements/marketplace";
import EventsPopup from "../components/elements/marketplace/EventsPopup";
import { Input } from "../components/shared/input/Input";
import { ButtonSecondary } from "../components/shared/button/Button";

const MarketplaceContainer = styled.div`
  width: 100%;

  .button-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 8px;

    @media (min-width: 450px) {
      width: auto;
    }
  }

  ${ButtonSecondary} {
    width: 100%;

    @media (min-width: 450px) {
      width: auto;
    }
  }

  ${Input} {
    max-width: 400px;
    width: 100%;
  }
`;

const BottomBar = styled.div`
  padding-top: 20px;
  margin-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.ui200};
`;

const TopBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.primary500};
  margin-left: 10px;
`;

const Marketplace = () => {
  const [showEventsPopup, setShowEventsPopup] = useState(false);

  const toggleEventsPopup = () => setShowEventsPopup((prevState) => !prevState);

  return (
    <MarketplaceContainer>
      <TopBar>
        <Input placeholder="Search for NPCs..." />
        <div className="button-wrapper">
          <ButtonSecondary>
            Search
            <SearchIcon icon={faSearch} />
          </ButtonSecondary>

          <ButtonSecondary onClick={toggleEventsPopup}>
            <FontAwesomeIcon icon={faCalendar} />
            View all Events
          </ButtonSecondary>
        </div>
      </TopBar>
      <BottomBar>
        <MarketBrowser />
      </BottomBar>

      {showEventsPopup && (
        <EventsPopup
          onClose={toggleEventsPopup}
        />
      )}
    </MarketplaceContainer>
  );
};

export default Marketplace;
