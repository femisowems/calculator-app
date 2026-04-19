
export type Operator = '+' | '-' | '*' | '/' | '^' | '!' | '%' | '(' | ')' | '=' | null;
export type UnaryOperator = 'sqrt' | 'sqr' | 'inv' | 'sin' | 'cos' | 'tan' | 'log' | 'ln' | 'abs';

export const MAX_DIGITS = 8;
export const MAX_DECIMAL_PLACES = 4;

export const formatValue = (value: number | string): string => {
  if (value === "ERR") return "ERR";
  const num = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(num) || !isFinite(num)) return "ERR";

  // Scientific notation for very large/small numbers
  if (Math.abs(num) >= 100000000 || (Math.abs(num) < 0.0001 && num !== 0)) {
    return num.toExponential(4);
  }

  let formatted = num.toString();
  if (formatted.includes('.')) {
    const parts = formatted.split('.');
    if (parts[1].length > MAX_DECIMAL_PLACES) {
      formatted = num.toFixed(MAX_DECIMAL_PLACES);
    }
  }

  // Final trim to ensure display fit
  return formatted.length > 12 ? num.toExponential(2) : formatted;
};

const precedence: Record<string, number> = {
  '+': 2,
  '-': 2,
  '*': 3,
  '/': 3,
  '^': 4,
  'U': 5, // Unary minus
};

const isOperator = (t: string) => ['+', '-', '*', '/', '^'].includes(t);
const isFunction = (t: string) => ['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'abs'].includes(t);

export const factorial = (n: number): number => {
    if (n < 0 || !Number.isInteger(n)) return NaN;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
};

export const evaluateExpression = (expr: string, isRadians: boolean = true): number | "ERR" => {
  try {
    // 1. Tokenize
    const tokens: string[] = [];
    let numberBuffer = "";
    
    // Clean expression and handle implicit multiplication like 2(3) or 5π
    const cleaned = expr
        .replace(/π/g, Math.PI.toString())
        .replace(/e/g, Math.E.toString())
        .replace(/(\d)(\()/g, "$1*(")
        .replace(/(\))(\d)/g, "$1*$2")
        .replace(/(\))(\()/g, "$1*(")
        .replace(/(\d)([a-z])/gi, "$1*$2");

    for (let i = 0; i < cleaned.length; i++) {
        const char = cleaned[i];
        if (/[0-9.]/.test(char)) {
            numberBuffer += char;
        } else {
            if (numberBuffer) {
                tokens.push(numberBuffer);
                numberBuffer = "";
            }
            if (/\s/.test(char)) continue;
            
            // Multi-char functions
            if (/[a-z]/i.test(char)) {
                let func = "";
                while (i < cleaned.length && /[a-z]/i.test(cleaned[i])) {
                    func += cleaned[i];
                    i++;
                }
                i--;
                tokens.push(func);
            } else {
                tokens.push(char);
            }
        }
    }
    if (numberBuffer) tokens.push(numberBuffer);

    // 2. Shunting-Yard to RPN
    const outputQueue: string[] = [];
    const operatorStack: string[] = [];

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (!isNaN(parseFloat(token))) {
            outputQueue.push(token);
        } else if (isFunction(token)) {
            operatorStack.push(token);
        } else if (token === '(') {
            operatorStack.push(token);
        } else if (token === ')') {
            while (operatorStack.length && operatorStack[operatorStack.length - 1] !== '(') {
                outputQueue.push(operatorStack.pop()!);
            }
            operatorStack.pop();
            if (operatorStack.length && isFunction(operatorStack[operatorStack.length - 1])) {
                outputQueue.push(operatorStack.pop()!);
            }
        } else if (isOperator(token)) {
            // Unary Minus Check
            let op = token;
            if (token === '-' && (i === 0 || tokens[i-1] === '(' || isOperator(tokens[i-1]))) {
                op = 'U';
            }
            
            while (operatorStack.length && 
                   operatorStack[operatorStack.length - 1] !== '(' && 
                   precedence[operatorStack[operatorStack.length - 1]] >= precedence[op]) {
                outputQueue.push(operatorStack.pop()!);
            }
            operatorStack.push(op);
        } else if (token === '!') {
            outputQueue.push('!');
        } else if (token === '%') {
            outputQueue.push('%');
        }
    }
    while (operatorStack.length) outputQueue.push(operatorStack.pop()!);

    // 3. Evaluate RPN
    const stack: number[] = [];
    for (const token of outputQueue) {
        if (!isNaN(parseFloat(token))) {
            stack.push(parseFloat(token));
        } else if (token === 'U') {
            stack.push(-stack.pop()!);
        } else if (token === '!') {
            stack.push(factorial(stack.pop()!));
        } else if (token === '%') {
            stack.push(stack.pop()! / 100);
        } else if (isOperator(token)) {
            const b = stack.pop()!;
            const a = stack.pop()!;
            switch (token) {
                case '+': stack.push(a + b); break;
                case '-': stack.push(a - b); break;
                case '*': stack.push(a * b); break;
                case '/': stack.push(b === 0 ? Infinity : a / b); break;
                case '^': stack.push(Math.pow(a, b)); break;
            }
        } else if (isFunction(token)) {
            let val = stack.pop()!;
            if (!isRadians && ['sin', 'cos', 'tan'].includes(token)) {
                val = (val * Math.PI) / 180;
            }
            switch (token) {
                case 'sin': stack.push(Math.sin(val)); break;
                case 'cos': stack.push(Math.cos(val)); break;
                case 'tan': stack.push(Math.tan(val)); break;
                case 'log': stack.push(Math.log10(val)); break;
                case 'ln': stack.push(Math.log(val)); break;
                case 'sqrt': stack.push(Math.sqrt(val)); break;
                case 'abs': stack.push(Math.abs(val)); break;
            }
        }
    }

    const result = stack[0];
    return isFinite(result) ? result : "ERR";
  } catch (e) {
    return "ERR";
  }
};
