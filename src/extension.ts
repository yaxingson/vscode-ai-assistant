// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { readFile } from 'node:fs/promises'
import * as vscode from 'vscode'
import * as acorn from 'acorn'
import * as walk from 'acorn-walk'
import { ModelDataProvider, Model } from './llm'
import { PANEL_VIEW } from './views'

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-ai-assistant" is now active!');

	const panel = vscode.window.createWebviewPanel(
		'viewType', 
		'AI Assistant', 
		vscode.ViewColumn.One, 
		{}
	)

	vscode.window.registerTreeDataProvider('view.model', new ModelDataProvider())

	const showPanel = vscode.commands.registerCommand('vscode-ai-assistant.showModel', (modelName:Model['name']) => {
		const activateEditor = vscode.window.activeTextEditor
	
		if (activateEditor) {
			const sourceCode = activateEditor.document.getText()
			const currentPosition = activateEditor.document.offsetAt(activateEditor.selection.active)

			const ast = acorn.parse('const bar = () => {}', {ecmaVersion: 2020})

			console.log(ast)

			walk.simple(ast, {
				VariableDeclaration(node) {
					
					
				},
				FunctionDeclaration(node) {

				}
			})

			activateEditor.edit(editBuilder => {
				editBuilder.delete(new vscode.Range(
					new vscode.Position(0, 0), 
					new vscode.Position(0, 3)
				))
			})
		}

		panel.webview.html = `<h1>${modelName}</h1>`
	})

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('vscode-ai-assistant.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from vscode-ai-assistant!');
	});

	context.subscriptions.push(disposable)
	context.subscriptions.push(showPanel)
}

// This method is called when your extension is deactivated
export function deactivate() {}
