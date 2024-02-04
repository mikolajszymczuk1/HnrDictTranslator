import * as vscode from 'vscode';
import { translator } from './translatorClient';
import type { SourceLanguageCode, TargetLanguageCode } from 'deepl-node';

/** Hnr Translate Command Action */
export const hnrTranslateCommandAction = async (): Promise<void> => {
  const hnrDictTranslatorConfig = vscode.workspace.getConfiguration('hnrdicttranslator');
  const key = hnrDictTranslatorConfig.get('deeplApiKey') as string;
  const sourceLang = hnrDictTranslatorConfig.get('sourceLanguage') as SourceLanguageCode;
  const enabledLangs = hnrDictTranslatorConfig.get('enabledLanguages') as TargetLanguageCode[];
  const t = translator(key);

  console.log(enabledLangs[0]);

  const editor = vscode.window.activeTextEditor;
  if (!editor) { return; }

  const selected = editor.document.getText(editor.selection);
  const position = editor.selection.start;

  const formatText = selected
    .replace(/[\n\r\s]/g, '')
    .replace(/(\w+)\s*:/g, '"$1":')
    .replace(/'([^']*)'/g, '"$1"')
    .replace(/,(\s*})$/, '$1');

  const baseObjectToTranslate = JSON.parse(formatText);
  const baseKeys = Object.keys(baseObjectToTranslate);

  let valueToTranslate: string = '';
  for (let i = 0; i < baseKeys.length; i++) {
    valueToTranslate = baseObjectToTranslate[baseKeys[i]];
    baseObjectToTranslate[baseKeys[i]] = (await t.translateText(valueToTranslate, sourceLang, enabledLangs[0])).text;
  }

  const output = JSON.stringify(baseObjectToTranslate, null, 2)
    .replace(/"(\w+)":/g, '$1:')
    .replace(/"([^"]*)"/g, "'$1'");


  editor.edit((editBuilder) => {
    editBuilder.insert(position, output);
  });

  vscode.window.showInformationMessage('Translating complete !');
};
