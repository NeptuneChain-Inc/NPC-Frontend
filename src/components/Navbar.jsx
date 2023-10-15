import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import appIcon from '../assets/icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faEraser } from '@fortawesome/free-solid-svg-icons';
import { DesktopMenu, MobileMenu } from './elements/navbar';
import { OBJECTS } from '../functions/helpers';

/**
 * Navbar Component
 * 
 * @param {Object} APP - Contains STATES and ACTIONS for the application
 */
const Navbar = ({ APP }) => {
  const [search, setSearch] = useState('');
  const path = window.location.pathname.replace(/^\//, '');
  const { user, searchResults, sidebarOpen } = APP ? APP.STATES : {};
  const { handleSidebar, setSearchResults } = APP ? APP.ACTIONS : {};

  // Handle search whenever path changes
  useEffect(() => {
    if (searchResults) {
      handleSearch();
    }
  }, [path]);

  // Filter search results based on query
  const handleSearch = () => {
    const currentDash = OBJECTS.findValueByKey(user?.dashData, path);
    setSearchResults(OBJECTS.SEARCH.filterObjectByQuery(currentDash, search));
  };

  // Clear the search query and results
  const clearSearch = () => {
    setSearch('');
    setSearchResults(null);
  };

  return (
    <NavbarContainer sidebarOpen={sidebarOpen}>
      {/* Sidebar Toggle */}
      {sidebarOpen ? (
        <Icon icon={faTimes} onClick={handleSidebar} />
      ) : (
        <Logo alt="logo" src={appIcon} onClick={handleSidebar} />
      )}

      {/* Search Components */}
      <HeaderSearchContainer>
        <SearchIcon icon={faSearch} onClick={handleSearch} />
        <Searchbar
          type="text"
          name="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {(search || searchResults) && <SearchIcon icon={faEraser} onClick={clearSearch} />}
      </HeaderSearchContainer>

      {/* Desktop Menu */}
      <DesktopMenu APP={APP} />

      {/* Mobile Menu */}
      <MobileMenu APP={APP} />
    </NavbarContainer>
  );
};


const NavbarContainer = styled.header`
  position: fixed;
width: ${({ sidebarOpen }) => sidebarOpen ? '80' : '100'}%;
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