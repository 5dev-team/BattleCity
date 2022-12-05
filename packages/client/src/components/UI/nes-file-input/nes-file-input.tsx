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
      {!plain && (
          <div className={styles['upload-file__caption']}>
            {isDragOver ? 'Drop file to load' : (
                <>
                  <p className={styles['caption-title']} >Change avatar</p>
                  <span className={`nes-text is-primary ${styles['caption-subtitle']}`}>Drag&Drop</span>
                </>
            )}
          </div>
      )}

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
            style={{ imageRendering: 'pixelated' }}
          />
        )}

        <label className={'visually-hidden'} htmlFor={id}>
          {label}
        </label>
        <input
          id={id}
          className={`${styles['upload-file__input']} nes-pointer`}
          type="file"
          disabled={plain}
          {...props}
        />
      </div>
      {!plain && (
        <div className={styles['upload-file__control']}>
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
