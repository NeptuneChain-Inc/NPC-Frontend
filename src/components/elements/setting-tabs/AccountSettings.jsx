import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { getAdditionalUserInfo, signInWithEmailAndPassword, updatePassword } from 'firebase/auth'; //#BACK_END
import { auth } from '../../../apis/firebase';

const AccountContainer = styled.div`
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

const ToggleButton = styled(motion.div)`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${({ isActive }) => (isActive ? "#63c3d1" : "#aaa")};
  color: #fff;

  &:hover {
    opacity: 0.9;
  }
`;

const ActionButton = styled(motion.button)`
  padding: 10px 20px;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  background-color: ${({ danger }) => (danger ? "#e74c3c" : "#63c3d1")};

  ${({ active }) => active && `
       padding: 10px;
       border-radius: 0;
    background: #333;
    color: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 0 2px #000;
    `}
  &:hover {
    background-color: ${({ danger }) => (danger ? "#c0392b" : "#508a99")};
  }
`;

const ProfileForm = styled.form`
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
`;

const AccountSettingsTab = ({ APP }) => {
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const { user } = APP?.STATES || {};
  const { logNotification } = APP?.ACTIONS || {};

  const togglePasswordFields = () => {
    setShowPasswordFields(!showPasswordFields);
  };

  const resetPasswordInputs = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handlePasswordChange();
  };

  const handlePasswordChange = async () => {
    if (newPassword === confirmNewPassword) {
      try {
        const fbUser = await signInWithEmailAndPassword(auth, user?.email, currentPassword);
        if (fbUser?.user) {
          console.log(fbUser)
          await updatePassword(fbUser.user, newPassword);
          logNotification('alert', 'Password Changed!');
          resetPasswordInputs()
        } else {
          logNotification('error', `SignIn Error: Check Password for ${user?.email}`);
        }
      } catch (error) {
        logNotification('error', error.message);
      }
    } else {
      logNotification('error', 'Passwords do not match');
    }
  }

  const handle2FAToggle = () => {
    // Logic to enable/disable 2FA would be added here
    setTwoFactorAuth(!twoFactorAuth);
  };

  const handleDeactivate = () => {
    // Logic to deactivate account
    console.log("Deactivating account...");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
      // Logic to delete user account
      console.log("Deleting account...");
    }
  };

  return (
    <AccountContainer>
      <ActionButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} active={showPasswordFields} onClick={togglePasswordFields}>Change Password <FontAwesomeIcon icon={showPasswordFields ? faCaretUp : faCaretDown} /></ActionButton>
      {showPasswordFields && (
        <ProfileForm onSubmit={handleFormSubmit}>
          <Label htmlFor="currentPassword">Current Password:</Label>
          <Input type="password" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />

          <Label htmlFor="newPassword">New Password:</Label>
          <Input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />

          <Label htmlFor="confirmNewPassword">Confirm New Password:</Label>
          <Input type="password" id="confirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required />
          <ActionButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type='submit'>
            Save Password Changes
          </ActionButton>
        </ProfileForm>
      )}

      <ActionButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        Manage Email Settings
      </ActionButton>

      <OptionGroup>
        <OptionLabel>Two-Factor Authentication:</OptionLabel>
        <ToggleButton isActive={twoFactorAuth} onClick={handle2FAToggle}>
          {twoFactorAuth ? "Enabled" : "Disabled"}
        </ToggleButton>
      </OptionGroup>

      <ActionButton danger whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleDeactivate}>
        Deactivate Account
      </ActionButton>

      <ActionButton danger whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleDelete}>
        Delete Account
      </ActionButton>
    </AccountContainer>
  );
};

export default AccountSettingsTab;
