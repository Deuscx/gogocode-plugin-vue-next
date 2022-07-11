import { resolve } from 'path'
import { describe, expect, it } from 'vitest'
import $ from 'gogocode'

describe('should', () => {
  it('generate props', () => {
    const ast = $.loadFile(resolve(__dirname, './examples/props.vue'), {
      parseOptions: { language: 'vue' },
    })
    const script = ast.find('<script></script>')
    const opt = script.find('{props: $_$1}')

    opt.each((item) => {
      const value = item.match[1][0].value
      item.remove()
      script.after(`const props = defineProps(${value})`)
    })
    expect(ast.generate()).toMatchSnapshot()
  })
})
