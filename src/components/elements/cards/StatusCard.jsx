import { motion } from "framer-motion";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {fetchDeviceData} from "../../dash.utils";
import {logDev} from "../../../scripts/helpers";
import {faCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
      initial="hidden"
      animate="visible"
      onClick={handleClick}
    >
      <i className="fa-regular fa-lightbulb"></i>
      <h5>{name}</h5>
      <StatusContainer>
          <StatusIcon
            icon={faCircle}
            color={status === "active" ? "green" : "red"}
          />
          <StatusText>{status}</StatusText>
        </StatusContainer>
      <div className="number-box">#{deviceID}</div>
    </Container>
  );
};

const Container = styled(motion.div)`
  background-image: linear-gradient(to bottom right, #e9eaecda, #ffffff);
  filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.25));
  border: 4px solid ${({ statusColor }) => statusColor};
  text-align: center;

  width: 150px;
  padding: 2rem;
  padding-bottom: 4rem;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }

  h5 {
    font-size: 1.1rem;
    font-weight: 800;
    margin-bottom: 15px;
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
    position: absolute;
    bottom: 0;
    padding: 15px;
    font-size: 12px;
    border-radius: 60px 60px 0 0;
    width: 40px;
    height: 5px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: inset 0.25em 0.25em 0.25em rgba(0, 0, 0, 0.2),
      0em 0.05em rgba(255, 255, 255, 0);
    font-weight: 800;
    color: #fff;
    background: ${({ statusColor }) => statusColor};
  }

  @media screen and (max-width: 991px) {
  }
  @media screen and (max-width: 769px) {
  // width: 100%;
  }
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatusIcon = styled(FontAwesomeIcon)`
  font-size: 0.8rem;
  margin-right: 0.5rem;
`;

const StatusText = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;

export default StatusCard;
