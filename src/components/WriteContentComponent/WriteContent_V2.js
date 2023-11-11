import React, { useEffect, useState } from 'react';
import './style/WriteContent.scss';
import EditorJS from '@editorjs/editorjs';
import Configuration from '../../helpers/editor_configuration';

const WriteContent_V2 = (props) => {
  const {editor, setEditor, contentPost} = props;
  const [readOnly, setReadOnly] = useState(true); 

  useEffect(() => {
    const initEditor = async () => {
      var data = {};
      if (editor) {
        await editor.isReady;
        editor.destroy();
      }

      if (contentPost !== null) {
        data = JSON.parse(contentPost).content;
      }
      const newEditor = new EditorJS(Configuration(readOnly, data));

      setEditor(newEditor, contentPost);
    };

    initEditor();
  }, [readOnly]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setReadOnly((prevReadOnly) => !prevReadOnly);
    }, 1500);

    return () => {
      clearTimeout(delay);
    };
  }, []);

  return (
    <div className='write-content-component' style={{fontFamily: 'Times New Roman'}}>
      <div id="editorjs" />
    </div>
  );
};

export default WriteContent_V2;