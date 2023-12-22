import styled from "styled-components";
import { motion } from "framer-motion";
import { style_template } from "./style_templates";


export const WELCOME_LOGO = styled.img`
width: ${({width}) => width ? width : '200px'};
  height: auto;
  cursor: pointer;
  margin: 20px 0;
  transition: 0.3s ease-in-out;

  &:hover {
    scale: 1.05;
  }
`;

export const WELCOME_HEADING = styled.h1`
font-size: ${({ size }) => size ? size : '1.25rem'};
  margin-bottom: 20px;
  color: #333;
`;

export const INPUT = styled.input`
width: 80%;
padding: 12px 16px;
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

export const LOADING_ANIMATION = styled(motion.div)`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  backdrop-filter: blur(10px);
  z-index: 10;
  transition: 0.5s ease-in-out;
`;

export const PROMPT_CARD = styled(motion.div)`
width: 50%;
  max-width: 500px;
  ${style_template.flex_display.column_custom()}
  gap: 10px;
  background: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0 4px 6px 0px rgba(0, 0, 0, 0.5);
  max-height: 60vh;
  overflow: auto;

  backface-visibility: hidden;
  transform-style: preserve-3d;

  @media (max-width: 767px) {
    width: 90%;
  }

  }
`;

export const PROMPT_FORM = styled(motion.form)`
width: 50%;
  max-width: 500px;
  ${style_template.flex_display.column_custom()}
  gap: 10px;
  background: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0 4px 6px 0px rgba(0, 0, 0, 0.5);
  max-height: 60vh;
  overflow: auto;

  backface-visibility: hidden;
  transform-style: preserve-3d;

  @media (max-width: 767px) {
    width: 80%;
  }

  }
`;

export const BUTTON = styled(motion.button)`
color: #FFF;
background-color: #0077b6;
padding: 15px 30px;
//border-radius: 50px;
box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
transition: all 0.3s ease;
cursor: pointer;

&:hover {
  background-color: #0056b3;
  color: white;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}




border: none;
border-radius: 4px;
margin-bottom: 1rem;

`;

export const TEXT_LINK = styled.span`
background-color: transparent;
color: #0077b6;
text-decoration: underline;
margin-bottom: 0;
transition: 0.3s ease-in-out;
cursor: pointer;


&:hover {
  background-color: transparent;
  color: #005f8a;
  transform: translateY(-2px);
}
`;