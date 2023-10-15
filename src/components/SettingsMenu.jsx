import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
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
    { name: 'Profile Settings', component: <ProfileSettingsTab APP={APP} /> },
    { name: 'Personalization', component: <PersonalizationTab APP={APP} /> },
    { name: 'Data Settings', component: <DataSettingsTab APP={APP} /> },
    { name: 'Privacy Settings', component: <PrivacySettingsTab APP={APP} /> },
    { name: 'Account Settings', component: <AccountSettingsTab APP={APP} /> },
  ];

  const activeComponent = tabData.find((tab) => tab.name === settingsTab)?.component;

  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Menu>
        <ExitIcon icon={faClose} onClick={handleSettingsMenu} />
        <TabList>
          {tabData.map((tab, index) => (
            <Tab
              key={index}
              active={tab.name === settingsTab}
              onClick={() => handleSettingsTab(tab.name)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              {tab.name}
            </Tab>
          ))}
        </TabList>
        <Content>{activeComponent}</Content>
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

const Menu = styled(motion.div)`
  width: 80%;
  height: 80%;
  background-color: #ffffff;
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 95%;
  }
`;

const TabList = styled.div`
  display: flex;
  background-color: #63c3d1;
  flex-direction: row;
  border: 1px solid #ddd;
  overflow: hidden;
  white-space: nowrap;

  @media (max-width: 768px) {
    flex-direction: row;
    overflow-x: auto;
  }
`;

const Tab = styled(motion.div)`
  flex: 1;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  background-color: ${(props) => (props.active ? '#ffffff' : '#63c3d1')};
  border-left: ${(props) => (props.active ? '2px #000' : '1px #ddd')} solid;
  color: ${(props) => (props.active ? '#63c3d1' : '#ffffff')};
  box-sizing: border-box;

`;

const Content = styled.div`
  height: calc(100% - 40px);
`;

const ExitIcon = styled(FontAwesomeIcon)`
  margin: 10px;
  padding: 2px;
  transition: 0.3s ease-in-out;

  &:hover {
    scale: 1.1;
  }
`;

export default SettingsMenu;
