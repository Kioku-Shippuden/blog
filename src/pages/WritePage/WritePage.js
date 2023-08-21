import React, { useState, useEffect } from 'react'
import Navigator from '../../components/NavigatorComponent/Navigator';
import WriteContent from '../../components/WriteContentComponent/WriteContent';
import './WritePage.scss';

function WritePage() {
  const [value, setValue] = useState('');

  return (
    <div className='write-page'>
      <Navigator typePage={'WritePage'} content={value}/>
      <WriteContent value={value} setValue={setValue}/>
    </div>
  )
}

export default WritePage