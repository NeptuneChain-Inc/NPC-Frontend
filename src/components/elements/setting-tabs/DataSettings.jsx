import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
`;

const Button = styled(motion.div)`
  padding: 10px 20px;
  background-color: #63c3d1;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #508a99;
  }
`;

const DangerButton = styled(Button)`
  background-color: #e74c3c;
  &:hover {
    background-color: #c0392b;
  }
`;

const DataSettingsTab = ({APP}) => {
  
  const handleBackup = () => {
    // Logic to trigger data backup
    console.log("Backing up user data...");
  };

  const handleExport = () => {
    // Logic to export user data
    console.log("Exporting user data...");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your data? This action is irreversible.")) {
      // Logic to delete user data
      console.log("Deleting user data...");
    }
  };

  return (
    <DataContainer>
      <Button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleBackup}>
        Backup My Data
      </Button>

      <Button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleExport}>
        Export My Data
      </Button>

      <DangerButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleDelete}>
        Delete My Data
      </DangerButton>
    </DataContainer>
  );
};

export default DataSettingsTab;
