import { useState, useEffect } from 'react';
import { callGetApiWithoutToken } from '../helpers/request';

const apiDomain = process.env.REACT_APP_API_DOMAIN

const useUserProfile = (userId) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const apiUrl = `${apiDomain}/v1/api/user/myProfile`;
        const reponse = await callGetApiWithoutToken(apiUrl);
        setUserProfile(reponse.metaData);
      } catch (err) {
        console.log(err);
      }
    }
    getUserProfile();
  }, []);

  return userProfile;
};

export default useUserProfile;
