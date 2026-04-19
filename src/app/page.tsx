
'use client';

import React, { useState } from 'react';
import Display from '@/components/Display';
import Keypad from '@/components/Keypad';
import HistoryDrawer from '@/components/HistoryDrawer';
import ThemeSelector from '@/components/ThemeSelector';
import HelpOverlay from '@/components/HelpOverlay';
import { useCalculator } from '@/hooks/useCalculator';

export default function Home() {
  const { 
    displayValue, formula, operator, isError, isScientific, isRadians,
    memoryValue, history,
    handleInput, toggleScientific, toggleUnits, recallHistory 
  } = useCalculator();

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  return (
    <main className="layout">
      <HelpOverlay />
      
      {/* Background Decor */}
      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', pointerEvents: 'none', zIndex: 1 }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.02em' }}>
            Ultimate <span style={{ color: 'var(--accent)' }}>Scientific</span> Calculator
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
            A professional-grade mathematical engine with PEMDAS logic, 
            multi-theme support, and persistent calculation history.
        </p>
      </div>

      {/* History Drawer */}
      <HistoryDrawer 
        history={history} 
        isOpen={isHistoryOpen} 
        onRecall={(item) => {
            recallHistory(item);
            setIsHistoryOpen(false);
        }}
      />

      {/* Main Calculator Body */}
      <div className={`calculator ${isScientific ? 'scientific' : ''}`}>
        <Display 
            value={displayValue} 
            formula={formula} 
            isError={isError} 
            memoryActive={memoryValue !== 0}
            unit={isRadians ? 'rad' : 'deg'}
        />
        
        <Keypad 
          onInput={handleInput} 
          onToggleUnits={toggleUnits}
          activeOperator={operator} 
          isScientific={isScientific} 
          isRadians={isRadians}
        />

        <div className="controls-footer">
            <div 
                className="toggle-container" 
                onClick={toggleScientific}
                title="Switch to Scientific Mode"
            >
                <div className="toggle-switch">
                    <div className="toggle-thumb" />
                </div>
                <span className="toggle-label" style={{ fontSize: '0.75rem', fontWeight: 600 }}>Scientific</span>
            </div>

            <button 
                className="btn" 
                style={{ height: '32px', fontSize: '0.75rem', padding: '0 12px', background: 'var(--btn-default)' }}
                onClick={() => setIsHistoryOpen(!isHistoryOpen)}
            >
                {isHistoryOpen ? 'Close History' : 'View History'}
            </button>

            <ThemeSelector />
        </div>
      </div>
    </main>
  );
}
