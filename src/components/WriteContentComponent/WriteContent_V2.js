import React, { useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';
import Configuration from '../../helpers/editor_configuration';
import './style/WriteContent.scss';
const WriteContent_V2 = (props) => {
  const {editor, setEditor} = props;

  useEffect(() => {
    const editor = new EditorJS(Configuration(false, []));
    setEditor(editor);
  }, []);

  return (
    <div className='write-content-component' style={{fontFamily: 'Times New Roman'}}>
      <div id="editorjs" />
    </div>
  );
};

export default WriteContent_V2;