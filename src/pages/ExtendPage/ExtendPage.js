import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import Body from '../../components/BodyComponent/Body';
import Navigator from '../../components/NavigatorComponent/Navigator';
import ProfilePopup from '../../components/NavigatorComponent/ProfilePopup';
import NotificationPopup from '../../components/NavigatorComponent/NotificationPopup';
import './ExtendPage.scss'

const userFollowingTmp = {
    "message": "get user following success!",
    "status": 201,
    "metaData": {
        "numberUser": 5,
        "listUser": [
            {
                "userName": "kioku",
                "userId": "e5b38261-47dc-11ee-bc2d-0242ac150002",
                "avatar": "http://localhost:3000/images/afb01790-ebe9-4b8e-ace9-cf5f83dd146a_1696066632341.png",
                "bio": null
            },
            {
                "userName": "kioku",
                "userId": "e5b38261-47dc-11ee-bc2d-0242ac150002",
                "avatar": "http://localhost:3000/images/afb01790-ebe9-4b8e-ace9-cf5f83dd146a_1696066632341.png",
                "bio": null
            },
            {
                "userName": "kioku",
                "userId": "e5b38261-47dc-11ee-bc2d-0242ac150002",
                "avatar": "http://localhost:3000/images/afb01790-ebe9-4b8e-ace9-cf5f83dd146a_1696066632341.png",
                "bio": null
            },
            {
                "userName": "kioku",
                "userId": "e5b38261-47dc-11ee-bc2d-0242ac150002",
                "avatar": "http://localhost:3000/images/afb01790-ebe9-4b8e-ace9-cf5f83dd146a_1696066632341.png",
                "bio": null
            },
            {
                "userName": "kioku",
                "userId": "e5b38261-47dc-11ee-bc2d-0242ac150002",
                "avatar": "http://localhost:3000/images/afb01790-ebe9-4b8e-ace9-cf5f83dd146a_1696066632341.png",
                "bio": null
            }
        ]
    },
    "cookies": {}
}
const userSuggetionsTmp = {
    "message": "get user followed success!",
    "status": 201,
    "metaData": {
        "numberUser": 5,
        "listUser": [
            {
                "userName": "kioku",
                "userId": "e5b38261-47dc-11ee-bc2d-0242ac150002",
                "avatar": "http://localhost:3000/images/afb01790-ebe9-4b8e-ace9-cf5f83dd146a_1696066632341.png",
                "bio": null
            },
            {
                "userName": "kioku",
                "userId": "e5b38261-47dc-11ee-bc2d-0242ac150002",
                "avatar": "http://localhost:3000/images/afb01790-ebe9-4b8e-ace9-cf5f83dd146a_1696066632341.png",
                "bio": null
            },
            {
                "userName": "kioku",
                "userId": "e5b38261-47dc-11ee-bc2d-0242ac150002",
                "avatar": "http://localhost:3000/images/afb01790-ebe9-4b8e-ace9-cf5f83dd146a_1696066632341.png",
                "bio": null
            },
            {
                "userName": "kioku",
                "userId": "e5b38261-47dc-11ee-bc2d-0242ac150002",
                "avatar": "http://localhost:3000/images/afb01790-ebe9-4b8e-ace9-cf5f83dd146a_1696066632341.png",
                "bio": null
            },
            {
                "userName": "kioku",
                "userId": "e5b38261-47dc-11ee-bc2d-0242ac150002",
                "avatar": "http://localhost:3000/images/afb01790-ebe9-4b8e-ace9-cf5f83dd146a_1696066632341.png",
                "bio": null
            }
        ]
    },
    "cookies": {}
}

function ExtendPage() {
    const location = useLocation();
    const [userFollowed, setUserFollowed] = useState([]);
    const [userFollowing, setUserFollowing] = useState([]);
    const [userSuggetions, setUserSuggetions] = useState([]);
    const [showProfilePopup, setShowProfilePopup] = useState(false);
    const [showNotificationPopup, setShowNotificationPopup] = useState(false);

    const getUserFollowed = async () => {
        // const apiUrl = `${apiDomain}/v1/api/post/allPost`;
        // const reponse = await callPostApiWithoutToken(apiUrl, {
        //   "user_id": userId
        // });
        const tmp = userFollowingTmp
        setUserFollowed(tmp.metaData.listUser)
    }

    const getUserFollowing = async () => {
        // const apiUrl = `${apiDomain}/v1/api/post/allPost`;
        // const reponse = await callPostApiWithoutToken(apiUrl, {
        //   "user_id": userId
        // });
        const tmp = userFollowingTmp
        setUserFollowing(tmp.metaData.listUser)
    }

    const getUserSuggetion = async () => {
        // const apiUrl = `${apiDomain}/v1/api/post/allPost`;
        // const reponse = await callPostApiWithoutToken(apiUrl, {
        //   "user_id": "kioku"
        // });
        const tmp = userSuggetionsTmp
        setUserSuggetions(tmp.metaData.listUser)
    }

    useEffect(
        () => {
            const currentUrl = location.pathname;
            if (currentUrl.includes('followed')) {
                getUserFollowed();
            } else if (currentUrl.includes('following')) {
                getUserFollowing();
            } else if (currentUrl.includes('suggetions')) {
                getUserSuggetion();
            }
    }, [])

    return (
        <div className='extend-page'>
            <Navigator 
                typePage={'ExtendPage'} 
                showProfilePopup={showProfilePopup}
                showNotificationPopup={showNotificationPopup}
                setShowProfilePopup={setShowProfilePopup}
                setShowNotificationPopup={setShowNotificationPopup}
            />
            <Body
                typePage={'ExtendPage'}
                userFollowed={userFollowed}
                userFollowing={userFollowing}
                userSuggetions={userSuggetions}
            />
            {
                showProfilePopup === true && 
                <ProfilePopup />
            }
            {
                showNotificationPopup === true &&
                <NotificationPopup/>
            }
        </div>
    )
}

export default ExtendPage