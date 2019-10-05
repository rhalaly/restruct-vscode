import { fileExtention, getCaseFormatter } from '../utils';
import { TemplateConfig } from '../templates';
import { camelCase, constantCase, pascalCase } from 'change-case';

export default function (this: any, config: TemplateConfig) {

    const formatter = config.filesFormatter ? config.filesFormatter : getCaseFormatter();
    const name = camelCase(this.name);
    const typeName = pascalCase(this.name);

    const actionFileContent =
        `export const ${name}ActionType = '${constantCase(`${this.name}Action`)}';${config.isTypescript ? `
export interface ${typeName}Action {
    type: typeof ${name}ActionType;
    payload: {
        param: any;
    };
}` : ''}
export function ${name}Action(param${config.isTypescript ? ': any' : ''}) {
    return {
        type: ${name}ActionType,
        payload: {
            param
        }
    };
}`;

    const reducerFileContent =
        `import * as actions from './actions';

function ${name}Reducer(state, action) {
    switch(action.type) {
        case actions.${name}ActionType:
            return {
                ...state,
                storeParam: action.payload.param
            };
        default:
            return state;
    }
}

export default ${name}Reducer;`;

    const indexContent = `import reducers from './reducers';
import * as actions from './actions';

export {
    reducers,
    actions
};`;

    const ext = fileExtention(config.isTypescript);

    return {
        [`${formatter(this.name)}`]: {
            [`actions.${ext}`]: actionFileContent,
            [`reducers.${ext}`]: reducerFileContent,
            [`actions.test.${ext}`]: '',
            [`reducers.test.${ext}`]: '',
            [`index.${ext}`]: indexContent,
        }
    };
}