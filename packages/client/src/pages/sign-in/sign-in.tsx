import React, { useEffect } from 'react'
import styles from './sign-in.module.scss'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import NesInput from '@/components/UI/nes-input'
import NesLink from '@/components/UI/nes-link'
import NesButton from '@/components/UI/nes-button'
import { authSlice, fetchLogin, fetchUser, fetchYandexOauth } from '@/store/slices/auth'
import { z } from 'zod'
import { zodValidation } from '@/utils/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useInputVariant } from '@/hooks/useInputVariant'
import Separator from '@/components/UI/separator'

const signInSchema = z.object({
  login: zodValidation.login,
  password: zodValidation.password,
})

type SignInSchema = z.infer<typeof signInSchema>
const SignIn: React.FC = () => {
  const dispatch = useAppDispatch()
  const authError = useAppSelector(state => state.auth.authError)
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<SignInSchema>({
    mode: 'onChange',
    resolver: zodResolver(signInSchema),
  })

  const getInputVariant = useInputVariant<SignInSchema>(dirtyFields, errors)

  const onSubmit = (data: SignInSchema): void => {
    dispatch(fetchLogin(data)).then(val => {
      if (val.meta.requestStatus !== 'rejected') {
        dispatch(fetchUser())
      }
    })
  }

  useEffect(() => {
    return () => {
      dispatch(authSlice.actions.clearError())
    }
  }, [])

  return (
    <div className={styles['sign-in']}>
      <div className={styles['sign-in__card']}>
        <span className={'page-title'}>Sign In</span>
        <div className={styles['sign-in__auth']}>
          <NesButton
            type='button'
            variant='warning'
            fullWidth
            onClick={() => dispatch(fetchYandexOauth())}
          >
            Use Yandex ID
          </NesButton>
        </div>
        <Separator>OR</Separator>
        <form
          className={styles['sign-in__form']}
          onSubmit={handleSubmit(onSubmit)}
        >
          <NesInput
            label='Login'
            errorText={errors.login?.message}
            variant={getInputVariant('login')}
            fullWidth
            {...register('login')}
          />
          <NesInput
            label='Password'
            type='password'
            errorText={errors.password?.message}
            variant={getInputVariant('password')}
            fullWidth
            {...register('password')}
          />
          {authError && <span className={'error-text'}>{authError}</span>}
          <NesButton type='submit' variant='primary'>
            Sign In
          </NesButton>
          <NesLink to='/sign-up'>Not registered yet?</NesLink>
        </form>
      </div>
    </div>
  )
}

export default SignIn
