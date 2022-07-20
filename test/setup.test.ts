import { resolve } from 'path'
import { describe, expect, it } from 'vitest'
import $ from 'gogocode'
import { transformSetup } from '../src/rules/setup'

describe('should', () => {
  it('remove setup return', () => {
    const ast = $.loadFile(resolve(__dirname, './examples/setup.vue'), {
      parseOptions: { language: 'vue' },
    })

    // finally: add script setup
    expect(transformSetup(ast)).toMatchSnapshot()
  })

  it('remove setup return', () => {
    const ast = $.loadFile(resolve(__dirname, './examples/props.vue'), {
      parseOptions: { language: 'vue' },
    })

    // finally: add script setup
    expect(transformSetup(ast)).toMatchSnapshot()
  })

  it('remove setup return', () => {
    const ast = $.loadFile(resolve(__dirname, './examples/emits.vue'), {
      parseOptions: { language: 'vue' },
    })

    // finally: add script setup
    expect(transformSetup(ast)).toMatchSnapshot()
  })
})
