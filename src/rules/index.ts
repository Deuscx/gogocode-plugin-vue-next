import type { GoGoAST } from 'gogocode'
import props from './props'

interface IRule {
  name: string
  rule: (ast: GoGoAST, api?: any, options?: any) => any
  test: RegExp
}

const rules: IRule[] = [{ name: 'arrayRefs', rule: props, test: /\.vue$/ }]
export default rules
