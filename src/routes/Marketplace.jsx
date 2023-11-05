import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MarketBrowser } from '../components/elements/marketplace';
import { MarketplaceContract } from '../apis/contracts';

const MarketplaceContainer = styled.div`
width: 100vw;
height: 100vh;
    font-family: 'Roboto', sans-serif;
    background-color: #001F3F;
    color: #B2B2B2;
    min-height: 100vh;
`;

const Header = styled.header`
    background-color: #3D9970;
    padding: 20px 0;
    text-align: center;
    font-size: 2em;
    font-family: 'Pacifico', cursive;
    color: #FFFFFF;
`;

const SearchBar = styled.input`
    width: 80%;
    padding: 10px;
    margin: 20px 10%;
    border-radius: 20px;
    border: none;
    outline: none;
`;

const NFTCard = styled.div`
    background-color: #FFFFFF;
    border-radius: 10px;
    padding: 20px;
    margin: 20px;
    transition: transform 0.3s;

    &:hover {
        transform: scale(1.05);
    }
`;

const BuyButton = styled.button`
    background-color: #3D9970;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #001F3F;
    }
`;

const Marketplace = ({ APP }) => {
    const [contract, setContract] = useState(null);
    const { networkProvider, signer } = APP?.STATES || {};

    useEffect(() => {
        if (signer) {
            setContract(MarketplaceContract.getMarketInteractions(signer))
        }
    }, [signer])


    return (
        <MarketplaceContainer>
            <Header>NeptuneChain Marketplace</Header>
            <SearchBar placeholder="Search for NPCs..." />
            {/* ... Category Filters ... */}
            <MarketBrowser provider={networkProvider} contract={contract} />
            {/* ... More NFT Cards ... */}
            {/* ... Footer ... */}
        </MarketplaceContainer>
    );
}

export default Marketplace;
