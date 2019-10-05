import * as vscode from 'vscode';
import { createNewComponentCommmand } from './commands/create-new-component';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('restruct.createComponent', createNewComponentCommmand)
	);
}

export function deactivate() { }
