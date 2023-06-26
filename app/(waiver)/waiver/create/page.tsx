'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles

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

const WaiverPage = () => {
  const router = useRouter();
  const quillRef = useRef<ReactQuill | null>(null); // Reference to Quill instance
  const [waiverText, setWaiverText] = useState('');
  const [previewHtml, setPreviewHtml] = useState('');

  // Set some default text using Quill's setContents method
  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      // Set default content, this should be retrieved from the database
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

  const handleClick = async (action: 'submit' | 'clear' | 'preview') => {
    if (action === 'clear') {
      if (quillRef.current) {
        const quill = quillRef.current.getEditor();
        const length = quill.getLength();
        quill.deleteText(0, length);
        setWaiverText('');
      }
    } else if (action === 'submit') {
      const waiver = {
        waiverText: waiverText,
        orgId: 420,
      };

      // const res = await fetch('/api/org/waiver/create', {
      const res = await fetch('/api/create-waiver', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(waiver),
      });

      if (!res.ok) {
        throw new Error('Error saving waiver');
      }

      const data = await res.json();
      console.log(data);
      // Let's go to the success page after saving the waiver
      router.push('/success');
    } else if (action === 'preview') {
      if (quillRef.current) {
        const quill = quillRef.current.getEditor();
        const length = quill.getLength();
        const previewHtml = quill.root.innerHTML;
        setPreviewHtml(previewHtml);
      }
    }
  };

  const closePreview = () => {
    setPreviewHtml('');
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Waiver</h1>
      <ReactQuill
        theme="snow"
        value={waiverText}
        onChange={setWaiverText}
        modules={modules}
        className="mb-4"
        ref={quillRef}
      />
      <button onClick={() => handleClick('clear')} className="mt-4 mr-2 py-2 px-4 rounded bg-blue-500 text-white">Clear</button>
      <button onClick={() => handleClick('submit')} className="mt-4 py-2 px-4 rounded bg-blue-500 text-white">Submit</button>
      <button onClick={() => handleClick('preview')} className="mt-4 ml-2 py-2 px-4 rounded bg-blue-500 text-white">Preview</button>
  {previewHtml &&
        <div
          className="mt-8 border p-4"
          style={{width: '8.27in', minHeight: '11.7in', overflowY: 'auto'}}
        >
          <X onClick={closePreview} className="cursor-pointer" size={24} />
          <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
        </div>
      }
    </div>
  );
};

export default WaiverPage;

