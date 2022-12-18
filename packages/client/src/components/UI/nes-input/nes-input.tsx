import React, { InputHTMLAttributes, useId } from 'react'
import styles from './nes-input.module.scss'

interface INesInputProps extends InputHTMLAttributes<HTMLInputElement> {
  inline?: boolean
  label: string
  variant?: 'basic' | 'primary' | 'success' | 'warning' | 'error' | 'dark'
  fullWidth?: boolean
  labelHidden?: boolean
  plain?: boolean
}

const NesInput = React.forwardRef<
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
        className={`nes-input is-${variant} ${styles['nes-btn']} ${
          plain ? styles['plaintext'] : 'nes-btn'
        }`}
        readOnly={plain}
        style={fullWidth ? { width: '100%' } : {}}
        {...props}
      />
    </div>
  )
})

export default NesInput
