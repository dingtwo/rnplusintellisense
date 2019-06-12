import supportMethods from './supportMethods';

/** 获取引号中的内容 */
export function getTextWithinString(text: string, position: number) {
  const textToPosition = text.substring(0, position);
  // 最后一个引号的位置
  const quoatationPosition = Math.max(
    textToPosition.lastIndexOf('"'),
    textToPosition.lastIndexOf("'"),
    textToPosition.lastIndexOf('`')
  );
  return quoatationPosition != -1
    ? textToPosition.substring(quoatationPosition + 1, textToPosition.length)
    : undefined;
}

/**
 * 是否是RNPlus的方法
 * @param code 当前行的代码
 */
export function isRNPlusMethod(code: string): boolean {
  return supportMethods.some(method => code.trimLeft().startsWith(method));
}
