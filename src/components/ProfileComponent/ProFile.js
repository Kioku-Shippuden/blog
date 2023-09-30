import React, { useEffect, useRef, useState} from 'react'
import useUserProfile from '../../hook/useUserProfile';
import { callPutApiWithoutToken, callPostApiWithoutToken } from '../../helpers/request';
import './style/Profile.scss'

const apiDomain = process.env.REACT_APP_API_DOMAIN

function ProFile(props) {
    const { setShowEditProfile } = props;
    const useProfile = useUserProfile();
    const [displayError, setDisplayError] = useState(false)
    const [currentAvatar, setCurrentAvatar] = useState(null)
    const [currenUserName, setCurrentUserName] = useState(null)
    const [currentBio, setCurrentBio] = useState(null)

    const updateUserName = (event) => {
        setCurrentUserName(event.target.value);
    }

    const updateBio = (event) => {
        setCurrentBio(event.target.value);
    }

    const handleClosePanel = () => {
        setShowEditProfile(false);
    }

    const validationForm = (userName) => {
		const validated = {
			userName: userName.length <= 0,
    	};
    	return validated;
	}

    const onSaveProfile = async () => {
        const userName = currenUserName;
		const validated = validationForm(userName);
		if(validated.userName) {
			setDisplayError(validated.userName);
            return;
		}
        await updateUserProfile(userName);
        setShowEditProfile(false);
    }

    const updateUserProfile = async(userName) => {
        try {
            const apiUrl = `${apiDomain}/v1/api/user/updateProfile`;
			await callPutApiWithoutToken(apiUrl, {
				"userName": userName
			});
        } catch (error) {
            console.error(error)
        }
    }

    const handleUpdateImage = async (event) => {
        const file = event.target.files[0];

        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            try {
                const apiUrl = `${apiDomain}/v1/api/upload/image?topic=avatar`;
                const res = await callPostApiWithoutToken(apiUrl, formData);
                setCurrentAvatar(res.metaData)
            } catch (err) {
                console.log(err);
            }

            
        }
    }

    useEffect(() => {
        const username = useProfile?.userName
        if (username) {
            setCurrentUserName(username)
        }
    }, [useProfile])

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
                        {
                            currentAvatar === null
                            ?
                            <img src='/account-logo.png' alt='' />
                            :
                            <img src={currentAvatar} alt='' />
                        }
                    </div>
                    <div className='infor-group'>
                        <div className='btn-groups'>
                        <label htmlFor='imageInput' className='content-text update-btn'>
                            Update
                            <input
                            type='file'
                            accept='image/*'
                            style={{ display: 'none' }}
                            id='imageInput'
                            onChange={handleUpdateImage}
                            />
                        </label>
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
                        onChange={updateUserName}
                        value={currenUserName} 
                        className={displayError ? 'err-border' : 'qwe'}
                    />
                </div>
            </div>
            {
                displayError &&
                <div className='err'>Please enter your name.</div>	
            }
            <div className='bio-update'>
            <div className='title-component sub-title-text'>
                <p>Bio</p>
            </div>
                <div className='text-update-component'>
                    <input 
                        type="text" 
                        name="name"
                        onChange={updateBio}
                        value={currentBio} 
                    />
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