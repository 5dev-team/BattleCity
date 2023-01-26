type PlainObject<T = unknown> = {
  [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object'
      && value !== null
      && value.constructor === Object
      && Object.prototype.toString.call(value) === '[object Object]'
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value)
}

function isArrayOrObject(value: unknown): value is ([] | PlainObject) {
  return isPlainObject(value) || isArray(value)
}

function getParameter(key: string, data: unknown, path: string[] = []): string {
  if (isArrayOrObject(data)) {
      return Object
          .entries(data)
          .map(([i, value]) => getParameter(key, value, [...path, i]))
          .join('&')
  }

  return `${key}${path.map((i) => `[${i}]`).join('')}=${data}`
}

function queryStringify(data: unknown): string | never {
  if (!isPlainObject(data)) {
      throw new Error('data must be object type')
  }

  const query = Object
      .entries(data)
      .map(([key, value]) => getParameter(key, value))
      .join('&')

  return `?${query}`
}

export default queryStringify