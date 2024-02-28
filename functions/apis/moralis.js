
import Moralis from 'moralis';

async function initializeMoralis() {
    await Moralis.start({
        apiKey: process.env.MORALIS_KEY,
    });
}
initializeMoralis().catch(console.error);

const chain = process.env.TESTNET_ID;

export const getWalletNFTs = async (address) => {
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain,
    });

    return response.toJSON();
};

export const getNFTMetadata = async (address, tokenId) => {
    const response = await Moralis.EvmApi.nft.getNFTMetadata({
        address,
        chain,
        tokenId,
    });

    return response.toJSON();
};
