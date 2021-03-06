import type from '../helpers/type'
import {
  camelCase
} from '../helpers/case'

const querypart = function (val) {
  const parts = val.split(/[;,]/)

  return parts.reduce(function (acc, el) {
    const [key, v] = el.split('=').map(el => el.trim())
    const k = camelCase(key)
    return {
      ...acc
    , [k]: v === undefined ? true : v
    }
  }, {})
}


// q=1;foo=bar  ->  { q: '1', foo: 'bar' }
// derp         ->  { derp: undefined }
const query = function (val) {
  switch ( type(val) ) {
    case 'string':
      // split the query into parts
      return query(val.split(/[;,]/))

    case 'array':
      const red =
        val
          .reduce((acc, el) => ({ ...acc, ...querypart(el) }), {})

      return query(red)


    case 'object':
      return val

    default:
      throw new Error(`cannot parse \`${val}\` as a query`)
  }
}

export default query
