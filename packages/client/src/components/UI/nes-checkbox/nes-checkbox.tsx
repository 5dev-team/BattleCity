import React, { InputHTMLAttributes } from 'react'

interface INesCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const NesCheckbox = React.forwardRef<HTMLInputElement, INesCheckboxProps>(
  ({ label, ...props }, ref) => {
    return (
      <label>
        <input
          type='checkbox'
          ref={ref}
          className={'nes-checkbox is-dark'}
          {...props}
        />
        <span>{label}</span>
      </label>
    )
  }
)

export default NesCheckbox
