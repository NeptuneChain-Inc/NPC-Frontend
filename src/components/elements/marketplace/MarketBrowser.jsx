import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { NFTCard } from './elements';
import { useNavigate } from 'react-router-dom';

export const NFTGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 768px) {
    display:flex;
    flex-direction: column;
  }
`;

const LoadingIndicator = styled.div`
    border: 5px solid ${({theme}) => theme.colors.ui200};
    border-top: 5px solid ${({theme}) => theme.colors.ui800};
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 0.8s linear infinite;
    margin: auto;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const ErrorMsg = styled.p`
    color: red;
`;

const StyledLoading = styled.div`
    .loading-text {
        font-weight: 500; 
        color: ${({theme}) => theme.colors.ui800};
        text-align: center; 
        margin-top: 8px; 
        font-size: 14px;
    }
`

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

    if (loading) return <StyledLoading>
        <LoadingIndicator />
        <div className='loading-text'>Loading Items</div>
        </StyledLoading>
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
