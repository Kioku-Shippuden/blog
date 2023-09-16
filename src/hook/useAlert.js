import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './useAuthentication';
import { callGetApiWithoutToken } from '../helpers/request';

const AlertContext = createContext();

export function useAlert() {
  return useContext(AlertContext);
}

export function AlertProvider({ children }) {
  const { isAuthen } = useAuth();
  const [alertState, setAlertState] = useState(0);
  const [notificationState, setNotificationState] = useState([]);

  const getAllNotification = async () => {
    if (!isAuthen) return;
    
    const apiUrl = 'http://localhost:3000/v1/api/user/notifies';
    const reponse = await callGetApiWithoutToken(apiUrl);
    setAlertState(reponse.metaData.data.data.length);
    setNotificationState(reponse.metaData.data.data);
  }

  useEffect(() => {
    getAllNotification();
  }, [])

  return (
    <AlertContext.Provider value={{ alertState, notificationState, setAlertState, setNotificationState }}>
      {children}
    </AlertContext.Provider>
  );
}
