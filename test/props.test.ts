import { resolve } from 'path'
import { describe, expect, it } from 'vitest'
import $ from 'gogocode'
import propsTransform from '../src/rules/props'

describe('should', () => {
  it('generate props', () => {
    const ast = $.loadFile(resolve(__dirname, './examples/props.vue'), {
      parseOptions: { language: 'vue' },
    })
    propsTransform(ast)
    expect(ast.generate()).toMatchSnapshot()
  })
})
