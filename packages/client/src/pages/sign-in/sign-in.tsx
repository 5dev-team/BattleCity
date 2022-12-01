import React, { useMemo } from 'react'

import { useForm } from 'react-hook-form'
import { getPattern } from '@/utils/validation'
import styles from './sign-in.module.scss'
import NesInput from '@/components/UI/nes-input'
import NesLink from '@/components/UI/nes-link'
import NesButton from '@/components/UI/nes-button'
import { authApi } from '@/api/auth'

type LoginInputs = {
  login: string,
  password: string
}

const SignIn: React.FC = () => {
  console.log(authApi)
  authApi.useLoginMutation()
  const { register, handleSubmit, formState: { errors, submitCount } } = useForm<LoginInputs>()
  const onSubmit = (data: LoginInputs): void => {
    // console.log(login(data))
  }
  const formErrorsString = useMemo(() => Object.values(errors).map(el => el.ref?.name).join(', '), [submitCount])

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
