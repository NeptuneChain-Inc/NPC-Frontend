import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faClose, faDatabase, faMaskFace, faPalette, faPerson, faUpload, faUser, faUserGear, faUserLock } from '@fortawesome/free-solid-svg-icons';
import ProfileSettingsTab from './elements/setting-tabs/ProfileSettings';
import { AccountSettingsTab, DataSettingsTab, PersonalizationTab, PrivacySettingsTab, UploadsTab } from './elements/setting-tabs';

/**
 * SettingsMenu Component to render setting tabs
 * 
 * @param {Object} APP - Contains STATES and ACTIONS for the application
 */
const SettingsMenu = ({ APP }) => {
  const { user, settingsTab } = APP ? APP.STATES : {};
  const { handleSettingsTab, handleSettingsMenu } = APP ? APP.ACTIONS : {};

  const tabData = [
    { name: 'Profile Settings', icon: faUser, component: <ProfileSettingsTab APP={APP} /> },
    { name: 'Uploads', icon: faUpload, component: <UploadsTab userId={user?.uid} /> },
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
          <DropdownIcon icon={faChevronUp} />
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
  z-index: 9999;
`;

const DropdownContainer = styled.div`
  display: none; 

  @media (max-width: 768px) {
    display: flex;
    position: absolute;
    bottom: 15px; 
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }
`;


const TabDropdown = styled.select`
  padding: 12px 40px 12px 15px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
  appearance: none;
  background-color: #f7f7f7;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative; 

  &:focus {
    outline: none;
    border-color: #63c3d1;
  }

  &:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: -1;
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

  @media (min-width: 769px) {
    width: 80%;
    height: 80%;
  }
`;

const TabList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  border-right: 1px solid #ddd;
  background-color: #f7f7f7;

  @media (max-width: 768px) {
    display: none;
  }
`;


const Tab = styled(motion.div)`
  flex-grow: 1;
  text-align: center;
  cursor: pointer;
  padding: 15px;
  font-weight: 500;
  color: ${props => props.active ? '#000' : '#fff'};
  background-color: ${props => props.active ? '#63c3d1' : '#134b5f'};
  transition: background-color 0.2s ease;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #e5e5e5;
    color: #222;
  }

  @media (max-width: 768px) {
    flex: 1 0 auto;
  }
`;


const TabIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
`;


const Content = styled.div`
  padding: 20px;
  overflow-y: auto;
  flex-grow: 1;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;


const ExitIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 8px;
  font-size: 24px;
  color: #fff;
  background-color: #222;
  border-radius: 50%;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #f00;
  }
`;


export default SettingsMenu;
