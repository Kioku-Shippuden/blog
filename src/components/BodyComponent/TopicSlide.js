import React, { useRef } from 'react';
import './style/TopicSlide.scss';

const topicList = [
  'GIS',
  'Relationship',
  'Self',
  'Mental Health',
  'Future',
  'World',
  'Family',
  'Software Engineer',
  'Space',
  'Climate Change',
  'Data Science'
]

const sideScroll = (element, speed, distance, step) => {
  let scrollAmount = 0
  const slideTimer = setInterval(() => {
    element.scrollLeft += step
    scrollAmount += Math.abs(step)
    if (scrollAmount >= distance) {
      clearInterval(slideTimer)
    }
  }, speed)
}

function TopicSlide() {
  const topicWrapper = useRef(null)
  return (
    <div className='topic-slide-component'>
      <div
        className='arrow'
        onClick={() => {
          sideScroll(topicWrapper.current, 25, 50, -10)
        }}
        aria-hidden='true'
      >
        <i class="far fa-angle-left"></i>
      </div>
      <div className='content-wrapper' ref={topicWrapper}>
        {topicList.map((element, index) => {
          return (
            <div className='content' key={index}>
              {element}
            </div>
          )
        })}
      </div>
      <div
        className='arrow'
        onClick={() => {
          sideScroll(topicWrapper.current, 25, 50, 10)
        }}
        aria-hidden='true'
      >
        <i class="far fa-angle-right"></i>
      </div>
    </div>
  )
}

export default TopicSlide