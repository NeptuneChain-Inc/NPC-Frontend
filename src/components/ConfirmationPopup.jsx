import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

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

const Dialog = styled(motion.div)`
  position: absolute;
  left: 25%;
  width:50%;
  margin: auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  text-align: center;
  max-width: 80%;
  box-sizing: border-box; // For better size calculation
`;


const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => (props.primary ? "#4CAF50" : "#f44336")};
  color: white;
`;

const Confirmation = ({ message, onConfirm, onCancel }) => {

  const handleConfirm = () => {
    onConfirm();
    onCancel(true);
  }

  if (!message) {
    return;
  }

  return (
    <AnimatePresence>
      {message && (
        <>
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
          />
          <Dialog
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p>{message ? message : "No Message"}</p>
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

export default Confirmation;
