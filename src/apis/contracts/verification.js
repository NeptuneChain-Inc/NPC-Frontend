
import { ethers } from 'ethers';

const Contract = {
    Address: '0x4b27981b62098EAF794742C1228A625AC519fA16',
    ABI: [
        // Constructor
        "constructor(string name, string symbol)",

        // State Variables (only the public ones)
        "function VERIFIER_ROLE() view returns (bytes32)",
        "function qTime() view returns (int256)",
        "function ADMIN_ROLE() view returns (bytes32)",
        "function verifierReputation(address) view returns (uint256)",
        "function verifications(uint256) view returns (tuple(address farmer, string ipfsMetadataHash, bool approved))",
        "function lastSubmission(address) view returns (uint256)",

        // Events
        "event DataSubmitted(uint256 indexed dataId, address indexed farmer)",
        "event Verified(uint256 indexed dataId, address indexed verifier)",
        "event DisputeRaised(uint256 indexed dataId, address indexed farmer, string reason)",
        "event DisputeResolved(uint256 indexed dataId, address indexed admin, bool approved)",

        // Functions
        "function submitData(string ipfsMetadataHash) external returns (uint256)",
        "function approveData(uint256 dataId) external",
        "function raiseDispute(uint256 dataId, string reason) external",
        "function resolveDispute(uint256 dataId, bool approved) external",
        "function addVerifier(address verifier) external",
        "function removeVerifier(address verifier) external",
        "function pause() external",
        "function unpause() external",
        "function emergencyWithdraw() external",
        "function supportsInterface(bytes4 interfaceId) public view returns (bool)"
    ]
}

const getInteractions = (signer) => {
    const contract = new ethers.Contract(Contract.Address, Contract.ABI, signer);
    return {
        Instance: contract,
        Functions: {
            // Submit data to the contract
            submitData: async (ipfsMetadataHash) => {
                try {
                    const tx = await contract.submitData(ipfsMetadataHash);
                    const receipt = await tx.wait();
                    console.log('txSuccessfull', receipt)
                    return receipt;
                } catch (error) {
                    console.error('Error submitting data:', error);
                    throw error;
                }
            },
    
            // Approve data in the contract
            approveData: async (dataId) => {
                try {
                    const tx = await contract.approveData(dataId);
                    const receipt = await tx.wait();
                    return receipt;
                } catch (error) {
                    console.error('Error approving data:', error);
                    throw error;
                }
            },
    
            // Raise a dispute for a specific dataId
            raiseDispute: async (params) => {
                const {dataId, reason} = params || {}
                try {
                    const tx = await contract.raiseDispute(dataId, reason);
                    const receipt = await tx.wait();
                    return receipt;
                } catch (error) {
                    console.error('Error raising dispute:', error);
                    throw error;
                }
            },
    
            // Resolve a dispute for a specific dataId
            resolveDispute: async (params) => {
                const {dataId, approved} = params || {}
                try {
                    const tx = await contract.resolveDispute(dataId, approved);
                    const receipt = await tx.wait();
                    return receipt;
                } catch (error) {
                    console.error('Error resolving dispute:', error);
                    throw error;
                }
            },
    
            // Add a verifier to the contract
            addVerifier: async (verifierAddress) => {
                try {
                    const tx = await contract.addVerifier(verifierAddress);
                    const receipt = await tx.wait();
                    return receipt;
                } catch (error) {
                    console.error('Error adding verifier:', error);
                    throw error;
                }
            },
    
            // Remove a verifier from the contract
            removeVerifier: async (verifierAddress) => {
                try {
                    const tx = await contract.removeVerifier(verifierAddress);
                    const receipt = await tx.wait();
                    return receipt;
                } catch (error) {
                    console.error('Error removing verifier:', error);
                    throw error;
                }
            },
    
            // Pause the contract
            pauseContract: async () => {
                try {
                    const tx = await contract.pause();
                    const receipt = await tx.wait();
                    return receipt;
                } catch (error) {
                    console.error('Error pausing contract:', error);
                    throw error;
                }
            },
    
            // Unpause the contract
            unpauseContract: async () => {
                try {
                    const tx = await contract.unpause();
                    const receipt = await tx.wait();
                    return receipt;
                } catch (error) {
                    console.error('Error unpausing contract:', error);
                    throw error;
                }
            },
    
            // Emergency withdraw function
            emergencyWithdraw: async () => {
                try {
                    const tx = await contract.emergencyWithdraw();
                    const receipt = await tx.wait();
                    return receipt;
                } catch (error) {
                    console.error('Error in emergency withdrawal:', error);
                    throw error;
                }
            }
        },
        Listeners: {
            // Listener for DataSubmitted event
            onDataSubmitted: (callback) => {
                contract.on('DataSubmitted', (dataId, farmer, event) => {
                    callback({ dataId, farmer, event });
                });
            },
    
            // Listener for Verified event
            onVerified: (callback) => {
                contract.on('Verified', (dataId, verifier, event) => {
                    callback({ dataId, verifier, event });
                });
            },
    
            // Listener for DisputeRaised event
            onDisputeRaised: (callback) => {
                contract.on('DisputeRaised', (dataId, farmer, reason, event) => {
                    callback({ dataId, farmer, reason, event });
                });
            },
    
            // Listener for DisputeResolved event
            onDisputeResolved: (callback) => {
                contract.on('DisputeResolved', (dataId, admin, approved, event) => {
                    callback({ dataId, admin, approved, event });
                });
            },
    
            // Remove all listeners (useful for cleanup)
            removeAllListeners: () => {
                contract.removeAllListeners();
            }
        }
    }
}

export { Contract, getInteractions }