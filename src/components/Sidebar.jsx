import React from 'react'
import styled from 'styled-components'
import { faBell, faCircleCheck, faDollarSign, faExchange, faHome, faLeaf, faQuestion, faRotate, faShield, faVideo } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { Sidebar_MenuItem } from './elements';

import PropTypes from 'prop-types'

import AppLogo from '../assets/logo.png';

const ensureKeyFirst = (obj, key) => {
  if (obj.hasOwnProperty(key)) {
    return {
      [key]: obj[key],
      ...obj
    };
  }
  return obj;
};


const Sidebar = ({isOpen, user}) => {
  const navigate = useNavigate();

  const handleToWelcome = () => {
    Cookies.remove('skipWelcome');
    navigate('/');
  }

  const renderIcon = (dashRoute) => {
    switch (dashRoute) {
      case 'main':
        return faHome;

        case 'financial':
        return faDollarSign

        case 'environmental':
        return faLeaf

        case 'verification':
        return faCircleCheck
  
      default:
        return faQuestion
    }
  }

  return (
    <StyledSidebar isOpen={isOpen}>
      <SidebarHeader>
        <Logo alt='NeptuneChain Full Logo' src={AppLogo} onClick={handleToWelcome}/>
      </SidebarHeader>
      <SidebarHeading>{user?.type.toUpperCase()}</SidebarHeading>
      <Menu projVariant="list">
        {Object.entries(ensureKeyFirst(user?.dashData, 'main'))?.map(([dash, data], index) => {
          const icon = renderIcon(dash);
          console.log({dash, data, index, icon});
          return (
            <Sidebar_MenuItem icon={icon} itemName={data?.name} route={dash} />
          )
        })}
      </Menu>
    </StyledSidebar>
  )
}

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

const SidebarHeader = styled('div')({
  flex: '0 0 auto',
  width: '100%',
  height: '100px',
  display: 'flex',
  'box-shadow': '0px 2px 5px 0px #000000',
  'align-items': 'center',
  'padding-left': '1rem',
  'padding-right': '1rem',
  'justify-content': 'center',
  'background-color': '#eeeeee',
})

const Logo = styled('img')({
  width: '80%',
  height: 'auto',
  'object-fit': 'cover',
})

const SidebarHeading = styled('h1')({
  color: '#ffffff',
  'font-size': '1.5rem',
  'font-style': 'normal',
  'margin-top': '2rem',
  'text-align': 'left',
  'font-family': 'Work Sans',
  'font-weight': '300',
  'margin-left': '0px',
})

const Menu = styled('ul')({
  padding: '1rem',
})

const MenuItem1 = styled('li')({
  height: 'auto',
  display: 'flex',
  padding: '0.5rem',
  'box-shadow': '0px 0px 1px 0px #56b1ce',
  'margin-top': '0px',
  'text-align': 'left',
  'align-items': 'center',
  'border-color': '#56B1CE',
  'border-style': 'outset',
  'border-width': '0.5px',
  'border-radius': '4px',
  'margin-bottom': '0.5rem',
  'border-top-width': '0px',
  'border-left-width': '0px',
  'border-right-width': '0px',
  'border-bottom-width': '0.5px',
})



const RouteName1 = styled('span')({
  color: '#eaeaea',
  height: 'auto',
  'font-size': '0.8rem',
  'font-style': 'normal',
  'font-family': 'Work Sans',
  'font-weight': '600',
  'margin-left': '0.5rem',
})

const MenuItem2 = styled('li')({
  height: 'auto',
  display: 'flex',
  padding: '0.5rem',
  'box-shadow': '0px 0px 1px 0px #56b1ce',
  'margin-top': '0px',
  'text-align': 'left',
  'align-items': 'center',
  'border-color': '#5bb8da',
  'border-style': 'outset',
  'border-width': '0.5px',
  'border-radius': '4px',
  'margin-bottom': '0.5rem',
  'border-top-width': '0px',
  'border-left-width': '0px',
  'border-right-width': '0px',
  'border-bottom-width': '0.5px',
})

const Icon03 = styled('svg')({
  width: '21px',
  height: '21px',
  padding: '3px',
  'border-color': 'grey',
  'border-width': '1px',
  'border-radius': '50%',
  'background-color': '#eeeeee',
})

const RouteName2 = styled('span')({
  color: '#eaeaea',
  height: 'auto',
  'font-size': '0.8rem',
  'font-style': 'normal',
  'font-family': 'Work Sans',
  'font-weight': '600',
  'margin-left': '0.5rem',
})

const MenuItem3 = styled('li')({
  height: 'auto',
  display: 'flex',
  padding: '0.5rem',
  'box-shadow': '0px 0px 1px 0px #56b1ce',
  'margin-top': '0px',
  'text-align': 'left',
  'align-items': 'center',
  'border-color': '#5bb8da',
  'border-style': 'outset',
  'border-width': '0.5px',
  'border-radius': '4px',
  'margin-bottom': '0.5rem',
  'border-top-width': '0px',
  'border-left-width': '0px',
  'border-right-width': '0px',
  'border-bottom-width': '0.5px',
})

