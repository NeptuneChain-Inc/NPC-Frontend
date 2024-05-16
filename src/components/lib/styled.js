import styled from "styled-components";
import { motion } from "framer-motion";
import { style_template } from "./style_templates";

export const WELCOME_LOGO = styled.img`
width: ${({ width }) => width ? width : '200px'};
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
padding: 12px 16px;
box-sizing: border-box;
font-size: 16px;
border: 1px solid #ccc;
border-radius: 4px;
outline: none;
transition: border-color 0.3s ease, box-shadow 0.3s ease;
margin: 0;

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
width: ${({ width }) => width ? width : '10%'};
width: 80%;
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

&:hover {
  transform: scale(1.05);
  box-shadow: 0px 0px 20px 0px #0077b6;
}

@media (max-width: 768px) {
  width: 100%;
  min-width: 200px;
}
`;

export const LOADING_ANIMATION = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  backdrop-filter: blur(10px);
  z-index: 10;
  transition: 0.5s ease-in-out;
`;

export const PROMPT_CARD = styled(motion.div)`
${style_template.flex_display.column_custom('flex-end', 'center')}
min-width: 40%;
 max-width: 1080px;
max-height: 70vh;

  background: rgba(230, 236, 213, 0.7);
  backdrop-filter: blur(5px);
  border-radius: 5px;
  box-sizing: border-box;
  box-shadow: 0 4px 6px 0px rgba(0, 0, 0, 0.5);
  overflow: auto;

  backface-visibility: hidden;
  transform-style: preserve-3d;

  @media (max-width: 767px) {
    width: 100%;
  }

  }
`;

export const PROMPT_FORM = styled(motion.form)`
width: 100%;
// height: 100%;
  // ${style_template.flex_display.column_custom('center')}
  background: rgba(255, 255, 255, 0.5);
  padding: 5rem;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  backface-visibility: hidden;
  transform-style: preserve-3d;

  @media (max-width: 767px) {
    padding: 2rem;
  }

  }
`;

export const BUTTON = styled(motion.button)`
min-width: 10rem;
color: #FFF;
background-color: #0077b699;
padding: 15px 30px;
display: flex;
justify-content: center;
transition: all 0.3s ease;
cursor: pointer;

margin-bottom: 1rem;
border-radius: 5px;
      border: 0.1rem solid rgba(255, 255, 255, 1);
      box-shadow: 0 4px 6px 0px rgba(0, 0, 0, 0.5);

&:hover {
  background-color: #0077b6;
  transform: translateY(-2px);
  border: 0.1rem solid rgba(255, 255, 255, 1);
}

`;

export const TEXT_LINK = styled.span`
color: #0077b6a1;
font-size: 0.8rem;
transition: 0.3s ease-in-out;
cursor: pointer;


&:hover {
  color: #005f8a;
  transform: translateY(-2px);
}
`;