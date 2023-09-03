import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { callGetApiWithoutToken } from '../../helpers/request';
import showdown from 'showdown';
import './ReadContent.scss'
function ReadContent() {
    const params = useParams();
    const converter = new showdown.Converter();
    const [content, setContent] = useState(null);

    const handleReadMarkdown = (markdown) => {
        const htmlContent = customMarkdownRenderer(markdown);
        return Promise.resolve(converter.makeHtml(htmlContent));
    };

    const customMarkdownRenderer = (markdown) => {
        const titleRegex = /\[title\] ([^\n]+)/g;
        const imageRegex = /!\[image\]\(([^)]+)\){([^}]*)}/g;
      
        const processedMarkdown = markdown
            .replace(titleRegex, (match, content) => {
                return `<div class='title-component'>
                <p>${content}</p>
                </div>`;
            })
            .replace(imageRegex, (match, src, attributes) => {
                const sizeMatch = attributes.match(/size=([a-zA-Z]+)/);
                const positionMatch = attributes.match(/position=([a-zA-Z]+)/);
                const titleMatch = attributes.match(/title='([a-zA-Z]+)'/);
        
                const customSize = sizeMatch ? `image-${sizeMatch[1]}` : '';
                const customPosition = positionMatch ? `image-positions-${positionMatch[1]}` : '';
                const customTitle = titleMatch ? `${titleMatch[1]}` : '';
        
                return `<div class='image-component ${customPosition}'>
                <img src="${src}" alt="Image" class=" ${customSize}">
                <p class=" ${customSize}">${customTitle}</p>
                </div>`
            });
        return processedMarkdown;
    };

    const getContent = async () => {
        try {
            const apiUrl = 'http://localhost:3000/v1/api/post/read/' + params.post_id;
            const reponse = await callGetApiWithoutToken(apiUrl);
            const contentPost = await handleReadMarkdown(reponse.metaData.content);
            setContent(contentPost);
        } catch (err) {
            throw(err)
        }
    };

    useEffect(() => {
        getContent();
    }, []);

    return (
        <div className='read-content'>
            <div className='post-info'>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    )
}

export default ReadContent