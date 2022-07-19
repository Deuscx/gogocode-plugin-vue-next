import type { GoGoAST } from 'gogocode'
import props from './props'

interface IRule {
  name: string
  rule: (ast: GoGoAST, api?: any, options?: any) => any
  test: RegExp
}
/**
 * TODO: 整体转换流程
 * - emits,props,component
 * - setup
 */
const rules: IRule[] = [{ name: 'props', rule: props, test: /\.vue$/ }]
export default rules
