import type { GoGoAST } from 'gogocode'

export default function (ast: GoGoAST) {
  const script = ast.find('<script></script>')
  const opt = script.find('{props: $_$1}')

  opt.each((item) => {
    const value = item.match[1][0].value
    const node = item.match[1][0].node
    if (node.type === 'ObjectExpression')
      script.after(`const props = defineProps(${value})`)
  })

  script.find('props: $_$1').each((item) => {
    if (item.parent(2).has('defineComponent'))
      item.remove()
  })

  return script.root()
}
