import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { callGetApiWithoutToken } from '../../helpers/request';
import './ReadContent.scss'
function ReadContent() {
    const params = useParams();
    const [content, setContent] = useState(null);

    const getContent = async () => {
        try {
            const apiUrl = 'http://localhost:3000/v1/api/post/read/' + params.post_id;
            const reponse = await callGetApiWithoutToken(apiUrl);
            setContent(reponse.metaData.content);
        } catch (err) {
            throw(err)
        }
    }

    useEffect(() => {
        getContent();
    }, []);

    return (
        <div className='read-content'>
            <div className='content' dangerouslySetInnerHTML={{__html : content}}></div>
        </div>
    )
}

export default ReadContent