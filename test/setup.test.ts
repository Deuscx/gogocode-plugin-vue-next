import { resolve } from 'path'
import { describe, expect, it } from 'vitest'
import $ from 'gogocode'
import type { Node } from '@babel/types'

describe('should', () => {
  it.only('remove setup return', () => {
    const ast = $.loadFile(resolve(__dirname, './examples/setup.vue'), {
      parseOptions: { language: 'vue' },
    })
    const isSetupScript = ast.has('<script setup></script>')
    const script = ast.find('<script></script>')
    script.find('{ setup() {$$$0} }').each((item) => {
      // remove return statement
      (item.match.$$$0 as unknown as Node[]).forEach((node) => {
        if (node.type !== 'ReturnStatement')
          script.after(node)
      })
    })
    script.find('setup(){}').remove()
    // TODO: add script setup
    expect(ast.generate()).toMatchSnapshot()
  })
})
