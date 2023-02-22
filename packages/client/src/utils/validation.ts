import { z } from 'zod'

export const zodValidation = {
  name: z
    .string()
    .min(1, { message: 'Required' })
    .min(3, { message: 'Minimum 3 characters' })
    .max(20, { message: 'Maximum 20 characters' })
    .regex(/^[^0-9]*$/, 'No digits')
    .regex(/^[^ ]*$/, 'No spaces')
    .regex(/^[A-ZА-Я]/g, { message: 'Starts with capital letter' })
    .regex(/^(?![^a-zA-Z])[a-zA-Z\d -]+$|^(?![^Ёёа-яА-Я])[а-яА-Я\d -]*$/g, {
      message: "Only Latin or Cyrillic and '-'",
    }),
  email: z
    .string()
    .min(1, { message: 'Required' })
    .max(40, { message: 'Maximum 40 characters' })
    .email({ message: 'Must be a valid email' }),
  login: z
    .string()
    .min(1, { message: 'Required' })
    .min(3, { message: 'Minimum 3 characters' })
    .max(20, { message: 'Maximum 20 characters' })
    .regex(/^[-_a-zA-Z0-9]+$/g, {
      message: `Latin, digits, '_' and '-'`,
    })
    .regex(/^(?=.*[-_a-zA-Z])[-_a-zA-Z0-9]+$/g, {
      message: 'Cannot consists of digits only',
    }),
  password: z
    .string()
    .min(8, { message: 'Minimum 8 characters' })
    .max(40, { message: 'Maximum 40 characters' })
    .regex(/^(?=.*\p{Lu}).*$/gu, { message: 'Needs one capital letter' })
    .regex(/^(?=.*[0-9]).*$/g, { message: 'At least one digit' })
    .or(z.literal(''))
    .default(''),
  phone: z
    .string()
    .min(10, { message: 'Minimum 10 characters' })
    .max(12, { message: 'Maximum 12 characters' })
    .regex(/^\+?\d*$/g, { message: `Only digits and "+"` }),
}
