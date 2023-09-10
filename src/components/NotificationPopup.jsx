import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

// Define color codes for types
const COLORS = {
  notification: "#729ABD", // Neptune Blue
  alert: "#FFC107", // Amber
  error: "#F44336", // Red
};

// Styled Container
const Container = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 20px;
  background-color: ${(props) => COLORS[props.type] || "#333"};
  color: white;
  border-radius: 8px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  font-size: 1rem;
  z-index: 1000;
  max-width: calc(100% - 40px);
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 15px;
  }
`;

const Notification = ({ message, type }) => {
  const [isOpen, setIsOpen] = useState(true);

  // Auto close after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Container
          type={type}
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {message}
          <span style={{ marginLeft: "10px", cursor: "pointer" }} onClick={handleClose}>
            ✕
          </span>
        </Container>
      )}
    </AnimatePresence>
  );
};

export default Notification;
