import React, { Fragment } from 'react';
import Logo from './Logo';
import Alert from './Alert';
import Search from './Search';
import PublishPost from './PublishPost';
import SaveCachePost from './SaveCachePost';
import CreateContent from './CreateContent';
import ManageProfile  from './ManageProfile';
import { useNavigate } from 'react-router-dom';
import './style/Navigator.scss';

function Navigator(props) {
  const {typePage, content, setIsPublish} = props;
  const navigate = useNavigate();
  
  const navigateHome = () => {
    navigate('/');
  }
  const navigateWritePage = () => {
    navigate('/new-story');
  }

  return (
    <div className='navigator-component'>
      {
        typePage === 'HomePage' &&
        <Fragment>
          <div className='group-component'>
            <Logo navigateHome={navigateHome}/>
            <Search />
          </div>
          <CreateContent navigateWritePage={navigateWritePage}/>
          <Alert />
          <ManageProfile />
        </Fragment>
      }
      {
        typePage === 'WritePage' &&
        <Fragment>
          <div className='group-component'>
            <Logo navigateHome={navigateHome}/>
            <SaveCachePost />
          </div>
          <PublishPost content={content} setIsPublish={setIsPublish}/>
          <Alert />
          <ManageProfile />
        </Fragment>
      }
    </div>
  )
}

export default Navigator