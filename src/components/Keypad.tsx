
import React from 'react';
import Button from './Button';

interface KeypadProps {
  onInput: (val: string) => void;
  onToggleUnits: () => void;
  activeOperator: string | null;
  isScientific: boolean;
  isRadians: boolean;
}

const Keypad: React.FC<KeypadProps> = ({ onInput, onToggleUnits, activeOperator, isScientific, isRadians }) => {
  const basicKeys = [
    { label: 'AC', type: 'control' },
    { label: 'C', type: 'control' },
    { label: '%', type: 'control' },
    { label: '÷', type: 'operator', value: '/' },
    
    { label: '7', type: 'digit' },
    { label: '8', type: 'digit' },
    { label: '9', type: 'digit' },
    { label: '×', type: 'operator', value: '*' },
    
    { label: '4', type: 'digit' },
    { label: '5', type: 'digit' },
    { label: '6', type: 'digit' },
    { label: '−', type: 'operator', value: '-' },
    
    { label: '1', type: 'digit' },
    { label: '2', type: 'digit' },
    { label: '3', type: 'digit' },
    { label: '+', type: 'operator', value: '+' },
    
    { label: '+/-', type: 'control', value: 'Sign' },
    { label: '0', type: 'digit' },
    { label: '.', type: 'digit' },
    { label: '=', type: 'equals' },
  ];

  const scientificKeys = [
    { label: '(', type: 'scientific' },
    { label: ')', type: 'scientific' },
    { label: isRadians ? 'rad' : 'deg', type: 'control', value: 'toggle_units' },

    { label: 'sin', type: 'scientific' },
    { label: 'cos', type: 'scientific' },
    { label: 'tan', type: 'scientific' },
    
    { label: 'yˣ', type: 'scientific', value: 'x^y' },
    { label: 'x²', type: 'scientific' },
    { label: 'n!', type: 'scientific', value: '!' },

    { label: 'log', type: 'scientific' },
    { label: 'ln', type: 'scientific' },
    { label: 'sqrt', type: 'scientific', value: 'sqrt' },

    { label: 'π', type: 'scientific', value: 'PI' },
    { label: 'e', type: 'scientific', value: 'E' },
    { label: 'MR', type: 'control' },
  ];

  return (
    <div className="keypad-container">
      {isScientific && (
        <div className="keypad scientific-grid">
          {scientificKeys.map((key) => (
            <Button
              key={key.label}
              label={key.label}
              type={key.type as any}
              onClick={() => key.value === 'toggle_units' ? onToggleUnits() : onInput(key.value || key.label)}
            />
          ))}
        </div>
      )}
      <div className="keypad">
        {basicKeys.map((key) => (
          <Button
            key={key.label}
            label={key.label}
            type={key.type as any}
            isActive={activeOperator === (key.value || key.label)}
            onClick={() => onInput(key.value || key.label)}
          />
        ))}
      </div>
    </div>
  );
};

export default Keypad;
