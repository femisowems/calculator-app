
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
    displayValue, formula, isError, isScientific, isRadians,
    memoryValue, history,
    handleInput, toggleScientific, toggleUnits, recallHistory 
  } = useCalculator();

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  return (
    <main className="layout">
      <HelpOverlay />
      
      <div className="content-wrapper">
        <header className="page-header">
          <h1 className="main-title">
              Ultimate <span className="accent-text">Scientific</span> Calculator
          </h1>
          <p className="sub-title">
              A professional-grade mathematical engine with PEMDAS logic, 
              multi-theme support, and persistent calculation history.
          </p>
        </header>

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
                  <span className="toggle-label">Scientific</span>
              </div>

              <button 
                  className="btn history-btn" 
                  onClick={() => setIsHistoryOpen(!isHistoryOpen)}
              >
                  {isHistoryOpen ? 'Close History' : 'View History'}
              </button>

              <ThemeSelector />
          </div>
        </div>
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
    </main>
  );
}
