import React, { useState } from 'react'
import Navigator from '../../components/NavigatorComponent/Navigator';
import WriteContent from '../../components/WriteContentComponent/WriteContent';
import ProfilePopup from '../../components/NavigatorComponent/ProfilePopup';
import PublishForm from '../../components/WriteContentComponent/PublishForm';
import './WritePage.scss';

function WritePage() {
  const [value, setValue] = useState('');
  const [showPublishPopup, setShowPublishPopup] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  return (
    <div className='write-page'>
      <Navigator 
        typePage={'WritePage'} 
        content={value} 
        setShowPublishPopup = {setShowPublishPopup}
        showProfilePopup={showProfilePopup}
        setShowProfilePopup={setShowProfilePopup}
      />
      <WriteContent value={value} setValue={setValue}/>
      {
        showPublishPopup === true && 
        <PublishForm />
      }
      {
        showProfilePopup === true &&
        <ProfilePopup />
      }
    </div>
  )
}

export default WritePage