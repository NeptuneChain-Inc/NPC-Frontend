import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar_MenuItem = ({ icon, itemName, route }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isRoute, setIsRoute] = useState(false);

  useEffect(() => {
    if (route[0] === '/') {
      setIsRoute(route === location.pathname);
    } else {
      setIsRoute(`/${route}` === location.pathname);
    }
  }, [route, location]);

  const handleClick = () => {
    if (route && typeof route === 'string' && location.pathname !== `/${route}`) {
      if (route[0] === '/') {
        navigate(route);
      } else {
        navigate(`/${route}`);
      }
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

const Icon = styled(FontAwesomeIcon)`
  width: 1rem;
  height: 1rem;
  padding: 5px;
  border-radius: 50%;
  background-color: #eeeeee;
  cursor: pointer;
`;

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
