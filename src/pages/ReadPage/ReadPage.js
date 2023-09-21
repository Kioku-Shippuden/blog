import React, {useState} from 'react';
import ProFile from '../../components/ProfileComponent/ProFile';
import Navigator from '../../components/NavigatorComponent/Navigator';
import ReadContent from '../../components/ReadContentComponent/ReadContent';
import ProfilePopup from '../../components/NavigatorComponent/ProfilePopup';
import NotificationPopup from '../../components/NavigatorComponent/NotificationPopup';
import './ReadPage.scss';

function ReadPage() {
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  return (
    <div className='read-page'>
      <Navigator 
        typePage={'HomePage'}
        showProfilePopup={showProfilePopup}
        showNotificationPopup={showNotificationPopup}
        setShowProfilePopup={setShowProfilePopup}
        setShowNotificationPopup={setShowNotificationPopup}
      />
      <ReadContent />
      {
        showProfilePopup === true && showEditProfile === false &&
        <ProfilePopup 
          showEditProfile={showEditProfile}
          setShowEditProfile={setShowEditProfile}
        />
      }
      {
        showNotificationPopup === true &&
        <NotificationPopup/>
      }
      {
        showEditProfile === true &&
        <ProFile
          setShowEditProfile={setShowEditProfile}
        />
      }
    </div>
  )
}

export default ReadPage