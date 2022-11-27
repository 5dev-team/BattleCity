import React, { FormEvent, useState } from 'react'

import styles from './sign-in.module.scss'
import NesInput from '@/components/UI/nes-input'
import NesLink from '@/components/UI/nes-link'
import NesButton from '@/components/UI/nes-button'

const SignIn: React.FC = () => {
  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    console.log(form)
  }

  const [form, setForm] = useState({
    login: '',
    password: ''
  })
  return (
    <div className={styles['sign-in']}>
      <div className={styles['sign-in__card']}>
        <span className={styles['page-title']}>
          Sign In
        </span>
        <form className={styles['sign-in__form']} onSubmit={onSubmit}>
          <NesInput
            label='Login'
            fullWidth
            value={form.login}
            onChange={e => setForm({ ...form, login: e.target.value })}
          />
          <NesInput
            label='Password'
            type='password'
            fullWidth
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
          <NesButton type='submit'>
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
