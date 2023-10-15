import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Sidebar_MenuItem } from './elements';
import AppLogo from '../assets/logo.png';
import { OBJECTS } from '../functions/helpers';
import { renderDashIcon } from './lib/icons';

/**
 * Sidebar component to render the sidebar contents.
 *
 * @param {boolean} isOpen - Flag to determine if the sidebar is open or closed.
 * @param {Object} user - User data containing type and dashData.
 * 
 * @returns {JSX.Element} The rendered sidebar component.
 */
const Sidebar = ({isOpen, user}) => {
  const navigate = useNavigate();

  // Handler to reset a cookie and navigate to the home page
  const handleToWelcome = () => {
    Cookies.remove('skipWelcome');
    navigate('/');
  };

  return (
    <StyledSidebar isOpen={isOpen}>
      <SidebarHeader>
        <Logo alt='NeptuneChain Full Logo' src={AppLogo} onClick={handleToWelcome}/>
      </SidebarHeader>
      <SidebarHeading>{user?.type.toUpperCase()}</SidebarHeading>
      <Menu>
        {Object.entries(OBJECTS.ensureKeyFirst(user?.dashData, 'main'))?.map(([dash, data], index) => {
          const icon = renderDashIcon(dash);
          return (
            <Sidebar_MenuItem key={index} icon={icon} itemName={data?.name} route={dash} />
          );
        })}
      </Menu>
    </StyledSidebar>
  );
};

const StyledSidebar = styled.div`
  flex: 0 0 auto;
  width: ${({isOpen}) => isOpen ? '20vw' : "0"};
  height: 100%;
  display: flex;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  align-items: center;
  border-color: grey;
  border-width: 1px;
  flex-direction: column;
  border-top-width: 0px;
  justify-content: flex-start;
  background-color: #134b5f;
  border-left-width: 0px;
  border-bottom-width: 0px;
  transition: 0.3s ease-in-out;

  @media (max-width: 767px) {
    width: ${({isOpen}) => isOpen ? '50vw' : "0"};
  }
`;

const SidebarHeader = styled.div`
  flex: 0 0 auto;
  width: 100%;
  height: 100px;
  display: flex;
  box-shadow: 0px 2px 5px 0px #000000;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  justify-content: center;
  background-color: #eeeeee;
`;

const Logo = styled.img`
  width: 80%;
  height: auto;
  object-fit: cover;
`;

const SidebarHeading = styled.h1`
  color: #ffffff;
  font-size: 1.5rem;
  font-style: normal;
  margin-top: 2rem;
  text-align: left;
  font-family: Work Sans;
  font-weight: 300;
  margin-left: 0px;
`;

const Menu = styled.ul`
  padding: 1rem;
`;

export default Sidebar;
