'use client';
import { useMemo, useState, useRef } from 'react';
import {
  Editor,
  Transforms,
  createEditor,
  Descendent,
  Element as SlateElement,
 } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, Editable, withReact } from 'slate-react';
import SignaturePad from 'react-signature-canvas';
import { PlusCircle } from "lucide-react"

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'Start typing your waiver here...' }],
  },
];

export default function WaiverCreator() {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState(initialValue);
  const sigCanvas = useRef({});
  const [signatures, setSignatures] = useState([]);

  const addSignature = () => {
    let trimmedSignature = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    setSignatures([...signatures, trimmedSignature]);
    sigCanvas.current.clear();
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="w-2/3 bg-white p-8 rounded shadow">
        <Slate editor={editor} initialValue={value} onChange={newValue => setValue(newValue)}>
         <Toolbar>
        <MarkButton format="bold" icon="format_bold" />
        <MarkButton format="italic" icon="format_italic" />
        <MarkButton format="underline" icon="format_underlined" />
        <MarkButton format="code" icon="code" />
        <BlockButton format="heading-one" icon="looks_one" />
        <BlockButton format="heading-two" icon="looks_two" />
        <BlockButton format="block-quote" icon="format_quote" />
        <BlockButton format="numbered-list" icon="format_list_numbered" />
        <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        <BlockButton format="left" icon="format_align_left" />
        <BlockButton format="center" icon="format_align_center" />
        <BlockButton format="right" icon="format_align_right" />
        <BlockButton format="justify" icon="format_align_justify" />
      </Toolbar>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl">Create your waiver</h2>
            <div className="flex items-center">
              <button
                className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded"
                onClick={addSignature}
              >
                <PlusCircle size={48} className="h-5 w-5 mr-1" />
                Add Signature
              </button>
            </div>
          </div>
          <Editable
            className="mb-4 p-4 border-2 border-gray-300 rounded"
            placeholder="Enter some text..."
          />
        </Slate>

        <div>
        <h1>Sign Below:</h1>
        </div>
        <SignaturePad
          className="border-2 mb-4 border-black-300 rounded"
          ref={sigCanvas}
          canvasProps={{ className: 'signatureCanvas' }}
        />
        <div>
        <br></br>
        <hr></hr>
        </div>


        <div className="mt-4 border-gray-300 rounded">
          {signatures.map((signature, index) => (
            <div key={index} className="mb-2">
              <img src={signature} alt={`signature-${index}`} className="border-2 border-gray-300 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

