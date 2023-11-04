import { useState, useRef, Fragment } from 'react';
import { callPostApiWithoutToken } from '../../helpers/request';
import { styled } from '@mui/material/styles';
import ReactMde from "react-mde";
import Box from '@mui/material/Box';
import showdown from 'showdown';
import CodeIcon from '@mui/icons-material/Code';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import TitleSharpIcon from '@mui/icons-material/TitleSharp';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import TextDecreaseIcon from '@mui/icons-material/TextDecrease';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import AddPhotoAlternateSharpIcon from '@mui/icons-material/AddPhotoAlternateSharp';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import "react-mde/lib/styles/css/react-mde-all.css";
import 'react-quill/dist/quill.snow.css'
import './style/WriteContent.scss';

const apiDomain = process.env.REACT_APP_API_DOMAIN
const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(2),
    left: theme.spacing(1),
  },
}));

function WriteContent(props) {
  const {value, setValue} = props;
  const fileInputRef = useRef(null);
  const [selectedTab, setSelectedTab] = useState("write");
  const [positionBox, setPositionBox] = useState(0);
  const converter = new showdown.Converter();
  
  // Generate Markdown Preview
  const generateMarkdownPreview = (markdown) => {
    const htmlContent = customMarkdownRenderer(markdown);
    return Promise.resolve(converter.makeHtml(htmlContent));
  }

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

  // Handle Add Title
  const addTitleMarkdown = () => {
    const updatedMarkdown = `${value}\n[title] New Title`;
    setValue(updatedMarkdown);
  }

  // Handle Add Image
  const addImageMarkdown = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        const apiUrl = `${apiDomain}/v1/api/upload/image?topic=content`;
        const res = await callPostApiWithoutToken(apiUrl, formData);
        generateImage(res.metaData);
      } catch (err) {
        console.log(err);
      }
    }
  }

  const generateImage = (linkImage) => {
    const imageMarkdown = `![image](${linkImage}){position=center size=medium title=''}`;
    const updatedMarkdown = `${value}\n\n${imageMarkdown}`;
    setValue(updatedMarkdown);
  };

  // Handle Add Code
  const addCodeMarkdown = () => {
    const codeMarkdown = "```\n// Your code here\n```";
    const updatedMarkdown = `${value}\n\n${codeMarkdown}`;
    setValue(updatedMarkdown);
  }

  // Handle Change Size Image
  const changeImageSize = (option) => {
    const selectedText = window.getSelection().toString().trim();
  
    if (selectedText.startsWith('![image](')) {
      const updatedText = selectedText.replace(/size=(\w+)/, (match, size) => {
        return `size=${option}`;
      });
      const updatedValue = value.replace(selectedText, updatedText);
      setValue(updatedValue);
    }
  };

  // Handle Change Position Image
  const changeImagePosition = (option) => {
    const selectedText = window.getSelection().toString().trim();
  
    if (selectedText.startsWith('![image](')) {
      const updatedText = selectedText.replace(/position=(\w+)/, (match, position) => {
        return `position=${option}`
      });
      const updatedValue = value.replace(selectedText, updatedText);
      setValue(updatedValue);
    }
  };

  const actions = [
    { icon: <TitleSharpIcon />, name: 'Add title', onClick: () => addTitleMarkdown()},
    { icon: <AddPhotoAlternateSharpIcon />, name: 'Add Image', ref: fileInputRef},
    { icon: <KeyboardDoubleArrowLeftIcon />, name: 'Set Image Left', onClick: () => changeImagePosition('left')},
    { icon: <CenterFocusStrongIcon />, name: 'Set Image Center', onClick: () => changeImagePosition('center') },
    { icon: <KeyboardDoubleArrowRightIcon />, name: 'Set Image Right', onClick: () => changeImagePosition('right')},
    { icon: <TextDecreaseIcon />, name: 'Set Small Size', onClick: () => changeImageSize('small')},
    { icon: <FontDownloadIcon />, name: 'Set Medium Size', onClick: () => changeImageSize('medium')},
    { icon: <TextIncreaseIcon />, name: 'Set Large Size', onClick: () => changeImageSize('large')},
    { icon: <CodeIcon />, name: 'Add Code', onClick: () => addCodeMarkdown() },
  ];

  const handleReactMdeClick = (event) => {
    let currentElement = event.target;

    // Check if the clicked element has the class name "mde" or is a descendant of an element with that class
      if (currentElement.classList.contains("mde-text")) {
        const cursorPositionX = event.clientX;
        const cursorPositionY = event.clientY;

        setPositionBox(cursorPositionY);
        console.log("Cursor Position (X, Y):", cursorPositionX, cursorPositionY);
      }
};

const handleKeyDown = (event) => {
  console.log(event)
  if (event.key === 'Enter') {
    // event.preventDefault(); // Prevent the default behavior (line break)
    // const { target } = event;
    // const { selectionStart, selectionEnd } = target;
    // const newText = markdown.slice(0, selectionStart) + '\n' + markdown.slice(selectionEnd);
    // setMarkdown(newText);
  }
};
  
  return (
    <div className='write-content-component'>
      <div className='body-component'>
        <div className='option-component'>
          <div id='tool-box-component' style={{top: `${positionBox}px`}}></div>
          {/* <Box sx={{ position: 'relative', height: '10%' }}>
            <StyledSpeedDial
              ariaLabel="SpeedDial playground example"
              icon={<SpeedDialIcon />}
              direction="right"
            >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipPlacement='bottom-end'
                onClick={() => {
                  if (action.ref && action.name === 'Add Image') {
                    action.ref.current.click();
                  } else {
                    action.onClick();
                  }
                }}
              />
            ))}
            </StyledSpeedDial>
          </Box>
          <input
            type="file"
            accept="image/*"
            onChange={addImageMarkdown}
            style={{
              display: 'none',
            }}
            ref={fileInputRef}
          /> */}
        </div>
        <div className='text-component' onClick={handleReactMdeClick}>
          <ReactMde
            value={value}
            onChange={setValue}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            onKeyDown={handleKeyDown}
            toolbarCommands={[[]]}
            generateMarkdownPreview={generateMarkdownPreview}
          />
        </div>
      </div>
    </div>
  )
}

export default WriteContent