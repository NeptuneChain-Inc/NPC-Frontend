import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Sidebar_MenuItem } from './elements';
import AppLogo from '../assets/logo.png';
import { OBJECTS } from '../functions/helpers';
import { renderDashIcon } from './lib/icons';
import { faBroadcastTower, faCalculator, faCheckCircle, faDollarSign, faLeaf, faShop, faStore } from '@fortawesome/free-solid-svg-icons';
import { logoColors } from '../styles/colors';

const Sidebar = ({ APP }) => {
  const { isMobile, sidebarOpen, user } = APP ? APP.STATES : {};
  const { handleSidebar, toggleCalculator, handleVerificationUI } = APP ? APP.ACTIONS : {};

  const path = window.location.pathname.replace(/^\//, '');
  const isMarketplace = path.startsWith('marketplace');
  console.log('isMarketplace', isMarketplace, path)

  const navigate = useNavigate();

  const handleToWelcome = () => {
    Cookies.remove('skipWelcome');
    navigate('/');
  };

  const appRoutes = {
    upload: {
      route: '/features/upload-video',
      cta: 'Upload Media'
    },
    stream: {
      route: '/features/stream',
      cta: 'Broadcast Live'
    }
  }

 



  const sidebarItems = [
    {
      route: 'environmental',
      cta: 'Environment',
      icon: faLeaf
    },
    {
      route: 'financial',
      cta: 'Finance',
      icon: faDollarSign
    }, {
      route: '/marketplace',
      cta: 'Marketplace',
      icon: faShop
    },
  ];

  const environmentRoutes = [
    {
      route: '/features/upload-video',
      cta: 'Upload Media',
      icon: faLeaf
    },
    {
      route: '/**button**/',
      cta: 'Verification',
      onclick: handleVerificationUI,
      icon: faCheckCircle
    },
    {
      route: '/**button**/',
      cta: 'Nutrient Calculator',
      onclick: toggleCalculator,
      icon: faCalculator
    },
    {
      route: '/features/stream',
      cta: 'Broadcast Live',
      icon: faBroadcastTower
    }
  ]; 

  const financeRoutes = [
    {
      route: '/marketplace/seller-dashboard',
      cta: 'Seller Dashboard',
      icon: faStore
    },
  ];

  return (
    <StyledSidebar isOpen={sidebarOpen} isMarketplace={isMarketplace}>

     

      <UserInfo onClick={() => navigate('/dashboard/main')}>
        <Heading>{user?.username.toUpperCase()}</Heading>
        <SubHeading>{user?.type.toUpperCase()} DASHBOARD</SubHeading>
      </UserInfo>

      {/* 

      
      <Menu isMarketplace={isMarketplace}>
        {Object.entries(OBJECTS.ensureKeyFirst({ ...user?.dashData, ...appRoutes }, 'main') || {})?.map(([dash, data], index) => {
          console.log({ dash, data })
          const icon = renderDashIcon(dash);
          return (
            <Sidebar_MenuItem key={index} icon={icon} itemName={data?.name || data?.cta} route={data?.route || dash} handleSidebar={isMobile ? handleSidebar : null} />
          );
        })}
      </Menu> */}

      <Menu>
        {sidebarItems?.map((data, index) => {
          const { route, cta, icon } = data || {};
          return (
            <Sidebar_MenuItem key={index} icon={icon} itemName={cta} route={route} handleSidebar={isMobile ? handleSidebar : null} />
          );
        })}
      </Menu>

      {/* {isMarketplace && (
      <Menu>
        {marketplaceRoutes?.map((data, index) => {
          const { route, cta, icon } = data || {};
          return (
            <Sidebar_MenuItem key={index} icon={icon} itemName={cta} route={route} handleSidebar={isMobile ? handleSidebar : null} />
          );
        })}
      </Menu>
      )} */}

    {path.includes('dashboard/environmental') || path.includes('features') ? (
      <Menu>
        {environmentRoutes?.map((data, index) => {
          const { route, cta, icon, onclick } = data || {};

          const isRoute = !route.includes('/**button**/');

          return (
            <Sidebar_MenuItem key={index} icon={icon} itemName={cta} route={isRoute ? route : null} handleSidebar={isMobile ? handleSidebar : null} onClick={onclick}/>
          );
        })}
      </Menu>
      ) : path.includes('') && (
        <Menu>
        {financeRoutes?.map((data, index) => {
          const { route, cta, icon } = data || {};
          return (
            <Sidebar_MenuItem key={index} icon={icon} itemName={cta} route={route} handleSidebar={isMobile ? handleSidebar : null} />
          );
        })}
      </Menu>
      )}


    </StyledSidebar>
  );
};

const StyledSidebar = styled.div`
  width: ${({ isOpen }) => isOpen ? '20vw' : "0"};
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;

  overflow: hidden;
  transition: 0.3s ease-in-out;

  z-index: 101;
  backdrop-filter: blur(3px);

  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    top: 0;
    width: ${({ isOpen }) => isOpen ? '100vw' : "0vw"};
    align-items: flex-start;
    padding: ${({ isOpen }) => isOpen ? '2rem' : "0"};
    padding-top: 0;
    border-top: 1px solid black;
    border-right: 1px solid black;
  }
`;

const UserInfo = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20%;
  box-shadow: 1px 2px 2px 0px #000;
  background-color: #134b5f;
  padding: 1rem;
  margin: 2rem 0;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    scale: 1.1;
  }
`;

const Heading = styled.h1`
  color: #fff;
  font-size: 1rem;
  font-style: normal;
  margin: 0;
  text-align: left;
  font-family: Work Sans;
  font-weight: 300;
`;

const SubHeading = styled.h4`
  color: #fff;
  font-size: 0.5rem;
  text-align: left;
`;

const Menu = styled.ul`
  width: 70%;
  min-width: 200px;
  padding: 1rem;
  border-radius: 10px;

  box-shadow: 1px 2px 2px 0px #000;
  background-color: #134b5f;

    @media (max-width: 767px) {
      width: 50%;
      min-width: 150px
    }

`;

export default Sidebar;
