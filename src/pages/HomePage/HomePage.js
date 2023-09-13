import React, {useEffect, useState} from 'react'
import Body from '../../components/BodyComponent/Body';
import Navigator from '../../components/NavigatorComponent/Navigator';
import ProfilePopup from '../../components/NavigatorComponent/ProfilePopup';
import useUserProfile from '../../hook/useUserProfile';
import SnackbarContent from '../../hook/useSnackbarContent';
import NotificationPopup from '../../components/NavigatorComponent/NotificationPopup';
import { useSnackbar } from 'notistack';
import io from 'socket.io-client';
import './HomePage.scss';

function HomePage() {
  const { enqueueSnackbar } = useSnackbar();
  const [currentAlert, setCurrentAlert] = useState(0);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  const userProfile = useUserProfile();
  const userId = userProfile?.userId;

  const socket = io.connect('http://localhost:3002', {
    transports: ['websocket'],
    query: { userId }
  });

  socket.on('connect', () => {
    console.log('Connected to WebSocket server');
  });

  socket.on('friendRequest', (data) => {
    setCurrentAlert((prev) => prev + 1);
    enqueueSnackbar(
      <SnackbarContent message={data.notifyMessage} />, 
      {
        style: {
          backgroundColor: '#ffffff',
          borderRadius: '25px',
        },
      }
    );
  });

  socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
  });
  
  return (
    <div className='home-page'>
      <Navigator 
        typePage={'HomePage'} 
        showProfilePopup={showProfilePopup}
        showNotificationPopup={showNotificationPopup}
        setShowProfilePopup={setShowProfilePopup}
        setShowNotificationPopup={setShowNotificationPopup}
        currentAlert={currentAlert}
      />
      <Body />
      {
        showProfilePopup === true &&
        <ProfilePopup />
      }
      {
        showNotificationPopup === true &&
        <NotificationPopup/>
      }
    </div>
  )
}

export default HomePage