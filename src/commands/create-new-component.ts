import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { template } from '../templates';
import { hasDependency, getCaseFormatter } from '../utils';
import { EXTRA_USE_REDUX } from '../templates/new-component';

function isTypescriptProject(projPath: string) {
    if (fs.existsSync(path.join(projPath, 'tsconfig.json'))) {
        return true;
    }

    return hasDependency('typescript', projPath);
}

function isUsingRedux(projPath: string) {
    return hasDependency('react-redux', projPath) ||
        hasDependency('redux', projPath);
}

function componentsDirLocation(rootDir: string, defaultPath: string) {
    if (defaultPath) {
        const dir = path.join(rootDir, path.resolve(defaultPath));
        if (fs.existsSync(dir)) {
            return dir;
        }
    }
    const paths = [
        path.join(rootDir, 'src', 'components'),
        path.join(rootDir, 'src', 'view', 'components'),
        path.join(rootDir, 'src', 'view'),
        path.join(rootDir, 'src', 'views', 'components'),
        path.join(rootDir, 'src', 'views'),
        path.join(rootDir, 'app', 'components'),
        path.join(rootDir, 'app', 'view', 'components'),
        path.join(rootDir, 'app', 'view'),
        path.join(rootDir, 'app', 'views', 'components'),
        path.join(rootDir, 'app', 'views'),
    ].filter(path => fs.existsSync(path));

    if (defaultPath) {
        if (paths.length > 0) {
            vscode.window.showErrorMessage(`The default components directory (from settings: "${defaultPath}") is not exists. Using "${paths[0]}" instead`);
        } else {
            vscode.window.showErrorMessage(`The default components directory (from settings: "${defaultPath}") is not exists.`);
        }
    }
    return paths.length > 0 ? paths[0] : undefined;
}

export async function createNewComponentCommmand(fileUri: vscode.Uri) {
    const rootDir = vscode.workspace.workspaceFolders![0].uri.fsPath;
    const destPath = fileUri ?
        fileUri.fsPath :
        componentsDirLocation(
            rootDir,
            vscode.workspace.getConfiguration('restruct').get('defaultComponentsDirectory') as string);
    if (!destPath) {
        return;
    }

    const componentName = await vscode.window.showInputBox({
        placeHolder: 'Component Name',
    });

    if (!componentName) { return; }

    const formatter = getCaseFormatter(
        vscode.workspace.getConfiguration('restruct').get('filesNamingFormat') as string);

    const config = {
        isTypescript: isTypescriptProject(rootDir),
        filesFormatter: formatter,
        extras: {
            [EXTRA_USE_REDUX]: isUsingRedux(rootDir),
            ...vscode.workspace.getConfiguration('restruct.newComponent'),
        }
    };

    const variables = {
        name: componentName,
    };

    template('new-component', destPath, config, variables);
}