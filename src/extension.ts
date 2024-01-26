import * as vscode from 'vscode';
import { hnrTranslateCommandAction } from './modules/commandActions';

export const activate = (context: vscode.ExtensionContext): void => {
	const disposable = vscode.commands.registerCommand('hnrdicttranslator.hnrtranslate', hnrTranslateCommandAction);
	context.subscriptions.push(disposable);
};

export const deactivate = (): void => {};
