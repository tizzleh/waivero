'use client';
import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Download } from 'lucide-react';

const SignaturePage = () => {
  const [clickCount, setClickCount] = useState(0);
  const sigCanvas = useRef({});

  const goFullScreen = () => {
    let elem = document.documentElement;
    if (elem.requestFullscreen) {
    elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
    }
  };

  goFullScreen();

  const clear = () => console.log("hello");

  const save = () => {
    console.log("image/png");
    // clear();
  };

  const handleDivClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount >= 4) {
      // Add your logic to close the application here
      console.log('Close the application');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Please sign below</h1>
      <SignatureCanvas
        penColor='black'
        canvasProps={{
          className: 'signature-canvas w-64 h-32 border-2 border-gray-400',
        }}
        ref={sigCanvas}
      />
      <div className="flex mt-4">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg mr-2"
          onClick={clear}
        >
          Clear
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
          onClick={save}
        >
          Save
        </button>
      </div>
      <div onClick={handleDivClick} className="absolute top-0 left-0 w-10 h-10"></div>
    </div>
  );
};

export default SignaturePage;

