
'use client';

import React, { useState } from 'react';

interface CopyButtonProps {
  text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className={`btn ${copied ? 'btn-active' : ''}`}
      style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        width: '32px',
        height: '32px',
        padding: '0',
        fontSize: '0.75rem',
        zIndex: 20,
        opacity: text === '0' || text === 'ERR' ? 0 : 0.6
      }}
      title="Copy to clipboard"
    >
      {copied ? '✓' : 'Copy'}
    </button>
  );
};

export default CopyButton;
