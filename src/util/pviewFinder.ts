import * as walk from 'walk-sync';
import { workspace, CompletionItem, CompletionItemKind } from 'vscode';
import * as path from 'path';
import { statSync, readFile, existsSync } from 'fs-extra';

interface FileInfo {
  path: string;
  code: string;
}

const PVIEW_REG = /class\s(\w+)\sextends\sPView/;

export default class PViewFinder {
  /**
   * view所在的绝对路径
   */
  private viewPath: string;

  constructor() {
    const { rootPath } = workspace;
    if (!rootPath) {
      throw '没有rootPath???';
    }
    this.viewPath = path.resolve(
      rootPath!,
      this.isTsProject(rootPath!) ? './tssrc/view' : './src/view'
    );
  }

  public finder(): Promise<CompletionItem[]> {
    const files = walk(this.viewPath);
    // TODO: 去重
    const findPviews: Promise<string | undefined>[] = files
      .map(this.joinFilePath)
      .filter(this.isFile)
      .map(this.toPViewName);
    return Promise.all(findPviews).then(this.pviewToCompletionItem);
  }

  private isTsProject(rootPath: string) {
    return existsSync(path.resolve(rootPath, './tsconfig.json'));
  }

  private isFile(filePath: string) {
    return (
      statSync(filePath).isFile() &&
      ['.js', '.tsx'].includes(path.extname(filePath))
    );
  }

  private joinFilePath = (file: string) => {
    return path.resolve(this.viewPath, file);
  };

  /**
   * 从文件中找PView
   * @param path view下的文件目录
   * @returns {string} 获取到的PView组件名
   */
  private toPViewName(path: string): Promise<string | undefined> {
    return readFile(path, 'utf-8').then(code => {
      const match = code.match(PVIEW_REG);
      if (!match) {
        return;
      } else {
        return match![1];
      }
    });
  }

  /**
   * 把读取到的PView组件名转为代码提示项
   * @param pviews 读取的PView组件名集合
   */
  private pviewToCompletionItem(pviews: (string | undefined)[]) {
    return pviews
      .filter(pview => pview)
      .map(pview => new CompletionItem(pview!, CompletionItemKind.File));
  }
}
