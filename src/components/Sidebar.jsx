import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sidebar_MenuItem } from './elements';
import { faBroadcastTower, faCalculator, faCheckCircle, faDollarSign, faLeaf, faShop, faStore } from '@fortawesome/free-solid-svg-icons';
import { AppIcon, AppLogo } from "../assets"
import { ProfileDropMenu } from './elements/navbar/elements';
const Sidebar = ({ APP }) => {

  const { isMobile, sidebarOpen, user } = APP ? APP.STATES : {};
  const { handleSidebar, toggleCalculator, handleVerificationUI } = APP ? APP.ACTIONS : {};

  const path = window.location.pathname.replace(/^\//, '');
  const isMarketplace = path.startsWith('marketplace');
  const location = useLocation()

  const sidebarItems = [
    {
      route: 'environmental',
      cta: 'Environment',
      icon: faLeaf
    },
    {
      route: '/marketplace',
      cta: 'Marketplace',
      icon: faShop
    },
    {
      route: 'financial',
      cta: 'Finance',
      icon: faDollarSign
    },
    {
      route: '/marketplace/seller-dashboard',
      cta: 'Dashboard',
      icon: faStore
    },
  ];

  const environmentRoutes = [
    {
      route: '/features/nutrient-calculator',
      cta: 'Nutrient Calculator',
      onclick: toggleCalculator,
      icon: faCalculator
    },
    {
      route: '/features/stream',
      cta: 'Broadcast Live',
      icon: faBroadcastTower
    },
    {
      route: '/features/upload-media',
      cta: 'Upload Media',
      icon: faLeaf
    },
    {
      route: '/features/verification',
      cta: 'Verification',
      onclick: handleVerificationUI,
      icon: faCheckCircle
    },
  ]; 




  const isEnvrionmentRoute = environmentRoutes.some(route => location.pathname.includes(route.route));

  console.log(isEnvrionmentRoute)

  console.log(" re render")

  return (
    <StyledSidebar isOpen={sidebarOpen} isMarketplace={isMarketplace}>
      <LogoWrap>

        <Logo alt="logo" src={AppIcon} />
        <LogoName>
          NeptuneChain
        </LogoName>
      </LogoWrap>
 <div>

      <Menu>

        {sidebarItems?.map((data, index) => {
          const { route, cta, icon } = data || {};
          return (
            <Sidebar_MenuItem key={index} icon={icon} itemName={cta} route={route} handleSidebar={isMobile ? handleSidebar : null} />
          );
        })}
      </Menu>

  

      <Menu>
        {(isEnvrionmentRoute || location.pathname.includes("dashboard/environmental")) && environmentRoutes?.map((data, index) => {
          const { route, cta, icon, onclick } = data || {};
          
          const isRoute = !route.includes('/**button**/');
          
          return (
            <Sidebar_MenuItem key={index} icon={icon} itemName={cta} route={isRoute ? route : null} handleSidebar={isMobile ? handleSidebar : null} onClick={onclick}/>
          );
        })}
      </Menu>

        </div>


        <ProfileDropMenu  APP={APP} />
      
    </StyledSidebar>
  );
};


const LogoWrap = styled.div`
display: flex;
align-items: center;
gap:4px;
`


const LogoName = styled.div`
  color: ${({theme}) => theme.colors.primary500};
  font-weight: 600;

`

const Logo = styled.img`
  width: 24px;
  margin-right: 8px;
  cursor: pointer;
`;


const StyledSidebar = styled.div`
  width: 20vw;
  height: 100vh; 
  max-height: 100vh;
  background: ${({theme}) => theme.colors.ui50}; 
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

`;


const Menu = styled.ul`
margin: 0px;
padding: 0px;
`;

export default Sidebar;
