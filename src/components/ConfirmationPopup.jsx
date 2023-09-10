import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Dialog = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  text-align: center;
  max-width: 80%;
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

const Confirmation = ({ isOpen, message, onConfirm, onCancel }) => {
  return (
    <AnimatePresence>
      {isOpen && (
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
            <p>{message}</p>
            <Button primary onClick={onConfirm}>
              Confirm
            </Button>
            <Button onClick={onCancel}>
              Cancel
            </Button>
          </Dialog>
        </>
      )}
    </AnimatePresence>
  );
};

export default Confirmation;
