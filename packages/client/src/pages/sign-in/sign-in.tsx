import React, { useMemo, useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { getPattern } from '@/utils/validation'

import styles from './sign-in.module.scss'
import NesInput from '@/components/UI/nes-input'
import NesLink from '@/components/UI/nes-link'
import NesButton from '@/components/UI/nes-button'

import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { authSlice, fetchLogin } from '@/store/slices/auth'
import { RoutePaths } from '@/router'

type LoginInputs = {
  login: string,
  password: string
}

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch()
  const authError = useAppSelector((state) => state.auth.authError)

  const { register, handleSubmit, formState: { errors, submitCount } } = useForm<LoginInputs>()

  const navigate = useNavigate()
  const onSubmit = (data: LoginInputs): void => {
    dispatch(fetchLogin(data)).then((val) => {
      if (val.meta.requestStatus !== 'rejected') {
        navigate(RoutePaths.GAME)
      }
    })
  }
  const formErrorsString = useMemo(() => Object.values(errors).map(el => el.ref?.name).join(', '),
    [submitCount])

  useEffect(() => {
    return () => {
      authSlice.actions.clearError()
    }
  }, [])

  return (
    <div className={styles['sign-in']}>
      <div className={styles['sign-in__card']}>
        <span className={'page-title'}>Sign In</span>
        <form className={styles['sign-in__form']} onSubmit={handleSubmit(onSubmit)}>
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
          {formErrorsString || authError ?
            <span className={'error-text'}>{formErrorsString ? 'Wrong ' + formErrorsString : authError}</span> :
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
