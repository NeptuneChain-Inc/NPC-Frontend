
import { ethers } from 'ethers';

const Contract = {
    Address: '0xc5bCcEC73b5458d15244783A1A0964C3783eF2bb',
    ABI: [
        // Constructor
        "constructor(address initialOwner)",

        // Events
        "event NFTListed(uint256 indexed tokenId, address indexed seller, uint256 price)",
        "event NFTPurchased(uint256 indexed tokenId, address indexed buyer, address indexed seller, uint256 price)",
        "event NFTDelisted(uint256 indexed tokenId, address indexed seller)",
        "event PriceUpdated(uint256 indexed tokenId, address indexed seller, uint256 newPrice)",

        // Structs
        "struct Listing { address seller; uint256 price; }",

        // State variables
        "mapping(uint256 => Listing) public listings",

        // Functions
        "function listNFT(address nftAddress, uint256 tokenId, uint256 price) external",
        "function delistNFT(uint256 tokenId) external",
        "function updatePrice(uint256 tokenId, uint256 newPrice) external",
        "function purchaseNFT(uint256 tokenId) external payable",
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
            listNFT: async (nftAddress, tokenId, price) => {
                const tx = await contract.listNFT(nftAddress, tokenId, price);
                return await tx.wait();
            },

            delistNFT: async (tokenId) => {
                const tx = await contract.delistNFT(tokenId);
                return await tx.wait();
            },

            updatePrice: async (tokenId, newPrice) => {
                const tx = await contract.updatePrice(tokenId, newPrice);
                return await tx.wait();
            },

            purchaseNFT: async (tokenId, value) => {
                const tx = await contract.purchaseNFT(tokenId, { value });
                return await tx.wait();
            },

            getListing: async (tokenId) => {
                return await contract.getListing(tokenId);
            },

            // This function is for the contract to handle received NFTs, 
            // but including it for completeness.
            onERC721Received: async (operator, from, tokenId, data) => {
                const tx = await contract.onERC721Received(operator, from, tokenId, data);
                return await tx.wait();
            }
        },
        Listeners: {
            onNFTListed: (callback) => {
                contract.on("NFTListed", (seller, nftAddress, tokenId, price, event) => {
                    callback({ seller, nftAddress, tokenId, price, event });
                });
            },

            onNFTDelisted: (callback) => {
                contract.on("NFTDelisted", (tokenId, event) => {
                    callback({ tokenId, event });
                });
            },

            onNFTSold: (callback) => {
                contract.on("NFTSold", (buyer, seller, nftAddress, tokenId, price, event) => {
                    callback({ buyer, seller, nftAddress, tokenId, price, event });
                });
            },

            onPriceUpdated: (callback) => {
                contract.on("PriceUpdated", (tokenId, newPrice, event) => {
                    callback({ tokenId, newPrice, event });
                });
            },
            
            removeAllListeners: () => {
                contract.removeAllListeners();
            }
        }
    }
}

export { Contract, getMarketInteractions }