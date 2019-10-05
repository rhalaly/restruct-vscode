import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { template } from '../templates';
import { getCaseFormatter, isTypescriptProject, isUsingRedux } from '../utils';

function componentsDirLocation(rootDir: string, defaultPath: string) {
    if (defaultPath) {
        const dir = path.join(rootDir, path.resolve(defaultPath));
        if (fs.existsSync(dir)) {
            return dir;
        }
    }
    const paths = [
        path.join(rootDir, 'src', 'state'),
        path.join(rootDir, 'app', 'state'),
        path.join(rootDir, 'ClientApp', 'state'),
    ].filter(path => fs.existsSync(path));

    if (defaultPath) {
        if (paths.length > 0) {
            vscode.window.showErrorMessage(`The default state directory (from settings: "${defaultPath}") is not exists. Using "${paths[0]}" instead`);
        } else {
            vscode.window.showErrorMessage(`The default state directory (from settings: "${defaultPath}") is not exists.`);
        }
    }
    return paths.length > 0 ? paths[0] : undefined;
}

async function ensureRedux(rootDir: string) {
    return isUsingRedux(rootDir) ||
        await vscode.window.showWarningMessage('The state depends on Redux, but we did not find Redux in your dependencies. Do you want to continue?', 'Create Anyway') !== undefined;
}

export async function createNewStoreCommmand(fileUri: vscode.Uri) {
    const rootDir = vscode.workspace.workspaceFolders![0].uri.fsPath;

    if (!ensureRedux(rootDir)) {
        return;
    }

    const destPath = fileUri ?
        fileUri.fsPath :
        componentsDirLocation(
            rootDir,
            vscode.workspace.getConfiguration('restruct').get('defaultStatesDirectory') as string);
    if (!destPath) {
        return;
    }

    const stateName = await vscode.window.showInputBox({
        placeHolder: 'State Name',
    });

    if (!stateName) { return; }

    const formatter = getCaseFormatter(
        vscode.workspace.getConfiguration('restruct').get('filesNamingFormat') as string);

    const config = {
        isTypescript: isTypescriptProject(rootDir),
        filesFormatter: formatter,
    };

    const variables = {
        name: stateName,
    };

    template('new-state', destPath, config, variables);
}