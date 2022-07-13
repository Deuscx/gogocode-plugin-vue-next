import type { $, GoGoAST } from 'gogocode'
import rules from './rules'
export interface IFileInfo {
  source: string
  path: string
}

export interface ITransformOptions {
  'include-rules': string
  'exclude-rules': string
}

/**
 *
 * @param fileInfo 原始文件信息
 * @param api GoGoCode API
 * @param options 传递给CLI的参数
 */
export function transform(
  fileInfo: IFileInfo,
  api: any,
  options: ITransformOptions,
) {
  const sourceCode = fileInfo.source
  const $ = api.gogocode as $

  if (
    !/\.vue$|\.js$|\.ts$|\.json$/.test(fileInfo.path)
    || /node_modules/.test(fileInfo.path)
  )
    return sourceCode
  const includeRules = options['include-rules']
    ? options['include-rules'].split(',')
    : rules.map(r => r.name)
  const excludeRules = options['exclude-rules']
    ? options['exclude-rules'].split(',')
    : []

  const isJson = /\.json$/.test(fileInfo.path)
  const ast = isJson
    ? sourceCode
    : /\.vue$/.test(fileInfo.path)
      ? $(sourceCode, { parseOptions: { language: 'vue' } })
      : $(sourceCode)

  const rulesToBeApplied = rules.filter(
    r => includeRules.includes(r.name) && !excludeRules.includes(r.name),
  )

  if (!rulesToBeApplied.length)
    throw new Error('No valid rule found.')

  const outAst = rulesToBeApplied.reduce((ast, ruleCfg) => {
    if (!ruleCfg.test.test(fileInfo.path))
      return ast

    try {
      return ruleCfg.rule(ast as GoGoAST, api, {
        ...options,
        filePath: fileInfo.path,
      })
    }
    catch (error) {
      console.error(
        `文件转换异常，规则：${ruleCfg.name}，文件：${fileInfo.path}`,
        error,
      )
      return ast
    }
  }, ast)

  return isJson ? outAst : (outAst as GoGoAST).generate()
}
