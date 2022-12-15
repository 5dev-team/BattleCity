import React, {useId} from 'react'
import styles from './nes-textarea.module.scss'

interface NesTextareaProps {
  label: string
  labelHidden?: boolean
  variant?: 'basic' | 'primary' | 'success' | 'warning' | 'error' | 'dark'
}

const NesTextarea: React.FC<NesTextareaProps> = ({
  label,
  labelHidden,
  variant,
  ...props
}) => {
  const id = useId()

  return (
    <div className={styles['textarea-wrapper']}>
      <label 
        className={`${labelHidden ? 'visually-hidden' : ''} nes-textarea`}
        htmlFor={id}
      >
        {label}
      </label>
      <textarea
        id={id}
        className={`is-${variant} nes-textarea`}
        {...props}
      ></textarea>
    </div>
  )
}

export default NesTextarea
