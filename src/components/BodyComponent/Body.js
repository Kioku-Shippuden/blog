import React, {Fragment, useEffect, useState} from 'react'
import TopicSlide from './TopicSlide';
import ContentList from './ContentList';
import ContentSaved from './ContentSaved';
import RecommendFollower from './RecommendFollower';
import UserListPagination from './UserListPagination';
import UserPagePagination from './UserPagePagination';
import UserInformation from './UserInformation';
import FollowingList from './FollowingList';
import { callGetApiWithoutToken } from '../../helpers/request';
import './style/Body.scss'

const apiDomain = process.env.REACT_APP_API_DOMAIN

function Body(props) {
  const {typePage, setShowEditProfile} = props;
  const [postData, setPostData] = useState([]);
  const [userPaginationSelected, setUserPaginationSelected] = useState('home');

  const getAllPost = async () => {
    const apiUrl = `${apiDomain}/v1/api/post/allPost`;
    const reponse = await callGetApiWithoutToken(apiUrl);
    setPostData(reponse.metaData.listPost);
  }
  
  useEffect(() => {
    if (typePage === 'HomePage') {
      getAllPost();
    }
  }, []);

  return (
    <div className='body-component'>
      <div className='main-body-component'>
        {
          typePage === 'HomePage' &&
          <TopicSlide />
        }
        {
          typePage === 'UserPage' &&
          <Fragment>
            <UserListPagination 
              userPaginationSelected={userPaginationSelected}
              setUserPaginationSelected={setUserPaginationSelected}
            />
            <UserPagePagination userPaginationSelected={userPaginationSelected} />
          </Fragment>
        }
        <div className='content-group'>
          {
            postData.length > 0 &&
            postData.map((data, index) => {
              return (<ContentList key={index} data={data}/>)
            })
          }
        </div>
      </div>
      <div className='sub-body-component'>
        {
          typePage === 'HomePage' &&
          <Fragment>
             <div className='group-component'>
              <div className='header-component title-text'>Who to Follow</div>
              <RecommendFollower />
              <RecommendFollower />
              <RecommendFollower />
              <div className='footer-component content-text'>See more suggestions</div>
            </div>
            <div className='group-component'>
              <div className='header-component title-text'>Recently Save</div>
              <ContentSaved />
              <ContentSaved />
              <ContentSaved />
              <div className='footer-component content-text'>See all (9)</div>
            </div>
          </Fragment>
        }
        {
          typePage === 'UserPage' &&
          <Fragment>
            <UserInformation setShowEditProfile={setShowEditProfile}/>
            <div className='group-component'>
              <div className='header-component title-text'>Following List</div>
              <FollowingList />
              <FollowingList />
              <FollowingList />
              <FollowingList />
              <FollowingList />
              <FollowingList />
              <FollowingList />
              <FollowingList />
              <FollowingList />
              <FollowingList />
              <FollowingList />
            </div>
          </Fragment>
        }
      </div>
    </div>
  )
}

export default Body