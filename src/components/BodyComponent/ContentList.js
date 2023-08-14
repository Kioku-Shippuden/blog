import React from 'react'
import './style/ContentList.scss'
const grayText = {
  color: 'rgba(117, 117, 117, 1)'
}
function ContentList() {
  return (
    <div className='content-list-component'>
      <div className='information-content'>
        <div className='author-content'>
          <img src='/account-logo.png' alt='' />
          <span className='title-text'>Kioku</span>
        </div>
        <div className='sub-title-text'>What Is Geographic Information System (GIS)</div>
        <div className='summary-content content-text'>
          Everything you need to know about GIS, it's basic working, role in engineering and its applications. —
          Geographic Information System is nothing but a computer application that captures, stores and displays...
        </div>
        <div className='footer-content'>
          <div className='other-information tag-text'>
            <div className='tag tag-text'>GIS</div>
            <div className='tag-text'>13 min read</div>
          </div>
          <div className='save-content'>
            <div className='icon-save'>
              <i class="far fa-bookmark"></i>
            </div>
          </div>
        </div>
      </div>
      <div className='image-contnent'>
        <img src='/background.jpeg' alt='' />
      </div>
    </div>
  )
}

export default ContentList