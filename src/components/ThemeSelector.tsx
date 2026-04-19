
'use client';

import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();
  
  const themes: { id: 'default' | 'nord' | 'cyberpunk' | 'retro'; color: string }[] = [
    { id: 'default', color: '#3b82f6' },
    { id: 'nord', color: '#88c0d0' },
    { id: 'cyberpunk', color: '#ff0055' },
    { id: 'retro', color: '#8b0000' },
  ];

  return (
    <div className="theme-picker">
      {themes.map((t) => (
        <div
          key={t.id}
          className={`theme-dot ${theme === t.id ? 'active' : ''}`}
          style={{ backgroundColor: t.color }}
          onClick={() => setTheme(t.id)}
          title={`Switch to ${t.id} theme`}
        />
      ))}
    </div>
  );
};

export default ThemeSelector;
