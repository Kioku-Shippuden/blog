import React, { useRef, useState} from 'react'
import useUserProfile from '../../hook/useUserProfile';
import './style/Profile.scss'

function ProFile(props) {
    const { setShowEditProfile } = props;
    const useNameRef = useRef(null);
    const useProfile = useUserProfile();
    const temp = useProfile?.userName
    const [currenUserName, setCurrentUserName] = useState(temp)

    const updateUserName = (event) => {
        setCurrentUserName(event.target.value);
    }
    const [displayError, setDisplayError] = useState({
		username: false,
	})

    const handleClosePanel = () => {
        setShowEditProfile(false);
    }

    const validationForm = (userName) => {
		const validated = {
			userName: userName.length <= 0,
    	};
  
    	return validated;
	}

    const onSaveProfile = () => {
        const userName = useNameRef.current.value;
		const validated = validationForm(userName);
		if(validated.userName) {
			setDisplayError(validated)
			return;
		}
    }

    return (
        <div className='profile-component'>
            <div className='header'>
                <div className='text head-text'>
                    <p>Profile Informations</p>
                </div>
                <div className='close-btn sub-title-text' onClick={handleClosePanel}>
                    <p>X</p>
                </div>
            </div>
            <div className='image-update'>
                <div className='title-component sub-title-text'>
                    <p>Photo</p>
                </div>
                <div className='image-update-component'>
                    <div className='image'>
                        <img src='/account-logo.png' alt='' />
                    </div>
                    <div className='infor-group'>
                        <div className='btn-groups'>
                            <div className='content-text update-btn'>Update</div>
                            <div className='content-text remove-btn'>Remove</div>
                        </div>
                        <div className='content-text notes'>
                            <p>Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='name-update'>
                <div className='title-component sub-title-text'>
                    <p>Name</p>
                </div>
                <div className='text-update-component'>
                    <input 
                        type="text" 
                        name="name" 
                        ref={useNameRef} 
                        readOnly={false}
                        onChange={updateUserName}
                        value={currenUserName} 
                        className={displayError.username ? 'err-border' : 'qwe'}
                    />
                </div>
            </div>
            {
                displayError.username &&
                <div className='err'>Please enter your name.</div>	
            }
            <div className='bio-update'>
            <div className='title-component sub-title-text'>
                <p>Bio</p>
            </div>
                <div className='text-update-component'>
                    <input type="text" name="name"/>
                </div>
            </div>
            <div className='footer content-text'>
                <div className='btn cancel-btn'>
                    <p>Cancel</p>
                </div>
                <div className='btn save-btn' onClick={onSaveProfile}>
                    <p>Save</p>
                </div>
            </div>
        </div>
    )
}

export default ProFile