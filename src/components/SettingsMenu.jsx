import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import ProfileSettingsTab from './setting-tabs/ProfileSettings';
import { AccountSettingsTab, DataSettingsTab, PersonalizationTab, PrivacySettingsTab } from './setting-tabs';

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
  background-color: #63c3d1; // Neptune Blue
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
  overflow: auto;
`;

const ExitIcon = styled(FontAwesomeIcon)`
margin: 10px;
padding: 2px;
transition: 0.3s ease-in-out;

&:hover {
  scale: 1.1;
}
`;

const SettingsMenu = ({ APP }) => {
  const { settingsTab } = APP ? APP.STATES : {};
  const { handleSettingsTab, handleSettingsMenu } = APP ? APP.ACTIONS : {};


  const tabData = [
    'Profile Settings',
    'Personalization',
    'Data Settings',
    'Privacy Settings',
    'Account Settings',
  ];

  const renderContent = () => {
    switch (settingsTab) {
      case 'Profile Settings':
        return <ProfileSettingsTab APP={APP} />;
      case 'Personalization':
        return <PersonalizationTab APP={APP} />;
      case 'Data Settings':
        return <DataSettingsTab APP={APP} />;
      case 'Privacy Settings':
        return <PrivacySettingsTab APP={APP} />;
      case 'Account Settings':
        return <AccountSettingsTab APP={APP} />;
      default:
        return null;
    }
  };

  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Menu>
        <ExitIcon icon={faClose} onClick={handleSettingsMenu} />
        <TabList>
          {tabData.map((tab, index) => (
            <Tab
              key={index}
              active={tab === settingsTab}
              onClick={() => handleSettingsTab(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              {tab}
            </Tab>
          ))}
        </TabList>
        <Content>{renderContent()}</Content>
      </Menu>
    </Container>
  );
};

export default SettingsMenu;
