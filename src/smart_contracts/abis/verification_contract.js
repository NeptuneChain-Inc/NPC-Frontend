const VerificationContract = {
    Address: '0x4b27981b62098EAF794742C1228A625AC519fA16',
    ABI: [
        // ERC721 Standard Functions
        "function balanceOf(address owner) view returns (uint256)",
        "function ownerOf(uint256 tokenId) view returns (address)",
        "function safeTransferFrom(address from, address to, uint256 tokenId)",
        "function transferFrom(address from, address to, uint256 tokenId)",
        "function approve(address to, uint256 tokenId)",
        "function getApproved(uint256 tokenId) view returns (address)",
        "function setApprovalForAll(address operator, bool _approved)",
        "function isApprovedForAll(address owner, address operator) view returns (bool)",
        "function name() view returns (string)",
        "function symbol() view returns (string)",
        "function tokenURI(uint256 tokenId) view returns (string)",
    
        // ERC721 Standard Events
        "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
        "event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)",
        "event ApprovalForAll(address indexed owner, address indexed operator, bool approved)",
    
        // Custom State Variables
        "function VERIFIER_ROLE() view returns (bytes32)",
        "function qTime() view returns (int256)",
        "function ADMIN_ROLE() view returns (bytes32)",
        "function verifierReputation(address) view returns (uint256)",
        "function verifications(uint256) view returns (tuple(address farmer, string ipfsMetadataHash, bool approved))",
        "function lastSubmission(address) view returns (uint256)",
    
        // Custom Events
        "event DataSubmitted(uint256 indexed dataId, address indexed farmer)",
        "event Verified(uint256 indexed dataId, address indexed verifier)",
        "event DisputeRaised(uint256 indexed dataId, address indexed farmer, string reason)",
        "event DisputeResolved(uint256 indexed dataId, address indexed admin, bool approved)",
    
        // Custom Functions
        "function submitData(string ipfsMetadataHash) external returns (uint256)",
        "function approveData(uint256 dataId) external",
        "function raiseDispute(uint256 dataId, string reason) external",
        "function resolveDispute(uint256 dataId, bool approved) external",
        "function addVerifier(address verifier) external",
        "function removeVerifier(address verifier) external",
        "function pause() external",
        "function unpause() external",
        "function emergencyWithdraw() external",
        "function supportsInterface(bytes4 interfaceId) public view returns (bool)",
    ]
}

export default VerificationContract;