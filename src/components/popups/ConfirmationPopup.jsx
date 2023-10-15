import React from "react";
import PropTypes from 'prop-types'; 
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";


/**
 * Confirmation Dialog
 * 
 * @param {Object} props
 * @param {string} props.message - Confirmation message to display
 * @param {Function} props.onConfirm - Function to execute on confirmation
 * @param {Function} props.onCancel - Function to execute on cancellation
 */
const Confirmation = ({ message, onConfirm, onCancel }) => {
  if (!message) return null;  // Exit early if no message is provided

  // Function to execute when the user confirms the action
  const handleConfirm = () => {
    onConfirm && onConfirm();
    onCancel(true);
  }

  return (
    <AnimatePresence>
      {message && (
        <>
          {/* Overlay for the background dim */}
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
          />

          {/* Main Dialog */}
          <Dialog
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p>{message}</p>
            {onConfirm && (
              <Button primary onClick={handleConfirm}>
                Confirm
              </Button>
            )}
            <Button onClick={() => onCancel(false)}>
              Cancel
            </Button>
          </Dialog>
        </>
      )}
    </AnimatePresence>
  );
};


Confirmation.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func.isRequired
};

// Overlay Styles
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: 999;
`;

// Dialog Styles
const Dialog = styled(motion.div)`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  text-align: center;
  max-width: 80%;
  width: auto; 
  box-sizing: border-box;

  @media (max-width: 768px) {
    max-width: 95%;
    padding: 15px;
  }
`;

// Button Styles
const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => (props.primary ? "#4CAF50" : "#f44336")};
  color: white;
`;

export default Confirmation;
