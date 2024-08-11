import {motion} from "framer-motion";
import {animated} from "react-spring";
import styled from "styled-components";
import {colors} from "../../data/styles";

export const FULL_PAGE_CONTAINER = styled(motion.div)`
  position: fixed;
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 2rem 1rem;
  box-sizing: border-box;

  overflow: auto;
  overflow-x: hidden;

  transition: 0.5s ease-in-out;
`;

export const CARD_WRAPPER = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 1080px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;

  padding: 1rem;
  box-sizing: border-box;

  ${({ popup }) => popup && "filter: blur(20px);"}

  overflow: hidden;

  border-radius: 10px;
  // box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow: auto;
  }
`;

export const CARD_SECTION = styled(animated.div)`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 1rem;
  box-sizing: border-box;

  border-radius: 10px;
  // box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;

  @media (max-width: 767px) {
    width: 100%;
    padding: 0.5rem;
  }
`;

export const Flex = styled.div`
  width: ${({ width }) => (width ? width : "50%")};
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : "row")};
  align-items: ${({ align }) => (align ? align : "flex-start")};
  justify-content: ${({ justify }) => (justify ? justify : "flex-start")};
`;

export const InfoBox = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;

  padding: 0.5rem 0;

  margin-bottom: 30px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  border: 2px solid black;
  border-top: none;

  h3 {
    margin: 0 0 10px;
    font-size: 16px;
    font-weight: bold;
    color: ${colors.accent};
  }

  p {
    margin: 0;
  }
`;

export const CardContent = styled.div`
  width: 80%;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;

  padding: 0.1rem;

  h3 {
    margin: 0;
  }

  .subtext {
    margin: 0;
  }

  .link {
    color: ${colors.accent};
    font-weight: 500;
    margin: 0;
    font-size: 0.9rem;
    transition: 0.3s ease;
    cursor: pointer;
  }

  .link:hover {
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  margin: 10px 0;
`;

/*******************Product Order Component Styles***************************** */

export const Title = styled.h1`
  font-size: 1.7rem;
  color: #123456;
`;

export const Description = styled.p`
  margin: 0;
  text-align: justify;
  font-size: 0.9rem;
`;

export const FormWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: justify;

  overflow: auto;

  margin: 0;
  padding: 10px;
  box-sizing: border-box;
`;

export const FormInfo = styled(Description)`
  text-align: justify;
  width: 80%;
  font-style: italic;
  font-size: 0.8rem;
  margin: 0;
`;

export const FormInputs = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;

  box-sizing: border-box;
`;

export const inputGlobalStyles = `
width: 95%;
display: block;

font-family: inherit;
font-size: 0.8rem;
line-height: 1.5rem;
font-weight: 700;
color: rgba(31, 33, 35, 1);

outline: none;
appearance: none;
background-color: rgb(255, 255, 255);
border: 1px solid rgba(228, 231, 233, 1);
box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
border-radius: 0.25rem;

margin: 0.2rem 0;
padding: 0.75rem;
box-sizing: border-box;
`;

export const InputBox = styled.input`
  ${inputGlobalStyles}
`;

export const Button = styled.button`
  border: 0px solid;
  box-sizing: border-box;
  border-color: rgba(250, 251, 251, 1);
  margin: 0px;
  font-family: inherit;
  text-transform: none;
  background-image: none;
  cursor: pointer;
  padding: 0px;
  appearance: button;
  //width: 90%;
  border-radius: 0.25rem;
  background: ${colors.accent};
  text-align: center;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 700;
  color: white;
  padding-left: 1.75rem;
  padding-right: 1.75rem;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  margin-top: 20px;
  transition: 0.3s ease-in-out;

  &:hover {
    scale: 1.1;
  }
`;
