import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Home, WelcomePage, RegisterPage, LogInPage } from './routes'
import { Notification, Confirmation } from './components'

function App() {
  //States
  const [isMobile,] = useState(isMobileScreen());
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationBarOpen, setNotificationBarOpen] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [notification, setNotification] = useState('');
  const [alert, setAlert] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile])

  useEffect(() => {
    getUser();
  }, [])

  useEffect(() => {
   console.log(user);
  }, [user])
  

  function isMobileScreen() {
    const maxWidth = 768;
    return window.innerWidth <= maxWidth;
  }

  //ACTIONS
  const getUser = () => {
    const loggedUser = Cookies.get('user');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }

  const handleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }

  const handleNotificationsBar = () => {
    setNotificationBarOpen(!notificationBarOpen);
  }

  const logConfirmation = (message, action) => {
    const confirmation_obj = {
      msg: message,
      action
    }
    setConfirmation(confirmation_obj);
  }

  const cancelConfirmation = (accepted) => {
    setConfirmation(null);
    if(!accepted){
      setError('Action Denied');
    }
  }

  const logNotification = (type, message) => {
    switch (type) {
      case 'alert':
        setAlert(message)
        break;
      case 'error':
        setError(message)
        break;
      default:
        setNotification(message)
        break;
    }
  }

  const clearNotification = (type) => {
    switch (type) {
      case 'alert':
        setAlert('')
        break;
      case 'error':
        setError('')
        break;
      default:
        setNotification('')
        break;
    }
  }

  const handleLogOut = () => {
    const logOut = () => {
      setUser(null);
      Cookies.remove('user');
    }
    logConfirmation('Are you sure you want to log out?', logOut);
  }

  const APP = {
    STATES: {
      isMobile,
      user,
      sidebarOpen,
      notificationBarOpen,
      confirmation,
      notification,
      alert,
      error
    },
    ACTIONS: {
      getUser,
      handleSidebar,
      handleNotificationsBar,
      logConfirmation,
      cancelConfirmation,
      logNotification,
      handleLogOut,
    }
  }

  return (
    <Router>
        <Notification type='notification' message={notification} clearNotification={clearNotification} />
        <Notification type='alert' message={alert} clearNotification={clearNotification} />
        <Notification type='error' message={error} clearNotification={clearNotification} />
        <Confirmation message={confirmation?.msg} onConfirm={confirmation?.action} onCancel={cancelConfirmation} />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LogInPage APP={APP} />} />
        <Route path="/:dashID" element={<Home APP={APP} />} />
      </Routes>
    </Router>
  )
}

export default App
