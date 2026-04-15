# Quantum Syntax & Productivity Tools (Just for Jake)

This repository contains the VS Code / Antigravity extension for processing Quantum `.qin`, `.dw`, and `axis` files with the same productivity features as the original Sublime Text setup.

## Features

- **Syntax Highlighting**: Monokai-style coloring (Magenta/Cyan/Orange) for all Quantum keywords and tags.
- **Smart Formatting Commands**:
  - `Ctrl+Shift+I`: **Increment Selection** (Smart digits/letters).
  - `Ctrl+Shift+A`: **Add Asked Filter** (Auto-inserts `;c=...u$ $`).
  - `Ctrl+Shift+B`: **Auto-ID Banner** (Processes `n01` tags and updates `tstat`).
  - `Ctrl+Shift+V`: **Smart Paste** (Automatically increments column references in pasted blocks).

## Installation Instructions

1.  **Locate Extensions Folder**:
    - For Antigravity: `C:\Users\<YourUser>\.antigravity\extensions\`
    - For standard VS Code: `C:\Users\<YourUser>\.vscode\extensions\`
2.  **Copy the Extension**:
    - Copy the `vscode-quantum` folder from this repo into that extensions directory.
    - Path should look like: `...\extensions\vscode-quantum\package.json`
3.  **Reload Editor**:
    - Restart your editor or run the `Developer: Reload Window` command.

## Usage
Simply open any file ending in `.qin`, `.dw`, or named `axis` to activate the features. Highlight any number and press `Ctrl+Shift+I` to test it!

---

MIT License

Copyright (c) 2026 Andrew P N J J J Moffit

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
