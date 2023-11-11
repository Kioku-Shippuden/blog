import ImageTool from '@editorjs/image';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import CodeTool from '@rxpm/editor-js-code';
import Underline from '@editorjs/underline';
import { callPostApiWithoutToken } from "./request";

const apiDomain = process.env.REACT_APP_API_DOMAIN;
const Quote = require('@editorjs/quote');
const LinkTool = require('@editorjs/link');
const Marker = require('@editorjs/marker');
const Delimiter = require('@editorjs/delimiter');
const InlineCode = require('@editorjs/inline-code');
const Header = require("editorjs-header-with-alignment");
const Paragraph = require('editorjs-paragraph-with-alignment');
const FontSizeTool = require('editorjs-inline-font-size-tool');


const Configuration = (readOnly, data) => {
  return {
    holder: "editorjs",
    placeholder: 'Let`s write an awesome story!',
    readOnly: readOnly,
    tools: {
      // Header
      header: {
        class: Header,
        config: {
          placeholder: 'Header',
          levels: [1, 2],
          defaultLevel: 1,
          defaultAlignment: 'left'
        },
        toolbox: [
          {
            title: 'Header',
            icon: '<svg fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.25 4a.75.75 0 01.75.75V11h10V4.75a.75.75 0 011.5 0v14.5a.75.75 0 01-1.5 0V12.5H7v6.75a.75.75 0 01-1.5 0V4.75A.75.75 0 016.25 4z"/></svg>',
          }
        ],
        shortcut: 'CMD+SHIFT+H'
      },
      // Code
      code: {
        class: CodeTool,
        config: {
          modes: {
            'js': 'JavaScript',
            'py': 'Python',
            'go': 'Go',
            'cpp': 'C++',
            'cs': 'C#',
            'md': 'Markdown',
          },
          defaultMode: 'js',
        },
        shortcut: 'CMD+SHIFT+C'
      },
      // Image
      image: {
        class: ImageTool,
        config: {
          uploader: {
            async uploadByFile(file) {
              const formData = new FormData();
              formData.append('image', file);

              const apiUrl = `${apiDomain}/v1/api/upload/image?topic=content`;
              const response = await callPostApiWithoutToken(apiUrl, formData);

              if (response.status === 201) {
                return {
                  success: 1,
                  file: {
                    url: response.metaData,
                  },
                  caption: "Add Your Caption",
                  withBorder : false,
                  withBackground : false,
                  stretched : true
                }
              }
            }
          }
        },
        shortcut: 'CMD+SHIFT+I'
      },
      // Quote
      quote: {
        class: Quote,
        inlineToolbar: true,
        config: {
          quotePlaceholder: 'Enter a quote',
          captionPlaceholder: 'Quote\'s author',
        },
        shortcut: 'CMD+SHIFT+Q'
      },
      // Paragraph
      paragraph: {
        class: Paragraph,
        inlineToolbar: true,
        toolbox: [
          {
            title: 'Text',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 9V7.2C8 7.08954 8.08954 7 8.2 7L12 7M16 9V7.2C16 7.08954 15.9105 7 15.8 7L12 7M12 7L12 17M12 17H10M12 17H14"></path></svg>',
          },
        ],
      },
      // List
      list: {
        class: List,
        shortcut: 'CMD+SHIFT+L'
      },
      delimiter: {
        class: Delimiter,
        shortcut: 'CMD+SHIFT+D'
      },
      underline: Underline,
      inlineCode: {
        class: InlineCode,
        shortcut: 'CMD+SHIFT+C'
      },
      table: {
        class: Table,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+T'
      },
      marker: {
        class:  Marker,
        shortcut: 'CMD+SHIFT+M'
      },
      embed: {
        class: Embed,
        config: {
          services: {
            youtube: true,
            coub: true,
            github: true,
            codepen: {
              regex: /https?:\/\/codepen.io\/([^\/\?\&]*)\/pen\/([^\/\?\&]*)/,
              embedUrl: 'https://codepen.io/<%= remote_id %>?height=300&theme-id=0&default-tab=css,result&embed-version=2',
              html: "<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
              height: 300,
              width: 600,
              id: (groups) => groups.join('/embed/')
            }
          }
        }
      },
    },
    data: data
  };
};

export default Configuration;
