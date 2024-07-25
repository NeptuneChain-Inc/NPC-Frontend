import React, {isValidElement, useState} from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {renderCard} from "./dash.lib";
import { DashboardPage } from "./shared/DashboardPage/DashboardPage";
import { ButtonPrimary } from "./shared/button/Button";


const StyledPageWrap = styled.div`
.card-wrap { 
  display: flex;
  justify-content: space-between;
  gap: 24px;
}
`

const StyledCardHalfSection = styled.div`
padding: 24px 40px;
border: 1px solid ${({theme}) => theme.colors.ui200};
border-radius: ${({theme}) => theme.borderRadius.default};  
width: 100%;
.card-half-section-title { 
  font-size: 24px;
  font-weight: 700;
  color: ${({theme}) => theme.colors.primary700};

}


.card-half-section-paragraph {
  font-size: 16px;
  color: ${({theme}) => theme.colors.ui600};
  margin-bottom: 16px;
  font-weight: 500; 
}
`

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


  const jsx = (
    <div className="card-wrap">

    <StyledCardHalfSection className="card-half-section">
      <div className="card-half-section-title">
    Deposit Neptune and earn 7.00%
      </div>
    <div className="card-half-section-paragraph">
    Earn the Neptune Savings Rate (NPT)
    </div>
    <ButtonPrimary>
      Earn
    </ButtonPrimary>
    </StyledCardHalfSection>
    <StyledCardHalfSection className="card-half-section">
      <div className="card-half-section-title">
      Borrow Neptune at 8.00%

</div>
    <div className="card-half-section-paragraph">
    Against ETH, stETH, rETH and other assets
    </div>
    <ButtonPrimary>
      Borrow
    </ButtonPrimary>
    </StyledCardHalfSection>
    </div>
  )

  const isFinancial = window.location.pathname.includes("financial");
  const data = isFinancial ? sections.toSpliced(1, 0, jsx) : sections



  return (
    <StyledPageWrap>

    <DashboardPage title={isFinancial ? "Financial Dashboard" : "Envrionmental Dashboard"}>

    <DashContainer

>
      {data?.map((section, index) => {
        
        if(isValidElement(section)) {

          return section
        }



 return (<DashSection key={index} alignment="center">
          {section.cards?.map((card) => {
          return renderCard(card, refStates)

          })}
        </DashSection>)
})}

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
</StyledPageWrap>
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
