import React, { useState, useEffect } from 'react'
import moment from 'moment';
import './style//PublishForm.scss';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import useUserProfile from '../../hook/useUserProfile';
import { callPostApiWithoutToken } from '../../helpers/request';
  
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
    const [thumbnailTemp, setThumbnailTemp] = useState('');

    const [displayError, setDisplayError] = useState({
        topic: false,
		title: false,
		summarize: false,
	});

    const navigate = useNavigate();

    const validationForm = (title, topic, summarize) => {
		const validated = {
            topic: topic.length <=0 ,
            title: title.length <=0 ,
            summarize: summarize.length <=0 ,
        };
        return validated;
	}

    const updateTitlePublish = (contentPost, title) => {
        var contentJson = JSON.parse(contentPost);
        contentJson.title = title;

        return JSON.stringify(contentJson);
    }

    const onSubmit = () => {
        const title = titlePost;
        const topic = topicPost;
        const summarize = summaryPost;
        const thumbnail = thumbnailPost;
        const validated = validationForm( title, topic, summarize);
        if (Object.values(validated).some(error => error)) {
            setDisplayError(validated)
            return;
        }

        const contentPublish = updateTitlePublish(contentPost, title);
        
        handlePublishPost(title, topic, summarize, contentPublish, thumbnail);
        setShowPublishPopup(false);
    }

    const handlePublishPost = async (title, topic, summarize, contentPost, thumbnail) => {
        if (contentPost === ' return') return;

        try {
            const formData = new FormData();
            const postData = {
                "postTitle": title,
                "postStatus": "publish",
                "postPermit": "private",
                "postCategory": topic,
                "postSummarize": summarize,
                "postContent": contentPost
            }
            formData.append('thumbnail', thumbnail);
            formData.append('postData', JSON.stringify(postData));

            const apiUrl = `${apiDomain}/v1/api/post/publish_v2`;
            await callPostApiWithoutToken(apiUrl, formData);
            navigate('/');
        } catch (err) {
            alert('Upload File Not SucessFull. Please Check Your Information Again!')
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

    const changeThumnailTemp = async (e) => {
        const thumnail = e.target.files[0];
        if (thumnail) {
            const imageUrl = URL.createObjectURL(thumnail);
            setThumnailPost(thumnail);
            setThumbnailTemp(imageUrl);
        }
    }

    const handleTimePost = () => {
        const currentDate = moment();
        var dateObj = currentDate.format("MMM Do YY");
        setCurrentTime(dateObj)
    }

    const convertImageUrlToFile = async (imageUrl, caption) => {
        try {
            const maxSize = 1 * 1024 * 1024;
            const response = await fetch(imageUrl);
            let blob = await response.blob();
    
            if (blob.size > maxSize) {
                blob = blob.slice(0, maxSize, blob.type);
            }
    
            const file = new File([blob], caption, { type: blob.type });
            setThumnailPost(file);
        } catch (error) {
            console.error('Error converting image:', error);
        }
    };

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
        const caption = images?.data.caption;
        convertImageUrlToFile(url, caption);
        setThumbnailTemp(url ? url : '/account-logo.png');

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
                                <img src={thumbnailTemp} alt=''></img>
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
                                <input type="file" id="actual-btn" hidden onChange={changeThumnailTemp}/>
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