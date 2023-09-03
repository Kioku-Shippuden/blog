import React, { useState } from 'react'
import Navigator from '../../components/NavigatorComponent/Navigator';
import WriteContent from '../../components/WriteContentComponent/WriteContent';
import ProfilePopup from '../../components/NavigatorComponent/ProfilePopup';
import PublishForm from '../../components/WriteContentComponent/PublishForm';
import './WritePage.scss';

function WritePage() {
  const [contentPost, setContentPost] = useState('');
  const [isPulish , setIsPublish] = useState(false);
  const [showPublishPopup, setShowPublishPopup] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  return (
    <div className='write-page'>
      <Navigator 
        typePage={'WritePage'}
        setShowPublishPopup = {setShowPublishPopup}
        showProfilePopup={showProfilePopup}
        setShowProfilePopup={setShowProfilePopup}
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
    </div>
  )
}

export default WritePage