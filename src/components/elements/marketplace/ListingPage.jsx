import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { ethers } from 'ethers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faHome } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import PoSPopup from './elements/PoSPopup';
import { formatLongString } from '../../../functions/utils';
import { colors } from '../../../styles/colors';
import { MARKETPLACE_HEADER } from './elements/styled';
import { ACTION_BUTTON } from '../../global_styled';
import placeholder from '../../../assets/icon.png';

const logoColors = {
  primary: '#005A87',  
  secondary: '#003F5E', 
  accent: '#007BB5', 
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;


const Spinner = styled.div`
  border: 4px solid ${logoColors.secondary};
  border-top: 4px solid ${logoColors.accent};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${rotate} 2s linear infinite;
  margin: 20px auto;
`;

const ListingPageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 80px 20px;
  width: 100%;
  box-sizing: border-box;
  animation: ${fadeIn} 0.6s ease-out;
  overflow: auto;
`;

const BlurredBack = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  `;

  const MainContent = styled.div`
  width: 80%;
  height: auto;
  margin-right: 20px;
  animation: ${fadeIn} 0.8s ease-out;
  border-bottom: 1px solid ${logoColors.secondary};
  border-radius: 4px;
  overflow: auto;

  @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
  }
`;

const Sidebar = styled.div`
  width: 20%;
  padding: 20px;
  overflow: auto;
  transition: transform 0.3s ease;
  position: sticky;

  @media (max-width: 768px) {
    position: fixed;
    width: 80%;
    padding-top: 100px;
    height: 100vh;
    top: 0;
    right: 0;
    transform: translateX(${props => props.isOpen ? '0' : '100%'});
    z-index: 20;
    background-color: #fff;
  }
`;

const DrawerToggleButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 55px;
    right: 10px;
    z-index: 100;
    background: ${logoColors.primary};
    color: #fff;
  }
`;



  const Section = styled.div`
  height: auto;
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 8px;
  // background-color: ${logoColors.secondary};
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${logoColors.accent};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    border-left: 4px solid ${logoColors.primary};
  }
`;

const HeroSection = styled(Section)`
  display: flex;
  gap: 50px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TokenImage = styled(motion.img)`
  min-height: 200px;
  min-width: 200px;
  max-width: 400px;
  height: auto;
  border: 1px solid black;
`;

const SectionTitle = styled.h2`
  margin-bottom: 15px;
  color: #333;
`;

const Item = styled.div`
display: flex;
flex-direction: column;
  padding: 10px;
  border-bottom: 1px solid #eee;
  background-color: ${colors.accentBlue}80;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  box-sizing: border-box;
  &:last-child {
    border-bottom: none;
  }
`;

const ItemLabel = styled.span`
  font-weight: bold;
`;

const ItemData = styled.span`
  font-weight: 100;
`;

