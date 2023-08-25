import React, {useState} from 'react'
import Body from '../../components/BodyComponent/Body';
import Navigator from '../../components/NavigatorComponent/Navigator';
import ProfilePopup from '../../components/NavigatorComponent/ProfilePopup';
import './HomePage.scss';


function HomePage() {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  
  return (
    <div className='home-page'>
      <Navigator 
        typePage={'HomePage'} 
        showProfilePopup={showProfilePopup}
        setShowProfilePopup={setShowProfilePopup}
      />
      <Body />
      {
        showProfilePopup === true &&
        <ProfilePopup />
      }
    </div>
  )
}

export default HomePage