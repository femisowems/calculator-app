
import React from 'react';

import CopyButton from './CopyButton';

interface DisplayProps {
  value: string;
  formula: string;
  isError: boolean;
  memoryActive: boolean;
  unit: 'deg' | 'rad';
}

const Display: React.FC<DisplayProps> = ({ value, formula, isError, memoryActive, unit }) => {
  const isLong = value.length > 6;

  return (
    <div className="display" aria-live="polite">
      <CopyButton text={value} />
      <div className="display-indicators">
        <span>{unit.toUpperCase()}</span>
        {memoryActive && <span>M</span>}
      </div>
      <div className="display-history">
        {formula}
      </div>
      <div className={`display-main ${isError ? 'display-error' : ''} ${isLong ? 'long' : ''}`}>
        {value}
      </div>
    </div>
  );
};

export default Display;
