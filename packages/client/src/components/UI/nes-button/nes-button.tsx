import React, { ButtonHTMLAttributes } from 'react'

interface INesButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'disabled'
  fullWidth?: boolean
}

const NesButton: React.FC<INesButtonProps> = ({ variant, children, fullWidth, ...props }) => {
  return (
    <button
      className={`nes-btn ${variant ? `is-${variant}`: ''}`}
      style={fullWidth ? { width: '100%' } : {}}
      {...props}>
      {children}
    </button>
  )
}

export default NesButton
