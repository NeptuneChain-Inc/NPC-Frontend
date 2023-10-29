import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faClose, faDatabase, faMaskFace, faPalette, faPerson, faUser, faUserGear, faUserLock } from '@fortawesome/free-solid-svg-icons';
import ProfileSettingsTab from './elements/setting-tabs/ProfileSettings';
import { AccountSettingsTab, DataSettingsTab, PersonalizationTab, PrivacySettingsTab } from './elements/setting-tabs';

/**
 * SettingsMenu Component to render setting tabs
 * 
 * @param {Object} APP - Contains STATES and ACTIONS for the application
 */
const SettingsMenu = ({ APP }) => {
  const { settingsTab } = APP ? APP.STATES : {};
  const { handleSettingsTab, handleSettingsMenu } = APP ? APP.ACTIONS : {};

  const tabData = [
    { name: 'Profile Settings', icon: faUser, component: <ProfileSettingsTab APP={APP} /> },
    { name: 'Personalization', icon: faPalette, component: <PersonalizationTab APP={APP} /> },
    { name: 'Data Settings', icon: faDatabase, component: <DataSettingsTab APP={APP} /> },
    { name: 'Privacy Settings', icon: faUserLock, component: <PrivacySettingsTab APP={APP} /> },
    { name: 'Account Settings', icon: faUserGear, component: <AccountSettingsTab APP={APP} /> },
  ];

  const activeComponent = tabData.find((tab) => tab.name === settingsTab)?.component;

  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

      {/* Responsive dropdown for mobile view */}
      <DropdownContainer>
          <TabDropdown 
            value={settingsTab}
            onChange={e => handleSettingsTab(e.target.value)}
          >
            {tabData.map((tab, index) => (
              <option key={index} value={tab.name}>
                {tab.name}
              </option>
            ))}
          </TabDropdown>
          <DropdownIcon icon={faChevronDown} />
        </DropdownContainer>

      <Menu role="dialog" aria-labelledby="settingsMenuTitle">
        <ExitIcon icon={faClose} color='#fff' onClick={handleSettingsMenu} aria-label="Close settings menu" tabIndex="0" />
        <TabList role="tablist">
          {tabData.map((tab, index) => (
            <Tab
              key={index}
              active={tab.name === settingsTab}
              onClick={() => handleSettingsTab(tab.name)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              role="tab"
              tabIndex="0"
              aria-selected={tab.name === settingsTab}
            >
              {tab?.icon && <TabIcon icon={tab.icon} />}
              {tab.name}
            </Tab>
          ))}
        </TabList>
        <Content role='tabpanel'>{activeComponent}</Content>
      </Menu>
    </Container>
  );
};

const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const DropdownContainer = styled.div`
  display: none; 
  position: relative;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }
`;

const TabDropdown = styled.select`
  padding: 10px 30px 10px 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
  appearance: none;
  background-color: #f7f7f7;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  }

  &:focus {
    outline: none;
    border-color: #63c3d1;
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

const DropdownIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
`;

const Menu = styled(motion.div)`
display: flex;
justify-content: center;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  width: 90%;
  height: 90%;
  background-color: #ffffff;
  border-radius: 10px;
  overflow: hidden;

  @media (min-width: 769px) { // Tablet and above
    width: 80%;
    height: 80%;
  }
`;

const TabList = styled.div`
flex: 0.3;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  background-color: #f7f7f7;
  overflow: hidden;
  white-space: nowrap;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Tab = styled(motion.div)`
  flex: 1;
  text-align: center;
  cursor: pointer;
  background-color: ${(props) => (props.active ? '#63c3d1' : '#134b5f')};
  border-left: ${(props) => (props.active ? '2px #000' : '1px #ddd')} solid;
  color: ${(props) => (props.active ? '#000' : '#ffffff')};
  box-sizing: border-box;

  display: flex;
  align-items: center;
  padding: 15px;
  font-weight: 500;
  transition: background 0.2s;
  
  &:hover {
    background-color: #e5e5e5;
    color: #222;
  }

`;

const TabIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
`;


const Content = styled.div`

padding: 25px;
overflow-y: auto;

@media (min-width: 767px) {
  flex: 0.7;
}
`;

const ExitIcon = styled(FontAwesomeIcon)`
position: absolute;
  top: 10px;
  right: 10px;
  margin: 10px;
  padding: 5px;
  background-color: #222;
  border: 2px solid #fff;
  border-radius: 50%;
  transition: 0.3s ease-in-out;
  font-size: 24px;

  &:hover {
    scale: 1.1;
    border: 2px solid red;
  }
`;

export default SettingsMenu;
