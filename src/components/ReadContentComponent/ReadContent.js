import React, {useState, useEffect} from 'react'
import EditorJS from '@editorjs/editorjs';
import { useParams } from 'react-router-dom'
import { callGetApiWithoutToken } from '../../helpers/request';
import Configuration from '../../helpers/editor_configuration';
import './ReadContent.scss'

const apiDomain = process.env.REACT_APP_API_DOMAIN;

function ReadContent() {
    const params = useParams();
    const [content, setContent] = useState(null);
    const [titlePost, setTitlePost] = useState(null);

    useEffect(() => {
        const editor = new EditorJS(Configuration(true, content));
    }, [content])

    const getPostInfo = async () => {
        try {
            const apiUrl = `${apiDomain}/v1/api/post/read/${params.post_id}`;
            const reponse = await callGetApiWithoutToken(apiUrl);
            const jsonData = JSON.parse(reponse.metaData.content);

            setTitlePost(jsonData.title);
            setContent(jsonData.content);
        } catch (err) {
            throw(err)
        }
    };

    useEffect(() => {
        getPostInfo();
    }, []);

    return (
        <div className='read-content'>
            <div className='title-post'>
                {titlePost}
            </div>
            <div className='content-post'>
                <div id="editorjs" />
            </div>
        </div>
    )
}

export default ReadContent