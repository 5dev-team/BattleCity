import React, { InputHTMLAttributes, useId } from 'react'
import styles from './nes-input.module.scss'

interface INesInputProps extends InputHTMLAttributes<HTMLInputElement> {
  inline?: boolean
  label: string
  variant?: 'basic' | 'primary' | 'success' | 'warning' | 'error' | 'dark'
  fullWidth?: boolean
  labelHidden?: boolean
  plainText?: boolean
}

const NesInput: React.FC<INesInputProps> = ({
  inline,
  label,
  variant = 'basic',
  fullWidth,
  labelHidden,
  plainText,
  ...props
}) => {
  const id = useId()
  return (
    <div className={`nes-field ${inline ? 'is-inline' : ''}`}>
      <label
        className={`${labelHidden ? styles['visually-hidden'] : ''}`}
        htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className={`is-${variant} ${styles['nes-btn']} ${
          plainText ? styles['plaintext'] : 'nes-btn'
        }`}
        style={fullWidth ? { width: '100%' } : {}}
        {...props}
      />
    </div>
  )
}

export default NesInput
