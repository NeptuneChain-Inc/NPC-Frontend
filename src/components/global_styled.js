import { motion } from "framer-motion";
import styled from "styled-components";
import { logoColors } from "../styles/colors";

export const ACTION_BUTTON = styled(motion.button)`
  padding: 10px 15px;
  margin: 10px 5px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: ${logoColors.primary};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  user-select: none;
  transition: background-color 0.2s, transform 0.2s, box-shadow 0.2s;

  &:hover {
    background-color: ${logoColors.accent};
    transform: translateY(-3px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    background-color: ${logoColors.secondary};
    transform: translateY(-1px);
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.12);
  }

  &:disabled {
    background-color: ${logoColors.secondary};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;