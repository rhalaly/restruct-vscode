import * as fs from 'fs';
import * as path from 'path';
import { camel, pascal, paramCase, snakeCase } from 'change-case';

export interface CaseFormatter {
    (str: string, locale?: string): string;
}

export function hasDependency(libname: string, root: string): boolean {
    if (!fs.existsSync(path.join(root, 'package.json'))) {
        return false;
    }

    const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json')).toString());

    let packages: string[] = [];
    if (packageJson.dependencies) {
        packages = packages.concat(Object.keys(packageJson.dependencies));
    }
    if (packageJson.devDependencies) {
        packages = packages.concat(Object.keys(packageJson.devDependencies));
    }

    return packages.some(dep => dep === libname);
}

export function fileExtention(typescript: boolean): string {
    return typescript ? 'ts' : 'js';
}

export function getCaseFormatter(caseFormat?: string): CaseFormatter {
    if (!caseFormat) {
        return (str: string) => str;
    }
    switch (caseFormat.toLowerCase()) {
        case "camel": return camel;
        case "pascal": return pascal;
        case "snake": return snakeCase;
        case "dash": return paramCase;
        default: return (str: string) => str;
    }
}