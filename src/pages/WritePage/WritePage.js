import React, { Fragment, useState } from 'react'
import Navigator from '../../components/NavigatorComponent/Navigator';
import ProfilePopup from '../../components/NavigatorComponent/ProfilePopup';
import PublishForm from '../../components/WriteContentComponent/PublishForm';
import TitleComponent from '../../components/WriteContentComponent/TitleComponent';
import WriteContent_V2 from '../../components/WriteContentComponent/WriteContent_V2';
import NotificationPopup from '../../components/NavigatorComponent/NotificationPopup';
import './WritePage.scss';

function WritePage() {
  const [editor, setEditor] = useState(null);
  const [titlePost, setTitlePost] = useState('');
  const [contentPost, setContentPost] = useState(null);
  const [showPublishPopup, setShowPublishPopup] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  const onSaveEdit = () => {
    editor.save().then((outputData) => {
        let postJson = {
          "title" : titlePost,
          "content": outputData
        }
        let postString = JSON.stringify(postJson)

        setContentPost(postString)
        }).catch((error) => {
        console.log('Saving failed: ', error)
    });
  };

  return (
    <div className='write-page'>
      <Navigator 
        typePage={'WritePage'}
        onSaveEdit={onSaveEdit}
        showProfilePopup={showProfilePopup}
        setShowProfilePopup={setShowProfilePopup}
        setShowPublishPopup = {setShowPublishPopup}
        showNotificationPopup={showNotificationPopup}
        setShowNotificationPopup={setShowNotificationPopup}
      />
      {
        showPublishPopup === false && 
        <Fragment>
          <TitleComponent setTitlePost={setTitlePost} contentPost={contentPost}/>
          <WriteContent_V2 editor={editor} setEditor={setEditor} contentPost={contentPost}/>
        </Fragment>
      }
      {
        showPublishPopup === true && 
        <PublishForm
          contentPost={contentPost}
          setShowPublishPopup={setShowPublishPopup}
        />
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