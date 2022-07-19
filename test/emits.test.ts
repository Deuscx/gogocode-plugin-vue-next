import { resolve } from 'path'
import { describe, expect, it } from 'vitest'
import $ from 'gogocode'
import type { Node } from '@babel/types'

// TODO:
// 1. appendEmitsProp

describe('should', () => {
  it.only('remove setup return', () => {
    const ast = $.loadFile(resolve(__dirname, './examples/emits.vue'), {
      parseOptions: { language: 'vue' },
    })
    const script = ast.find('<script></script>')
    const setup = script.find('{ setup() {$$$0} }')
    const emits = script.find('{ emits: $_$1 }')
    const hasEmits = script.has('defineEmits')
    let needToInjectEmits = false
    script.find('setup($_$,$_$1) {}').each((item) => {
      const match = item.match[1][0]
      const node = match.node
      const nodeType = node.type
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

    // Remove emits
    const emitsArr = emits.match[1][0].value
    if (emitsArr) {
      script.after(`const emit = defineEmit(${emitsArr})`)
      script.find('emits: $_$1').each((item) => {
        if (item.parent(2).has('defineComponent'))
          item.remove()
      })

      needToInjectEmits = true
    }

    if (!hasEmits && needToInjectEmits) {
      script.replace(
        'import { $$$1 } from \'vue\'',
        'import { $$$1, defineEmits } from \'vue\'',
      )
    }

    // script.find('setup(){}').remove()
    expect(ast.generate()).toMatchSnapshot()
  })
})
