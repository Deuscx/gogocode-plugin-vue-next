import type { $ } from 'gogocode'
import { transformSetup } from './rules/setup'
export interface IFileInfo {
  source: string
  path: string
}

/**
 *
 * @param fileInfo 原始文件信息
 * @param api GoGoCode API
 */
export function transform(
  fileInfo: IFileInfo,
  api: any,
) {
  const sourceCode = fileInfo.source
  const $ = api.gogocode as $

  if (
    !/\.vue$/.test(fileInfo.path)
    || /node_modules/.test(fileInfo.path)
  )
    return sourceCode

  const ast = /\.vue$/.test(fileInfo.path)
    ? $(sourceCode, { parseOptions: { language: 'vue' } })
    : $(sourceCode)

  return transformSetup(ast)
}
