import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { NFTCard } from './elements';
import { useNavigate } from 'react-router-dom';

export const NFTGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 768px) {
    display:flex;
    flex-direction: column;
  }
`;

const LoadingIndicator = styled.div`
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
    margin: auto;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const ErrorMsg = styled.p`
    color: red;
`;

const MarketBrowser = ({ marketEvents }) => {
    const navigate = useNavigate();
    const [nfts, setNfts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData()
    }, [marketEvents])


    const fetchData = async () => {
        setLoading(true);
        try {
            const fetchedNfts = await marketEvents?.listAvailableNFTs() || [];
            console.log(fetchedNfts)
            setNfts(fetchedNfts);
        } catch (err) {
            console.error(err)
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingIndicator />
    if (error) return <ErrorMsg>Error: {error}</ErrorMsg>

    return (
        <NFTGrid>
                {nfts.length > 0 ? (
                    nfts.map((nft, index) => <NFTCard key={index} nft={nft} navigate={navigate}/>)
                ) : <p>No Assets Available</p>}
            </NFTGrid>
    );
}

export default MarketBrowser;
