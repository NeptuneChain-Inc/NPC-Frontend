import { faBroadcastTower, faCalculator, faCheckCircle, faDollarSign, faLeaf, faShop, faStore } from '@fortawesome/free-solid-svg-icons';
import * as Accordion from '@radix-ui/react-accordion';
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { AppIcon } from "../assets";
import { Sidebar_MenuItem } from './elements';
import { ProfileDropMenu } from './elements/navbar/elements';

const Sidebar = ({ APP }) => {
  const { isMobile, sidebarOpen, user } = APP ? APP.STATES : {};
  const { handleSidebar, toggleCalculator, handleVerificationUI } = APP ? APP.ACTIONS : {};

  const path = window.location.pathname.replace(/^\//, '');
  const isMarketplace = path.startsWith('marketplace');
  const location = useLocation();

  const [isEnvironmentalOpen, setIsEnvironmentalOpen] = useState(false);

  const sidebarItems = [
    {
      route: 'environmental',
      cta: 'Environment',
      icon: faLeaf,
      hasSubMenu: true
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
      route: '/dashboard/environmental',
      cta: 'Environmental Dashboard',
      icon: faLeaf,
      hasSubMenu: true
    },
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

  const toggleEnvironmentalMenu = () => {
    setIsEnvironmentalOpen(!isEnvironmentalOpen);
  };

  return (
    <StyledSidebar isOpen={sidebarOpen} isMarketplace={isMarketplace}>
      <LogoWrap>
        <Logo alt="logo" src={AppIcon} />
        <LogoName>
          NeptuneChain
        </LogoName>
      </LogoWrap>
      <div>
      <StyledAccordion type="single" collapsible>
          {sidebarItems?.map((data, index) => {
            const { route, cta, icon, hasSubMenu } = data || {};
            return hasSubMenu ? (
              <Accordion.Item value="environmental" key={index}>
                <StyledAccordionTrigger className='trigger'>
                  <Sidebar_MenuItem
                    icon={icon}
                    itemName={cta}
                    isAccordionTrigger
                  />
                        <FaChevronDown className="AccordionChevron" aria-hidden />

                </StyledAccordionTrigger>
                <StyledAccordionContent className='content'>
                  {environmentRoutes.map((subData, subIndex) => {
                    const { route, cta, icon, onclick } = subData || {};
                    const isRoute = !route.includes('/**button**/');
                    return (
                      <Link to={route}  className='cta' key={cta}>
            
                          {cta}
                        </Link>
                    );
                  })}
                </StyledAccordionContent>
              </Accordion.Item>
            ) : (
              <Sidebar_MenuItem
                key={index}
                icon={icon}
                itemName={cta}
                route={route}
                handleSidebar={isMobile ? handleSidebar : null}
              />
            );
          })}
        </StyledAccordion>
      </div>
      <ProfileDropMenu APP={APP} />
    </StyledSidebar>
  );
};



const slideUp = keyframes`
  from {
    height: var(--radix-accordion-content-height);
  }
  to {
    height: 0;
  }
`

const slideDown = keyframes`
  from {
    height: 0;
  }
  to {
    height: var(--radix-accordion-content-height);
  }

`

const StyledAccordion = styled(Accordion.Root)`
  width: 100%;




.content[data-state='open'] {
  animation: ${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1);
}
.content[data-state='closed'] {
  animation: ${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1);
}

`;

const StyledAccordionTrigger = styled(Accordion.Trigger)`
  width: 100%;
  background: none;
  border: none;
  padding: 0;
  color: inherit;
  text-align: left;

  font-weight: 500;
  .cta { 
    font-weight: 500; 

  }
  &[data-state="open"] {
    .AccordionChevron { 
      transform: rotate(180deg);

    }
  }

  .AccordionChevron {
    transition: transform 300ms cubic-bezier(0.87, 0, 0.13, 1);
    font-size: 14px;
    /* Apply styles based on the data-state attribute */
}
`;

const StyledAccordionContent = styled(Accordion.Content)`
  padding-left: 38px;
  margin-left: 22px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.ui600};
  font-size: 14px;
  overflow: hidden;
/*   border-left: 1px solid ${({theme}) => theme.colors.ui300}; */
  border-bottom: 1px solid ${({theme}) => theme.colors.ui300};
  .cta {
     padding: 8px 0px;
    display: block; 
    color: ${({theme}) => theme.colors.ui700};
    text-decoration: none; 
     font-weight: 500;
     &:hover {
      text-decoration: underline;
      color: ${({theme}) => theme.colors.ui800};
     }
  }
`;




const StyledSidebar = styled.aside`

  width: 400px;
  background: ${({theme}) => theme.colors.ui50};
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  h1 { 
    font-size: 16px;
    color: ${({theme}) => theme.colors.ui800};
  }
`;

const Logo = styled.img`
  width: 24px;
`;

const LogoName = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const Menu = styled.nav`
  margin-top: 20px;
`;

const SubMenu = styled.div`
  padding-left: 20px;
`;

export default Sidebar;