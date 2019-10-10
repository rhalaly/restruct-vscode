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
    extras?: {
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
        ((await import(`./templates/${templateName}`)).default as Template)
            .bind(variables);

    await copyTemplateDir(
        template(templateConfig),
        destinationPath);
}

async function copyTemplateDir(
    template: TemplateStruct,
    destinationPath: string) {

    const promises = Object.keys(template).map(file => {
        if (typeof template[file] === 'string') {
            return handleFile(template[file] as string, path.join(destinationPath, file));
        } else if (typeof template[file] === 'object') {
            return handleDirectory(template[file] as TemplateStruct, path.join(destinationPath, file));
        }
        return undefined; // never
    });

    await Promise.all(promises.filter(p => p !== undefined));
}

async function handleFile(
    content: string,
    destinationPath: string) {

    return new Promise((resolve, reject) => {
        fs.writeFile(destinationPath, content, (err) => {
            if (err) {
                reject();
            } else {
                resolve();
            }
        });
    });
}

async function handleDirectory(
    template: TemplateStruct,
    destinationPath: string) {

    fs.mkdirSync(destinationPath);
    await copyTemplateDir(template, destinationPath);
}