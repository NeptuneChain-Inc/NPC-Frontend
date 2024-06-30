import React, {useState} from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {renderCard} from "./dash.lib";

const Dash = ({ APP, dashData }) => {
  const [refFocus, setRefFocus] = useState(null);
  const { sections } = dashData || {};

  if(!sections){
    return <p>Invalid Dashboard</p>;
  }

  const refStates = {
    refFocus,
    setRefFocus
  }

  return (
    <DashContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {sections?.map((section, index) => (
        <DashSection key={index} alignment="center">
          {section.cards?.map((card) => renderCard(card, refStates))}
        </DashSection>
      ))}

      {/* {dashData?.name === "Your Media" && (
        <FloatingLinks>
          <Link href={"/features/upload-media"} target="_blank">
            <FontAwesomeIcon icon={faVideo} /> Upload Media
          </Link>
          <Link href={"/features/stream"} target="_blank">
            <FontAwesomeIcon icon={faStream} /> Start Stream
          </Link>
        </FloatingLinks>
      )}

      {dashData?.name === "Verification" && handleVerificationUI && (
        <FloatingLinks>
          <FloatButton onClick={() => handleVerificationUI()}>
            <FontAwesomeIcon icon={faCheckCircle} /> Open Verification
          </FloatButton>
        </FloatingLinks>
      )} */}
    </DashContainer>
  );
};

const DashContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  margin: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  gap: 50px;
  padding-top: 10rem;
  overflow-y: auto;
`;

const DashSection = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  padding: 2.5rem;
  justify-content: ${({ alignment }) => alignment || "flex-start"};
  border-radius: 10px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  transition: 1s ease-in-out;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }

  @media (min-width: 768px) {
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;

// const FloatingLinks = styled.div`
//   position: fixed;
//   bottom: 40px;
//   right: 20px;
//   z-index: 999;
//   display: flex;
//   flex-direction: column;
// `;

// const Link = styled.a`
//   background: #333;
//   color: #fff;
//   padding: 10px;
//   border-radius: 4px;
//   margin-bottom: 10px;
//   text-decoration: none;
//   display: flex;
//   align-items: center;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background: #555;
//     color: white;
//   }

//   svg {
//     margin-right: 8px;
//   }
// `;

// const FloatButton = styled.div`
//   background: #333;
//   color: #fff;
//   padding: 10px;
//   border-radius: 4px;
//   margin-bottom: 10px;
//   display: flex;
//   align-items: center;
//   gap: 5px;
//   transition: 0.3s ease-in-out;
//   cursor: pointer;

//   user-select: none;

//   &:hover {
//     background: #555;
//     color: white;
//     scale: 1.01;
//   }
// `;

export default Dash;
