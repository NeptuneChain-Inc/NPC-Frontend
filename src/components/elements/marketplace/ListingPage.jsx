import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { ethers } from 'ethers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faHome } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import PoSPopup from './elements/PoSPopup';
import { formatLongString } from '../../../functions/utils';
import { colors } from '../../../styles/colors';
import { MARKETPLACE_HEADER } from './elements/styled';
import { ACTION_BUTTON } from '../../global_styled';

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
  background: linear-gradient(120deg, ${logoColors.primary} 0%, ${logoColors.accent} 100%);
  height: 100vh;
  width: 100vw;
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
  margin-right: 20px;
  animation: ${fadeIn} 0.8s ease-out;
  border-bottom: 1px solid ${logoColors.secondary};
  border-radius: 4px;
  overflow: auto;
`;

  const Sidebar = styled.div`
  position: sticky;
  width: 20%;
  background-color: ${logoColors.secondary};
  padding: 20px;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: auto;
`;
  const Section = styled.section`
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 8px;
  background-color: white;
  box-sizing: border-box;
  max-height: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${logoColors.accent};
  transition: all 0.3s ease;
  overflow: auto;

  &:hover {
    transform: translateY(-2px);
    border-left: 4px solid ${logoColors.primary};
  }
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
  transition:  0.3s;

  &:hover {
    transform: translateY(-2px);
    left: 20px;
  }
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
<MARKETPLACE_HEADER>NeptuneChain Marketplace <FontAwesomeIcon icon={faHome} onClick={() => navigate('/dashboard/main')} /></MARKETPLACE_HEADER>
      {isLoading ? (
        <Spinner />
      ):(
        <MainContent>
        <Section>
          <SectionTitle>Listing #{id}</SectionTitle>
          <Item>
            <ItemLabel>Token ID: <ItemData>{listingDetails.tokenId}</ItemData></ItemLabel>
            <ItemLabel>Price: <ItemData>{listingDetails.price} Matic</ItemData></ItemLabel>
          </Item>
        </Section>

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

      <Sidebar>
        <Section>
          <h3>Get Asset</h3>
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
            Place Bid
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

      <FloatingButton onClick={navigateBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </FloatingButton>

    </ListingPageWrapper>
  );
};

export default ListingPage;
