import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';

import { template } from '../../templates';
import * as fs from 'fs-extra';
import * as path from 'path';
import { EXTRA_USE_REDUX, EXTRA_COMBINE_REDUX } from '../../templates/new-component';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Run new component command', () => {
		assert.equal(-1, [1, 2, 3].indexOf(5));
		assert.equal(-1, [1, 2, 3].indexOf(0));
	});
});

suite('Templates Test Suite', () => {
	const outDir = 'testOut';
	vscode.window.showInformationMessage('Start template tests.');

	setup(() => {
		if (fs.existsSync(outDir)) {
			fs.emptyDirSync(outDir);
		} else {
			fs.mkdirSync(outDir);
		}
	});

	suiteTeardown(() => {
		fs.removeSync(outDir);
	});

	[
		{
			isTypescript: false,
			extension: 'js'
		},
		{
			isTypescript: true,
			extension: 'ts'
		}
	].forEach(({ isTypescript, extension }) => {
		test(`new component template ${extension}`, async () => {
			await template(
				'new-component',
				outDir,
				{
					isTypescript,
				},
				{
					name: "component"
				});

			assert.equal(fs.existsSync(path.join(outDir, 'component', `component.view.${extension}x`)), true);
			assert.equal(fs.existsSync(path.join(outDir, 'component', `component.view.test.${extension}x`)), true);
			assert.equal(fs.existsSync(path.join(outDir, 'component', `component.container.${extension}x`)), true);
			assert.equal(fs.existsSync(path.join(outDir, 'component', `component.container.test.${extension}x`)), true);
			assert.equal(fs.existsSync(path.join(outDir, 'component', `component.css`)), true);
			assert.equal(fs.existsSync(path.join(outDir, 'component', `index.${extension}`)), true);
		});

		test(`new component template ${extension} with Redux`, async () => {
			await template(
				'new-component',
				outDir,
				{
					isTypescript,
					extras: {
						[EXTRA_USE_REDUX]: true
					}
				},
				{
					name: "component"
				});

			assert.equal(fs.existsSync(path.join(outDir, 'component', `component.redux.${extension}`)), true);
			assert.equal(fs.existsSync(path.join(outDir, 'component', `component.redux.test.${extension}`)), true);
		});

		test(`new component template ${extension} with Redux in container`, async () => {
			await template(
				'new-component',
				outDir,
				{
					isTypescript,
					extras: {
						[EXTRA_USE_REDUX]: true,
						[EXTRA_COMBINE_REDUX]: true,
					}
				},
				{
					name: "component"
				});

			assert.equal(fs.existsSync(path.join(outDir, 'component', `component.view.${extension}x`)), true);
			assert.equal(fs.existsSync(path.join(outDir, 'component', `component.view.test.${extension}x`)), true);
			assert.equal(fs.existsSync(path.join(outDir, 'component', `component.container.${extension}x`)), true);
			assert.equal(fs.existsSync(path.join(outDir, 'component', `component.container.test.${extension}x`)), true);
			assert.equal(fs.existsSync(path.join(outDir, 'component', `component.css`)), true);
			assert.equal(fs.existsSync(path.join(outDir, 'component', `index.${extension}`)), true);
			assert.equal(fs.existsSync(path.join(outDir, 'component', `component.redux.${extension}`)), false);
			assert.equal(fs.existsSync(path.join(outDir, 'component', `component.redux.test.${extension}`)), false);
		});

		test(`new state template ${extension}`, async () => {
			await template(
				'new-state',
				outDir,
				{
					isTypescript,
				},
				{
					name: "state"
				});

			assert.equal(fs.existsSync(path.join(outDir, 'state', `actions.${extension}`)), true);
			assert.equal(fs.existsSync(path.join(outDir, 'state', `actions.test.${extension}`)), true);
			assert.equal(fs.existsSync(path.join(outDir, 'state', `reducers.${extension}`)), true);
			assert.equal(fs.existsSync(path.join(outDir, 'state', `reducers.test.${extension}`)), true);
			assert.equal(fs.existsSync(path.join(outDir, 'state', `index.${extension}`)), true);
		});
	});
});
