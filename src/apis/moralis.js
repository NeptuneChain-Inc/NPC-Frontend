// Import necessary modules and configurations
import configs from '../configs';
import Moralis from 'moralis';
import { MORALIS_KEY } from './credentials';

async function initializeMoralis() {
    await Moralis.start({
        apiKey: MORALIS_KEY,
    });
}
initializeMoralis().catch(console.error);

const chain = configs.networks.polygon.testnetId;

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
