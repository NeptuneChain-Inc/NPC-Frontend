import { motion } from "framer-motion";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {fetchDeviceData} from "../../dash.utils";
import {logDev} from "../../../scripts/helpers";
import {faCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { theme } from "../../../styles/colors";
import {ButtonSecondary} from '../../shared/button/Button'

const cardVariants = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const StatusCard = ({deviceID, setRefFocus}) => {
  if (!(deviceID > 0)) {
    return;
  }

  const [deviceData, setDeviceData] = useState(null);

  useEffect(() => {
    fetchDeviceData(deviceID, setDeviceData);
  }, [deviceID]);

  useEffect(() => {
    if (deviceData) {
      logDev(`StatusCard #${deviceID} Data`, { deviceData });
    }
  }, [deviceData]);

  if (!deviceData) {
    return <p>Data #{deviceID} Unavailable...</p>;
  }

  const { name, status } = deviceData || {};

  const handleClick = () => setRefFocus({deviceID});

  return (
    <Container
      statusColor={status === "active" ? "green" : "red"}
      variants={cardVariants}
    >
      <i className="fa-regular fa-lightbulb"></i>
      <h5>{name}</h5>
        <div className="number-box">#{deviceID}</div>
      <StatusContainer>
        <StatusText>{status}</StatusText>
          <StatusIcon
            icon={faCircle}
            color={status === "active" ? theme.colors.primary500 : theme.colors.red500}
          />
        </StatusContainer>
        <ButtonSecondary onClick={handleClick}>
        View details
        </ButtonSecondary>
    </Container>
  );
};

const Container = styled(motion.div)`
  position: relative;
  border: 1px solid ${({theme}) => theme.colors.ui200};
  border-radius: ${({theme}) => theme.borderRadius.default};
  padding: 24px 24px;
  width: 100%; 
  text-align: left; 
  height: 100%;
  h5 {
    font-size: 1rem;
    font-weight: 800;
    margin-bottom: 8px;
  color: ${({theme}) => theme.colors.ui800};
  }
  h6 {
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 0;
  }

  i {
    font-size: 35px;
    margin-bottom: 15px;
    color: ${({ statusColor }) => statusColor};
  }

  .number-box {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 16px;
    color: ${({theme}) => theme.colors.ui700};
  }

  @media screen and (max-width: 991px) {
  }
  @media screen and (max-width: 769px) {
  // width: 100%;
  }
`;

const StatusContainer = styled.div`
  text-transform: capitalize;
  font-size: 12px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.ui700};
  letter-spacing: -0.2px;
  position: absolute;
  top: 10px; 
  right: 10px; 
`;

const StatusIcon = styled(FontAwesomeIcon)`
  font-size: 0.8rem;

`;

const StatusText = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  margin-right: 0.5rem;
`;

export default StatusCard;
