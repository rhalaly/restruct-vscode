import { fileExtention, getCaseFormatter } from '../utils';
import { TemplateConfig } from '../templates';
import { pascalCase, paramCase } from 'change-case';

export const EXTRA_USE_REDUX = "useRedux";
export const EXTRA_COMBINE_REDUX = "reduxInContainer";

export default function (this: any, config: TemplateConfig) {

    const formatter = config.filesFormatter ? config.filesFormatter : getCaseFormatter();
    const cmpName = pascalCase(this.name);
    const cmpNameCss = paramCase(this.name);

    const cssFileName = formatter(this.name);
    const viewFileName = formatter(`${this.name}.view`);
    const containerFileName = formatter(`${this.name}.container`);
    const reduxFileName = formatter(`${this.name}.redux`);

    const viewFileContent =
        `import React from 'react';
import './${cssFileName}.css';

function ${cmpName}View() {
    return (
        <div>

        </div>
    );
}

export default ${cmpName}View;`;

    const containerFileContent =
        `import React, { Component } from 'react';
import ${cmpName}View from './${viewFileName}';

class ${cmpName}Container extends Component {
    render() {
        return (
            <${cmpName}View />
        );
    }
}

export default ${cmpName}Container;`;

    const reduxFileContent =
        `import { connect${config.isTypescript ? ', Dispatch' : ''} } from 'react-redux';
import ${cmpName}Container from './${containerFileName}';

function mapStateToProps(state${config.isTypescript ? ': any' : ''}) {
    return {

    };
}

function mapDispatchToProps(dispatch${config.isTypescript ? ': Dispatch' : ''}) {
    return {

    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(${cmpName}Container);`;

    const cssContent =
        `.${cmpNameCss} {

}`;

    const containerReduxFileContent =
        `import React, { Component } from 'react';
import { connect${config.isTypescript ? ', Dispatch' : ''} } from 'react-redux';
import ${cmpName}View from './${viewFileName}';

class ${cmpName}Container extends Component {
    render() {
        return (
            <${cmpName}View />
        );
    }
}

function mapStateToProps(state${config.isTypescript ? ': any' : ''}) {
    return {

    };
}

function mapDispatchToProps(dispatch${config.isTypescript ? ': Dispatch' : ''}) {
    return {

    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(${cmpName}Container);`;

    const indexContent = (entry: string) =>
        `export { default } from './${entry}';`;

    const ext = fileExtention(config.isTypescript);

    let files = {
        [`${viewFileName}.${ext}x`]: viewFileContent,
        [`${viewFileName}.test.${ext}x`]: '',
        [`${containerFileName}.${ext}x`]: containerFileContent,
        [`${containerFileName}.test.${ext}x`]: '',
        [`${cssFileName}.css`]: cssContent,
        [`index.${ext}`]: indexContent(containerFileName),
    };

    if (config.extras && config.extras[EXTRA_USE_REDUX]) {
        if (config.extras[EXTRA_COMBINE_REDUX]) {
            files[`${containerFileName}.${ext}x`] = containerReduxFileContent;
        } else {
            files[`${reduxFileName}.${ext}`] = reduxFileContent;
            files[`${reduxFileName}.test.${ext}`] = '';
            files[`index.${ext}`] = indexContent(reduxFileName);
        }
    }

    return {
        [`${formatter(this.name)}`]: files
    };
}