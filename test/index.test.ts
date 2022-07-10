import { describe, expect, it } from 'vitest'
import $ from 'gogocode'
const code = `
  const moment = require('moment');
  var a = 1;
  const b = 2;
  function log (x, y = 'World') {
    console.log('a')
    console.log(a, x, y);
  }
`

describe('should', () => {
  it('exported', () => {
    expect($(code)
      .find('var a = 1')
      .attr('declarations.0.id.name', 'c')
      .root()
      .generate()).toMatchInlineSnapshot(`
        "
          const moment = require('moment');
          var c = 1;
          const b = 2;
          function log (x, y = 'World') {
            console.log('a')
            console.log(a, x, y);
          }
        "
      `)
  })
})
