import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { TransactionReceipt } from './elements';
import { STRING } from '../../../scripts/helpers';
import { getVerificationInteractions } from '../../../smart_contracts/interactions';


const neptuneColorPalette = {
    lightBlue: '#8abbd0',
    darkBlue: '#005f73',
    green: '#0a9396',
    white: '#e9ecef',
    navy: '#003459',
};

const ModalOverlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 65, 93, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

const ModalContainer = styled(motion.div)`
    background-color: white;
    padding: 50px;
    border-radius: 10px;
    width: 90%;
    max-width: 1000px;
    position: relative;
    background-color: white;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); // Soft glow effect
  backdrop-filter: blur(8px);
  border: 1px solid ${neptuneColorPalette.lightBlue};
  box-sizing: border-box;

    @media (min-width: 768px) {
        width: 80%;
    }
`;

const CloseButton = styled(motion.button)`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    transition: transform 0.3s;

    &:hover {
        transform: scale(1.1);
    }
`;

const TabContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    gap: 10px;
    border-bottom: 1px solid #e0e0e0;
    overflow: auto;
    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

const TabContent = styled(TabContainer)`

`;

const Tab = styled(motion.button)`
    padding: 10px 20px;
    border: none;
    background-color: ${props => props.active ? neptuneColorPalette.darkBlue : 'transparent'};
  color: ${props => props.active ? neptuneColorPalette.white : neptuneColorPalette.lightBlue};
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${props => props.active ? '#0056b3' : '#f0f0f0'};
    }
`;
const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 10px 0;
    width: 100%;

    label {
        margin-bottom: 5px;
    }

    input {
        width: 100%;
        padding: 10px; // Increased padding for better touch
        font-size: 16px; // Increased font size for better visibility
    }

    @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;

        label, input {
            margin-right: 10px;
        }
    }
`;

const Button = styled(motion.button)`
    padding: 15px 25px; // Increased padding for better touch target
    margin-top: 10px;
    border: none;
    background-color: ${neptuneColorPalette.green}; 
    color: white;
    cursor: pointer;
    font-size: 16px; // Increased font size for better visibility
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }

    @media (min-width: 768px) {
        margin-top: 0;
    }
`;


const Loading = styled.div`
    margin-top: 20px;
    font-size: 18px;
    color: #007BFF;
    animation: spin 1s infinite linear;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const ErrorMsg = styled.div`
    margin-top: 20px;
    font-size: 18px;
    color: red;
    animation: shake 0.5s;

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
`;

// Framer Motion variants for animations
const tabVariants = {
    initial: { x: -10, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300 } },
    exit: { x: 10, opacity: 0 },
};

