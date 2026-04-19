
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: (val: string) => void;
  type?: 'digit' | 'operator' | 'control' | 'equals' | 'scientific';
  isActive?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type = 'digit', isActive = false }) => {
  const className = `btn btn-${type} ${isActive ? 'btn-active' : ''}`;
  
  return (
    <button className={className} onClick={() => onClick(label)}>
      {label}
    </button>
  );
};

export default Button;
