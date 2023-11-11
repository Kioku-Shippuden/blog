import React, { useState, useRef, useEffect } from 'react';
import './style/TitleComponent.scss'

const TitleComponent = (props) => {
  const { setTitlePost, contentPost } = props;

  const [text, setText] = useState('');
  const textareaRef = useRef();

  const handleTitleChange = (e) => {
    const textarea = textareaRef.current;
    setText(e.target.value);
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;

    setTitlePost(e.target.value);
  };

  useEffect(() => {
    if (contentPost === null) return;
    const title = JSON.parse(contentPost).title;
    setText(title);
  }, [contentPost])

  return (
    <div className='title-component'>
        <textarea 
          ref={textareaRef}
          value={text}
          type='text' 
          placeholder='Title' 
          onChange={handleTitleChange}
        />
    </div>
  );
};

export default TitleComponent;
