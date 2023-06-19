import React, { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles

export interface QuillEditorProps {
  value: string;
  onChange: (content: string) => void;
}

// Quill modules to attach to editor
const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  const quillRef = useRef<ReactQuill | null>(null); // Reference to Quill instance

  // Set some default text using Quill's setContents method
  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      const defaultContent = [
        { insert: 'WAIVER AND RELEASE OF LIABILITY, ASSUMPTION OF RISK AND INDEMNITY AGREEMENT\n', attributes: { bold: true, size: 'large'} },
        { insert: '\nI, the undersigned, hereby acknowledge that I have voluntarily chosen to participate in the following activities:\n' },
        { insert: '\nActivity 1, Activity 2, Activity 3\n' },
        { insert: '\nI am aware that these activities subject me to physical risks and dangers. Notwithstanding the aforementioned risks and dangers, I wish to proceed and I freely accept and expressly assume all risk, dangers and hazards that may arise from such activities which could result in personal injury, loss of life and property damage to me.\n'},
        { insert: '\nI hereby release the Organization, its officers, directors, employees, representatives and volunteers from all liability for personal injury, loss of life and property damage arising from my participation in these activities.\n'},
      ];
      quill.setContents(defaultContent);
    }
  }, []);

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      ref={quillRef}
    />
  );
};

export { QuillEditor };

