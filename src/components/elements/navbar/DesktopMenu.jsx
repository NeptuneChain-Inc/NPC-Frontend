import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faBellSlash,
  faGear,
  faGears,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { ProfileDropMenu } from './elements';
import { motion } from 'framer-motion';

/**
 * Desktop Menu Component
 *
 * @param {Object} APP - Application state and actions
 */
const DesktopMenu = ({ APP }) => {
  const {
    notificationBarOpen,
    settingsMenuOpen,
  } = APP ? APP.STATES : {};

  const {
    handleNotificationsBar,
    handleSettingsMenu,
    handleLogOut,
  } = APP ? APP.ACTIONS : {};

  return (
    <DesktopMenuContainer>

      {/* Notification Icon */}
      <NotificationIcon whileHover={{ scale: 1.1 }}>
        <FontAwesomeIcon
          icon={notificationBarOpen ? faBellSlash : faBell}
          onClick={handleNotificationsBar}
        />
      </NotificationIcon>

      {/* Settings Icon */}
      <NotificationIcon whileHover={{ scale: 1.1 }}>
        <FontAwesomeIcon
          icon={settingsMenuOpen ? faGear : faGears}
          onClick={handleSettingsMenu}
        />
      </NotificationIcon>

      {/* Profile DropMenu */}
      <ProfileDropMenu APP={APP} />

      {/* Logout Button */}
      <LogOutButton whileHover={{ scale: 1.05 }} onClick={handleLogOut}>
        <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '8px' }} />
        Logout
      </LogOutButton>

    </DesktopMenuContainer>
  );
};

DesktopMenu.propTypes = {
  APP: PropTypes.object.isRequired,
};

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

  &:hover {
    color: #007bff;
  }
`;

const LogOutButton = styled(motion.button)`
  color: black;
  border: none;
  border-radius: 4px;
  padding: 0;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    color: #007bff;
  }
`;

export default DesktopMenu;
