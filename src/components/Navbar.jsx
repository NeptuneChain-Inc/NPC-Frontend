import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import appIcon from '../assets/icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCaretDown, faSearch, faXmark, faTimes, faClose, faBellSlash } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { DesktopMenu, MobileMenu } from './elements/navbar';

const Navbar = ({ APP }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState('');


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

  const handleSearch = () => {

  }

  return (
    <NavbarContainer sidebarOpen={sidebarOpen}>

      {/* Sidebar Components */}
      {sidebarOpen ? (
        <Icon icon={faXmark} onClick={handleSidebar} />
      ) : (
        <Logo alt="logo" src={appIcon} onClick={handleSidebar} />
      )}

      {/* Search Components */}
      <HeaderSearchContainer>
        <SearchIcon icon={faSearch} onClick={handleSearch}/>
        <Searchbar
          type="text"
          name="searcg"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </HeaderSearchContainer>

      {/* Desktop Components */}
      <DesktopMenu APP={APP} />

      {/* Mobile Components */}
        <MobileMenu APP={APP}/>

    </NavbarContainer>
  )
}

const NavbarContainer = styled.header`
  position: fixed;
width: ${({sidebarOpen})=>sidebarOpen ? '80' : '100'}%;
  height: 40px;
  display: flex;
  box-shadow: 0px 2px 2px 0px #d4d4d4;
  max-height: 75px;
  align-items: center;
  padding: 1.5rem;
  justify-content: flex-start;
  background-color: #ffffff;

  box-sizing: border-box;
  z-index: 999;


  @media (max-width: 767px) {
    //padding: 2rem;
  }

  @media (max-width: 479px) {
    padding: 1rem;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  width: 1rem;
  transition: 0.3s ease-in-out;

  &:hover {
    scale: 1.15;
  }
`;

const Logo = styled.img`
  width: 40px;
  height: auto;
`;

const HeaderSearchContainer = styled.div`
  flex: 0 0 auto;
  width: 60%;
  height: 30px;
  display: flex;
  align-items: flex-start;
  border-radius: 4px;
  background-color: #eeeeee;
  margin-left: 0.5rem;

  @media (min-width: 767px) {
    width: 25%;
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  width: auto;
  height: 60%;
  margin: auto;
  margin-left: 5px;
  padding: 5px;
  transition: 0.3s ease-in-out;

  &:hover {
    scale: 1.15;
  }
`;

const Searchbar = styled.input`
  width: 100%;
  height: 100%;
  font-size: 14px;
  font-family: 'Work Sans';
  border-width: 0px;
  border-radius: 2px;
  background-color: transparent;
`;

export default Navbar