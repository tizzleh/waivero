'use client';
import { useMemo, useState, useRef } from 'react';
import { createEditor, Node } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import SignaturePad from 'react-signature-canvas';
import { PlusCircle } from "lucide-react"

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
        <Slate editor={editor} value={value} onChange={newValue => setValue(newValue)}>
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

        <SignaturePad
          ref={sigCanvas}
          canvasProps={{ className: 'signatureCanvas' }}
        />

        <div className="mt-4">
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

