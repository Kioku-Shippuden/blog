import React, { useState } from 'react'
import ProFile from '../../components/ProfileComponent/ProFile';
import Navigator from '../../components/NavigatorComponent/Navigator';
import ProfilePopup from '../../components/NavigatorComponent/ProfilePopup';
import PublishForm from '../../components/WriteContentComponent/PublishForm';
import WriteContent from '../../components/WriteContentComponent/WriteContent';
import NotificationPopup from '../../components/NavigatorComponent/NotificationPopup';
import './WritePage.scss';

function WritePage() {
  const [contentPost, setContentPost] = useState('');
  const [showPublishPopup, setShowPublishPopup] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  return (
    <div className='write-page'>
      <Navigator 
        typePage={'WritePage'}
        setShowPublishPopup = {setShowPublishPopup}
        showProfilePopup={showProfilePopup}
        showNotificationPopup={showNotificationPopup}
        setShowProfilePopup={setShowProfilePopup}
        setShowNotificationPopup={setShowNotificationPopup}
      />
      <WriteContent value={contentPost} setValue={setContentPost}/>
      {
        showPublishPopup === true && 
        <PublishForm 
          contentPost={contentPost} setShowPublishPopup={setShowPublishPopup}/>
      }
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

export default WritePage