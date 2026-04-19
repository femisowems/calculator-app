
import React from 'react';

interface HistoryItem {
  formula: string;
  result: string;
}

interface HistoryDrawerProps {
  history: HistoryItem[];
  isOpen: boolean;
  onRecall: (item: HistoryItem) => void;
}

const HistoryDrawer: React.FC<HistoryDrawerProps> = ({ history, isOpen, onRecall }) => {
  return (
    <div className={`history-drawer ${isOpen ? 'open' : ''}`}>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>History</h2>
      {history.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>No history yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {history.map((item, index) => (
            <div key={index} className="history-item" onClick={() => onRecall(item)}>
              <div className="history-formula">{item.formula}</div>
              <div className="history-result">{item.result}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryDrawer;
