import { ethers } from 'ethers';
import { getNFTMetadata } from '../moralis';

const MarketContract = {
    Address: '0xe5Afb79A81f4f6BeA3Ed45FfB3C7a722448bc86d',
    GenesisBlock: '42664715',
    ABI: [
        // Constructor
        "constructor()",

        // Events
        "event Listed(uint256 indexed listingId, address indexed seller, address indexed tokenAddress, uint256 tokenId, uint256 price)",
        "event Sale(uint256 indexed listingId, address indexed buyer, address indexed tokenAddress, uint256 tokenId, uint256 price)",
        "event ListingCancelled(uint256 indexed listingId)",
        "event BidPlaced(uint256 indexed listingId, address indexed bidder, uint256 amount)",
        "event BidAccepted(uint256 indexed listingId, address indexed seller, address indexed bidder, uint256 amount)",
        "event RewardsAccrued(address indexed user, uint256 amount)",

        //Getters
        "function highestBids(uint256) view returns (address bidder, uint256 amount)",
        "function listingFee() view returns (uint256)",

        // Functions
        "function setListingFee(uint256 fee) external",
        "function listNFT(address tokenAddress, uint256 tokenId, uint256 price) external payable",
        "function buyNFT(uint256 listingId) public payable",
        "function cancelListing(uint256 listingId) external",
        "function placeBid(uint256 listingId) external payable",
        "function acceptBid(uint256 listingId) external",
    ]
};

const ERC20 = {
    ABI: [
        "function name() view returns (string)",
        "function symbol() view returns (string)",
        "function decimals() view returns (uint8)",
        "function totalSupply() view returns (uint256)",
        "function balanceOf(address _owner) view returns (uint256)",
        "function transfer(address _to, uint256 _value) returns (bool)",
        "function approve(address _spender, uint256 _value) returns (bool)",
        "function allowance(address _owner, address _spender) view returns (uint256)",
        "event Transfer(address indexed _from, address indexed _to, uint256 _value)",
        "event Approval(address indexed _owner, address indexed _spender, uint256 _value)"
    ]
}

const ERC721 = {
    ABI: [
        "function balanceOf(address _owner) view returns (uint256)",
        "function ownerOf(uint256 _tokenId) view returns (address)",
        "function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data)",
        "function safeTransferFrom(address _from, address _to, uint256 _tokenId)",
        "function transferFrom(address _from, address _to, uint256 _tokenId)",
        "function approve(address _approved, uint256 _tokenId)",
        "function getApproved(uint256 _tokenId) view returns (address)",
        "function setApprovalForAll(address _operator, bool _approved)",
        "function isApprovedForAll(address _owner, address _operator) view returns (bool)",
        "function name() view returns (string)",
        "function symbol() view returns (string)",
        "function tokenURI(uint256 _tokenId) view returns (string)",
        "event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId)",
        "event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId)",
        "event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved)"
    ]
}

