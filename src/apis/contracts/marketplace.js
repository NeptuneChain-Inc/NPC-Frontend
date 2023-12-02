import { ethers } from 'ethers';
import { Contract as nft_Contract } from './verification'; 

const Contract = {
    Address: '0xc5bCcEC73b5458d15244783A1A0964C3783eF2bb',
    ABI: [
        // Constructor
        "constructor(address initialOwner)",

        // Events
        "event NFTListed(uint256 indexed tokenId, address indexed seller, uint256 price)",
        "event NFTPurchased(uint256 indexed tokenId, address indexed buyer, address indexed seller, uint256 price)",
        "event NFTDelisted(uint256 indexed tokenId)",
        "event NFTBidPlaced(uint256 indexed tokenId, address indexed bidder, uint256 amount)",
        "event NFTBidRemoved(uint256 indexed tokenId, address indexed bidder)",

        // Functions
        "function listNFT(uint256 tokenId, uint256 price) external",
        "function buyNFT(uint256 tokenId) external payable",
        "function placeBid(uint256 tokenId) external payable",
        "function removeBid(uint256 tokenId) external",
        "function acceptBid(uint256 tokenId) external",
        "function delistNFT(uint256 tokenId) external",
        "function getListing(uint256 tokenId) view returns (address seller, uint256 price)",
        "function onERC721Received(address operator, address from, uint256 tokenId, bytes data) external returns (bytes4)"
    ]
}

const getMarketInteractions = (signer) => {
    const contract = new ethers.Contract(Contract.Address, Contract.ABI, signer);
    return {
        address: Contract.Address,
        Instance: contract,
        Functions: {
            approveAndListNFT: async (tokenId, price) => {
                // Step 1: Approve the marketplace contract to transfer the NFT
                const nftContract = new ethers.Contract(nft_Contract.Address, nft_Contract.ABI, signer);
                const approvalTx = await nftContract.approve(Contract.Address.address, tokenId);
                await approvalTx.wait();
            
                // Step 2: List the NFT on the marketplace
                const listTx = await contract.listNFT(tokenId, price);
                return await listTx.wait();
            },            
            listNFT: async (tokenId, price) => {
                const tx = await contract.listNFT(tokenId, price);
                return await tx.wait();
            },

            buyNFT: async (tokenId, value) => {
                const tx = await contract.buyNFT(tokenId, { value });
                return await tx.wait();
            },

            placeBid: async (tokenId, value) => {
                const tx = await contract.placeBid(tokenId, { value });
                return await tx.wait();
            },

            removeBid: async (tokenId) => {
                const tx = await contract.removeBid(tokenId);
                return await tx.wait();
            },

            acceptBid: async (tokenId) => {
                const tx = await contract.acceptBid(tokenId);
                return await tx.wait();
            },

            delistNFT: async (tokenId) => {
                const tx = await contract.delistNFT(tokenId);
                return await tx.wait();
            },

            getListing: async (tokenId) => {
                return await contract.getListing(tokenId);
            },

            onERC721Received: async (operator, from, tokenId, data) => {
                const tx = await contract.onERC721Received(operator, from, tokenId, data);
                return await tx.wait();
            }
        },
        Listeners: {
            onNFTListed: (callback) => {
                contract.on("NFTListed", (tokenId, seller, price, event) => {
                    callback({ tokenId, seller, price, event });
                });
            },

            onNFTPurchased: (callback) => {
                contract.on("NFTPurchased", (tokenId, buyer, seller, price, event) => {
                    callback({ tokenId, buyer, seller, price, event });
                });
            },

            onNFTDelisted: (callback) => {
                contract.on("NFTDelisted", (tokenId, event) => {
                    callback({ tokenId, event });
                });
            },

            onBidPlaced: (callback) => {
                contract.on("NFTBidPlaced", (tokenId, bidder, amount, event) => {
                    callback({ tokenId, bidder, amount, event });
                });
            },

            onBidRemoved: (callback) => {
                contract.on("NFTBidRemoved", (tokenId, bidder, event) => {
                    callback({ tokenId, bidder, event });
                });
            },

            removeAllListeners: () => {
                contract.removeAllListeners();
            }
        }
    }
}

export { Contract, getMarketInteractions }
