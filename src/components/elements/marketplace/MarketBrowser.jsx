import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';

const NFTGrid = styled.div`
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const NFTCard = styled.div`
    border: 1px solid #eaeaea;
    padding: 20px;
    border-radius: 10px;
    transition: transform 0.3s;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
    }
`;

const BuyButton = styled.button`
    background-color: #007BFF;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const MarketBrowser = ({ provider, contract }) => {
    const [nfts, setNfts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const marketplaceContract = contract?.Instance

    useEffect(() => {
        async function fetchNFTs() {
            if (provider && contract) {
                try {
                    setLoading(true);
                    const filter = marketplaceContract.filters.NFTListed();
                    const logs = await provider.getLogs({
                        fromBlock: 0,
                        toBlock: 'latest',
                        address: contract.address,
                        topics: filter.topics
                    });

                    const _nfts = logs.map(log => {
                        const decoded = marketplaceContract.interface.parseLog(log);
                        return decoded.args;
                    });

                    setNfts(_nfts);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            } else {
                return;
            }
        }

        fetchNFTs();
    }, [provider, contract]);

    const handleBuyNow = async (tokenId, price) => {
        if (!signer) {
            console.error("No signer available");
            return;
        }

        try {
            const tx = await marketplaceContract.buyNFT(tokenId, { value: ethers.utils.parseEther(price.toString()) });
            const receipt = await tx.wait();
            console.log("Transaction receipt:", receipt);
        } catch (err) {
            console.error("Error buying NFT:", err);
        }
    }

    if (loading) return <p>Loading NFTs...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <NFTGrid>
            {nfts.map((nft) => (
                <NFTCard key={nft.tokenId}>
                    <img src={nft.imageURL} alt={nft.name} />
                    <h3>{nft.name}</h3>
                    <p>Price: {ethers.utils.formatEther(nft.price)} ETH</p>
                    <BuyButton onClick={() => handleBuyNow(nft.tokenId, nft.price)}>Buy Now</BuyButton>
                </NFTCard>
            ))}
        </NFTGrid>
    );
}

export default MarketBrowser;
