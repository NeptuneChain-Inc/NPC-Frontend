import React from "react";
import styled from "styled-components";
import { BUTTON, PROMPT_CARD } from "../../../components/lib/styled";

const Title = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.ui800};

  text-align: left;
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.ui600};
  text-align: left;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const contentVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1, delay: 0.2 } },
};

const getDynamicWelcomeMessage = (username) => {
  const hours = new Date().getHours();
  let timeOfDay = "Day";
  if (hours < 12) {
    timeOfDay = "Morning";
  } else if (hours < 18) {
    timeOfDay = "Afternoon";
  } else {
    timeOfDay = "Evening";
  }
  return `Good ${timeOfDay}, ${username}`;
};

const WelcomeHome = ({ user, setCardState, enterDash }) => {
  const { username } = user || {};

  return (
    <PROMPT_CARD variants={contentVariants} initial="hidden" animate="visible">
      <Title>
        {username
          ? getDynamicWelcomeMessage(username)
          : "Powered by NeptuneChain"}
      </Title>
      <Paragraph>
        Collaborate with fellow farmers to champion regenerative practices and
        protect our waterways. Together, we can create a cleaner, healthier
        planet.
      </Paragraph>
    </PROMPT_CARD>
  );
};

export default WelcomeHome;
