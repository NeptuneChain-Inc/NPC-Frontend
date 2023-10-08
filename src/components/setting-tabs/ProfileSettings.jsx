import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import NeptuneIcon from '../../assets/icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  gap:10px;
  padding: 20px;
  box-sizing: border-box;
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const Section = styled.div`
width: 50%;
display: flex;
flex-direction: column;
align-items: center;

  @media (max-width: 992px) {
    width: 100%;
  }
`;

const ProfileImage = styled(motion.img)`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
  cursor: pointer;
  border: 3px solid #63c3d1;
  transition: 0.3s ease-in-out;
  &:hover {
    scale: 1.1;
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

const PasswordButton = styled(motion.div)`
  background: none;
  border: none;
  color: #63c3d1;
  font-weight: bold;
  cursor: pointer;
  padding: 5px;
  border-radius: 25%;
  margin-bottom: 10px;
  transition: all 0.3s ease-in-out;

      ${({ active }) => active && `
       padding: 10px;
       border-radius: 0;
    background: #333;
    color: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 0 2px #000;
    `}
  &:hover {
    text-decoration: underline;
  }
`;

const SaveButton = styled(motion.div)`
  padding: 10px 20px;
  background-color: #63c3d1;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #508a99;
  }
`;

const ProfileSettingsTab = ({APP}) => {
  const [imagePreview, setImagePreview] = useState(NeptuneIcon);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const { user } = APP ? APP.STATES : {};

  const togglePasswordFields = () => {
    setShowPasswordFields(!showPasswordFields);
  };

  const handleImageClick = () => {
    document.getElementById('profileImageInput').click();
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <ProfileContainer>
      <Section>
        <ProfileImage src={imagePreview} onClick={handleImageClick} />
        <Input type="file" id="profileImageInput" style={{ display: 'none' }} onChange={handleImageChange} />

        <ProfileForm>
          <Label htmlFor="username">Username:</Label>
          <Input type="text" id="username" value={user?.username} readOnly />

          <Label htmlFor="email">Email:</Label>
          <Input type="email" id="email" value={user?.email} readOnly />

          <Label htmlFor="type">Account Type:</Label>
          <Input type="text" id="type" value={user?.type} readOnly 
          />
          <SaveButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Edit Profile
          </SaveButton>
        </ProfileForm>
      </Section>

      {/* <Section>
        <PasswordButton active={showPasswordFields} onClick={togglePasswordFields}>Change Password <FontAwesomeIcon icon={showPasswordFields ? faCaretUp : faCaretDown} /></PasswordButton>
        {showPasswordFields && (
          <ProfileForm>
            <Label htmlFor="currentPassword">Current Password:</Label>
            <Input type="password" id="currentPassword" />

            <Label htmlFor="newPassword">New Password:</Label>
            <Input type="password" id="newPassword" />

            <Label htmlFor="confirmNewPassword">Confirm New Password:</Label>
            <Input type="password" id="confirmNewPassword" />
            <SaveButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Save Changes
            </SaveButton>
          </ProfileForm>
        )}
      </Section> */}
    </ProfileContainer>
  );
};

export default ProfileSettingsTab;
