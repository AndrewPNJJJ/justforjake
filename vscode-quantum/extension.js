const vscode = require('vscode');

function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('quantum.increment', async function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const text = await vscode.window.showInputBox({ 
            prompt: 'Increment by:', 
            value: '1' 
        });
        if (text === undefined) return;

        const inc = parseInt(text);

        editor.edit(editBuilder => {
            editor.selections.forEach(selection => {
                const val = editor.document.getText(selection);
                let result = val;

                if (!isNaN(parseInt(val))) {
                    result = (parseInt(val) + inc).toString();
                } else if (val.length === 1) {
                    let code = val.charCodeAt(0);
                    code += inc;
                    if (code >= 91 && code <= 96) code += 6;
                    result = String.fromCharCode(code);
                }
                editBuilder.replace(selection, result);
            });
        });
    }));

    // ASKED Command
    context.subscriptions.push(vscode.commands.registerCommand('quantum.asked', function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const selection = editor.selection;
        const txt = editor.document.getText(selection);
        let pos = editor.document.offsetAt(selection.start);
        
        const fullText = editor.document.getText();
        let found = -1;
        let lastNewLine = -1;

        while (pos > 0) {
            pos--;
            if (fullText[pos] === '\n' && lastNewLine === -1) lastNewLine = pos;
            if (fullText.substring(pos, pos + 2) === 'l ') {
                found = pos;
                break;
            }
        }

        if (found !== -1 && lastNewLine !== -1) {
            const insertPos = editor.document.positionAt(lastNewLine);
            editor.edit(editBuilder => {
                editBuilder.insert(insertPos, `;c=${txt}u$ $`);
            });
        }
    }));

    // BANNER Command
    context.subscriptions.push(vscode.commands.registerCommand('quantum.banner', function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        let curRow = editor.selection.active.line;
        let line = editor.document.lineAt(curRow);
        if (!line.text.startsWith("l ")) {
            vscode.window.showErrorMessage("Must be on 'l ' line");
            return;
        }

        let curLetterCode = 'A'.charCodeAt(0);
        let statLine = "";
        let curGroupLetters = "";
        let curGroupSize = 0;
        let firstN23 = true;
        let tstatRow = -1;

        editor.edit(editBuilder => {
            for (let i = curRow + 1; i < editor.document.lineCount; i++) {
                let l = editor.document.lineAt(i);
                let text = l.text;

                if (text.startsWith("n01")) {
                    text = text.replace(/;(\s+)?id=[A-Za-z]+/g, "");
                    let letter = String.fromCharCode(curLetterCode);
                    editBuilder.replace(l.range, text + ";id=" + letter);
                    
                    curGroupLetters += letter;
                    curGroupSize++;
                    
                    if (letter === 'Z') curLetterCode = 'a'.charCodeAt(0);
                    else curLetterCode++;
                }

                if (text.startsWith("n23")) {
                    if (!firstN23) {
                        if (curGroupSize > 1) statLine += curGroupLetters + ",";
                    } else {
                        firstN23 = false;
                    }
                    curGroupLetters = "";
                    curGroupSize = 0;
                }

                if (text.startsWith("tstat")) tstatRow = i;

                if (text.startsWith("l ") || text.startsWith("side") || i === editor.document.lineCount - 1) {
                    if (curGroupSize > 1) statLine += curGroupLetters;
                    break;
                }
            }

            if (tstatRow !== -1 && statLine) {
                let tl = editor.document.lineAt(tstatRow);
                let nt = tl.text.replace(/;(\s+)?elms=([A-Za-z,\s]+)?/g, ";elms=" + statLine);
                editBuilder.replace(tl.range, nt);
            }
        });
    }));

    // SMART PASTE Command
    context.subscriptions.push(vscode.commands.registerCommand('quantum.smartPaste', async function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        let result = await vscode.env.clipboard.readText();
        
        // Auto-increment column and placeholder references
        result = result.replace(/c(\d+)/g, (match, p1) => "c" + (parseInt(p1) + 1));
        result = result.replace(/a(\d+)/g, (match, p1) => "a" + (parseInt(p1) + 1));
        result = result.replace(/_(\d+)/g, (match, p1) => "_" + (parseInt(p1) + 1));

        editor.edit(editBuilder => {
            editor.selections.forEach(selection => {
                editBuilder.replace(selection, result);
            });
        });
    }));
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
