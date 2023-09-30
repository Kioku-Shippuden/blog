import React, { Fragment, useState, useEffect } from 'react'
import ContentList from './ContentList';
import { callGetApiWithoutToken } from '../../helpers/request';
import './style/UserPagePagination.scss'

const apiDomain = process.env.REACT_APP_API_DOMAIN

function UserPagePagination(props) {
    const {userPaginationSelected} = props;
    const [postData, setPostData] = useState([]);


    const [alreadyContent, setAlreadyContent] = useState('default');

    const onUpdateAbout = () => {
        setAlreadyContent('update')
    }

    const getAllPost = async () => {
        const apiUrl = `${apiDomain}/v1/api/post/allPost`;
        const reponse = await callGetApiWithoutToken(apiUrl);
        setPostData(reponse.metaData.listPost);
    }

    useEffect(() => {
        getAllPost();
    }, []);

    return (
        <div className='user-page-pagination'>
            {
                userPaginationSelected === 'home' && postData.length > 0 &&
                postData.map((data, index) => {
                    return (<ContentList key={index} data={data}/>)
                })
            }
            {
                userPaginationSelected === 'list' && postData.length > 0 &&
                postData.map((data, index) => {
                    return (<ContentList key={index} data={data}/>)
                })
            }
            {
                userPaginationSelected === 'about' && alreadyContent === 'default' &&
                <Fragment>
                    <div className='about-component default'>
                        <div className='title-text'>
                            <p>Tell the world about yourself</p>
                        </div>
                        <div className='content-text'>
                            <p>Here’s where you can share more about yourself: your history, work experience, accomplishments, interests, dreams, and more. You can even add images and use rich text to personalize your bio.</p>
                        </div>
                        <div className='conten-text btn' onClick={onUpdateAbout} >
                            <p>Get Start</p>
                        </div>
                    </div>
                    <div className='footer'>
                        <div className='content-text'>
                            <p>3 Followers</p>
                        </div>
                        <div className='content-text'>
                            <p>27 Following</p>
                        </div>
                    </div>

                </Fragment>
            }
            {
                userPaginationSelected === 'about' && alreadyContent === 'update' &&
                <Fragment>
                    <div className='about-component create'>
                        <textarea />
                    </div>
                    <div className='btn-groups'>
                        <div className='content-text btn cancel'>
                            <p>Cancel</p>
                        </div>
                        <div className='content-text btn save'>
                            <p>Save</p>
                        </div>
                    </div>
                    <div className='footer'>
                        <div className='content-text'>
                            <p>3 Followers</p>
                        </div>
                        <div className='content-text'>
                            <p>27 Following</p>
                        </div>
                    </div>
                </Fragment>
            }
            {
                userPaginationSelected === 'about' && alreadyContent === 'show' &&
                <Fragment>
                    <div className='about-component show content-text'>
                        <p>There is plenty of guides on Medium regarding Data Science and Data Analysis using Python programming language. However, there are very few stories that discuss geospatial analysis. Since I studied geography and geoecology, I have very close bound to GIS and Geospatial analysis overall. In my stories, one can find useful information regarding geosptial analysis performed mostly with Python programming language.</p>
                    </div>
                    <div className='btn-groups'>
                        <div className='content-text btn save'>
                            <p>Save</p>
                        </div>
                        <div className='content-text btn cancel'>
                            <p>Update</p>
                        </div>
                    </div>
                    <div className='footer'>
                        <div className='content-text'>
                            <p>3 Followers</p>
                        </div>
                        <div className='content-text'>
                            <p>27 Following</p>
                        </div>
                    </div>
                </Fragment>
            }
        </div>
    )
}

export default UserPagePagination