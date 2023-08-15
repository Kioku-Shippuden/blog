import React from 'react'
import './style/CreateContent.scss';

function CreateContent(props) {
  const {navigateWritePage} = props;

  return (
    <div className='create-content-component content-text' onClick={navigateWritePage} aria-hidden='true' >
      <div className='icon'>
        <i className='fal fa-edit'></i>
      </div>
      <div className='text'>Write</div>
    </div>
  )
}

export default CreateContent