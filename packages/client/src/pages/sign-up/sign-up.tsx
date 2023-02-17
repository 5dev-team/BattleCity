import React, { useEffect } from 'react'
import styles from './sign-up.module.scss'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import NesInput from '@/components/UI/nes-input'
import NesLink from '@/components/UI/nes-link'
import NesButton from '@/components/UI/nes-button'
import { authSlice, fetchRegister, fetchUser } from '@/store/slices/auth'
import { RoutePaths } from '@/router'
import { z } from 'zod'
import { zodValidation } from '@/utils/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useInputVariant } from '@/hooks/useInputVariant'

const SignUp: React.FC = () => {
  
  const signUpSchema = z.object({
    first_name: zodValidation.name,
    second_name: zodValidation.name,
    email: zodValidation.email,
    login: zodValidation.login,
    password: zodValidation.password,
    phone: zodValidation.phone,
  })

  type SignUpSchema = z.infer<typeof signUpSchema>

  const dispatch = useAppDispatch()
  const authError = useAppSelector((state) => state.auth.authError)

  const { register, handleSubmit, formState: { errors, dirtyFields } } = useForm<SignUpSchema>({
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
  })

  const navigate = useNavigate()
  const getInputVariant = useInputVariant<SignUpSchema>(dirtyFields, errors)

  const onSubmit = (data: SignUpSchema): void => {
    dispatch(fetchRegister(data)).then((val) => {
      if (val.meta.requestStatus !== 'rejected') {
        dispatch(fetchUser()).then(() => {
          navigate(RoutePaths.GAME)
        })
      }
    })
  }
  
  useEffect(() => {
    return () => {
      dispatch(authSlice.actions.clearError())
    }
  }, [])

  return (
    <div className={styles['sign-up']}>
      <div className={styles['sign-up__card']}>
        <span className={'page-title'}>Sign up</span>
        <form className={styles['sign-up__form']} onSubmit={handleSubmit(onSubmit)}>
          <NesInput
            label='First name'
            errorText={errors.first_name?.message}
            variant={getInputVariant('first_name')}
            fullWidth
            {...register('first_name')}
          />
          <NesInput
            label='Second name'
            errorText={errors.second_name?.message}
            variant={getInputVariant('second_name')}
            fullWidth
            {...register('second_name')}
          />
          <NesInput
            label='Email'
            errorText={errors.email?.message}
            variant={getInputVariant('email')}
            fullWidth
            {...register('email')}
          />
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
          <NesInput
            label='Phone'
            errorText={errors.phone?.message}
            variant={getInputVariant('phone')}
            fullWidth
            {...register('phone')}
          />
          {!!authError && <span className={'error-text'}>{authError}</span>}
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

export default SignUp
