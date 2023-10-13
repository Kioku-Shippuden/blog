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
const LIMIT_RECOMMEN_SHOW = 3
const PAGE_RECOMMEND = 1

function Body(props) {
  const {typePage, setShowEditProfile} = props;
  const [postData, setPostData] = useState([]);
  const [userPaginationSelected, setUserPaginationSelected] = useState('home');
  const [recommendUserData, setRecommendUserData] = useState(null)

  const getAllPost = async () => {
    const apiUrl = `${apiDomain}/v1/api/post/allPost`;
    const reponse = await callGetApiWithoutToken(apiUrl);
    setPostData(reponse.metaData.listPost);
  }

  const isThereAnyRecommend = () => {
    const visibleRecommendList = recommendUserData.RecommendFollowList.length
    if(!visibleRecommendList)
    {
      return false
    }
    return visibleRecommendList > 0

  }
  const isThereAnyRecommendLeft = () => {
    const totalRecommend = recommendUserData.totalRecommend
    if(!totalRecommend )
    {
      return false
    }
    return isThereAnyRecommend() && LIMIT_RECOMMEN_SHOW < totalRecommend
  }
  
  const getRecommendFollowList = async (limit, page) => {
    const apiUrl = `${apiDomain}/v1/api/user/recommendFollowing?limit=${limit}&page=${page}`;
    const response = await callGetApiWithoutToken(apiUrl);
    console.log(response)
    setRecommendUserData(response.metaData);
  }

  const getNextRecomends = async (nextPage) =>
  {
    const response = await callGetApiWithoutToken(nextPage);
    setRecommendUserData(response.metaData);
  }

  useEffect(() => {
    if (typePage === 'HomePage') {
      getAllPost();
      getRecommendFollowList(LIMIT_RECOMMEN_SHOW, PAGE_RECOMMEND);
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
              {
                recommendUserData != null && isThereAnyRecommend() > 0 &&
                recommendUserData.RecommendFollowList.map((data, index) => {
                  return (<RecommendFollower key={index} data={data} updateRecommendList = {() => {
                    getRecommendFollowList(LIMIT_RECOMMEN_SHOW, PAGE_RECOMMEND)}}/>)
                })
              }
              {
                recommendUserData != null && isThereAnyRecommendLeft() &&
                <div className='footer-component content-text' onClick={() => 
                                      getNextRecomends(recommendUserData.nextPage)}>See more suggestions</div>
              }
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