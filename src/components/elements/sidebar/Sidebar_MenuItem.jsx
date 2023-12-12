import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Sidebar_MenuItem Component
 * 
 * Renders a sidebar menu item with optional route navigation.
 * 
 * @param {Object} props
 * @param {any} props.icon - The FontAwesome icon to display
 * @param {string} props.itemName - The label for the menu item
 * @param {string} props.route - The route to navigate to when clicked
 */
const Sidebar_MenuItem = ({ icon, itemName, route }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isRoute, setIsRoute] = useState(false);

  const normalizedRoute = route.startsWith('/') ? route : `/dashboard/${route}`;

  // Effect to check if the current route matches the given route
  useEffect(() => {
    if(route){
      setIsRoute(normalizedRoute === location.pathname);
    }
  }, [route, location]);

  /**
   * Handles the click event for navigation.
   */
  const handleClick = () => {
    console.log(typeof route, route)
    if (route && typeof route === 'string' && !isRoute) {
      navigate(normalizedRoute)
    }
  };

  return (
    <MenuItem
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClick}
      isRoute={isRoute}
    >
      <AnimatePresence>
        {isRoute && <ActiveIndicator initial={{ scale: 0 }} animate={{ scale: 1 }} />}
      </AnimatePresence>
      <Icon icon={icon} color='#000' />
      <RouteName>{itemName}</RouteName>
    </MenuItem>
  );
};

/**
 * ActiveIndicator Styled Component
 * Displays a visual indicator for the active menu item.
 */
const ActiveIndicator = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  width: 5px;
  height: 100%;
  background-color: #fff;
  border-radius: 50%;
  transform: translateY(-50%);
`;

/**
 * MenuItem Styled Component
 * Styles the menu item container and includes responsive design.
 */
const MenuItem = styled(motion.li)`
  position: relative;
  height: auto;
  display: flex;
  padding: 0.5rem 1rem;
  align-items: center;
  justify-content: flex-start;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  background-color: ${({ isRoute }) => (isRoute ? '#5bb8da' : 'transparent')};
  color: ${({ isRoute }) => (isRoute ? '#000' : '#fff')};
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    scale: 1.05;
  }

  @media (max-width: 768px) {
    padding: 0.25rem 0.5rem;
  }
`;

/**
 * Icon Styled Component
 * Styles the FontAwesome icon displayed in the menu item.
 */
const Icon = styled(FontAwesomeIcon)`
  width: 1rem;
  height: 1rem;
  padding: 5px;
  border-radius: 50%;
  background-color: #eeeeee;
  cursor: pointer;
`;

/**
 * RouteName Styled Component
 * Styles the label for the menu item.
 */
const RouteName = styled.span`
  height: auto;
  font-size: 0.8rem;
  font-style: normal;
  font-family: 'Work Sans';
  font-weight: 700;
  margin-left: 0.5rem;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export default Sidebar_MenuItem;
