import React, { InputHTMLAttributes, useId } from 'react'

interface INesInputProps extends InputHTMLAttributes<HTMLInputElement> {
  inline?: boolean,
  label?: string,
  variant?: 'basic' | 'primary' | 'success' | 'warning' | 'error' | 'dark',
  fullWidth?: boolean
}

const NesInput: React.FC<INesInputProps> = ({ inline, label, variant = 'basic', fullWidth, ...props }) => {
  const id = useId()
  return (
    <div className={`nes-field ${inline ? 'is-inline' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} className={`nes-btn is-${variant}`} style={fullWidth ? { width: '100%' } : {}} />
    </div>
  )
}

export default NesInput
