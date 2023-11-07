import React, { useState, useRef, useEffect } from 'react'
import { callPostApiWithoutToken, callGetApiWithoutToken } from '../../helpers/request';
import { useNavigate } from 'react-router';
import './style//PublishForm.scss';


import moment from 'moment';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import useUserProfile from '../../hook/useUserProfile';
  
const apiDomain = process.env.REACT_APP_API_DOMAIN

function PublishForm(props) {
    const useProfile = useUserProfile();

    const { contentPost, setShowPublishPopup } = props;

    const [avatar, setAvatar] = useState(null);
    const [userName, setUserName] = useState(null);
    const [topicPost, setTopicPost] = useState('');
    const [titlePost, setTitlePost] = useState('');
    const [summaryPost, setSummaryPost] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [thumbnailPost, setThumnailPost] = useState('');

    const [displayError, setDisplayError] = useState({
        topic: false,
		title: false,
		summarize: false,
	});

    const navigate = useNavigate();
    
    const tesstAPIGoogle = async() => {
        try {
            const url = "https://maps.googleapis.com/maps/api/place/queryautocomplete/json?&input=hot&location=1974606.808943011%2C8704016.577829625&radius=1500&key=AIzaSyAm9ekbF8SnmFeUH4BvEffHYu_TuUieoDw"
            const reponse = await callGetApiWithoutToken(url)
        } catch (err) {
            throw(err)
        }
    }

    const validationForm = (title, topic, summarize) => {
		const validated = {
            topic: topic.length <=0 ,
            title: title.length <=0 ,
            summarize: summarize.length <=0 ,
        };
        return validated;
	}

    const onSubmit = () => {
        const title = titlePost;
        const topic = topicPost;
        const summarize = summaryPost;
        const thumbnail = thumbnailPost;
        const validated = validationForm( title, topic, summarize);

        tesstAPIGoogle()
    
        if (Object.values(validated).some(error => error)) {
            setDisplayError(validated)
            return;
        }

        var contentJson = JSON.parse(contentPost)
        contentJson.title = title
    
        // handlePublishPost(title, topic, summarize, JSON.stringify(contentJson), thumbnail);
        // setShowPublishPopup(false);
    }

    const handlePublishPost = async (title, tag, summarize, contentPost, thumbnail) => {
        if (contentPost === ' return') return;
    
        let contentId = await publishContent(title, tag, summarize, contentPost);
        await publishThumnail(contentId, thumbnail);
        navigate('/');
    }

    const publishContent = async (title, tag, summarize, contentPost) => {
        try {
            const apiUrl = `${apiDomain}/v1/api/post/publish`;
            const reponse = await callPostApiWithoutToken(apiUrl, {
                "postTitle": title,
                "postStatus": "publish",
                "postPermit": "private",
                "postCategory": tag,
                "postSummarize": summarize,
                "postContent": contentPost
            });
            return reponse.metaData.newPostId;
        } catch (err) {
            throw(err);
        }
    }

    const publishThumnail = async (contentId, thumbnail) => {
        const formData = new FormData();
        formData.append('image', thumbnail);

        try {
            const apiUrl = `${apiDomain}/v1/api/upload/image?topic=thumnail&postId=${contentId}`;
            await callPostApiWithoutToken(apiUrl, formData)
        } catch (err) {
            throw(err);
        }
    }

    const handleClosePublish = () => {
        setShowPublishPopup(false);
    }

    const handleChooseTopics = (event) => {
        setTopicPost(event.target.value);
        handleTimePost()
    };

    const updateTitlePost = (event) => {
        setTitlePost(event.target.value)
    }

    const UpdateSummaryPost = (event) => {
        setSummaryPost(event.target.value);
    }

    const changeHandler = async (e) => {
        const thumnail = e.target.files[0];
        const formData = new FormData();
        formData.append('image', thumnail);

        try {
            const apiUrl = `${apiDomain}/v1/api/upload/image?topic=content`;
            const newThumnail = await callPostApiWithoutToken(apiUrl, formData);
            setThumnailPost(newThumnail.metaData);
        } catch (err) {
            console.log(err);
        }
    }

    const handleTimePost = () => {
        const currentDate = moment();
        var dateObj = currentDate.format("MMM Do YY");
        setCurrentTime(dateObj)
    }

    useEffect(() => {
        const contentPostJson = JSON.parse(contentPost);

        if (contentPostJson === null) return;
        // Update Title
        const title = contentPostJson?.title;
        setTitlePost(title ? title : '');
        const blocks = contentPostJson?.content?.blocks;

         // Update Summary
         const paragraph = blocks.find((element) => element.type === 'paragraph');
         const text = paragraph?.data.text;
         setSummaryPost(text ? text : '')

        // Update Thumnail
        const images = blocks.find((element) => element.type === 'image');
        const url = images?.data.file.url;
        setThumnailPost(url ? url : '/account-logo.png');

    }, [contentPost])

    useEffect(() => {
        var avatar = useProfile?.AvatarUrl;
        var userName = useProfile?.userName;
        setAvatar(avatar);
        setUserName(userName);
    }, [useProfile])

    return (
        <div className='publish-container'>
            <div className='publish-form'>
                <div className='close-btn-component' onClick={handleClosePublish}>
                    <i class="fas fa-times"></i>
                </div>
                <div className='form-component'>
                    <div className='review-component'>
                        <div className='story-review'>
                            <div className='title-text'>Story Review</div>
                        </div>
                        <div className='author-review'>
                            <img src={avatar !== null ? avatar : "/account-logo.png"} alt=''></img>
                            <div className='title-text'>{userName !== null ? userName : "Amonyus"}</div>
                        </div>
                        <div className='content-review'>
                            <div className='summary-review'>
                                <div className='title-post sub-title-text'>
                                    {titlePost}
                                </div>
                                <div className='summary-post content-text'>
                                    {summaryPost}
                                </div>
                            </div>
                            <div className='thumnail-review'>
                                <img src={thumbnailPost} alt=''></img>
                            </div>
                        </div>
                        {
                            topicPost !== '' &&
                            <div className='tag-review'>
                                <div className='tag tag-text'>{topicPost}</div>
                                <div className='time tag-text'>{currentTime}</div>
                            </div>
                        }
                        
                    </div>
                    <div className='input-component'>
                        <div className='author-input'>
                            <div className='content-text'>Publishing to:</div>
                            <div className='content-text'>
                                <b>{userName !== null ? userName : "Amonyus"}</b>
                            </div>
                        </div>
                        <div className='title-input'>
                            <div className='title content-text'>Add or change your title post</div>
                            <div className='input'>
                                <textarea
                                    placeholder="Your Title ..."
                                    value={titlePost}
                                    onChange={updateTitlePost}
                                />
                            </div>
                        </div>
                        {
                            displayError.title === true &&
                            <div className='title content-text err'>Please add your title post</div>
                        }
                        <div className='summary-input'>
                            <div className='title content-text'>
                                Add or change summary (about 100 words)
                            </div>
                            <div className='input'>
                                <textarea
                                    placeholder="Your Summary ..."
                                    value={summaryPost}
                                    onChange={UpdateSummaryPost}
                                />
                            </div>
                        </div>
                        {
                            displayError.summarize === true &&
                            <div className='title content-text err'>Please add your summary post</div>
                        }
                        <div className='tag-input'>
                            <div className='title content-text'>Choose topic of your post:</div>
                            <div className='select'>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Topics</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={topicPost}
                                            label="Age"
                                            onChange={handleChooseTopics}
                                        >
                                            <MenuItem value={'GIS'}>GIS</MenuItem>
                                            <MenuItem value={'Food'}>Food</MenuItem>
                                            <MenuItem value={'Sport'}>Sport</MenuItem>
                                            <MenuItem value={'Travel'}>Travel</MenuItem>
                                            <MenuItem value={'Technologies'}>Technologies</MenuItem>
                                            <MenuItem value={'Others'}>Others</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                        </div>
                        {
                            displayError.topic === true &&
                            <div className='title content-text err'>Please select your topic post</div>
                        }
                         <div className='upload-file-input'>
                            <div className='title content-text'>Update thumbnail for your post:</div>
                            <div className='input'>
                                <input type="file" id="actual-btn" hidden onChange={changeHandler}/>
                                <label className='upload-file-btn' for="actual-btn">
                                    <i class="fas fa-cloud-upload-alt"></i>
                                </label>
                            </div>
                        </div>
                        <div className='submit-btn'>
                            <div className='btn content-text' onClick={onSubmit}>
                                Publish now
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PublishForm