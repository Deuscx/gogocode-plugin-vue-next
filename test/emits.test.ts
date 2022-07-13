import { resolve } from 'path'
import { describe, expect, it } from 'vitest'
import $ from 'gogocode'
import type { Node } from '@babel/types'

// TODO:
// 1. appendEmitsProp

describe('should', () => {
  it.only('remove setup return', () => {
    const ast = $.loadFile(resolve(__dirname, './examples/emits1.vue'), {
      parseOptions: { language: 'vue' },
    })
    const script = ast.find('<script></script>')
    const setup = script.find('{ setup() {$$$0} }')
    const emits = script.find('{ emits: $_$1 }')
    script.find('setup($_$,$_$1) {}').each((item) => {
      const match = item.match[1][0]
      const node = match.node
      const nodeType = node.type
      console.log(item.match[1][0])
      if (nodeType === 'Identifier') {
        // ep: setup(_, context)
        const contextName = match.value
        setup.each((item) => {
          item.replace(`${contextName}.emit`, 'emit')
        })
      }
      else if (nodeType === 'ObjectPattern') {
        // ep: setup({}, {emit})

      }
    })
    console.log(emits)
    // script.find('setup(){}').remove()
    expect(ast.generate()).toMatchSnapshot()
  })
})
