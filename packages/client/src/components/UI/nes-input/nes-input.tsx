import React, { InputHTMLAttributes, useId, forwardRef } from 'react'
import styles from './nes-input.module.scss'

interface INesInputProps extends InputHTMLAttributes<HTMLInputElement> {
  inline?: boolean
  label: string
  variant?: 'basic' | 'primary' | 'success' | 'warning' | 'error' | 'dark'
  fullWidth?: boolean
  labelHidden?: boolean
  plain?: boolean
}

const NesInput = forwardRef<
  HTMLInputElement, INesInputProps
  >(({ inline, label, variant, fullWidth, labelHidden, plain, ...props}, ref) => {
  const id = useId()
  return (
    <div className={`nes-field ${inline ? 'is-inline' : ''}`}>
      <label
        className={`${labelHidden ? 'visually-hidden' : ''}`}
        htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        ref={ref}
        className={`is-${variant} ${styles['nes-btn']} ${
          plain ? styles['plaintext'] : 'nes-btn'
        }`}
        style={fullWidth ? { width: '100%' } : {}}
        {...props}
      />
    </div>
  )
})

export default NesInput
