
import { useReducer, useCallback, useEffect, useRef } from 'react';
import { evaluateExpression, formatValue } from '../utils/calculatorLogic';

interface HistoryItem {
  formula: string;
  result: string;
}

export interface State {
  expression: string;
  result: string;
  formula: string;
  isError: boolean;
  overwrite: boolean;
  isScientific: boolean;
  isRadians: boolean;
  memoryValue: number;
  history: HistoryItem[];
}

type Action =
  | { type: 'INPUT'; payload: string }
  | { type: 'CLEAR_ENTRY' }
  | { type: 'CLEAR_ALL' }
  | { type: 'EQUALS' }
  | { type: 'TOGGLE_SCIENTIFIC' }
  | { type: 'TOGGLE_UNITS' }
  | { type: 'MEMORY'; payload: 'M+' | 'M-' | 'MR' | 'MC' }
  | { type: 'RECALL_HISTORY'; payload: HistoryItem };

const initialState: State = {
  expression: '0',
  result: '',
  formula: '',
  isError: false,
  overwrite: false,
  isScientific: true,
  isRadians: true,
  memoryValue: 0,
  history: [],
};

function reducer(state: State, action: Action): State {
  if (state.isError && !['CLEAR_ALL', 'TOGGLE_SCIENTIFIC'].includes(action.type)) {
     if (action.type === 'INPUT') return reducer({ ...initialState, isScientific: state.isScientific, isRadians: state.isRadians, history: state.history, memoryValue: state.memoryValue }, action);
     return state;
  }

  switch (action.type) {
    case 'INPUT': {
      let val = action.payload;
      let newExpr = state.expression;
      let newOverwrite = state.overwrite;

      if (val === 'Sign') {
          if (newExpr === '0') return state;
          newExpr = newExpr.startsWith('-') ? newExpr.slice(1) : '-' + newExpr;
      } else if (val === '.') {
          if (newOverwrite) { newExpr = '0.'; newOverwrite = false; }
          else if (!newExpr.split(/[+\-*/^()!]/).pop()?.includes('.')) newExpr += '.';
      } else if (/[0-9]/.test(val)) {
          if (newExpr === '0' || newOverwrite) newExpr = val;
          else newExpr += val;
          newOverwrite = false;
      } else {
          // Operators and Functions
          if (newOverwrite) newOverwrite = false;
          if (newExpr === '0' && ['sin(', 'cos(', 'tan(', 'log(', 'ln(', 'abs(', 'sqrt('].includes(val)) newExpr = val;
          else newExpr += val;
      }

      return { ...state, expression: newExpr, overwrite: newOverwrite };
    }

    case 'EQUALS': {
        const res = evaluateExpression(state.expression, state.isRadians);
        if (res === 'ERR') return { ...state, isError: true, result: 'ERR', overwrite: true };
        
        const formatted = formatValue(res);
        const newHistory = { formula: state.expression + ' =', result: formatted };
        return { 
            ...state, 
            result: formatted, 
            expression: formatted, 
            formula: state.expression + ' =', 
            overwrite: true,
            history: [newHistory, ...state.history].slice(0, 20)
        };
    }

    case 'MEMORY': {
        const val = evaluateExpression(state.expression, state.isRadians);
        const current = val === 'ERR' ? 0 : val;
        switch (action.payload) {
            case 'M+': return { ...state, memoryValue: state.memoryValue + current, overwrite: true };
            case 'M-': return { ...state, memoryValue: state.memoryValue - current, overwrite: true };
            case 'MR': return { ...state, expression: formatValue(state.memoryValue), overwrite: true };
            case 'MC': return { ...state, memoryValue: 0 };
            default: return state;
        }
    }

    case 'CLEAR_ENTRY': {
        if (state.overwrite) return { ...state, expression: '0', formula: '', overwrite: false };
        let newExpr = state.expression.length > 1 ? state.expression.slice(0, -1) : '0';
        if (newExpr === '') newExpr = '0';
        return { ...state, expression: newExpr };
    }

    case 'CLEAR_ALL': return { ...initialState, isScientific: state.isScientific, isRadians: state.isRadians, history: state.history, memoryValue: state.memoryValue };
    case 'TOGGLE_SCIENTIFIC': return { ...state, isScientific: !state.isScientific };
    case 'TOGGLE_UNITS': return { ...state, isRadians: !state.isRadians };
    case 'RECALL_HISTORY': return { ...state, expression: action.payload.result, formula: '', overwrite: true };
    
    default: return state;
  }
}

export function useCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const audioCtx = useRef<AudioContext | null>(null);

  const playClick = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (!audioCtx.current) audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    const ctx = audioCtx.current;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }, []);

  const handleInput = useCallback((val: string) => {
    playClick();
    if (val === 'Enter' || val === '=') dispatch({ type: 'EQUALS' });
    else if (val === 'AC' || val === 'Escape') dispatch({ type: 'CLEAR_ALL' });
    else if (val === 'C' || val === 'Backspace') dispatch({ type: 'CLEAR_ENTRY' });
    else if (['M+', 'M-', 'MR', 'MC'].includes(val)) dispatch({ type: 'MEMORY', payload: val as any });
    else {
        // Map UI labels or keyboard keys to internal expression markers
        let payload = val;
        if (val === '×' || val === '*') payload = '*';
        if (val === '÷' || val === '/') payload = '/';
        if (val === '−') payload = '-';
        if (val === 'x²') payload = '^2';
        if (val === 'x^y') payload = '^';
        if (['sin', 'cos', 'tan', 'log', 'ln', 'abs', 'sqrt'].includes(val)) payload += '(';
        
        dispatch({ type: 'INPUT', payload });
    }
  }, [playClick]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (/[0-9.+-/*^()!%]/.test(key)) handleInput(key);
      else if (key === 'Enter') handleInput('=');
      else if (key === 'Backspace') handleInput('Backspace');
      else if (key === 'Escape') handleInput('Escape');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInput]);

  return {
    ...state,
    displayValue: state.expression,
    handleInput,
    toggleScientific: () => { playClick(); dispatch({ type: 'TOGGLE_SCIENTIFIC' }); },
    toggleUnits: () => { playClick(); dispatch({ type: 'TOGGLE_UNITS' }); },
    recallHistory: (item: HistoryItem) => { playClick(); dispatch({ type: 'RECALL_HISTORY', payload: item }); },
  };
}
