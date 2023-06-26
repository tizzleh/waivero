'use client';
import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css'; // import styles

const WaiverTemplatePage = () => {
  const [waiverTemplates, setWaiverTemplates] = useState([]);

  useEffect(() => {
    fetch('/api/waiver')
      .then(response => response.json())
      .then(data => setWaiverTemplates(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Waiver Templates</h1>
      {waiverTemplates.map((waiverTemplate, index) => (
        <div key={index}>
        <div dangerouslySetInnerHTML={{ __html: waiverTemplate.waiverText }} />
          <p>Org ID: {waiverTemplate.orgId}</p>
        </div>
      ))}
    </div>
  );
};

export default WaiverTemplatePage;

