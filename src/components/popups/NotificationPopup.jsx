import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Notification Component
 * This component displays notifications of various types on the screen.
 * @param {String} message - The message to be displayed in the notification.
 * @param {String} type - The type of the notification, can be 'notification', 'alert', or 'error'.
 * @param {Function} clearNotification - Function to clear the notification.
 */
const Notification = ({ message, type, clearNotification }) => {

  if (!message) return null;

  // Auto close the notification after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [type, clearNotification]);

  // Close the notification
  const handleClose = () => {
    clearNotification();
  };

  return (
    <AnimatePresence>
      {message && (
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

const COLORS = {
  notification: "#729ABD",
  alert: "#FFC107",
  error: "#F44336",
};

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
  z-index: 9999;
  max-width: calc(100% - 40px);
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 15px;
  }

`;

export default Notification;

