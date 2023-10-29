import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faBellSlash, faClose, faGear, faGears, faTimes } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import ProfileDropMenu from './elements/ProfileDropMenu';

/**
 * MobileMenu Component
 * @param {Object} APP - Application states and actions
 */
const MobileMenu = ({ APP }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { notificationBarOpen, sidebarOpen, settingsMenuOpen} = APP ? APP.STATES : {};
  const {
    handleNotificationsBar,
    handleSettingsMenu,
    handleLogOut,
  } = APP ? APP.ACTIONS : {};

  // Close menu and execute action
  const handleAction = useCallback((action) => {
    setIsOpen(false);
    action();
  }, []);

  const variants = {
    open: { x: 0 },
    closed: { x: '100%' },
  };

  return (
    <MobileMenuContainer>
      <MenuIcon icon={isOpen ? faClose : faBars} onClick={() => setIsOpen(!isOpen)} sidebarOpen={sidebarOpen} />
      <AnimatePresence>
        {isOpen && (
          <SideMenu
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
          >
            <MenuSection>
              <MenuHeader>Profile</MenuHeader>
              <ProfileDropMenu APP={APP} />
            </MenuSection>

            <MenuSection>
              <MenuHeader>Utilities</MenuHeader>
              <MenuItem onClick={()=>handleAction(handleNotificationsBar)}>
                <MenuItemIcon icon={notificationBarOpen ? faBellSlash : faBell} />
              </MenuItem>
              <MenuItem onClick={()=>handleAction(handleSettingsMenu)}>
                <MenuItemIcon icon={settingsMenuOpen ? faGear : faGears} />
              </MenuItem>
            </MenuSection>

            <MenuSection>
              <LogOutButton onClick={handleLogOut}>Logout</LogOutButton>
            </MenuSection>

            <FooterLinks>
              <Link href="#home">Home</Link>
              <Link href="#features">Features</Link>
              <Link href="#contact">Contact</Link>
            </FooterLinks>
          </SideMenu>
        )}
      </AnimatePresence>
    </MobileMenuContainer>
  );
};

MobileMenu.propTypes = {
  APP: PropTypes.shape({
    STATES: PropTypes.object,
    ACTIONS: PropTypes.object,
  }).isRequired,
};

const MobileMenuContainer = styled.div`
  position: absolute;
  right: 0;
  display: none;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  box-sizing: border-box;
  transition: all 0.3s ease;

  @media (max-width: 767px) {
    display: flex;
  }
`;

const MenuIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  color: #000;
  cursor: pointer;
  transition: color 0.3s ease;
  ${({sidebarOpen}) => sidebarOpen && `
  position: fixed;
  right: 10px;
  `}
  z-index: 9999;

  &:hover {
    scale: 1.01;
  }
`;

const SideMenu = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  width: 50%;
  // max-width: 400px;
  height: 100vh;
  align-items: flex-start;
  background-color: #fff;
  box-shadow: -5px 0px 15px rgba(0, 0, 0, 0.2);
  z-index: 20;
  box-sizing: border-box;
  overflow: visible;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
`;

const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-bottom: 2rem;
`;

const MenuHeader = styled.h2`
  font-size: 1.5rem;
  border-bottom: 1px solid #333;
  margin-bottom: 1rem;
  margin-top: 0;
  color: #333;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  width: 100%;
`;

const MenuItemIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  color: #333;
`;

const LogOutButton = styled.button`
  background-color: #ff4500;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e44d26;
  }
`;

const FooterLinks = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Link = styled.a`
  text-decoration: none;
  color: #333;
  padding: 10px 0;
  font-size: 1.1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #666;
  }
`;

export default MobileMenu;
