import React, { useState, useRef } from 'react'
import { callPostApiWithoutToken } from '../../helpers/request';
import './PublishForm.scss';


function PublishForm(props) {
    const { contentPost, setShowPublishPopup } = props;

    const tagPostRef = useRef(null);
    const titlePostRef = useRef(null);
    const sumarizePostRef = useRef(null);
    const thumbnailPostRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const [displayError, setDisplayError] = useState({
		title: false,
        tag: false,
		summarize: false,
        thumbnail: false,
	});

    const changeHandler = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const validationForm = (title, tag, summarize, thumbnail) => {
		const validated = {
            tag: tag.length <= 0,
            title: title.length <= 0,
            summarize: summarize.length <= 0,
            thumbnail: !thumbnail,
        };
  
        return validated;
	}

    const onSubmit = () => {
        const title = titlePostRef.current.value;
        const tag = tagPostRef.current.value;
        const summarize = sumarizePostRef.current.value;
        const thumbnail = thumbnailPostRef.current.value;
        const validated = validationForm( title, tag, summarize, thumbnail);
    
        if (Object.values(validated).some(error => error)) {
            setDisplayError(validated)
            return;
        }
    
        handlePublishPost(title, tag, summarize, contentPost, selectedFile);
        setShowPublishPopup(false);
    }

    const handlePublishPost = async (title, tag, summarize, contentPost, thumbnail) => {
        if (contentPost === ' return') return;
    
        let contentId = await publishContent(title, tag, summarize, contentPost);
        await publishThumnail(contentId, thumbnail);
        
    }

    const publishContent = async (title, tag, summarize, contentPost) => {
        try {
            const apiUrl = 'http://localhost:3000/v1/api/post/publish';
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
            const apiUrl = 'http://localhost:3000/v1/api/upload/image?topic=thumnail&postId=' + contentId;
            await callPostApiWithoutToken(apiUrl, formData)
        } catch (err) {
            throw(err);
        }
    }

    return (
        <div className='publish-form'>
            <div className='title-form head-text'>
                <p>Confirm Your Story</p>
            </div>
            <div className='body-form'>
                <div className='half-component'>
                    <div className='name title-text'>
                        <p>Title Post:</p>
                    </div>
                    <div className='input'>
                        <input ref={titlePostRef}/>
                    </div>
                </div>
                {
                    displayError.title === true &&
                    <div className='half-err content-text'>Please Type Your Title Post</div>
                }
                <div className='half-component'>
                    <div className='name title-text'>
                        <p>Tag Post:</p>
                    </div>
                    <div className='input'>
                        <input ref={tagPostRef}/>
                    </div>
                </div>
                {
                    displayError.tag === true &&
                    <div className='half-err content-text'>Please Type Your Tag Post</div>
                }
                <div className='single-component'>
                    <div className='title-text'>
                        <p>Summarize:</p>
                    </div>
                    <div className='input'>
                        <textarea ref={sumarizePostRef}/>
                    </div>
                </div>
                {
                    displayError.summarize === true &&
                    <div className='single-err content-text'>Please Type Your Summarize Post</div>
                }
                <div className='single-component'>
                    <div className='title-text'>
                        <p>Thumnail:</p>
                    </div>
                    <div className='input'>
                        <input
                            type="file"
                            id="file"
                            onChange={changeHandler}
                            accept="image/*"
                            ref={thumbnailPostRef}
                        />
                    </div>
                </div>
                {
                    displayError.thumbnail === true &&
                    <div className='single-err content-text'>Please Select Image For Your Thumbnail Post</div>
                }
            </div>
            <div className='footer-form'>
                <div className='submit-btn title-text' onClick={onSubmit}>
                    <p>Publish</p>
                </div>
            </div>
        </div>
    )
}

export default PublishForm