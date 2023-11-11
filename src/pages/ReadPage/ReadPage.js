import React, {useState} from 'react';
import Navigator from '../../components/NavigatorComponent/Navigator';
import ReadContent from '../../components/ReadContentComponent/ReadContent';
import ProfilePopup from '../../components/NavigatorComponent/ProfilePopup';
import NotificationPopup from '../../components/NavigatorComponent/NotificationPopup';
import './ReadPage.scss';

function ReadPage() {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  return (
    <div className='read-page'>
      <Navigator 
        typePage={'ReadPage'}
        showProfilePopup={showProfilePopup}
        showNotificationPopup={showNotificationPopup}
        setShowProfilePopup={setShowProfilePopup}
        setShowNotificationPopup={setShowNotificationPopup}
      />
      <ReadContent />
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

export default ReadPage