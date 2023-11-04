import React, { Fragment, useState, useEffect } from 'react'
import ProFile from '../../components/ProfileComponent/ProFile';
import Navigator from '../../components/NavigatorComponent/Navigator';
import ProfilePopup from '../../components/NavigatorComponent/ProfilePopup';
import PublishForm from '../../components/WriteContentComponent/PublishForm';
import WriteContent from '../../components/WriteContentComponent/WriteContent';
import NotificationPopup from '../../components/NavigatorComponent/NotificationPopup';
import WriteContent_V2 from '../../components/WriteContentComponent/WriteContent_V2';
import TitleComponent from '../../components/WriteContentComponent/TitleComponent';
// import { edjsHTML } from '../../components/WriteContentComponent/tool/editorjs-html';
import './WritePage.scss';

function WritePage() {
  const editorjsHTML = require("editorjs-html");
  const edjsParser = editorjsHTML();

  const [editor, setEditor] = useState(null);
  const [titlePost, setTitlePost] = useState('Title');
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
      <Fragment>
        <TitleComponent setTitlePost={setTitlePost}/>
        <WriteContent_V2 editor={editor} setEditor={setEditor}/>
      </Fragment>
      {/* <WriteContent value={contentPost} setValue={setContentPost}/> */}
      {
        showPublishPopup === true && 
        <PublishForm 
          titlePost={titlePost}
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