import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSnackbar } from 'notistack';
import useUserProfile from './useUserProfile';
import { useAuth } from './useAuthentication';
import SnackbarContent from './useSnackbarContent';
import { callGetApiWithoutToken } from '../helpers/request';

const apiDomain = process.env.REACT_APP_API_DOMAIN
const socketDomain = process.env.REACT_APP_SOCKET_DOMAIN

const AlertContext = createContext();

export function useAlert() {
  return useContext(AlertContext);
}

export function AlertProvider({ children }) {
  const { isAuthen } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [alertState, setAlertState] = useState(0);
  const [notificationState, setNotificationState] = useState([]);
  
  const userProfile = useUserProfile();
  const userId = userProfile?.userId;

  // Handle Connect Socket
  const socket = io.connect(socketDomain, {
    transports: ['websocket'],
    query: { userId }
  });

  socket.on('connect', () => {
    console.log('Connected to WebSocket server');
  });

  socket.on('friendRequest', (data) => {
    handleFriendNotification(data);
  });

  socket.on('acceptedRequest', (data) => {
    handleFriendNotification(data);
  })

  socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
  });

  // Handle Notification About Friend
  const handleFriendNotification = (data) => {
    setAlertState((prev) => prev + 1);

    const updatedNotification = [data, ...notificationState];
    setNotificationState(updatedNotification);

    enqueueSnackbar(
      <SnackbarContent message={data.notifyMessage} />, 
      {
        style: {
          backgroundColor: '#ffffff',
          borderRadius: '25px',
        },
      }
    );
  }

  // Handle Get All Notification
  const getAllNotification = async () => {
    if (!isAuthen) return;
    
    const apiUrl = `${apiDomain}/v1/api/user/notifies`;
    const reponse = await callGetApiWithoutToken(apiUrl);
    setNotificationState(reponse.metaData.data ? reponse.metaData.data : []);
    setAlertState(reponse.metaData.numberPending ? reponse.metaData.numberPending : 0);
  }

  // Update Current Notification
  // TODO
  const updateCurrentStatus = (notifyId) => {
    notificationState.forEach((notify) => {
      if (notify._id === notifyId) {
        notify.status = "Read";
      }
    })
  }

  const removeNotify = (notifyId) => {
    const newNotificationState = notificationState.filter(notify => notify._id !== notifyId);
    setNotificationState(newNotificationState);
  }

  useEffect(() => {
    getAllNotification();
  }, [])

  return (
    <AlertContext.Provider value={{ alertState, notificationState, setAlertState, setNotificationState, updateCurrentStatus, removeNotify }}>
      {children}
    </AlertContext.Provider>
  );
}
