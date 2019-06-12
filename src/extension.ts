import { ExtensionContext, languages } from 'vscode';
import RNPlusIntellisense from './RNPlusIntellisense';

const selectors = [
  'javascript',
  'javascriptreact',
  'typescript',
  'typescriptreact',
].map(s => ({
  scheme: 'file',
  language: s,
}));

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    languages.registerCompletionItemProvider(
      selectors,
      new RNPlusIntellisense(),
      //   ...triggers
      "'",
      '"'
    )
  );
}

export function deactivate() {}
