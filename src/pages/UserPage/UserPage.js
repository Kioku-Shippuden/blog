import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import Body from '../../components/BodyComponent/Body';
import ProFile from '../../components/ProfileComponent/ProFile';
import Navigator from '../../components/NavigatorComponent/Navigator';
import ProfilePopup from '../../components/NavigatorComponent/ProfilePopup';
import NotificationPopup from '../../components/NavigatorComponent/NotificationPopup';
import './UserPage.scss'

function UserPage() {
    const params = useParams();
    const [showEditProfile, setShowEditProfile] = useState(false)
    const [showProfilePopup, setShowProfilePopup] = useState(false);
    const [showNotificationPopup, setShowNotificationPopup] = useState(false);
    
    return (
        <div className='user-page'>
            <Navigator 
                typePage={'UserPage'} 
                showProfilePopup={showProfilePopup}
                showNotificationPopup={showNotificationPopup}
                setShowProfilePopup={setShowProfilePopup}
                setShowNotificationPopup={setShowNotificationPopup}
            />
            <Body 
                typePage={'UserPage'}
                setShowEditProfile={setShowEditProfile}
            />
            {
                showProfilePopup === true && 
                <ProfilePopup />
            }
            {
                showNotificationPopup === true &&
                <NotificationPopup/>
            }
            {
                showEditProfile === true &&
                <ProFile setShowEditProfile={setShowEditProfile}/>
            }
        </div>
    )
}

export default UserPage