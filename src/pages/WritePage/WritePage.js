import React, { useState } from 'react'
import Navigator from '../../components/NavigatorComponent/Navigator';
import WriteContent from '../../components/WriteContentComponent/WriteContent';
import './WritePage.scss';

function WritePage() {
  const [value, setValue] = useState('');

  return (
    <div className='write-page'>
      <Navigator typePage={'WritePage'}/>
      <WriteContent value={value} setValue={setValue}/>
    </div>
  )
}

export default WritePage