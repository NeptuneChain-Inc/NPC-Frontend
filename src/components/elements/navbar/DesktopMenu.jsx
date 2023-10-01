import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBellSlash, faCaretDown, faGear, faGears, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import ProfileDropMenu from './ProfileDropMenu';
import { motion } from 'framer-motion';

const DesktopMenuContainer = styled.div`
width: 100%;
display: flex;
height: 25px;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;

  @media (max-width: 767px) {
    display: none;
  }
  
`;


const NotificationIcon = styled(motion.div)`
  cursor: pointer;
  font-size: 1.5rem;
`;

const LogOutButton = styled(motion.button)`
  color: black;
  border: none;
  border-radius: 4px;
  padding: 0;
  cursor: pointer;
  transition: 0.3s ease-in-out;
`;

const DesktopMenu = ({ APP }) => {

  const { isMobile, user, sidebarOpen, notificationBarOpen, settingsMenuOpen, confirmation, notification, alert, error } = APP ? APP.STATES : {};

  const {
    getUser,
    handleSidebar,
    handleNotificationsBar,
    handleSettingsMenu,
    logConfirmation,
    cancelConfirmation,
    logNotification,
    handleLogOut,
  } = APP ? APP.ACTIONS : {};

  return (
    <DesktopMenuContainer>
      <NotificationIcon
        whileHover={{ scale: 1.1 }}
      >
        <FontAwesomeIcon icon={notificationBarOpen ? faBellSlash : faBell} onClick={handleNotificationsBar} />
      </NotificationIcon>
      <NotificationIcon
        whileHover={{ scale: 1.1 }}
      >
        <FontAwesomeIcon icon={settingsMenuOpen ? faGear : faGears} onClick={handleSettingsMenu} />
      </NotificationIcon>
      <ProfileDropMenu APP={APP} />
      <LogOutButton
        whileHover={{ scale: 1.05 }}
        onClick={handleLogOut}
      >
        <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '8px' }} />
        Logout
      </LogOutButton>
    </DesktopMenuContainer>
  );
};

export default DesktopMenu;
