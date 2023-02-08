import isURL from 'validator/lib/isURL'

function validateUrl(value: string): string {
  if (!isURL(value, { require_protocol: true })) {
    throw new Error('is not a link')
  }
  return value
}

export {
  validateUrl
}

