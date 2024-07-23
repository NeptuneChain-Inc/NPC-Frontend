import React from 'react';
import styled from 'styled-components';

import { formatLongString } from '../../../../scripts/utils';

import { colors } from '../../../../styles/colors';
import placeholderIMG from '../../../../assets/icon.png';
import { ButtonPrimary } from '../../../shared/button/Button';

const Card = styled.div`
    background-color: white;
    border: none;
    padding: 20px;
    border-radius: ${({theme}) => theme.borderRadius.default};
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: pointer;
    max-height: 400px;
    overflow: auto;
    box-sizing: border-box;
    border: 1px solid ${({theme}) => theme.colors.ui200};
    @media (max-width: 768px) {
        width: 100%
    }

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
    }
`;

export const NFTImage = styled.img`
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
    color: ${({theme}) => theme.colors.primary500};
    font-size: 1.5rem;
    font-weight: 600; 
`;



const NFTCard = ({ nft, navigate }) => (
    <Card>
        <NFTImage src={nft.image || placeholderIMG} alt={nft.name} />
        <NFTInfo>
            <Title>{nft.name} #{Number(nft.tokenId)}</Title>
            {/* <Seller>Seller: {formatLongString(nft.seller)}</Seller> */}
            <Seller>Seller: NeptuneChain*</Seller>
            <Seller>Available: {Math.round(Math.random()*100)}</Seller>
            <Price>${Math.round(nft.price*Math.random()*100)}</Price>
        </NFTInfo>
        <ButtonPrimary fullWidth={true} className onClick={() => navigate(`listing/${nft.listingId}`)}>Buy Now</ButtonPrimary>
    </Card>
);

export default NFTCard;
