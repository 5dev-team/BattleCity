import React, { InputHTMLAttributes, useId } from 'react'
import styles from './nes-input.module.scss'

interface INesInputProps extends InputHTMLAttributes<HTMLInputElement> {
  inline?: boolean
  label: string
  variant?: 'basic' | 'primary' | 'success' | 'warning' | 'error' | 'dark'
  fullWidth?: boolean
}

const NesInput: React.FC<INesInputProps> = ({
  inline,
  label,
  variant = 'basic',
  fullWidth,
  ...props
}) => {
  const id = useId()
  return (
    <div className={`nes-field ${inline ? 'is-inline' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={`nes-btn is-${variant} ${styles['nes-btn']}`}
        style={fullWidth ? { width: '100%' } : {}}
        {...props}
      />
    </div>
  )
}

export default NesInput