const getMarketInteractions = (signer) => {
    const contract = new ethers.Contract(MarketContract.Address, MarketContract.ABI, signer);
    const genBlock = Number(MarketContract.GenesisBlock);
    return {
        address: MarketContract.Address,
        contract: MarketContract,
        Instance: contract,
        Functions: {
            Getters: {
                getListingFee: async () => {
                    return await contract.listingFee();
                },
                getHighestBids: async (listingId) => {
                    const { bidder, amount } = await contract.highestBids(listingId);
                    return { bidder, bidAmount: ethers.formatEther(amount) };
                }
            },
            Seller: {
                approveAndListNFT: async (tokenAddress, tokenId, price, value) => {
                    //First Check If Already Approved!!

                    // Step 1: Approve the marketplace contract to transfer the NFT
                    const nftContract = new ethers.Contract(tokenAddress, ERC721.ABI, signer);
                    const approvalTx = await nftContract.approve(MarketContract.Address, tokenId);
                    await approvalTx.wait();
                
                    // Step 2: List the NFT on the marketplace
                    const listTx = await contract.listNFT(tokenAddress, tokenId, price, { value });
                    return await listTx.wait();
                },  
                listNFT: async (tokenAddress, tokenId, price, value) => {
                    console.log({tokenAddress, tokenId, price, value})
                    const tx = await contract.listNFT(tokenAddress, tokenId, price, { value });
                    return await tx.wait();
                },
                cancelListing: async (listingId) => {
                    const tx = await contract.cancelListing(listingId);
                    return await tx.wait();
                },
                acceptBid: async (listingId) => {
                    const tx = await contract.acceptBid(listingId);
                    return await tx.wait();
                },
            },
            Buyer: {
                buyNFT: async (listingId, value) => {
                    const tx = await contract.buyNFT(listingId, { value });
                    return await tx.wait();
                },
                placeBid: async (listingId, value) => {
                    const tx = await contract.placeBid(listingId, { value });
                    return await tx.wait();
                }
            }
        },
        Events: {
            listAvailableNFTs: async () => {
                try {
                    // Fetch 'Listed' events within the limited block range
                    const listedEvents = await contract.queryFilter(
                        contract.filters.Listed(),
                        genBlock
                    );

                    const listedNFTs = listedEvents.map(event => ({
                        block: event.blockNumber,
                        listingId: Number(event.args.listingId),
                        seller: event.args.seller,
                        tokenAddress: event.args.tokenAddress,
                        tokenId: Number(event.args.tokenId),
                        price: ethers.formatEther(event.args.price)
                    }));

                    // Fetch all 'Sale' and 'ListingCancelled' events to find out which NFTs are no longer available
                    const saleEvents = await contract.queryFilter(contract.filters.Sale(), genBlock);
                    const cancelledEvents = await contract.queryFilter(contract.filters.ListingCancelled(), genBlock);
                    const unavailableListingIds = new Set([
                        ...saleEvents.map(event => Number(event.args.listingId)),
                        ...cancelledEvents.map(event => Number(event.args.listingId))
                    ]);

                    // Filter out NFTs that have been sold or cancelled
                    const availableNFTs = listedNFTs.filter(nft => !unavailableListingIds.has(nft.listingId));
                    return Promise.all(availableNFTs.map(async nft => {
                        const metadata = await getNFTMetadata(nft.tokenAddress, nft.tokenId.toString());
                        return {
                            ...nft,
                            name: metadata?.name,
                            symbol: metadata?.symbol,
                            uri: metadata?.token_uri, // Replace 'tokenUri' with the correct property from the Moralis response
                            metadata: metadata?.metadata
                        };
                    }));
                } catch (error) {
                    throw error;
                }
            },
            getAllEvents: async (fromBlock = null, toBlock = 'latest') => {
                try {
                    // Retrieve all event types
                    const listedEvents = await contract.queryFilter(contract.filters.Listed(), fromBlock || genBlock, toBlock);
                    const saleEvents = await contract.queryFilter(contract.filters.Sale(), fromBlock || genBlock, toBlock);
                    const listingCancelledEvents = await contract.queryFilter(contract.filters.ListingCancelled(), fromBlock || genBlock, toBlock);
                    const bidPlacedEvents = await contract.queryFilter(contract.filters.BidPlaced(), fromBlock || genBlock, toBlock);
                    const bidAcceptedEvents = await contract.queryFilter(contract.filters.BidAccepted(), fromBlock || genBlock, toBlock);
                    const rewardsAccruedEvents = await contract.queryFilter(contract.filters.RewardsAccrued(), fromBlock || genBlock, toBlock);
                    console.log({ listedEvents })
                    // Combine all events into a single array
                    const allEvents = [
                        ...listedEvents.map(event => ({
                            type: 'Listing',
                            block: event.blockNumber,
                            listingId: Number(event.args.listingId),
                            seller: event.args.seller,
                            tokenAddress: event.args.tokenAddress,
                            tokenId: Number(event.args.tokenId),
                            price: ethers.formatEther(event.args.price)
                        })),
                        ...saleEvents.map(event => ({
                            type: 'Sale',
                            block: event.blockNumber,
                            listingId: Number(event.args.listingId),
                            buyer: event.args.buyer,
                            tokenAddress: event.args.tokenAddress,
                            tokenId: Number(event.args.tokenId),
                            price: ethers.formatEther(event.args.price)
                        })),
                        ...listingCancelledEvents.map(event => ({
                            type: 'Listing Cancelled',
                            block: event.blockNumber,
                            listingId: Number(event.args.listingId),
                        })),
                        ...bidPlacedEvents.map(event => ({
                            type: 'Bid Placed',
                            block: event.blockNumber,
                            listingId: Number(event.args.listingId),
                            bidder: event.args.bidder,
                            amount: ethers.formatEther(event.args.amount)
                        })),
                        ...bidAcceptedEvents.map(event => ({
                            type: 'Bid Accepted',
                            block: event.blockNumber,
                            listingId: Number(event.args.listingId),
                            seller: event.args.seller,
                            bidder: event.args.bidder,
                            amount: ethers.formatEther(event.args.amount)
                        })),
                        ...rewardsAccruedEvents.map(event => ({
                            type: 'Rewards Accrued',
                            block: event.blockNumber,
                            user: event.args.user,
                            amount: ethers.formatEther(event.args.amount)
                        }))
                    ];
                    return allEvents;
                } catch (error) {
                    throw error;
                }
            },
            filtered: {
                listed: async (fromBlock = null, toBlock = 'latest') => {
                    const listedEvents = await contract.queryFilter(contract.filters.Listed(), fromBlock || genBlock, toBlock);
                    return listedEvents.map(event => ({
                        blockNumber: event.blockNumber,
                        listingId: Number(event.args.listingId),
                        seller: event.args.seller,
                        tokenAddress: event.args.tokenAddress,
                        tokenId: Number(event.args.tokenId),
                        price: ethers.formatEther(event.args.price)
                    }));
                },
                sale: async (fromBlock = null, toBlock = 'latest') => {
                    const saleEvents = await contract.queryFilter(contract.filters.Sale(), fromBlock || genBlock, toBlock);
                    return saleEvents.map(event => ({
                        blockNumber: event.blockNumber,
                        listingId: Number(event.args.listingId),
                        buyer: event.args.buyer,
                        tokenAddress: event.args.tokenAddress,
                        tokenId: Number(event.args.tokenId),
                        price: ethers.formatEther(event.args.price)
                    }))
                },
                delisted: async (fromBlock = null, toBlock = 'latest') => {
                    const listingCancelledEvents = await contract.queryFilter(contract.filters.ListingCancelled(), fromBlock || genBlock, toBlock);
                    return listingCancelledEvents.map(event => ({
                        blockNumber: event.blockNumber,
                        listingId: Number(event.args.listingId),
                    }))
                },
                bidded: async (fromBlock = null, toBlock = 'latest') => {
                    const bidPlacedEvents = await contract.queryFilter(contract.filters.BidPlaced(), fromBlock || genBlock, toBlock);
                    return bidPlacedEvents.map(event => ({
                        blockNumber: event.blockNumber,
                        listingId: Number(event.args.listingId),
                        bidder: event.args.bidder,
                        amount: ethers.formatEther(event.args.amount)
                    }))
                },
                BidAccepted: async (fromBlock = null, toBlock = 'latest') => {
                    const bidAcceptedEvents = await contract.queryFilter(contract.filters.BidAccepted(), fromBlock || genBlock, toBlock);
                    return bidAcceptedEvents.map(event => ({
                        blockNumber: event.blockNumber,
                        listingId: Number(event.args.listingId),
                        seller: event.args.seller,
                        bidder: event.args.bidder,
                        amount: ethers.formatEther(event.args.amount)
                    }))
                },
                rewards: async (fromBlock = null, toBlock = 'latest') => {
                    const rewardsAccruedEvents = await contract.queryFilter(contract.filters.RewardsAccrued(), fromBlock || genBlock, toBlock);
                    return rewardsAccruedEvents.map(event => ({
                        blockNumber: event.blockNumber,
                        user: event.args.user,
                        amount: ethers.formatEther(event.args.amount)
                    }))
                }
            }
        },
        Listeners: {
            onListed: (callback) => {
                contract.on("Listed", (listingId, seller, tokenAddress, tokenId, price, event) => {
                    // When an NFT is listed, this fires up. It's like a party popper but for code!
                    callback({ listingId, seller, tokenAddress, tokenId, price, event });
                });
            },

            onSale: (callback) => {
                contract.on("Sale", (listingId, buyer, tokenAddress, tokenId, price, event) => {
                    // Sale event: when NFTs find their new home.
                    callback({ listingId, buyer, tokenAddress, tokenId, price, event });
                });
            },

            onListingCancelled: (callback) => {
                contract.on("ListingCancelled", (listingId, event) => {
                    // Cancelled listing: It's not goodbye, it's see you later.
                    callback({ listingId, event });
                });
            },

            onBidPlaced: (callback) => {
                contract.on("BidPlaced", (listingId, bidder, amount, event) => {
                    // A new bid: The plot thickens in the NFT saga.
                    callback({ listingId, bidder, amount, event });
                });
            },

            onBidAccepted: (callback) => {
                contract.on("BidAccepted", (listingId, seller, bidder, amount, event) => {
                    // Bid accepted: Let's shake on it, digitally!
                    callback({ listingId, seller, bidder, amount, event });
                });
            },
            onRewardsAccrued: (callback) => {
                contract.on("RewardsAccrued", (user, amount, event) => {
                    // Rewards Accrued: It's like getting a surprise gift, but in tokens!
                    callback({ user, amount, event });
                });
            },

            // Utility function to remove all listeners, because sometimes a clean slate is what you need.
            removeAllListeners: () => {
                contract.removeAllListeners();
            }
        }
    }
};

export { MarketContract, getMarketInteractions };
