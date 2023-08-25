import React, {useState} from 'react';
import Navigator from '../../components/NavigatorComponent/Navigator';
import ReadContent from '../../components/ReadContentComponent/ReadContent';
import ProfilePopup from '../../components/NavigatorComponent/ProfilePopup';
import './ReadPage.scss';

function ReadPage() {
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  return (
    <div className='read-page'>
      <Navigator 
        typePage={'HomePage'}
        showProfilePopup={showProfilePopup}
        setShowProfilePopup={setShowProfilePopup}
      />
      <ReadContent />
      {
        showProfilePopup === true &&
        <ProfilePopup />
      }
    </div>
  )
}

export default ReadPage