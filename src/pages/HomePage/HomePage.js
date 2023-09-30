import React, {useState} from 'react';
import Body from '../../components/BodyComponent/Body';
import ProFile from '../../components/ProfileComponent/ProFile';
import Navigator from '../../components/NavigatorComponent/Navigator';
import ProfilePopup from '../../components/NavigatorComponent/ProfilePopup';
import NotificationPopup from '../../components/NavigatorComponent/NotificationPopup';
import './HomePage.scss';

function HomePage() {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  return (
    <div className='home-page'>
      <Navigator 
        typePage={'HomePage'} 
        showProfilePopup={showProfilePopup}
        showNotificationPopup={showNotificationPopup}
        setShowProfilePopup={setShowProfilePopup}
        setShowNotificationPopup={setShowNotificationPopup}
      />
      <Body typePage={'HomePage'}/>
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