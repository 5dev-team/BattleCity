import React, { InputHTMLAttributes, useId } from 'react'
import styles from './nes-file-input.module.scss'
import NesButton from '@/components/UI/nes-button'

interface INesInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  src: string
  login: string
  alt: string
  plain?: boolean
  isDragOver?: boolean
  removeFile?: () => void
}

const NesFileInput: React.FC<INesInputProps> = ({
  src,
  label,
  alt,
  plain,
  isDragOver,
  removeFile,
  ...props
}) => {
  const id = useId()

  return (
    <>
      <div
        className={`${styles['wrapper']} ${
          !plain ? styles['upload-file'] : ''
        }`}>
        {src === '' ? (
          <div>Load avatar</div>
        ) : (
          <img
            src={src}
            alt={alt}
            className={`nes-avatar ${styles['profile-avatar']}`}
          />
        )}

        <label className={'visually-hidden'} htmlFor={id}>
          {label}
        </label>
        <input
          id={id}
          className={`${styles['upload-file__input']} nes-pointer`}
          type="file"
          {...props}
        />
      </div>
      {!plain && (
        <div className={styles['upload-file__control']}>
          <div className={styles['upload-file__caption']}>
            {isDragOver ? 'Drop file to load' : 'Change avatar'}
          </div>
          <NesButton
            onClick={removeFile}
            variant={src === '' ? 'disabled' : 'error'}
            disabled={src === ''}
            type="button">
            delete
          </NesButton>
        </div>
      )}
    </>
  )
}

export default NesFileInput
