import {
  CompletionItemProvider,
  TextDocument,
  Position,
  CancellationToken,
  CompletionItem,
} from 'vscode';
import { isRNPlusMethod } from './util';
import PViewFinder from './util/pviewFinder';

interface Request {
  /**
   * 当前文件名
   */
  fileName?: string;
  /**
   * 页面名, 即方法的第一个参数
   */
  pageName?: string;
  lineCode?: string;
  /**
   * 光标所在位置
   */
  position: Position;
}

export default class RNPlusIntellisense implements CompletionItemProvider {
  /* constructor() {
        // 根据设置配置插件
    } */

  provideCompletionItems(
    document: TextDocument,
    position: Position,
    token: CancellationToken
  ): Thenable<CompletionItem[]> {
    console.log(document, position, token);
    // 当前行的代码
    const code = document.getText(document.lineAt(position.line).range);

    const request: Request = {
      position: position,
      lineCode: code,
      fileName: document.fileName,
    };

    return this.shouldProvide(request) ? this.privide() : Promise.resolve([]);
  }

  private privide(): Promise<CompletionItem[]> {
    return new PViewFinder().finder();
  }

  private shouldProvide(request: Request): boolean {
    const { pageName, lineCode } = request;
    return isRNPlusMethod(lineCode!);
    // rnplus操作的页面名, 没有参数则不触发
    return !!pageName;
  }
}
