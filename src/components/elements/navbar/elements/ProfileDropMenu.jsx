import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faUser, faVideo, faCog, faBell } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

/**
 * ProfileDropMenu Component
 * @param {Object} APP - Application states and actions
 */
const ProfileDropMenu = ({ APP }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = APP ? APP.STATES : {};
  const { handleSettingsTab } = APP ? APP.ACTIONS : {};

  const handleSettings = (action) => {
    setIsOpen(false);
    if (action.startsWith('/')) {
      navigate(action);
    } else {
      handleSettingsTab(action);
    }
  };

  const username = user?.username || user?.email || 'Guest';

  const variants = {
    open: { opacity: 1, height: 'auto' },
    closed: { opacity: 0, height: 0 }
  };

  const menuItems = [
    { label: 'View Profile', icon: faUser, action: 'Profile Settings' },
    { label: 'Upload Video', icon: faVideo, action: '/features/upload-video' },
    { label: 'Start Stream', icon: faVideo, action: '/features/stream' },
    { label: 'Alert Settings', icon: faBell, action: 'Personalization' },
    { label: 'Change Password', icon: faCog, action: 'Account Settings' },
    { label: 'Data Sharing', icon: faCog, action: 'Data Settings' },
    { label: 'Privacy Settings', icon: faCog, action: 'Privacy Settings' }
  ];

  return (
    <UserProfile>
      <ProfileDropMenuContainer onClick={() => setIsOpen(!isOpen)}>
        <span>{username}</span>
        <FontAwesomeIcon icon={faCaretDown} size="lg" />
      </ProfileDropMenuContainer>

      <AnimatePresence>
        {isOpen && (
          <ProfileDropMenuItems initial="closed" animate="open" exit="closed" variants={variants}>
            {menuItems.map(({ label, icon, action }) => (
              <ListItem key={label} onClick={() => handleSettings(action)}>
                <FontAwesomeIcon icon={icon} style={{ marginRight: '10px' }} />
                {label}
              </ListItem>
            ))}
          </ProfileDropMenuItems>
        )}
      </AnimatePresence>
    </UserProfile>
  );
};

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  color: white;
  position: relative;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
`;

const ProfileDropMenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 8px 12px;
  gap: 10px;
  font-size: 0.8rem;
  color: black;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

const ProfileDropMenuItems = styled(motion.div)`
  position: absolute;
  width: 250px;
  top: 75px;
  right: 0;
  z-index: 9999;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
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
`;

export default ProfileDropMenu;
