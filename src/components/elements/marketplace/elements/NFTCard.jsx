import React from 'react';
import styled from 'styled-components';

import { formatLongString } from '../../../../scripts/utils';

import { colors } from '../../../../styles/colors';
import placeholderIMG from '../../../../assets/icon.png';

const Card = styled.div`
    background-color: white;
    border: none;
    padding: 20px;
    border-radius: 15px;
    transition: transform 0.3s, box-shadow 0.3s;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    max-height: 400px;
    overflow: auto;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
    }
`;

const NFTImage = styled.img`
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-bottom: 10px;
`;

const NFTInfo = styled.div`
    padding: 10px 0;
`;

const Title = styled.h3`
    font-size: 1.2em;
    margin: 0;
    color: #333;
    font-weight: 600;
`;

const Seller = styled.p`
    color: #666;
    font-size: 0.9em;
    margin: 5px 0;
`;

const Price = styled.p`
    color: #007BFF;
    font-size: 1em;
    font-weight: 500;
`;

const BuyButton = styled.button`
    background-color: ${colors.deepBlue};
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
    width: 100%;
    font-weight: 500;

    &:hover {
        background-color: #0056b3;
        transform: translateY(-2px);
    }
`;

const NFTCard = ({ nft, navigate }) => (
    <Card>
        <NFTImage src={nft.image || placeholderIMG} alt={nft.name} />
        <NFTInfo>
            <Title>{nft.name} #{Number(nft.tokenId)}</Title>
            <Seller>Seller: {formatLongString(nft.seller)}</Seller>
            <Price>${nft.price}</Price>
        </NFTInfo>
        <BuyButton onClick={() => navigate(`listing/${nft.listingId}`)}>Buy Now</BuyButton>
    </Card>
);

export default NFTCard;
