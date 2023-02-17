type InputVariant = 'basic' | 'error' | 'success'

type UseFormFields = Record<string, unknown>

type InputName<TSchema, TKey> = TKey extends keyof TSchema
  ? {
      [K in keyof TSchema]: TKey extends K ? keyof TSchema[K] : never
    }[keyof TSchema]
  : keyof TSchema

const isDirtyOrError = <TSchema extends UseFormFields, TKeyName = string>(
  name: InputName<TSchema, TKeyName>,
  fields: UseFormFields,
  key?: keyof TSchema
) => {
  const sourceField = key ? Object.entries(fields).find(([k, _]) => k === key) : undefined
  const formFields = sourceField ? sourceField[1] as UseFormFields : fields

  return Object.keys(formFields).find(key => key === name) !== undefined
}

export function useInputVariant<TSchema extends UseFormFields>(
  dirtyFields: UseFormFields,
  errors: UseFormFields
) {
  return function getInputVariant<TKeyName = string>(
    name: InputName<TSchema, TKeyName>,
    key?: keyof TSchema
  ): InputVariant {
    const isDirtyField = isDirtyOrError(name, dirtyFields, key)
    const isErrorField = isDirtyOrError(name, errors, key)

    return isDirtyField ? (isErrorField ? 'error' : 'success') : 'basic'
  }
}
