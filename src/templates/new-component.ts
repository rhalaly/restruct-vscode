import { fileExtention, getCaseFormatter } from '../utils';
import { TemplateConfig } from '../templates';
import { pascalCase, paramCase } from 'change-case';

export const CONFIG_USE_REDUX = "USE_REDUX";

export default function (this: any, config: TemplateConfig) {

    const formatter = config.filesFormatter ? config.filesFormatter : getCaseFormatter();
    const cmpName = pascalCase(this.name);
    const cmpNameCss = paramCase(this.name);

    const cssFileName = formatter(this.name);
    const viewFileName = formatter(`${this.name}.view`);
    const viewTestFileName = formatter(`${this.name}.view.test`);
    const containerFileName = formatter(`${this.name}.container`);
    const containerTestFileName = formatter(`${this.name}.container.test`);
    const reduxFileName = formatter(`${this.name}.redux`);
    const reduxTestFileName = formatter(`${this.name}.redux.test`);

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

    const indexContent = (entry: string) =>
        `export { default } from './${entry}';`;

    const ext = fileExtention(config.isTypescript);

    let files = {
        [`${viewFileName}.${ext}x`]: viewFileContent,
        [`${viewTestFileName}.${ext}x`]: '',
        [`${containerFileName}.${ext}x`]: containerFileContent,
        [`${containerTestFileName}.${ext}x`]: '',
        [`${cssFileName}.css`]: cssContent,
        [`index.${ext}`]: indexContent(containerFileName),
    };

    if (config && config.extras[CONFIG_USE_REDUX]) {
        files[`${reduxFileName}.${ext}`] = reduxFileContent;
        files[`${reduxTestFileName}.${ext}`] = '';
        files[`index.${ext}`] = indexContent(reduxFileName);
    }

    return {
        [`${formatter(this.name)}`]: files
    };

}