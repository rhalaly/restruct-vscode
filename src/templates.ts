import * as fs from 'fs';
import * as path from 'path';
import { CaseFormatter } from './utils';

export interface TemplateStruct {
    [fileName: string]: TemplateStruct | string;
}

export interface TemplateVariables {
    [variable: string]: string;
}

export interface TemplateConfig {
    isTypescript: boolean;
    filesFormatter?: CaseFormatter;
    extras: {
        [config: string]: any;
    };
}

export interface Template {
    (config: TemplateConfig): { [file: string]: string };
}

export async function template(
    templateName: string,
    destinationPath: string,
    templateConfig: TemplateConfig,
    variables?: TemplateVariables) {
    if (!fs.existsSync(destinationPath)) { return; }

    const template =
        ((await import(`./templates/${templateName}`)).default as Template).bind(variables);

    copyTemplateDir(
        template(templateConfig),
        destinationPath);
}

function copyTemplateDir(
    template: TemplateStruct,
    destinationPath: string) {

    Object.keys(template).forEach(file => {
        if (typeof template[file] === 'string') {
            handleFile(template[file] as string, path.join(destinationPath, file));
        } else if (typeof template[file] === 'object') {
            handleDirectory(template[file] as TemplateStruct, path.join(destinationPath, file));
        }
    });
}

function handleFile(
    content: string,
    destinationPath: string) {

    fs.writeFile(destinationPath, content, () => { });
}

function handleDirectory(
    template: TemplateStruct,
    destinationPath: string) {

    fs.mkdirSync(destinationPath);
    copyTemplateDir(template, destinationPath);
}