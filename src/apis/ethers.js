import { ethers } from 'ethers';
import { AppConfigs } from './database';

export const getSigner = async () => {
    const configs = await AppConfigs.get();
    const { rpc, prvKey } = configs?.testnet
    console.log("configs", configs)
    if (rpc && prvKey) {
        const provider = new ethers.JsonRpcProvider(rpc);
        const wallet = new ethers.Wallet(prvKey, provider);
        return {
            provider,
            signer: wallet.connect(provider)
        };
    } else {
        return null;
    }
}