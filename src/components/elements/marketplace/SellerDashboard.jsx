//#TO-DO Client Error Reporting

import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import styled from "styled-components";
import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { NFT_API } from "../../../scripts/back_door";
import { isNotZeroAddress } from "../../../scripts/utils";
import {NFTGrid} from "./MarketBrowser";
import {NFTImage} from "./elements/NFTCard";
import placeholderIMG from '../../../assets/icon.png';
import { DashboardPage } from "../../shared/DashboardPage/DashboardPage";

// Neptune Color Palette
const colors = {
  deepBlue: "#0A2E36",
  lightBlue: "#4FBDBA",
  accentBlue: "#88CDDA",
  white: "#FFF",
};



const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: ${colors.white};
  border-radius: 10px;
  margin-top: 20px;
  width: 80%;
  height: 60vh;
  overflow: auto;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 95%;
  }
`;

const StyledTabList = styled(TabList)`
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const StyledTab = styled(Tab)`
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  background: ${colors.accentBlue};
  color: ${colors.deepBlue};
  user-select: none;
  transition: all 0.3s ease;

  &.react-tabs__tab--selected {
    background: ${colors.deepBlue};
    color: ${colors.white};
  }

  &:focus {
    outline: none;
  }
`;

StyledTab.tabsRole = "Tab";

const StyledTabPanel = styled(TabPanel)`
  display: none;
  width: 100%;
  padding-top: 20px;

  &.react-tabs__tab-panel--selected {
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.3s ease;
  }
`;

StyledTabPanel.tabsRole = "TabPanel";

const SectionTitle = styled.h2`
  margin-bottom: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: ${colors.deepBlue};
  color: ${colors.white};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #ccc;
    cursor: default;
  }
`;