const Icon05 = styled('svg')({
  width: '21px',
  height: '21px',
  padding: '3px',
  'border-color': 'grey',
  'border-width': '1px',
  'border-radius': '50%',
  'background-color': '#eeeeee',
})

const RouteName3 = styled('span')({
  color: '#eaeaea',
  height: 'auto',
  'font-size': '0.8rem',
  'font-style': 'normal',
  'font-family': 'Work Sans',
  'font-weight': '600',
  'margin-left': '0.5rem',
})

const MenuItem4 = styled('li')({
  height: 'auto',
  display: 'flex',
  padding: '0.5rem',
  'box-shadow': '0px 0px 1px 0px #56b1ce',
  'margin-top': '0px',
  'text-align': 'left',
  'align-items': 'center',
  'border-color': '#5bb8da',
  'border-style': 'outset',
  'border-width': '0.5px',
  'border-radius': '4px',
  'margin-bottom': '0.5rem',
  'border-top-width': '0px',
  'border-left-width': '0px',
  'border-right-width': '0px',
  'border-bottom-width': '0.5px',
})

const Icon07 = styled('svg')({
  width: '21px',
  height: '21px',
  padding: '3px',
  'border-color': 'grey',
  'border-width': '1px',
  'border-radius': '50%',
  'background-color': '#eeeeee',
})

const RouteName4 = styled('span')({
  color: '#eaeaea',
  height: 'auto',
  'font-size': '0.8rem',
  'font-style': 'normal',
  'font-family': 'Work Sans',
  'font-weight': '600',
  'margin-left': '0.5rem',
})

const MenuItem5 = styled('li')({
  height: 'auto',
  display: 'flex',
  padding: '0.5rem',
  'box-shadow': '0px 0px 1px 0px #56b1ce',
  'margin-top': '0px',
  'text-align': 'left',
  'align-items': 'center',
  'border-color': '#5bb8da',
  'border-style': 'outset',
  'border-width': '0.5px',
  'border-radius': '4px',
  'margin-bottom': '0.5rem',
  'border-top-width': '0px',
  'border-left-width': '0px',
  'border-right-width': '0px',
  'border-bottom-width': '0.5px',
})

const Icon09 = styled('svg')({
  width: '21px',
  height: '21px',
  padding: '3px',
  'border-color': 'grey',
  'border-width': '1px',
  'border-radius': '50%',
  'background-color': '#eeeeee',
})

const RouteName5 = styled('span')({
  color: '#eaeaea',
  height: 'auto',
  'font-size': '0.8rem',
  'font-style': 'normal',
  'font-family': 'Work Sans',
  'font-weight': '600',
  'margin-left': '0.5rem',
})

const MenuItem6 = styled('li')({
  height: 'auto',
  display: 'flex',
  padding: '0.5rem',
  'box-shadow': '0px 0px 1px 0px #56b1ce',
  'margin-top': '0px',
  'text-align': 'left',
  'align-items': 'center',
  'border-color': '#5bb8da',
  'border-style': 'outset',
  'border-width': '0.5px',
  'border-radius': '4px',
  'margin-bottom': '0.5rem',
  'border-top-width': '0px',
  'border-left-width': '0px',
  'border-right-width': '0px',
  'border-bottom-width': '0.5px',
})

const Icon11 = styled('svg')({
  width: '21px',
  height: '21px',
  padding: '3px',
  'border-color': 'grey',
  'border-width': '1px',
  'border-radius': '50%',
  'background-color': '#eeeeee',
})

const RouteName6 = styled('span')({
  color: '#eaeaea',
  height: 'auto',
  'font-size': '0.8rem',
  'font-style': 'normal',
  'font-family': 'Work Sans',
  'font-weight': '600',
  'margin-left': '0.5rem',
})

Sidebar.defaultProps = {
  RouteName5: 'Notifications and Alerts',
  RouteName: 'Dashboard',
  Logo_alt: 'image',
  RouteName2: 'Trading Activity',
  RouteName6: 'Blockchain & Verification',
  RouteName1: 'Financial Metrics',
  SidebarHeading: 'Menu',
  RouteName4: 'Operational Metrics',
  RouteName3: 'Environmental Metrics',
  Logo_src: '/neptunechain%20logo-200h.png',
}

Sidebar.propTypes = {
  RouteName5: PropTypes.string,
  RouteName: PropTypes.string,
  Logo_alt: PropTypes.string,
  RouteName2: PropTypes.string,
  RouteName6: PropTypes.string,
  RouteName1: PropTypes.string,
  SidebarHeading: PropTypes.string,
  RouteName4: PropTypes.string,
  RouteName3: PropTypes.string,
  Logo_src: PropTypes.string,
}

export default Sidebar
