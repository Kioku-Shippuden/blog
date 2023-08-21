import React, { useRef, useMemo } from 'react';
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill';
import './WriteContent.scss';

function WriteContent(props) {
  const { value, setValue } = props;

  const quillRef = useRef();
  const handleInsertImage = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        const formData = new FormData()
        formData.append('image', file)

        const uploadUrl = 'http://localhost:3000/v1/api/upload/image'
        fetch(uploadUrl, {
          method: 'POST',
          body: formData
        })
          .then((response) => response.json())
          .then((data) => {
            const quill = quillRef.current.getEditor()
            const range = quill.getSelection(true)
            quill.insertEmbed(range.index, 'image', data.metaData)
            quill.setSelection(range.index + 1)
          })
          .catch((error) => {
            console.error('Image upload failed:', error)
          })
      }
    }
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        handlers: {
          image: handleInsertImage
        },
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image', 'video']
        ]
      }
    }),
    []
  )
  return (
    <div className='write-content-component'>
      <ReactQuill
        ref={quillRef}
        theme='snow'
        value={value}
        onChange={setValue}
        modules={modules}
        className='write-page-input'
      />
    </div>
  )
}

export default WriteContent