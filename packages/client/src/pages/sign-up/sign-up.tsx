import React, { useMemo } from 'react'

import { useForm } from 'react-hook-form'
import { getPattern } from '@/utils/validation'
import styles from './sign-up.module.scss'
import NesInput from '@/components/UI/nes-input'
import NesLink from '@/components/UI/nes-link'
import NesButton from '@/components/UI/nes-button'

type RegistrationInputs = {
  firstName: string,
  secondName: string,
  email: string,
  login: string,
  password: string
  phone: string
}

const SignIn: React.FC = () => {
  const { register, handleSubmit, formState: { errors, submitCount } } = useForm<RegistrationInputs>()
  const onSubmit = (data: RegistrationInputs): void => {
    console.log('from submit', data)
  }
  const formErrorsString = useMemo(() => Object.values(errors).map(el => el.ref?.name).join(', '), [submitCount])

  return (
    <div className={styles['sign-up']}>
      <div className={styles['sign-up__card']}>
        <span className={'page-title'}>Sign up</span>
        <form className={styles['sign-up__form']} onSubmit={handleSubmit(onSubmit)}>
          <NesInput
            label='First name'
            fullWidth
            {...register('firstName', { pattern: getPattern('firstName'), required: true })}
          />
          <NesInput
            label='Second name'
            fullWidth
            {...register('secondName', { pattern: getPattern('secondName'), required: true })}
          />
          <NesInput
            label='Email'
            fullWidth
            {...register('email', { pattern: getPattern('email'), required: true })}
          />
          <NesInput
            label='Login'
            fullWidth
            {...register('login', { pattern: getPattern('login'), required: true })}
          />
          <NesInput
            label='Password'
            type='password'
            fullWidth
            {...register('password', { pattern: getPattern('password'), required: true })}
          />
          <NesInput
            label='Phone'
            fullWidth
            {...register('phone', { pattern: getPattern('phone'), required: true })}
          />
          {formErrorsString ?
            <span className={'error-text'}>Wrong {formErrorsString}</span> :
            ''
          }
          <NesButton type='submit' variant='primary'>
            Sign In
          </NesButton>
          <NesLink
            to='/sign-up'
          >
            Not registered yet?
          </NesLink>
        </form>
      </div>
    </div>
  )
}

export default SignIn
