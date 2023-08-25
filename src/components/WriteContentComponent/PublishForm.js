import React, { useState, useRef } from 'react'
import { callPostApiWithoutToken } from '../../helpers/request';
import './PublishForm.scss';


function PublishForm() {
    const tagPostRef = useRef(null);
    const titlePostRef = useRef(null);
    const sumaryPostRef = useRef(null);
    const thumbnailPostRef = useRef(null);

    const [displayError, setDisplayError] = useState({
		title: false,
        tag: false,
		summary: false,
        thumbnail: false,
	});

    const changeHandler = (e) => {
        const { files } = e.target
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
        }
    }

    const validationForm = (title, tag, summary, thumbnail) => {
		const validated = {
            tag: tag.length <= 0,
            title: title.length <= 0,
            summary: summary.length <= 0,
            thumbnail: thumbnail.length <= 0,
        };
  
        return validated;
	}

    const handlePublishPost = async (title, tag, summary, value) => {
        if (value === ' return') return;
    
        let contentId = await publishContent(title, tag, summary, value);
        // await publishThumnail(contentId);
        
    }
      
    const publishContent = async (title, tag, summary, value) => {
        try {
            const apiUrl = 'http://localhost:3000/v1/api/post/publish';
            const reponse = await callPostApiWithoutToken(apiUrl, {
                "postTitle": title,
                "postStatus": "publish",
                "postPermit": "private",
                "postCategory": tag,
                "postContent": value
            });
            return reponse.metaData.newPostId;
        } catch (err) {
            throw(err);
        }
      }
    
    const publishThumnail = async (contentId) => {
        // 
    }

    const onSubmit = () => {
        const title = titlePostRef.current.value;
        const tag = tagPostRef.current.value;
        const summary = sumaryPostRef.current.value;
        const thumbnail = thumbnailPostRef.current.value;
        const validated = validationForm( title, tag, summary, thumbnail);
    
        if (Object.values(validated).some(error => error)) {
            setDisplayError(validated)
            return;
        }
    
        handlePublishPost(title, tag, summary, value);
        setIsPublish(false);
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
                        <p>Summary:</p>
                    </div>
                    <div className='input'>
                        <textarea ref={sumaryPostRef}/>
                    </div>
                </div>
                {
                    displayError.summary === true &&
                    <div className='single-err content-text'>Please Type Your Summary Post</div>
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