import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PrivacyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
`;

const OptionGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const OptionLabel = styled.label`
  font-weight: bold;
  color: #333;
`;

const Dropdown = styled.select`
  padding: 8px 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const ToggleButton = styled(motion.div)`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${({ isActive }) => (isActive ? "#63c3d1" : "#aaa")};
  color: #fff;
  
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

  &:hover {
    opacity: 0.9;
  }
`;

const PrivacySettingsTab = ({ APP }) => {
  const [profileVisibility, setProfileVisibility] = useState("Everyone");
  const [activityStatus, setActivityStatus] = useState(true);
  const [transactionPrivacy, setTransactionPrivacy] = useState(true);
  const [dataUploadPrivacy, setDataUploadPrivacy] = useState(true);

  const { user } = APP ? APP.STATES : {};
  const accountType = user?.type;
  console.log({ accountType })

  return (
    <PrivacyContainer>
      <OptionGroup>
        <OptionLabel>Profile Visibility:</OptionLabel>
        <Dropdown value={profileVisibility} onChange={(e) => setProfileVisibility(e.target.value)}>
          <option value="Everyone">Everyone</option>
          <option value="Only Verifiers">Only Verifiers</option>
          <option value="No one">No one</option>
        </Dropdown>
      </OptionGroup>

      <OptionGroup>
        <OptionLabel>Activity Status:</OptionLabel>
        <ToggleButton isActive={activityStatus} onClick={() => setActivityStatus(!activityStatus)}>
          {activityStatus ? "Visible" : "Hidden"}
        </ToggleButton>
      </OptionGroup>

      {accountType !== "verifier" && (
        <OptionGroup>
          <OptionLabel>Transaction Privacy:</OptionLabel>
          <ToggleButton isActive={transactionPrivacy} onClick={() => setTransactionPrivacy(!transactionPrivacy)}>
            {transactionPrivacy ? "Public" : "Private"}
          </ToggleButton>
        </OptionGroup>
      )}

      {accountType === "farmer" && (
        <OptionGroup>
          <OptionLabel>Data Upload Privacy:</OptionLabel>
          <ToggleButton isActive={dataUploadPrivacy} onClick={() => setDataUploadPrivacy(!dataUploadPrivacy)}>
            {dataUploadPrivacy ? "Public" : "Private"}
          </ToggleButton>
        </OptionGroup>
      )}
    </PrivacyContainer>
  );
};

export default PrivacySettingsTab;
