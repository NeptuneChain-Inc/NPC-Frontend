import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useLocation } from 'react-router-dom';
  
  const Sidebar_MenuItem = ({icon, itemName, route}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isRoute, setIsRoute] = useState(false);

    useEffect(() => {
      if(route[0]==='/'){
        setIsRoute(route===location.pathname);
      } else {
        setIsRoute(`/${route}`===location.pathname);
      }
    }, [route, location])
    
  
    const handleClick = () => {
      if(route && typeof route === 'string' && location.pathname!==`/${route}`){
        if(route[0]==='/'){
            navigate(route);
        } else {
            navigate(`/${route}`);
        }
      }
    }
    return (
      <MenuItem onClick={handleClick} isRoute={isRoute}>
            <Icon  icon={icon} color='#000' />
            <RouteName>{itemName}</RouteName>
          </MenuItem>
    )
  }

  const MenuItem = styled.li`
  height: auto;
  display: flex;
  padding: 0.5rem;
  box-shadow: 0px 0px 1px 0px #56b1ce;
  margin-top: 0px;
  text-align: left;
  align-items: center;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  background-color: ${({isRoute}) => isRoute ? '#5bb8da' : 'transparent'};
  color: ${({isRoute}) => isRoute ? '#000' : '#fff'};

  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    scale: 1.05;
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
  font-size: 1rem;
  font-style: normal;
  font-family: 'Work Sans';
  font-weight: 700;
  margin-left: 0.5rem;
`;
  
export default Sidebar_MenuItem