import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faBellSlash, faClose, faGear, faGears, faTimes } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import ProfileDropMenu from './ProfileDropMenu';

const MobileMenuContainer = styled.div`
  position: absolute;
  right: 0;
  display: none;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  transition: all 0.3s ease;

  //border: 1px solid black;

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
  width: 30%;
  max-width: 400px;
  height: 100%;
  align-items: flex-start;
  background-color: #fff;
  box-shadow: -5px 0px 15px rgba(0, 0, 0, 0.2);
  z-index: 20;
  overflow: auto;
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

const MenuItemLabel = styled.span`
  font-size: 1.2rem;
  color: #333;
`;

const CloseIcon = styled(FontAwesomeIcon)`
  font-size: 1.8rem;
  margin-bottom: 20px;
  cursor: pointer;
  color: #333;
  &:hover {
    color: #666;
  }
`;

const NotificationIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 1.8rem;
  margin-bottom: 40px;
  color: #333;
  &:hover {
    color: #666;
  }
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

const variants = {
  open: { x: 0 },
  closed: { x: '100%' },
};

const MobileMenu = ({ APP }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { user, notificationBarOpen, sidebarOpen, settingsMenuOpen} = APP ? APP.STATES : {};
  const {
    handleNotificationsBar,
    handleSettingsMenu,
    handleLogOut,
  } = APP ? APP.ACTIONS : {};

  const handleAction = (action) => {
    setIsOpen(false)
    action();
  }

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

export default MobileMenu;