const ListingPage = ({ APP }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listingDetails, setListingDetails] = useState({});
  const [bidHistory, setBidHistory] = useState([]);
  const [saleHistory, setSaleHistory] = useState([]);
  const [actionType, setActionType] = useState('');
  const [showPoSPopup, setShowPoSPopup] = useState(false);
  const [userBidHistory, setUserBidHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

const toggleDrawer = () => {
  setIsDrawerOpen(!isDrawerOpen);
};


  const { signedUser, marketInteractions, signedMarketInteractions } = APP?.STATES || {};
  //   const [transferHistory, setTransferHistory] = useState([]);

  useEffect(() => {
    const fetchListingData = async () => {
      setIsLoading(true);
      try {
        const allEvents = await marketInteractions.Events.getAllEvents();
        console.log({ allEvents })
        const listingEvents = allEvents.filter(event => event.listingId?.toString() === id);

        // Set the state based on the processed data
        setListingDetails(listingEvents.find(event => event.type === 'Listing') || {});
        setBidHistory(listingEvents.filter(event => event.type === 'Bid Placed' || event.type === 'Bid Accepted'));
        setSaleHistory(listingEvents.filter(event => event.type === 'Sale'));

      } catch (error) {
        console.error('Error fetching listing data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListingData();
  }, [id]);

  useEffect(() => {
    if (signedUser) {
      fetchUserBids();
    }
  }, [signedUser])

  const fetchUserBids = async () => {
    const bidEvents = await marketInteractions.Events.filtered.bidded();
    setUserBidHistory(bidEvents.filter(event => event.bidder === signedUser && event.listingId === Number(id)));
  }


  const openPoSPopup = (type) => {
    if (signedMarketInteractions) {
      setActionType(type);
      setShowPoSPopup(true);
    } else {
      alert('User Not Signed')
    }

  };

  const closePoSPopup = () => {
    setShowPoSPopup(false);
  };

  const buyNFT = async (listingId, value) => {
    try {
      return await signedMarketInteractions?.Functions?.Buyer?.buyNFT(listingId, ethers.parseUnits(value, 'ether'));
    } catch (error) {
      console.error('Error buying NFT:', error);
      throw error; // Rethrow the error to handle it in the component
    }
  };

  const placeBid = async (listingId, value) => {
    try {
      return await signedMarketInteractions?.Functions?.Buyer?.placeBid(listingId, ethers.parseUnits(value, 'ether'));
    } catch (error) {
      console.error('Error placing bid:', error);
      throw error;
    }
  };

  const navigateBack = () => {
    navigate(-1);
  };

  if (!listingDetails) {
    return <p>Loading listing details...</p>;
  }

  return (
    <ListingPageWrapper>
      {isLoading ? (
        <Spinner />
      ):(
        <MainContent>
          
        <HeroSection>
          <TokenImage src={placeholder}/>
          <div>
          <SectionTitle>Listing #{id}</SectionTitle>
          <Item>
            <ItemLabel>Token ID: <ItemData>{listingDetails.tokenId}</ItemData></ItemLabel>
            <ItemLabel>Price: <ItemData>${listingDetails.price}</ItemData></ItemLabel>
          </Item>
          </div>
        </HeroSection>

        <Section>
          <SectionTitle>Bid History</SectionTitle>
          {bidHistory.map((bid, index) => (
            <Item key={index}>
              <ItemLabel>Action: <ItemData>{bid.type}</ItemData></ItemLabel>
              <ItemLabel>Bidder: <ItemData>{bid.bidder}</ItemData></ItemLabel>
              <ItemLabel>Amount: <ItemData>{bid.amount} Matic</ItemData></ItemLabel>
              {/* ... Other bid details */}
            </Item>
          ))}
        </Section>

        <Section>
          <SectionTitle>Sale History</SectionTitle>
          {saleHistory.map((sale, index) => (
            <Item key={index}>
              <ItemLabel>Buyer: <ItemData>{sale.buyer}</ItemData></ItemLabel>
              <ItemLabel>Sale Price: <ItemData>{sale.price} Matic</ItemData></ItemLabel>
              {/* ... Other sale details */}
            </Item>
          ))}
        </Section>

      </MainContent>
      )}

<DrawerToggleButton onClick={toggleDrawer}>
  <FontAwesomeIcon icon={isDrawerOpen ? faArrowLeft : faArrowRight} />
</DrawerToggleButton>

      <Sidebar isOpen={isDrawerOpen}>
        <Section style={{backgroundColor: '#134b5f'}}>
          <h3 style={{color: '#fff'}}>Purchase Credit</h3>
          <ACTION_BUTTON 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            onClick={() => openPoSPopup('buy')} 
            disabled={isLoading}
          >
            Buy
          </ACTION_BUTTON>
          <ACTION_BUTTON 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            onClick={() => openPoSPopup('bid')} 
            disabled={isLoading}
          >
            Bid
          </ACTION_BUTTON>
          {/* Additional user actions */}
        </Section>
        <Section>
          <h3>Your Bid History</h3>
          {signedUser ? (
            <>
              {userBidHistory.length > 0 ? (
                userBidHistory.map((bidEvent) => (
                  <Item key={bidEvent.blockNumber}>
                    <ItemLabel>Block: <ItemData>{bidEvent.blockNumber}</ItemData></ItemLabel>
                    <ItemLabel>Amount: <ItemData>{bidEvent.amount} Matic</ItemData></ItemLabel>
                    {/* ... Other bid details */}
                  </Item>
                ))
              ) : (
                <p>No Bids for {formatLongString(signedUser)}</p>
              )}
            </>
          ) : (
            <p>User Not Connected</p>
          )}
        </Section>
      </Sidebar>

      {showPoSPopup && (
        <BlurredBack
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <PoSPopup closePopup={closePoSPopup} actionType={actionType} listingId={id} listingPrice={listingDetails.price} buyNFT={buyNFT} placeBid={placeBid} />
        </BlurredBack>
      )}
    </ListingPageWrapper>
  );
};

export default ListingPage;
