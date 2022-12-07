import React, { useEffect, useMemo } from 'react'

import { useForm } from 'react-hook-form'
import { getPattern } from '@/utils/validation'

import styles from './sign-up.module.scss'
import NesInput from '@/components/UI/nes-input'
import NesLink from '@/components/UI/nes-link'
import NesButton from '@/components/UI/nes-button'

import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { authSlice, fetchRegister } from '@/store/slices/auth'

type RegistrationInputs = {
  first_name: string,
  second_name: string,
  email: string,
  login: string,
  password: string
  phone: string
}

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch()
  const authError = useAppSelector((state) => state.auth.authError)

  const { register, handleSubmit, formState: { errors, submitCount } } = useForm<RegistrationInputs>()
  const onSubmit = (data: RegistrationInputs): void => {
    dispatch(fetchRegister(data))
  }
  const formErrorsString = useMemo(() => Object.values(errors).map(el => el.ref?.name).join(', '), [submitCount])

  useEffect(() => {
    return () => {
      authSlice.actions.clearError()
    }
  }, [])

  return (
    <div className={styles['sign-up']}>
      <div className={styles['sign-up__card']}>
        <span className={'page-title'}>Sign up</span>
        <form className={styles['sign-up__form']} onSubmit={handleSubmit(onSubmit)}>
          <NesInput
            label='First name'
            fullWidth
            {...register('first_name', { pattern: getPattern('firstName'), required: true })}
          />
          <NesInput
            label='Second name'
            fullWidth
            {...register('second_name', { pattern: getPattern('secondName'), required: true })}
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
            <span className={'error-text'}>{formErrorsString ? 'Wrong ' + formErrorsString : authError}</span> :
            ''
          }
          <NesButton type='submit' variant='primary'>
            Sign up
          </NesButton>
          <NesLink
            to='/sign-in'
          >
            Already registered?
          </NesLink>
        </form>
      </div>
    </div>
  )
}

export default SignIn
