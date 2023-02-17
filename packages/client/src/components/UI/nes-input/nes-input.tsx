import React, { InputHTMLAttributes, useId } from 'react'
import styles from './nes-input.module.scss'

interface INesInputProps extends InputHTMLAttributes<HTMLInputElement> {
  inline?: boolean
  label: string
  errorText?: string
  variant?: 'basic' | 'primary' | 'success' | 'warning' | 'error' | 'dark'
  fullWidth?: boolean
  labelHidden?: boolean
  plain?: boolean
}

const NesInput = React.forwardRef<HTMLInputElement, INesInputProps>(
  (
    { inline, label, variant, fullWidth, labelHidden, errorText, plain, ...props },
    ref
  ) => {
    const id = useId()
    return (
      <div data-testid='nes-input__field' className={`nes-field ${inline ? 'is-inline' : ''}`}>
        <label
          data-testid='nes-input__label'
          className={`${styles['nes-input__label']} ${labelHidden ? 'visually-hidden' : ''}`}
          htmlFor={id}
        >
          {label}
          {errorText && <span className='nes-text is-error' style={{fontSize: '.7rem'}}>{errorText}</span>}
        </label>

        <input
          data-testid='nes-input__input'
          id={id}
          ref={ref}
          className={`nes-input ${variant ? `is-${variant}` : ''} ${
            styles['nes-input__input']
          } ${plain ? styles['plaintext'] : 'nes-btn'}`}
          readOnly={plain}
          style={fullWidth ? { width: '100%' } : {}}
          {...props}
        />
      </div>
    )
  }
)

export default NesInput
