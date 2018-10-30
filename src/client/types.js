/*
  this converts a typed type of a prop to a string type definition,
  because we cannot serialize "String" or any function to pass in
  postMessage...
*/

export const convert = definition => {
  if (!!definition.dataset)
    return 'dataset'

  switch(definition.type) {
    case Number:
      return definition.range ? 'range' : 'number'

    case Boolean:
      return 'boolean'

    case Date:
      return 'date'

    default:
    case String:
      return 'text'
  }
}

/*
  values come from querystring,
  so we should consider string as input value
  and output a casted value according to property definition
*/

export const cast = (definition, value) => {
  if (definition.type === Number)
    return parseFloat(value)
  else if (definition.type === Date)
    return new Date(value)
  else if (definition.type === Boolean)
    return value === 'true'

  return value
}
