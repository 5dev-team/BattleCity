import React, { ButtonHTMLAttributes } from 'react'

interface INesButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'disabled'
  fullWidth?: boolean
}

const NesButton: React.FC<INesButtonProps> = ({
  variant,
  children,
  fullWidth,
  className: outerClassName,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`nes-btn ${variant ? `is-${variant}` : ''} ${
        outerClassName ?? ''
      }`}
      style={fullWidth ? { width: '100%' } : {}}>
      {children}
    </button>
  )
}

export default NesButton
