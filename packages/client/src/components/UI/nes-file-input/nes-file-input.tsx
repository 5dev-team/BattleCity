import React, { forwardRef, InputHTMLAttributes, useId } from 'react'
import styles from './nes-file-input.module.scss'
import { Control, useController } from 'react-hook-form'

interface INesFileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  src: string
  alt: string
  plain?: boolean
  plainText?: string
  isDragOver?: boolean
  control: Control
}

const NesFileInput: React.FC<INesFileInputProps> = forwardRef<HTMLInputElement, INesFileInputProps>(
  (
    {
      type = 'file',
      name,
      src,
      label,
      alt,
      plain,
      plainText,
      control,
      isDragOver,
      onChange,
      ...props
    },
    ref
  ) => {
    const { field } = useController({ control, name })
    const [value, setValue] = React.useState('')
    const id = useId()

    return (
      <div className={styles['upload-file']}>
        <div className={`${styles['upload-file__content-wrapper']} ${styles['upload-file__content']}`}>
          {src === '' ? (
            <div className={`nes-text ${!plain ? 'is-primary' : ''} ${styles['upload-file__control']}`}>
              <div className={`nes-text ${!plain ? 'is-primary' : ''}`}>
                {!plain && (isDragOver ? 'Drop file' : 'Drag&Drop')}
              </div>
              <div className={`nes-text ${!plain ? 'is-primary' : ''}`}>
                {plain && (plainText ?? 'Load avatar')}
              </div>
              <div className={`nes-text ${!plain ? 'is-primary' : ''}`}>
                {!plain && 'Choose File'}
              </div>
            </div>
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
            data-testid='nes-file-input__input'
            type={type}
            id={id}
            value={value}
            ref={ref}
            className={`${styles['upload-file__input']} nes-pointer`}
            onChange={e => {
              if (onChange) {
                onChange(e)
              }
              setValue(e.target.value)
              const files = e.target.files
              if (files)
                field.onChange(files[0])
            }}
            disabled={plain}
            {...props}
          />
        </div>
      </div>
    )
  }
)

export default NesFileInput
