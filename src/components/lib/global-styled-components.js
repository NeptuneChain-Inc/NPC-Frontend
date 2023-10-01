import styled from "styled-components";
import { motion } from "framer-motion";


export const WELCOME_LOGO = styled.img`
width: ${({width}) => width ? width : '200px'};
  height: auto;
  
  margin: 20px 0;
`;

export const WELCOME_HEADING = styled.h1`
font-size: ${({ size }) => size ? size : '1.25rem'};
  margin-bottom: 50px;
  color: #333;
`;

export const INPUT = styled.input`
width: 80%;
padding: 12px 16px;
margin-bottom: 24px;
font-size: 16px;
border: 1px solid #ccc;
border-radius: 4px;
outline: none;
transition: border-color 0.3s ease, box-shadow 0.3s ease;

&::placeholder {
  color: #999;
}

&:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}
`;

export const BUTTON = styled.button`
width: 100%;
padding: 10px;
background-color: blue;
color: white;
border: none;
border-radius: 4px;
cursor: pointer;

`;

export const BUTTON_SEC = styled(BUTTON)`
width: 50%;
background-color: #007bff;

&:hover {
  background-color: #0056b3;
}
`;

export const CardContainer = styled(motion.div)`
flex: 0 0 auto;
width: ${({ width }) => width ? width : '300px'};
height: 400px;
margin: auto;
display: flex;
padding: 0.5rem;
min-width: 300px;
position: relative;
box-shadow: 0px 0px 10px 0px #d4d4d4;
box-sizing: border-box;
align-items: flex-start;
border-radius: 4px;
flex-direction: column;
background-color: #ffffff;
overflow-y: auto;
overflow-x: hidden;

@media (max-width: 768px) {
  width: 300px;
}
`;