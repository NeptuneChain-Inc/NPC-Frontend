import React, {useState} from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {renderCard} from "./dash.lib";
import { DashboardPage } from "./shared/DashboardPage/DashboardPage";

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
    <DashboardPage title={"Financial Dashboard"}>

    <DashContainer

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
          </DashboardPage>
  );
};

const DashContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  gap: 50px;
  overflow-y: auto;
`;

const DashSection = styled(motion.div)`
  width: 100%;
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  box-sizing: border-box;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }

`;
export default Dash;
