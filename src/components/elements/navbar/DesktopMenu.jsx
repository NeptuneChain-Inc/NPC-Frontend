import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBellSlash, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import ProfileDropMenu from './ProfileDropMenu';

const DesktopMenuContainer = styled.div`
width: 100%;
display: flex;
height: 50%;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
  gap: 20px;

  @media (max-width: 767px) {
    display: none;
  }
  
`;

const NotificationIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 1.5rem;
`;

const LogOutButton = styled.button`
  background-color: red;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
`;

const DesktopMenu = ({ APP }) => {

  const { isMobile, user, sidebarOpen, notificationBarOpen, confirmation, notification, alert, error } = APP ? APP.STATES : {};
  
  const {
    getUser,
    handleSidebar,
    handleNotificationsBar,
    logConfirmation,
    cancelConfirmation,
    logNotification,
    handleLogOut,
  } = APP ? APP.ACTIONS : {};

  return (
    <DesktopMenuContainer>
      <NotificationIcon
        icon={notificationBarOpen ? faBellSlash : faBell}
        onClick={handleNotificationsBar}
      />
        <ProfileDropMenu user={user} />
      <LogOutButton onClick={handleLogOut}>Logout</LogOutButton>
    </DesktopMenuContainer>
  );
};

export default DesktopMenu;
