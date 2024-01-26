import * as vscode from 'vscode';
import { translator } from './translatorClient';

const hnrDictTranslatorConfig = vscode.workspace.getConfiguration('hnrdicttranslator');

/** Hnr Translate Command Action */
export const hnrTranslateCommandAction = (): void => {
  const key = hnrDictTranslatorConfig.get('apiKey') as string;
  const t = translator(key);

  vscode.window.showInformationMessage('Translating dicts ...');
};
