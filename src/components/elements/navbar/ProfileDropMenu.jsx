import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faUser, faVideo, faCog, faBell } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
  border-radius: 8px;
  color: white;
  position: relative;
  height: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 8px;
    border-radius: 4px;
  }
`;

const ProfileDropMenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 8px 12px;
  gap: 10px;
  //background-color: #134b5f;
  font-size: 0.8rem;
  color: black;
  cursor: pointer;
  border-radius: 4px;
  //border-bottom: 10px solid black;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

  box-sizing: border-box;


  &:hover {
    //background-color: #105f57;
  }

  @media (max-width: 768px) {
    padding: 6px 8px;
  }
`;

const ProfileDropMenuItems = styled(motion.div)`
  position: absolute;
  width: 250px;
  top: 75px;
  right: 0;
  z-index: 1;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 100%;
    top: 60px;
  }
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  
  &:hover {
    background-color: #f2f2f2;
  }

  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 12px;
  }
`;

// Framer Motion Variants
const variants = {
  open: { opacity: 1, height: 'auto' },
  closed: { opacity: 0, height: 0 }
};

// Main Component
const ProfileDropMenu = ({ APP }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { user } = APP ? APP.STATES : {};
  const { handleSettingsTab } = APP ? APP.ACTIONS : {};

  const handleSettings = (tab) => {
    setIsOpen(false);
    handleSettingsTab(tab);
  }

  return (
    <UserProfile>
      <ProfileDropMenuContainer onClick={() => setIsOpen(!isOpen)}>
        <span>{user?.username || user?.email || 'Guest'}</span>
        <FontAwesomeIcon icon={faCaretDown} size="lg" />
      </ProfileDropMenuContainer>

      <AnimatePresence>
        {isOpen && (
          <ProfileDropMenuItems initial="closed" animate="open" exit="closed" variants={variants}>
            <ListItem onClick={() => handleSettings('Profile Settings')}>
              <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} />
              View Profile
            </ListItem>
            <ListItem onClick={() => handleSettings('Profile Settings')}>
              <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} />
              Edit Profile
            </ListItem>
            <ListItem onClick={() => navigate('/features/upload-video')}>
              <FontAwesomeIcon icon={faVideo} style={{ marginRight: '10px' }} />
              Upload Video
            </ListItem>
            <ListItem onClick={() => navigate('/features/stream')}>
              <FontAwesomeIcon icon={faVideo} style={{ marginRight: '10px' }} />
              Start Stream
            </ListItem>
            <ListItem onClick={() => handleSettings('Personalization')}>
              <FontAwesomeIcon icon={faBell} style={{ marginRight: '10px' }} />
              Alert Settings
            </ListItem>
            <ListItem onClick={() => handleSettings('Account Settings')}>
              <FontAwesomeIcon icon={faCog} style={{ marginRight: '10px' }} />
              Change Password
            </ListItem>
            <ListItem onClick={() => handleSettings('Data Settings')}>
              <FontAwesomeIcon icon={faCog} style={{ marginRight: '10px' }} />
              Data Sharing
            </ListItem>
            <ListItem onClick={() => handleSettings('Privacy Settings')}>
              <FontAwesomeIcon icon={faCog} style={{ marginRight: '10px' }} />
              Privacy Settings
            </ListItem>
          </ProfileDropMenuItems>
        )}
      </AnimatePresence>
    </UserProfile>
  );
};

export default ProfileDropMenu;
