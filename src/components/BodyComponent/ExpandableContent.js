import React, { useState } from 'react';
import './style/ExpandableContent.scss';

const ExpandableContent = ({ content }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleContent = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`expandable-content ${expanded ? 'expanded' : ''}`}>
      <div className="content">{content}</div>
      <div className="toggle-button" onClick={toggleContent}>
        {expanded ? 'Less' : 'More'}
      </div>
    </div>
  );
};

export default ExpandableContent;
