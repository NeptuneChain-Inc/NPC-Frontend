const MarketplaceContract = {
    Address: '0xe5Afb79A81f4f6BeA3Ed45FfB3C7a722448bc86d',
    GenesisBlock: '42664715',
    ABI: [
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

export default MarketplaceContract;