function VerificationUI({ signer, open, APP }) {
    const [isModalOpen, setIsModalOpen] = useState(open);
    const [accessibleTabs, setAccessibleTabs] = useState([])
    const [activeTab, setActiveTab] = useState('');
    const [ipfsHash, setIpfsHash] = useState('');
    const [dataId, setDataId] = useState('');
    const [reason, setReason] = useState('');
    const [verifierAddress, setVerifierAddress] = useState('');
    const [receipt, setReceipt] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = APP?.STATES || {};

    const Interactions = getVerificationInteractions(signer);

    useEffect(() => {
        if (user?.type) {
            const accessible = getAccessibleTabs(user.type);
            setAccessibleTabs(accessible);
            setActiveTab(accessible[0])
        }
    }, [user])

    useEffect(() => {
        setIsModalOpen(open)
    }, [open])


    if (!Interactions) {
        return;
    }

    const submitMutation = useMutation(Interactions.Functions.submitData);
    const approveMutation = useMutation(Interactions.Functions.approveData);
    const disputeMutation = useMutation(Interactions.Functions.raiseDispute);
    const resolveMutation = useMutation(Interactions.Functions.resolveDispute);
    const addVerifierMutation = useMutation(Interactions.Functions.addVerifier);
    const removeVerifierMutation = useMutation(Interactions.Functions.removeVerifier);
    const pauseMutation = useMutation(Interactions.Functions.pauseContract);
    const unpauseMutation = useMutation(Interactions.Functions.unpauseContract);

    useEffect(() => {
        if (Interactions) {
            Interactions.Listeners.onDataSubmitted(({ dataId, farmer }) => {
                console.log(`Data with ID ${dataId} submitted by ${farmer}`);
            });
        }
    }, [Interactions]);

    const resolveReceipt = async () => {
        //Save txHash with general transaction data to user transactions db
        //...

        setReceipt(null);
    }

    const handleMutation = async (mutation, params = null) => {
        setIsLoading(true);
        try {
            if (params) await mutation.mutateAsync(params)
            else await mutation.mutateAsync()
            const _receipt = mutation.data;
            if (_receipt) setReceipt(_receipt)
            console.log({ _receipt })
        } catch (error) {
            //handle error
            if (error.code === 'CALL_EXCEPTION' && error.reason) {
                setError(error.reason)
            } else {
                setError('Transaction Error');
                throw error; // or handle it according to your needs
            }
        } finally {
            setIsLoading(false)
        }
    }
    const tabs = ['submitData', 'approveData', 'dispute', 'resolveDispute', 'verifier', 'contractControl'];

    const tabAccess = {
        farmer: ["submitData", "dispute"],
        verifier: ["approveData", "resolveDispute"],
        admin: tabs
    }

    const getAccessibleTabs = (userRole) => tabAccess[userRole] || [];

    const modalSpring = {
        type: "spring",
        stiffness: 300,
        damping: 30
    };

    return (
        <AnimatePresence>
            {isModalOpen && (
                <ModalOverlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={modalSpring}
                >
                    <ModalContainer
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={modalSpring}
                    >
                        <CloseButton onClick={() => setIsModalOpen(false)}>&times;</CloseButton>
                        <h2>NeptuneChainVerification Interface</h2>
                        <TabContainer>
                            {/* <Tab active={activeTab === 'submitData'} onClick={() => setActiveTab('submitData')}>Submit Data</Tab>
                            <Tab active={activeTab === 'approveData'} onClick={() => setActiveTab('approveData')}>Approve Data</Tab>
                            <Tab active={activeTab === 'dispute'} onClick={() => setActiveTab('dispute')}>Raise Dispute</Tab>
                            <Tab active={activeTab === 'resolveDispute'} onClick={() => setActiveTab('resolveDispute')}>Resolve Dispute</Tab>
                            <Tab active={activeTab === 'verifier'} onClick={() => setActiveTab('verifier')}>Verifier</Tab>
                            <Tab active={activeTab === 'contractControl'} onClick={() => setActiveTab('contractControl')}>Contract Control</Tab> */}
                            {accessibleTabs.map((tab) => (
                                <Tab
                                    key={tab}
                                    active={activeTab === tab}
                                    onClick={() => setActiveTab(tab)}
                                    variants={tabVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                >
                                    {STRING.toTitleCase(tab)}
                                </Tab>
                            ))}
                        </TabContainer>
                        {isLoading ? <Loading><FontAwesomeIcon icon={faSpinner} /></Loading> : (
                            <TabContent>
                                {activeTab === 'submitData' && (
                                    <InputGroup>
                                        <label>IPFS Metadata Hash:</label>
                                        <input type="text" value={ipfsHash} onChange={(e) => setIpfsHash(e.target.value)} />
                                        <Button onClick={() => handleMutation(submitMutation, ipfsHash)}>Submit Data</Button>
                                    </InputGroup>
                                )}
                                {activeTab === 'approveData' && (
                                    <InputGroup>
                                        <label>Data ID for Approval:</label>
                                        <input type="text" value={dataId} onChange={(e) => setDataId(e.target.value)} />
                                        <Button onClick={() => handleMutation(approveMutation, dataId)}>Approve Data</Button>
                                    </InputGroup>
                                )}
                                {activeTab === 'dispute' && (
                                    <InputGroup>
                                        <label>Data ID for Dispute:</label>
                                        <input type="text" value={dataId} onChange={(e) => setDataId(e.target.value)} />
                                        <label>Reason for Dispute:</label>
                                        <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} />
                                        <Button onClick={() => handleMutation(disputeMutation, { dataId, reason })}>Raise Dispute</Button>
                                    </InputGroup>
                                )}
                                {activeTab === 'resolveDispute' && (
                                    <InputGroup>
                                        <label>Data ID to Resolve Dispute:</label>
                                        <input type="text" value={dataId} onChange={(e) => setDataId(e.target.value)} />
                                        <Button onClick={() => handleMutation(resolveMutation, dataId)}>Resolve Dispute</Button>
                                    </InputGroup>
                                )}
                                {activeTab === 'verifier' && (
                                    <InputGroup>
                                        <label>Verifier Address:</label>
                                        <input type="text" value={verifierAddress} onChange={(e) => setVerifierAddress(e.target.value)} />
                                        <Button onClick={() => handleMutation(addVerifierMutation, verifierAddress)}>Add Verifier</Button>
                                        <Button onClick={() => handleMutation(removeVerifierMutation, verifierAddress)}>Remove Verifier</Button>
                                    </InputGroup>
                                )}
                                {activeTab === 'contractControl' && (
                                    <>
                                        <Button onClick={() => handleMutation(pauseMutation)}>Pause Contract</Button>
                                        <Button onClick={() => handleMutation(unpauseMutation)}>Unpause Contract</Button>
                                    </>
                                )}
                            </TabContent>
                        )}
                        {error.length > 0 && <ErrorMsg>Error: {error}</ErrorMsg>}
                        {receipt && <TransactionReceipt receipt={receipt} onClose={resolveReceipt} />}
                    </ModalContainer>
                </ModalOverlay>
            )}
        </AnimatePresence>
    );
}

export default VerificationUI;
