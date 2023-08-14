import React from 'react'
import Navigator from '../../components/NavigatorComponent/Navigator';
import Body from '../../components/BodyComponent/Body';
import './HomePage.scss';


function HomePage() {
  return (
    <div className='home-page'>
      <Navigator />
      <Body />
    </div>
  )
}

export default HomePage