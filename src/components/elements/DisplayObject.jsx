import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Styles
const Container = styled.div`
height: 300px;
  max-height: 100vh;
  overflow: auto;
`;

const Item = styled(motion.div)`
  margin-left: ${(props) => props.level * 20}px;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: ${(props) => (props.isObject ? 'pointer' : 'default')};
`;

const Dropdown = styled(motion.div)`
  overflow: hidden;
`;

// Component to render each item
const ObjectItem = ({ keyName, value, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isObject = typeof value === 'object' && value !== null;

  return (
    <>
      <Item
        level={level}
        isObject={isObject}
        onClick={() => isObject && setIsOpen(!isOpen)}
      >
        {keyName}: {isObject ? (isOpen ? '▼' : '▶') : String(value)}
      </Item>
      <AnimatePresence>
        {isObject && isOpen && (
          <Dropdown
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
          >
            <ObjectDisplay data={value} level={level + 1} />
          </Dropdown>
        )}
      </AnimatePresence>
    </>
  );
};

// Main component to render the object
const ObjectDisplay = ({ data, level = 0 }) => {
  return (
    <>
      {Object.keys(data).map((key) => (
        <ObjectItem key={key} keyName={key} value={data[key]} level={level} />
      ))}
    </>
  );
};

// Main Container
const ObjectViewer = ({ data }) => {
  return (
    <Container>
      <ObjectDisplay data={data} />
    </Container>
  );
};

export default ObjectViewer;
