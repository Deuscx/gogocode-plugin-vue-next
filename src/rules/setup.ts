import type $ from 'gogocode'
import type { Node } from '@babel/types'

export function insertDefineProps(script: $.GoGoAST) {
  const opt = script.find('{props: $_$1}')
  const hasProps = script.has('defineProps')
  let needToInjectProps = false

  opt.each((item) => {
    const value = item.match[1][0].value
    const node = item.match[1][0].node
    if (node.type === 'ObjectExpression') {
      needToInjectProps = true
      script.after(`const props = defineProps(${value})`)
    }
  })

  script.find('props: $_$1').each((item) => {
    if (item.parent(2).has('defineComponent'))
      item.remove()
  })

  if (!hasProps && needToInjectProps) {
    script.replace(
      'import { $$$1 } from \'vue\'',
      'import { $$$1, defineProps } from \'vue\'',
    )
  }
}

export function insertDefineEmits(script: $.GoGoAST) {
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
  const emitsArr = emits.match?.[1]?.[0].value
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
}

export function exposeSetup(script: $.GoGoAST) {
  script.find('{ setup() {$$$0} }').each((item) => {
    // remove return statement
    (item.match.$$$0 as unknown as Node[]).forEach((node) => {
      if (node.type !== 'ReturnStatement')
        script.after(node)
    })
  })
  script.find('setup(){}').remove()

  // remove component
  const components = script.find('{ components: $_$1 }')
  const componentsArr = components.match[1][0].value
  if (componentsArr) {
    script.find('components: $_$1').each((item) => {
      if (item.parent(2).has('defineComponent'))
        item.remove()
    })
  }

  // remove defineComponent
  script.find('export default $_$1').each((item) => {
    item.remove()
  })

  // remove import defineComponent
  script.replace(
    'import { $$$1,defineComponent } from \'vue\'',
    'import { $$$1 } from \'vue\'',
  )
}
export function transformSetup(ast: $.GoGoAST) {
  const isSetupScript = ast.has('<script setup></script>')
  if (isSetupScript)
    return ast.generate()

  const script = ast.find('<script></script>')

  // 1. defineProps
  insertDefineProps(script)
  // 2. defineEmits
  insertDefineEmits(script)
  exposeSetup(script)
  return ast.generate().replace('script', 'script setup')
}
