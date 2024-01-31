import React, { useEffect, useState } from "react";
import styled from "styled-components";
import appIcon from "../assets/icon.png";
import AppLogo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes, faEraser } from "@fortawesome/free-solid-svg-icons";
import { DesktopMenu, MobileMenu } from "./elements/navbar";
import { OBJECTS } from "../functions/helpers";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { style_template } from "./lib/style_templates";

/**
 * Navbar Component
 *
 * @param {Object} APP - Contains STATES and ACTIONS for the application
 */
const Navbar = ({ APP }) => {
  const [search, setSearch] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [hideSearch, setHideSearch] = useState(false);
  const [isMobile, setisMobile] = useState(false);
  const navigate = useNavigate();
  const path = window.location.pathname.replace(/^\//, "");
  const { user, searchResults, disableNav, sidebarOpen } = APP?.STATES || {};
  const { handleSidebar, setDisableNav, setSearchResults } = APP?.ACTIONS || {};

  const noSearchBarRoutes = ["features/upload-video", "features/stream"];

  useEffect(() => {
    const maxWidth = 768;
    setisMobile(window.innerWidth <= maxWidth);
  }, []);

  useEffect(() => {
    if (searchResults) {
      handleSearch();
    }
    console.log({ path });
    if (noSearchBarRoutes.includes(path)) {
      setHideSearch(true);
    } else if (hideSearch) {
      setHideSearch(false);
    }
  }, [path]);

  useEffect(() => {
    if (search) {
      handleSearch();
    }
  }, [search]);

  const handleToWelcome = () => navigate("/");

  const handleSearch = () => {
    const currentDash = OBJECTS.findValueByKey(user?.dashData, path);
    const results = OBJECTS.SEARCH.filterObjectByQuery(currentDash, search);
    setSearchResults(results);
    console.log("Search Results", { results });
  };

  const clearSearch = () => {
    setSearch("");
    setSearchResults(null);
  };

  // Toggle the expandable search bar
  const toggleSearch = () => setIsSearchExpanded(!isSearchExpanded);

  // Style variations for the search bar animation
  const searchBarVariants = {
    expanded: { opacity: 1, transition: { duration: 0.5 } },
    collapsed: { opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <NavbarContainer sidebarOpen={sidebarOpen}>
      <NavActions>
        {sidebarOpen ? (
          <>
            <SidebarHeader>
              <FullLogo
                alt="NeptuneChain Full Logo"
                src={AppLogo}
                onClick={handleToWelcome}
              />
            </SidebarHeader>
            <Icon icon={faTimes} onClick={handleSidebar} />
          </>
        ) : (
          <Logo alt="logo" src={appIcon} onClick={handleSidebar} />
        )}

        <SearchContainer>
          <SearchIcon icon={faSearch} onClick={toggleSearch} />
          <AnimatePresence>
            {isSearchExpanded && (
              <SearchIcons>
                <SearchInput
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  variants={searchBarVariants}
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <motion.div
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    variants={searchBarVariants}
                  >
                    <ClearIcon icon={faEraser} onClick={clearSearch} />
                  </motion.div>
                )}
              </SearchIcons>
            )}
          </AnimatePresence>
        </SearchContainer>
      </NavActions>

      <DesktopMenu APP={APP} />

      <MobileMenu APP={APP} />
    </NavbarContainer>
  );
};

const NavbarContainer = styled.header`
  width: 100%;
  height: 7vh;

  ${style_template.flex_display.row_custom("space-between")}
  gap: 0.8rem;

  box-shadow: 0px 2px 0px 0px #d4d4d4;

  padding: 1rem;
  padding-left: 0;
  padding-right: 1.5rem;
  box-sizing: border-box;

  background-color: #ffffff;

  z-index: 1000;

  @media (max-width: 479px) {
    width: 100%;
    padding: 1rem;
  }
`;

const NavActions = styled.div`
  ${style_template.flex_display.row_custom()} gap: 10px;
`;

const SidebarHeader = styled.div`
width: 20vw;

  @media (max-width: 768px) {

  }
`;

const FullLogo = styled.img`
  width: 40%;
  height: auto;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0rem 1rem;
`;

const Icon = styled(FontAwesomeIcon)`
  width: 1rem;
  transition: 0.3s ease-in-out;

  &:hover {
    scale: 1.15;
  }
`;

const Logo = styled.img`
  width: 50px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

const ClearIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

const SearchInput = styled(motion.input)`
  border: none;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export default Navbar;
