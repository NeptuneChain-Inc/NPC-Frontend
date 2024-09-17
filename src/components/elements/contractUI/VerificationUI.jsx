import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { STRING, logDev } from "../../../scripts/helpers";
import { UploadButton } from "../livepeer/elements/MediaGallery";
import { AssetAPI, UserAPI } from "../../../scripts/back_door";
import AssetCard from "./AssetCard";
import { ButtonPrimary } from "../../shared/button/Button";
import { Badge } from "../../shared/Badge/Badge";
import { useAppContext } from "../../../context/AppContext";

const neptuneColorPalette = {
  lightBlue: "#8abbd0",
  darkBlue: "#005f73",
  green: "#0a9396",
  white: "#e9ecef",
  navy: "#003459",
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
  color: #222;
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
  overflow: auto;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const TabContent = styled(TabContainer)`
  height: 100%;
`;

const Tab = styled(motion.button)`
  padding: 10px 20px;
  border: none;
  background-color: ${(props) =>
    props.active ? neptuneColorPalette.darkBlue : "transparent"};
  color: ${(props) =>
    props.active ? neptuneColorPalette.white : neptuneColorPalette.lightBlue};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.active ? "#0056b3" : "#f0f0f0")};
  }
`;
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  margin: 0 auto;
  gap: 24px;

  .input-button-wrap {
    display: flex;
    align-items: center;
  }
`;

const Loading = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.ui800};
  animation: spin 0.2s infinite linear;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMsg = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: red;
  animation: shake 0.5s;

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      transform: translateX(-10px);
    }
    20%,
    40%,
    60%,
    80% {
      transform: translateX(10px);
    }
  }
`;

const Page = styled.div`
  width: 100%;
  height: 100%;
`;

// Framer Motion variants for animations
const tabVariants = {
  initial: { x: -10, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300 } },
  exit: { x: 10, opacity: 0 },
};

