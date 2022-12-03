import React, { InputHTMLAttributes, useId } from 'react'
import styles from './nes-file-input.module.scss'

interface INesInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  avatar: string
  login: string
  plain?: boolean
}

const NesFileInput: React.FC<INesInputProps> = ({
  avatar,
  login,
  label,
  plain,
  ...props
}) => {
  const id = useId()
  return (
    <>
      <div className={`${styles['wrapper']} ${!plain ? styles['upload-file'] : ''}`}>
        <img
          src={avatar}
          alt={`аватар пользователя ${login}`}
          className={`nes-avatar ${styles['profile-avatar']}`}
        />
        <label className={styles['visually-hidden']} htmlFor={id}>
          {label}
        </label>
        <input
          id={id}
          className={`${styles['file-input']} nes-pointer`}
          type="file"
          {...props}
        />
      </div>
      <div className={styles['input-text']} style={plain ? { display: 'none' } : {}}>Change avatar</div>
    </>
  )
}

export default NesFileInput
