import React from 'react'
import TopicSlide from './TopicSlide';
import ContentList from './ContentList';
import ContentSaved from './ContentSaved';
import RecommendFollower from './RecommendFollower';
import './style/Body.scss'

function Body() {
  return (
    <div className='body-component'>
      <div className='main-body-component'>
        <TopicSlide />
        <ContentList />
        <ContentList />
        <ContentList />
        <ContentList />
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