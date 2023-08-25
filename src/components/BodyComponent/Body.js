import React, {useEffect, useState} from 'react'
import TopicSlide from './TopicSlide';
import ContentList from './ContentList';
import ContentSaved from './ContentSaved';
import RecommendFollower from './RecommendFollower';
import { callGetApiWithoutToken } from '../../helpers/request';
import './style/Body.scss'

function Body() {
  const [postData, setPostData] = useState([]);

  const getAllPost = async () => {
    const apiUrl = 'http://localhost:3000/v1/api/post/allPost';
    const reponse = await callGetApiWithoutToken(apiUrl);
    setPostData(reponse.metaData.listPost);
  }
  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <div className='body-component'>
      <div className='main-body-component'>
        <TopicSlide />
        {
          postData.length > 0 &&
          postData.map((data) => {
            return (<ContentList data={data}/>)
          })
        }
      </div>
      <div className='sub-body-component'>
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
        
      </div>
    </div>
  )
}

export default Body