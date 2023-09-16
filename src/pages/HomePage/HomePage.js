import io from 'socket.io-client';
import React, {useState} from 'react'
import { useSnackbar } from 'notistack';
import { useAlert } from '../../hook/useAlert';
import useUserProfile from '../../hook/useUserProfile';
import Body from '../../components/BodyComponent/Body';
import SnackbarContent from '../../hook/useSnackbarContent';
import Navigator from '../../components/NavigatorComponent/Navigator';
import ProfilePopup from '../../components/NavigatorComponent/ProfilePopup';
import NotificationPopup from '../../components/NavigatorComponent/NotificationPopup';
import './HomePage.scss';

function HomePage() {
  const { enqueueSnackbar } = useSnackbar();
  const { setAlertState, setNotificationState, notificationState } = useAlert();
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  const userProfile = useUserProfile();
  const userId = userProfile?.userId;

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

  const socket = io.connect('http://localhost:3002', {
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
  
  return (
    <div className='home-page'>
      <Navigator 
        typePage={'HomePage'} 
        showProfilePopup={showProfilePopup}
        showNotificationPopup={showNotificationPopup}
        setShowProfilePopup={setShowProfilePopup}
        setShowNotificationPopup={setShowNotificationPopup}
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