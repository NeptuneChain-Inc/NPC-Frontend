// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarketplace is IERC721Receiver, Ownable {
    using SafeMath for uint256;

    struct Listing {
        address seller;
        uint256 price;
        uint256 tokenId;
        bool isListed;
    }

    struct Bid {
        address bidder;
        uint256 amount;
    }

    struct SaleHistory {
        address buyer;
        address seller;
        uint256 price;
        uint256 timestamp;
    }

    IERC721 public nftContract;

    uint256 public royaltyPercentage = 5; // Default royalty is 5%
    mapping(address => uint256) public royalties;
    mapping(uint256 => Listing) public listings;
    mapping(uint256 => Bid) public bids;
    mapping(uint256 => SaleHistory[]) public nftSaleHistories;

    event NFTListed(uint256 indexed tokenId, address indexed seller, uint256 price);
    event NFTPurchased(uint256 indexed tokenId, address indexed buyer, address indexed seller, uint256 price);
    event NFTDelisted(uint256 indexed tokenId);
    event NFTBidPlaced(uint256 indexed tokenId, address indexed bidder, uint256 amount);
    event NFTBidRemoved(uint256 indexed tokenId, address indexed bidder);

    constructor(address _nftContract, address initialOwner) Ownable(initialOwner){
        nftContract = IERC721(_nftContract);
    }

    function setRoyaltyPercentage(uint256 _percentage) external onlyOwner {
        require(_percentage <= 100, "Percentage cannot be more than 100");
        royaltyPercentage = _percentage;
    }

    function listNFT(uint256 tokenId, uint256 price) external {
        require(nftContract.ownerOf(tokenId) == msg.sender, "Not the owner of this NFT");
        require(price > 0, "Price must be greater than 0");

        nftContract.safeTransferFrom(msg.sender, address(this), tokenId);

        listings[tokenId] = Listing({
            seller: msg.sender,
            price: price,
            tokenId: tokenId,
            isListed: true
        });

        emit NFTListed(tokenId, msg.sender, price);
    }

    function buyNFT(uint256 tokenId) external payable {
        Listing storage listing = listings[tokenId];
        require(listing.isListed, "NFT not listed for sale");
        require(msg.value == listing.price, "Incorrect Ether sent");

        // Handle royalty
        uint256 royaltyAmount = listing.price.mul(royaltyPercentage).div(100);
        uint256 sellerAmount = listing.price.sub(royaltyAmount);
        royalties[listing.seller] += royaltyAmount;

        payable(listing.seller).transfer(sellerAmount);

        nftContract.safeTransferFrom(address(this), msg.sender, tokenId);

        // Track sale history
        nftSaleHistories[tokenId].push(SaleHistory({
            buyer: msg.sender,
            seller: listing.seller,
            price: listing.price,
            timestamp: block.timestamp
        }));

        // Remove listing and bid if exists
        delete listings[tokenId];
        delete bids[tokenId];

        emit NFTPurchased(tokenId, msg.sender, listing.seller, listing.price);
    }

    function placeBid(uint256 tokenId) external payable {
        require(listings[tokenId].isListed, "NFT not listed for sale");
        require(msg.value > 0, "Bid amount must be greater than 0");
        require(msg.value > bids[tokenId].amount, "Bid amount must be higher than current bid");

        // Refund previous bidder if exists
        if (bids[tokenId].amount > 0) {
            payable(bids[tokenId].bidder).transfer(bids[tokenId].amount);
        }

        bids[tokenId] = Bid({
            bidder: msg.sender,
            amount: msg.value
        });

        emit NFTBidPlaced(tokenId, msg.sender, msg.value);
    }

    function removeBid(uint256 tokenId) external {
        require(bids[tokenId].bidder == msg.sender, "Not the bidder");

        uint256 refundAmount = bids[tokenId].amount;
        delete bids[tokenId];

        payable(msg.sender).transfer(refundAmount);

        emit NFTBidRemoved(tokenId, msg.sender);
    }

    function acceptBid(uint256 tokenId) external {
        Listing storage listing = listings[tokenId];
        Bid storage bid = bids[tokenId];

        require(listing.isListed, "NFT not listed for sale");
        require(listing.seller == msg.sender, "Not the seller");
        require(bid.amount > 0, "No bid to accept");

        // Handle royalty
        uint256 royaltyAmount = bid.amount.mul(royaltyPercentage).div(100);
        uint256 sellerAmount = bid.amount.sub(royaltyAmount);
        royalties[listing.seller] += royaltyAmount;

        payable(listing.seller).transfer(sellerAmount);

        nftContract.safeTransferFrom(address(this), bid.bidder, tokenId);

        // Track sale history
        nftSaleHistories[tokenId].push(SaleHistory({
            buyer: bid.bidder,
            seller: listing.seller,
            price: bid.amount,
            timestamp: block.timestamp
        }));

        // Remove listing and bid
        delete listings[tokenId];
        delete bids[tokenId];

        emit NFTPurchased(tokenId, bid.bidder, listing.seller, bid.amount);
    }

    function delistNFT(uint256 tokenId) external {
        Listing storage listing = listings[tokenId];
        require(listing.seller == msg.sender, "Not the seller");
        require(listing.isListed, "NFT not listed");

        listing.isListed = false;
        nftContract.safeTransferFrom(address(this), msg.sender, tokenId);

        emit NFTDelisted(tokenId);
    }

    function onERC721Received(address, address, uint256, bytes calldata) external pure override returns(bytes4) {
        return this.onERC721Received.selector;
    }
}