function VerificationUI() {
  const { STATES, ACTIONS } = useAppContext();
  const [accessibleTabs, setAccessibleTabs] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [uploads, setUploads] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [disputes, setDisputes] = useState([]);
  const [approvals, setApprovals] = useState([]);

  const { user, verificationUIOpen, verificationData } = STATES || {};
  const { setTxPopupVisible, setResult, setVerificationData } = ACTIONS || {};

  const { assetID } = verificationData || {};

  useEffect(() => {
    if (user?.role) {
      const accessible = getAccessibleTabs(user.role);
      setAccessibleTabs(accessible);
      setActiveTab(accessible[0]);

      getUploads();
      getSubmissions();
      getDisputes();
      getApprovals();
    }
  }, [user]);

  useEffect(() => {
    console.log("activeTab: ", activeTab)
  }, [activeTab])
  

  const getUploads = async () => {
    const { user_media } = await UserAPI.media.getUserMedia(user.uid);
    if (Array.isArray(user_media)) {
      setUploads(user_media);
    }
  };

  const getSubmissions = async () => {
    const { user_assets } = await UserAPI.assets.getUserAssets(user.uid);
    if (Array.isArray(user_assets)) {
      setSubmissions(user_assets);
    }
  };

  const getDisputes = async () => {
    const { user_disputes } = await UserAPI.assets.getUserAssetDisputes(
      user.uid
    );
    if (Array.isArray(user_disputes)) {
      setDisputes(user_disputes);
    }
  };

  const getApprovals = async () => {
    const { user_approvals } = await UserAPI.assets.getUserAssetApprovals(
      user.uid
    );
    if (Array.isArray(user_approvals)) {
      setApprovals(user_approvals);
    }
  };

  const submitMutation = useMutation(AssetAPI.submit);
  const approveMutation = useMutation(AssetAPI.approve);
  const disputeMutation = useMutation(AssetAPI.dispute);
  const resolveMutation = useMutation(AssetAPI.closeDispute);

  // useEffect(() => {
  //   if (Interactions) {
  //     Interactions.Listeners.onDataSubmitted(({ dataId, farmer }) => {
  //       console.log(`Data with ID ${dataId} submitted by ${farmer}`);
  //     });
  //   }
  // }, [Interactions]);

  const handleMutation = async (mutation, params = null) => {
    setIsLoading(true);
    try {
      if (params) await mutation.mutateAsync(params);
      else await mutation.mutateAsync();
      const _receipt = mutation.data;
      console.log(mutation);
      setTxPopupVisible(true);
      if (_receipt?.hash) {
        setResult?.({
          title: "Confirmed",
          message: "",
          txHash: _receipt.hash,
        });
      } else {
        setResult?.({
          title: "Failed",
          message: mutation?.error?.reason || "Could not transact.",
        });
      }
    } catch (error) {
      //handle error
      setResult?.({
        title: "Error",
        message: error?.reason || error?.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmission = async () => {
    //Handle Submission
    logDev("Verification: Handle Submission", { assetID });
  };

  const tabs = [
    "uploads",
    "submissions",
    "disputes",
    "approvals",
  ];

  const tabAccess = {
    farmer: tabs,
    verifier: ["submissions", "disputes", "approvals"],
    admin: tabs,
  };

  const handleApprovalDetails = async () => {};

  const getAccessibleTabs = (userRole) => tabAccess[userRole] || [];

  const modalSpring = {
    type: "spring",
    stiffness: 300,
    damping: 30,
  };

  return (
    <Page>
      <TabContainer>
        {/* <Tab active={activeTab === 'submitData'} onClick={() => setActiveTab('submitData')}>Submit Data</Tab>
                            <Tab active={activeTab === 'approveData'} onClick={() => setActiveTab('approveData')}>Approve Data</Tab>
                            <Tab active={activeTab === 'dispute'} onClick={() => setActiveTab('dispute')}>Raise Dispute</Tab>
                            <Tab active={activeTab === 'resolveDispute'} onClick={() => setActiveTab('resolveDispute')}>Resolve Dispute</Tab>
                            <Tab active={activeTab === 'verifier'} onClick={() => setActiveTab('verifier')}>Verifier</Tab>
                            <Tab active={activeTab === 'contractControl'} onClick={() => setActiveTab('contractControl')}>Contract Control</Tab> */}
        {accessibleTabs.map((tab) => (
          <Badge
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            variants={tabVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {STRING.toTitleCase(tab)}
          </Badge>
        ))}
      </TabContainer>
      {isLoading ? (
        <Loading>
          <FontAwesomeIcon icon={faSpinner} />
        </Loading>
      ) : (
        <TabContent>
          {activeTab === "uploads" && (
            <InputGroup>
              {uploads?.length < 1 ? (
                <p>No Uploads</p>
              ) : (
                uploads.map((upload, index) => (
                  <AssetCard
                    metadata={upload?.metadata}
                    onClick={() =>
                      handleMutation(submitMutation, upload.assetID)
                    }
                  />
                ))
              )}
            </InputGroup>
          )}
          {activeTab === "submissions" && (
            <InputGroup>
              {submissions?.length < 1 ? (
                <p>No Submissions</p>
              ) : (
                submissions.map((submission, index) => (
                  <div key={index}>
                    <label>{submission?.assetID}</label>
                    <label>{submission?.txHash}</label>
                    <Button
                      onClick={() =>
                        handleMutation(
                          user?.role === "verifier"
                            ? approveMutation
                            : disputeMutation,
                          submission?.assetID
                        )
                      }
                    >
                      {user?.role === "verifier" ? "Approve" : "Dispute"}
                    </Button>
                  </div>
                ))
              )}
            </InputGroup>
          )}
          {activeTab === "disputes" && (
            <InputGroup>
              {disputes?.length < 1 ? (
                <p>No Disputes</p>
              ) : (
                disputes.map((dispute, index) => (
                  <div key={index}>
                    <label>{dispute?.assetID}</label>
                    <label>{dispute?.txHash}</label>
                    <ButtonPrimary
                      onClick={() =>
                        handleMutation(resolveMutation, dispute?.assetID)
                      }
                    >
                      Resolve Dispute
                    </ButtonPrimary>
                  </div>
                ))
              )}
            </InputGroup>
          )}
          {activeTab === "approvals" && (
            <InputGroup>
              {approvals?.length < 1 ? (
                <p>No Approvals</p>
              ) : (
                approvals.map((approval, index) => (
                  <div key={index}>
                    <label>{approval?.assetID}</label>
                    <label>{approval?.txHash}</label>
                    <Button
                      onClick={() => handleApprovalDetails(approval?.assetID)}
                    >
                      Approval Details
                    </Button>
                  </div>
                ))
              )}
            </InputGroup>
          )}
        </TabContent>
      )}

      {assetID && (
        <UploadButton onClick={handleSubmission}>
          Submit for Verification
        </UploadButton>
      )}
    </Page>
  );
}

export default VerificationUI;
