import * as vscode from 'vscode';
import { createNewComponentCommmand } from './commands/create-new-component';
import { createNewStoreCommmand } from './commands/create-new-state';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('restruct.createComponent', createNewComponentCommmand),
		vscode.commands.registerCommand('restruct.createState', createNewStoreCommmand),
	);
}

export function deactivate() { }
