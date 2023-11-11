import React, { Fragment } from 'react';
import Logo from './Logo';
import Alert from './Alert';
import Search from './Search';
import PublishPost from './PublishPost';
import SaveCachePost from './SaveCachePost';
import CreateContent from './CreateContent';
import ManageProfile  from './ManageProfile';
import useUserProfile from '../../hook/useUserProfile';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../hook/useAlert';
import './style/Navigator.scss';
import { callPutApiWithoutToken } from '../../helpers/request';
const apiDomain = process.env.REACT_APP_API_DOMAIN
function Navigator(props) {
  const { typePage, setShowPublishPopup, showProfilePopup, showNotificationPopup, setShowProfilePopup, setShowNotificationPopup, onSaveEdit } = props;
  const useProfile = useUserProfile();
  const { alertState, setAlertState } = useAlert();
  const navigate = useNavigate();
  
  const navigateHome = () => {
    navigate('/');
  }
  const navigateWritePage = () => {
    navigate('/new-story');
  }

  const onClickAlertBtn = async () => {
    if(alertState != 0)
    {
      const apiUrl = `${apiDomain}/v1/api/user/receivedNotifies`
      await callPutApiWithoutToken(apiUrl)
    }
    setShowProfilePopup(false);
    setShowNotificationPopup(!showNotificationPopup)
  }

  const onClickManageProfileBtn = () => {
    setShowNotificationPopup(false)
    setShowProfilePopup(!showProfilePopup)
  }

  const turnOffPopup = () => {
    setShowProfilePopup(false)
    setShowNotificationPopup(false)
  }

  return (
    <div className='navigator-component'>
      {
        (typePage === 'HomePage' || typePage === 'UserPage' || typePage === 'ReadPage') &&
        <Fragment>
          <div className='group-component'>
            <Logo navigateHome={navigateHome} useProfile={useProfile}/>
            <Search />
          </div>
          <CreateContent navigateWritePage={navigateWritePage}/>
          <Alert onClickAlertBtn={onClickAlertBtn}/>
          <ManageProfile 
            useProfile={useProfile}
            onClickManageProfileBtn={onClickManageProfileBtn}/>
        </Fragment>
      }
      {
        typePage === 'WritePage' &&
        <Fragment>
          <div className='group-component'>
            <Logo navigateHome={navigateHome} useProfile={useProfile}/>
            <SaveCachePost />
          </div>
          <PublishPost
            onSaveEdit={onSaveEdit}
            turnOffPopup={turnOffPopup}
            setShowPublishPopup={setShowPublishPopup} 
          />
          <Alert onClickAlertBtn={onClickAlertBtn}/>
          <ManageProfile 
            useProfile={useProfile}
            onClickManageProfileBtn={onClickManageProfileBtn}/>
        </Fragment>
      }
    </div>
  )
}

export default Navigator