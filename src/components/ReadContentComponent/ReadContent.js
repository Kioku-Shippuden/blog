import React, {useState, useEffect, useRef} from 'react'
import EditorJS from '@editorjs/editorjs';
import { useParams } from 'react-router-dom';
import useUserProfile from '../../hook/useUserProfile';
import Configuration from '../../helpers/editor_configuration';
import { callGetApiWithoutToken, callPutApiWithoutToken } from '../../helpers/request';
import './ReadContent.scss'

const apiDomain = process.env.REACT_APP_API_DOMAIN;

function ReadContent() {
    const params = useParams();
    const textareaRef = useRef();
    const userProfile = useUserProfile();
    const userId = userProfile?.userId;
    const [text, setText] = useState('');
    const [editor, setEditor] = useState(null);
    const [content, setContent] = useState('');
    const [titlePost, setTitlePost] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [categoryPost, setCategoryPost] = useState('');
    const [postAuthorId, setPostAuthorId] = useState(null);
    const [showSaveIcon, setShowSaveIcon] = useState(false);
    const [showEditIcon, setShowEditIcon] = useState(false);

    const getPostInfo = async () => {
        try {
            const apiUrl = `${apiDomain}/v1/api/post/read/${params.post_id}`;
            const reponse = await callGetApiWithoutToken(apiUrl);

            const postAuthor = reponse.metaData.userId;
            const postCategory = reponse.metaData.categroryName;
            const jsonData = JSON.parse(reponse.metaData.content);

            setText(jsonData.title);
            setPostAuthorId(postAuthor);
            setTitlePost(jsonData.title);
            setContent(jsonData.content);
            setCategoryPost(postCategory);
        } catch (err) {
            console.log(err)
        }
    };

    const onEditPost = () => {
        setIsReadOnly(false);
        setShowEditIcon(false);
        setShowSaveIcon(true);
    }

    const rePublishPost = async (postContent) => {
        try {
            const apiUrl = `${apiDomain}/v1/api/post/edit/${params.post_id}?statusEdit=publish&sharePermission=public`;
            const body = {
                "postContent": postContent
            }
            await callPutApiWithoutToken(apiUrl, body);
            getPostInfo();
        } catch (err) {
            alert("Something When Wrong !");
        }
    }

    const onSaveEditPost = () => {
        setIsReadOnly(true);
        setShowEditIcon(true);
        setShowSaveIcon(false);

        editor.save().then((outputData) => {
            let postJson = {
              "title" : titlePost,
              "content": outputData
            }
            let postString = JSON.stringify(postJson);
            rePublishPost(postString);
            }).catch((error) => {
            console.log('Saving failed: ', error)
        });
    }

    const handleTitleChange = (e) => {
        const textarea = textareaRef.current;
        setText(e.target.value);
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    
        setTitlePost(e.target.value);
    };

    useEffect(() => {
        const editor = new EditorJS(Configuration(true, content));
        setEditor(editor);
    }, [content])

    useEffect(() => {
        const initEditor = async () => {
            if (editor) {
              await editor.isReady;
              editor.destroy();
            }
      
            const newEditor = new EditorJS(Configuration(isReadOnly, content));
      
            setEditor(newEditor);
          };
      
          initEditor();
    }, [isReadOnly])

    useEffect(() => {
        getPostInfo();
    }, []);

    useEffect(() => {
        if (userId === postAuthorId) {
            setShowEditIcon(true);
        }
    }, [userId, postAuthorId])

    return (
        <div className='read-content'>
            <div className='title-post'>
                {
                    isReadOnly === true
                    ?
                    titlePost
                    :
                    <textarea 
                        ref={textareaRef}
                        value={text}
                        type='text' 
                        placeholder='Title' 
                        onChange={handleTitleChange}
                    />
                }
            </div>
            <div className='author-post'>
                <div className='author-post'>
                    <div className='element'>
                        <img src={(userProfile !== null && userProfile.AvatarUrl !== null) ? userProfile.AvatarUrl : '/account-logo.png'} alt='' />
                    </div>
                    <div className='element'>
                        <div className='element-child content-text'>{userProfile?.userName}</div>
                    </div>
                    <div className='element'>
                        <div className='element-child sub-title-text' style={{color: "green"}}>Follow</div>
                    </div>
                </div>
                <div className='post-action'>
                    <div className='element'>
                        <div className='element-child content-text'>
                            <i class="fal fa-fire-alt"></i>
                        </div>
                        <div className='element-child content-text'>
                            <i class="fal fa-comment"></i>
                        </div>
                    </div>
                    <div className='element'>
                        <div className='element-child'>
                            <i class="far fa-bookmark"></i>
                        </div>
                        {
                            showEditIcon === true &&
                            <div className='element-child' onClick={onEditPost}>
                                <i class="fal fa-edit"></i>
                            </div>
                        }
                        {
                            showSaveIcon === true &&
                            <div className='element-child' onClick={onSaveEditPost}>
                                <i class="fal fa-cloud-upload-alt"></i>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className='content-post'>
                <div id="editorjs" />
            </div>
        </div>
    )
}

export default ReadContent