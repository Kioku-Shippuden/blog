// TitleBlock.js

import React, { useState } from 'react';
import './style/TitleComponent.scss'

const TitleComponent = (props) => {
    const { setTitlePost } = props

  const handleTitleChange = (event) => {
    setTitlePost(event.target.value);
  };

  return (
    <div className='title-component'>
        <input type='text' placeholder='Title' onChange={handleTitleChange}></input>
    </div>
  );
};

export default TitleComponent;
