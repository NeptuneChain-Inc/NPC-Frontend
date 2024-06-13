import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faUser, faVideo, faCog, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
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
  const { handleSettingsTab, handleLogOut } = APP ? APP.ACTIONS : {};

  const handleSettings = (action) => {
    console.log(typeof action)
    setIsOpen(false);
    if (typeof action === 'string' && action.startsWith('/')) {
      navigate(action);
    } else if(typeof action === 'function') {
      action();
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
    { label: 'Upload Media', icon: faVideo, action: '/features/upload-media' },
    { label: 'Start Stream', icon: faVideo, action: '/features/stream' },
    { label: 'Settings', icon: faCog, action: 'Profile Settings' },
    { label: 'Logout', icon: faSignOutAlt, action: () => handleLogOut()}
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
  padding: 2px 8px;
  gap: 2px;
  font-size: 0.9rem;
  color: black;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  transition: 0.3s ease-in-out;

  &:hover {
    scale: 1.05;
  }
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
