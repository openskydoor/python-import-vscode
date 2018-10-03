'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
var copy = require('copy-paste').copy;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "python-import" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('python.copyImportPath', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        // vscode.window.showInformationMessage('Hello World!');
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return
        }
        let workspace = vscode.workspace;
        if (!workspace) {
            return
        }
        let relativePath = workspace.asRelativePath(editor.document.uri);
        let importPath = relativePath.replace(/\.py$/, '').replace(/\//g, '.').replace(/\.__init__$/, '')
        copy(importPath);
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
