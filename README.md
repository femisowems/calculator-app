
# 🧮 Ultimate Scientific Calculator (Master Edition)

A professional-grade, high-fidelity scientific calculator built with **Next.js 15**, **TypeScript**, and **Vanilla CSS**. This application features a robust mathematical expression engine, multi-theme support, and persistent calculation history.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-19-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)

---

## ✨ Key Features

### 🧠 Advanced Mathematical Engine
- **Expression Parsing**: Uses the **Shunting-Yard algorithm** to evaluate complex expressions with full **PEMDAS/BODMAS** support.
- **Implicit Multiplication**: Handles notations like `2(3+1)` or `5π` automatically.
- **Scientific Notation**: Gracefully handles very large or small numbers (e.g., `1.0000e+20`).
- **Advanced Math**: Support for Factorials (`!`), Powers (`x^y`), Trigonometry (`sin`, `cos`, `tan`), Logarithms (`log`, `ln`), and more.

### 🎨 Premium UI/UX
- **Dynamic Theming**: 4 highly curated themes:
  - ⚡ **Electric Blue (Default)**: Modern dark mode with glowing accents.
  - 🧊 **Nord**: Arctic-inspired, soft color palette.
  - ⚡ **Cyberpunk**: High-contrast, neon-on-dark aesthetics.
  - 📜 **Retro**: Classic 80s computer aesthetic with fixed-width typography.
- **Glassmorphism**: Beautiful frosted-glass effects with backdrop blurring.
- **Keyboard Support**: Full desktop integration—type your calculations directly.
- **Audio Feedback**: Synthesized acoustic feedback for tactile interaction.

### 🕒 Productivity Tools
- **Calculation History**: A side drawer storing your latest 20 operations with one-click recall.
- **Memory Storage**: Professional `M+`, `M-`, `MR`, and `MC` functionality.
- **Copy to Clipboard**: One-click result extraction directly from the display.
- **Interactive Help**: Built-in keyboard shortcut guide.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS (Global Design System)
- **Audio**: Web Audio API (Synthesized Oscillators)
- **State Management**: React `useReducer` with Context API

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/calculator-app.git
   ```
2. Navigate to the directory:
   ```bash
   cd calculator-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```text
├── src/
│   ├── app/            # Next.js App Router (Page, Layout, Globals)
│   ├── components/     # UI Components (Keypad, Display, Drawer, etc.)
│   ├── context/        # Theme Management Context
│   ├── hooks/          # Custom hooks (Calculator Brain)
│   └── utils/          # Math utilities & Expression Parser
├── public/             # Static assets
└── package.json        # Project metadata & dependencies
```

---

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with precision by **Femi Sowemimo**.