const NFT = styled(motion.div)`
display: flex;
flex-direction: column;
align-items: center;
gap: 10px;
  margin: 10px;
  background-color: ${colors.white};
    border: none;
    padding: 20px 30px;
    border-radius: 8px;
    transition: 0.3s ease-in-out;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    overflow: auto;
    overflow-x: hidden;
    box-sizing: border-box;

    @media (max-width: 768px) {
        width: 100%
    }

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
}

p {
          margin: 2px;

          span {
          color: ${colors.deepBlue};
          font-weight: bold;
          }
        }
        
    
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
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

  z-index: 1000;

  &:hover {
    transform: translateY(-2px);
    left: 20px;
  }
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid ${colors.lightBlue};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const hoverAnimation = {
  scale: 1.05,
  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
};

const SellerDashboard = ({ APP }) => {
  const navigate = useNavigate();
  const [price, setPrice] = useState("");
  const [userNFTs, setUserNFTs] = useState([]);
  const [userListedNFTs, setUserListedNFTs] = useState([]);
  const [highestBids, setHighestBids] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const { signedUser, marketInteractions, signedMarketInteractions } =
    APP?.STATES || {};

    const { setResult } =
    APP?.ACTIONS || {};

  useEffect(() => {
    if (signedUser) {
      fetchUserNFTs();
      fetchListedNFTs();
    }
  }, [APP]);

  useEffect(() => {
    if (userListedNFTs.length > 0) {
      fetchHighestBids();
    }
  }, [userListedNFTs]);

  const fetchUserNFTs = async () => {
    setIsLoading(true);
    try {
      const wallet_nfts = await NFT_API.get.wallet_nfts(signedUser);

      if (wallet_nfts) {
        console.log("DEV: wallet_nfts", wallet_nfts)
        setUserNFTs(wallet_nfts);
        return true;
      }
      return null;
    } catch (error) {
      console.log(error);
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchListedNFTs = async () => {
    setIsLoading(true);
    try {
      const nfts = await marketInteractions.Events.listAvailableNFTs();
      const _userListed = nfts.filter((event) => event.seller === signedUser);
      setUserListedNFTs(_userListed);
      return _userListed;
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchHighestBids = async () => {
    setIsLoading(true);
    try {

      const bidsPromises = userListedNFTs.map(async (nft) => {
        const _bid = await marketInteractions.Functions.Getters.getHighestBids(
          nft.listingId
        );
        if (isNotZeroAddress(_bid.bidder)) {
          return {
            listingId: nft.listingId,
            ..._bid,
          };
        }
        return null;
      });

      const _bids = await Promise.all(bidsPromises);
      const validBids = _bids.filter((bid) => bid !== null); // Filter out null values
      setHighestBids(validBids);
      return validBids;
    } catch (error) {
      console.error("Error fetching highest bids:", error);
      setIsError("Error fetching highest bids:");
    } finally {
      setIsLoading(false);
    }
  };

  const handleListNFT = async (tokenAddress, tokenId) => {
    setIsLoading(true);
    try {
      const listingFee =
        await marketInteractions.Functions.Getters.getListingFee();

      const result =
        await signedMarketInteractions.Functions.Seller.approveAndListNFT(
          tokenAddress,
          tokenId,
          ethers.parseEther(price),
          listingFee
        );
        console.log('@DEV Handle Result',result);
        if(result?.hash) {
          setResult({
          title: "Confirm",
          message: "Transaction Successful",
          txHash: result?.hash
        })
        } else {
          setResult({
            title: "Failed",
            message: "Cound not transact",
          })
        }
    } catch (error) {
      setResult({
        title: "Error",
        message: error?.message,
      })
      console.error("Error listing NFT:", error);
      setIsError("Error listing NFT");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelistNFT = async (listingId) => {
    setIsLoading(true);
    try {
      const result =
        await signedMarketInteractions.Functions.Seller.cancelListing(
          listingId
        );
        console.log('@DEV Handle Result',result);
        if(result?.hash) {
          setResult({
          title: "Confirm",
          message: "Transaction Successful",
          txHash: result?.hash
        })
        } else {
          setResult({
            title: "Failed",
            message: "Cound not transact",
          })
        }
    } catch (error) {
      setResult({
        title: "Error",
        message: error?.message,
      })
      console.error("Error delisting NFT:", error);
      setIsError("Error delisting NFT");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptBid = async (listingId) => {
    setIsLoading(true);
    try {
      const result = await signedMarketInteractions.Functions.Seller.acceptBid(
        listingId
      );
      console.log('@DEV Handle Result',result);
      if(result?.hash) {
        setResult({
        title: "Confirm",
        message: "Transaction Successful",
        txHash: result?.hash
      })
      } else {
        setResult({
          title: "Failed",
          message: "Cound not transact",
        })
      }
  } catch (error) {
    setResult({
      title: "Error",
      message: error?.message,
    })
      console.error("Error accepting bid:", error);
      setIsError("Error accepting bid");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardPage>

      <StyledTabList>
        <StyledTab>Owned</StyledTab>
        <StyledTab>Listed</StyledTab>
        <StyledTab>Proposals</StyledTab>
      </StyledTabList>

      <TabContainer>
        <StyledTabPanel>
          <SectionTitle>Your Assets</SectionTitle>
          {isLoading ? (
            <Spinner />
          ) : userNFTs.length > 0 ? (
            <NFTGrid>
              {userNFTs.map((nft) => (
                <NFT
                  key={nft.listingId}
                  initial={{ scale: 1 }}
                  whileHover={hoverAnimation}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <p>
                    {nft?.contract?.name} #{nft?.tokenId}
                  </p>
                  <NFTImage src={nft?.image?.pngUrl || placeholderIMG} alt={nft?.contract?.name} />
                  <Input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price (MATIC)"
                    required
                  />
                  <Button
                    onClick={() =>
                      handleListNFT(nft?.contract?.address, nft?.tokenId)
                    }
                  >
                    List NFT
                  </Button>
                </NFT>
              ))}
            </NFTGrid>
          ) : (
            <p>No Owned Assets</p>
          )}
        </StyledTabPanel>

        <StyledTabPanel>
          <SectionTitle>Your Listings</SectionTitle>
          {isLoading ? (
            <Spinner />
          ) : userListedNFTs.length > 0 ? (
            <NFTGrid>
              {userListedNFTs.map((nft) => (
                <NFT
                  key={nft.listingId}
                  initial={{ scale: 1 }}
                  whileHover={hoverAnimation}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <p>
                    {nft?.name} #{nft?.tokenId}
                  </p>
                  <p><span>Listing #{nft.listingId}</span></p>
                  <p>${nft.price}</p>
                  <ButtonContainer>
                    <Button
                      onClick={() =>
                        navigate(`/marketplace/listing/${nft.listingId}`)
                      }
                    >
                      View Listing
                    </Button>
                    <Button onClick={() => handleDelistNFT(nft.listingId)}>
                      Delist
                    </Button>
                  </ButtonContainer>
                </NFT>
              ))}
            </NFTGrid>
          ) : (
            <p>No Listed Assets</p>
          )}
        </StyledTabPanel>

        <StyledTabPanel>
          <SectionTitle>Highest Bid Proposals</SectionTitle>
          {isLoading ? (
            <Spinner />
          ) : highestBids.length > 0 ? (
            <NFTGrid>
              {highestBids.map((nft) => (
                <NFT
                  initial={{ scale: 1 }}
                  whileHover={hoverAnimation}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <p>Listing #{nft.listingId}</p>
                  <p>Bidder: {nft.bidder}</p>
                  <p>Value: {nft.bidAmount} Matic</p>
                  <ButtonContainer>
                    <Button
                      onClick={() =>
                        navigate(`/marketplace/listing/${nft.listingId}`)
                      }
                    >
                      View Listing
                    </Button>
                    <Button onClick={() => handleAcceptBid(nft.listingId)}>
                      Accept Bid
                    </Button>
                  </ButtonContainer>
                </NFT>
              ))}
            </NFTGrid>
          ) : (
            <p>No Bids</p>
          )}
        </StyledTabPanel>
      </TabContainer>

      <FloatingButton onClick={() => navigate("/marketplace")}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </FloatingButton>
    </DashboardPage>
  );
};

export default SellerDashboard;
