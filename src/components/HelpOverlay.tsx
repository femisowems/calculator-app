
'use client';

import React, { useState } from 'react';

const HelpOverlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { key: '0-9', desc: 'Numbers' },
    { key: '+ - * /', desc: 'Operators' },
    { key: 'Enter', desc: 'Equals' },
    { key: 'ESC', desc: 'Clear All' },
    { key: 'Backspace', desc: 'Delete' },
    { key: '(', desc: 'Open Parenthesis' },
    { key: ')', desc: 'Close Parenthesis' },
    { key: '^', desc: 'Power' },
    { key: '!', desc: 'Factorial' },
  ];

  if (!isOpen) {
    return (
      <button 
        className="btn" 
        style={{ width: '32px', height: '32px', borderRadius: '50%', fontSize: '0.75rem', position: 'absolute', top: '20px', right: '20px', zIndex: 100 }}
        onClick={() => setIsOpen(true)}
      >
        ?
      </button>
    );
  }

  return (
    <div 
      onClick={() => setIsOpen(false)}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '320px',
          background: 'var(--panel-bg)',
          padding: '32px',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--glass-border)'
        }}
      >
        <h2 style={{ marginBottom: '20px', fontSize: '1.25rem' }}>Keyboard Shortcuts</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {shortcuts.map(s => (
            <div key={s.key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
              <kbd style={{ background: 'var(--btn-default)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace' }}>{s.key}</kbd>
              <span style={{ color: 'var(--text-secondary)' }}>{s.desc}</span>
            </div>
          ))}
        </div>
        <button 
          className="btn btn-equals" 
          style={{ width: '100%', marginTop: '32px', height: '40px', fontSize: '0.875rem' }}
          onClick={() => setIsOpen(false)}
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default HelpOverlay;
