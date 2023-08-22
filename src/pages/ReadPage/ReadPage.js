import React from 'react'
import Navigator from '../../components/NavigatorComponent/Navigator';
import ReadContent from '../../components/ReadContentComponent/ReadContent';
import './ReadPage.scss';

function ReadPage() {
  return (
    <div className='read-page'>
      <Navigator typePage={'HomePage'}/>
      <ReadContent />
    </div>
  )
}

export default ReadPage