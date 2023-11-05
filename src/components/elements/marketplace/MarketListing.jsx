import React, { useState } from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';

const ListingForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 400px;
    margin: 0 auto;
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    background-color: #007BFF;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const MarketListing = ({ signer }) => {
    const [price, setPrice] = useState('');
    const [nftId, setNftId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!signer) return;

        const marketplaceContract = new ethers.Contract(MARKETPLACE_CONTRACT_ADDRESS, MARKETPLACE_ABI, signer);
        try {
            const tx = await marketplaceContract.listNFTForSale(nftId, ethers.utils.parseEther(price));
            await tx.wait();
            alert('NFT listed successfully!');
        } catch (error) {
            console.error('Error listing NFT:', error);
        }
    };

    return (
        <ListingForm onSubmit={handleSubmit}>
            <label>
                NFT ID:
                <input type="text" value={nftId} onChange={(e) => setNftId(e.target.value)} required />
            </label>
            <label>
                Price (in ETH):
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </label>
            <Button type="submit">List NFT</Button>
        </ListingForm>
    );
}

export default MarketListing;
