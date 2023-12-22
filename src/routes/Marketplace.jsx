import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MarketBrowser } from '../components/elements/marketplace';
import { MarketplaceContract } from '../apis/contracts';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDolly, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import EventsPopup from '../components/elements/marketplace/EventsPopup';
import { colors, logoColors } from '../styles/colors';
import { MARKETPLACE_HEADER } from '../components/elements/marketplace/elements/styled';


const MarketplaceContainer = styled.div`
    width: 100%;
        height: 100%;
        padding: 60px 20px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        color: #B2B2B2;
        font-family: 'Roboto', sans-serif;
        box-sizing: border-box;
        overflow: auto;

        @media (max-width: 768px) {
        }
`;

const SearchBarContainer = styled.div`
width: 80%;
        display: flex;
        align-items: center;
        margin: 20px 10%;
        border-radius: 20px;
        background-color: white;
        padding: 5px;

        @media (max-width: 768px) {
            width: 95%;
            margin: 10px 2.5%;
        }
`;

const SearchBar = styled.input`
width: 90%;
padding: 10px;
border: none;
outline: none;
font-size: 1em;
border-radius: 0;

@media (max-width: 768px) {
    font-size: 0.9em;
}
`;

const SearchIcon = styled(FontAwesomeIcon)`
color: #568EA3;
margin-left: 10px;
`

const EventsButton = styled.button`
background-color: ${colors.deepBlue};
color: white;
border: none;
padding: 10px 20px;
border-radius: 5px;
font-size: 1em;
cursor: pointer;
transition: background-color 0.3s, transform 0.2s;
margin: 10px 0;

&:hover {
    transform: translateY(-2px);
}

@media (max-width: 768px) {
    font-size: 0.9em;
    padding: 8px 15px;
}
`


const Marketplace = ({ APP }) => {
    const navigate = useNavigate();
    const { marketInteractions } = APP?.STATES || {};

    const [marketEvents, setMarketEvents] = useState(null);
    const [showEventsPopup, setShowEventsPopup] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        setMarketEvents(marketInteractions?.Events);
    }, [marketInteractions]);


    // Function to toggle the events popup
    const toggleEventsPopup = () => setShowEventsPopup(prevState => !prevState);

    const fetchEvents = async (filterType, rangeFilter = 500, toBlock = 'latest') => {

        let _events;
        if (filterType in marketEvents.filtered) {
            _events = await marketEvents.filtered[filterType](rangeFilter, toBlock);
            console.log("filtered", { filterType, _events })
        } else {
            _events = await marketEvents.getAllEvents(rangeFilter, toBlock)
            const fListed = await marketEvents.filtered.listed(rangeFilter, toBlock)
            console.log("filtered Listings", { _events, fListed })
        }

        if (_events) {
            setEvents(_events);
        }
    };


    return (
        <MarketplaceContainer>
            <SearchBarContainer>
                <SearchBar placeholder="Search for NPCs..." />
                <SearchIcon icon={faSearch} />
            </SearchBarContainer>

            {/* <SearchBar placeholder="Search for NPCs..." /> */}

            <EventsButton onClick={toggleEventsPopup}>Market Events</EventsButton>

            <MarketBrowser marketEvents={marketEvents} />

            {showEventsPopup && (
                <EventsPopup events={events} onClose={toggleEventsPopup} fetchEvents={fetchEvents} marketEvents={marketEvents} />
            )}
        </MarketplaceContainer>
    );
}

export default Marketplace;
