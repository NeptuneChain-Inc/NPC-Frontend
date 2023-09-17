import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faTimes } from '@fortawesome/free-solid-svg-icons';
import { pushLocalNotification } from '../functions/notifications';

// Container for the Notification Bar
const NotificationContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  box-sizing: border-box;
  box-shadow: -5px 0px 15px rgba(0, 0, 0, 0.2);
  top: 0;
  right: 0;
  width: 60%;
  height: 100%;
  z-index: 20;
  background: #fff;
  overflow: auto;

  @media (min-width: 768px) {
    width: 30%;
  }

  button {
    background: #134b5f;
    color: white;
    margin: 5px;
    font-size: 0.8rem;
  }
`;

// Individual Notification styled component
const NotificationItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  font-size: 0.8rem;
  margin: 10px 0;
  border-bottom: 1px solid #ccc;
  //background-color: #fff;
  background-color: ${props => (props.type === 'error' ? '#ffebee' : props.type === 'alert' ? '#e8f5e9' : '#A5F8D3')};
`;

// Notification Icon
const NotificationIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  cursor: pointer;
`;

// Framer Motion variants
const notificationVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: '100%' },
};

const NotificationBar = ({APP}) => {
  const [notifications, setNotifications] = useState([]);

  const { isMobile, user, sidebarOpen, notificationBarOpen, confirmation, notification, alert, error } = APP ? APP.STATES : {};
  
  const {
    getUser,
    handleSidebar,
    handleNotificationsBar,
    logConfirmation,
    cancelConfirmation,
    logNotification,
    handleLogOut,
  } = APP ? APP.ACTIONS : {};

  

  useEffect(() => {
    getNotifications();
  }, [APP])
  

  const getNotifications = () => {
    const _notifications = JSON.parse(localStorage.getItem('notifications')) || [];
      setNotifications(_notifications);
  }

  const handleSmapleNotification = (type) => {
    const _notification = pushLocalNotification(type, `This is a sample ${type} notification`);
    logNotification(_notification.type, _notification.message);
  }

  return (
    <>
      <AnimatePresence>
        {notificationBarOpen && (
          <NotificationContainer
            as={motion.div}
            initial="closed"
            animate="open"
            exit="closed"
            variants={notificationVariants}
          >
            <NotificationIcon icon={faTimes} onClick={handleNotificationsBar} />

            {/* Create Sample notifications */}
            <h5>**For Testing Only**</h5>
            <button onClick={()=>handleSmapleNotification("")}>Send Sample Message Notification</button>
            <button onClick={()=>handleSmapleNotification("alert")}>Send Sample Alert Notification</button>
            <button onClick={()=>handleSmapleNotification("error")}>Send Sample Error Notification</button>
            <h5>********************</h5>
            {notifications.map((notification, index) => (
            <NotificationItem key={index} type={notification.type}>
              <p>{notification.message}</p>
              <small>{notification.time}</small>
            </NotificationItem>
          ))}
          </NotificationContainer>
        )}
      </AnimatePresence>
    </>
  );
};

export default NotificationBar;

