'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import SignatureCanvas from 'react-signature-canvas';

const WaiverPage = () => {
  const sigCanvas = useRef<any>();
  const router = useRouter();
  const [signature, setSignature] = useState<string | null>(null);

  // Just a placeholder for now, this string should be supplied by the organization.
  const waiverText = "Waiver for activity, how long can this be? ";


  const clearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      setSignature(null);
    }
  };

  const saveSignature = () => {
    if (sigCanvas.current) {
      const dataUrl = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
      setSignature(dataUrl);
    }
  };

  const submitWaiver = async () => {
    if (!signature) {
      alert('Please provide your signature first.');
      return;
    }

    const waiver = {
      signature: signature,
      waiverText: waiverText,
    };

    const res = await fetch('/api/waivers/', {
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
    router.push('/success');
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Waiver</h1>
      <p className="mb-4">{waiverText}</p>
      <SignatureCanvas
        ref={sigCanvas}
        canvasProps={{
          className: 'signature-canvas w-full h-64 border'
        }}
      />
      {signature && <img src={signature} alt="Signature" className="mt-4" />}
      <button onClick={clearSignature} className="mt-4 mr-2 py-2 px-4 rounded bg-blue-500 text-white">Clear</button>
      <button onClick={saveSignature} className="mt-4 mr-2 py-2 px-4 rounded bg-blue-500 text-white">Save</button>
      <button onClick={submitWaiver} className="mt-4 py-2 px-4 rounded bg-blue-500 text-white">Submit</button>
    </div>
  );
};

export default WaiverPage;

