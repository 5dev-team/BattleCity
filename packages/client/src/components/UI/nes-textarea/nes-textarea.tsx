import React, {useId} from 'react'
import styles from './nes-textarea.module.scss'

interface INesTextareaProps {
  variant?: 'basic' | 'primary' | 'success' | 'warning' | 'error' | 'dark'
  value?: string
}

const NesTextarea: React.FC<INesTextareaProps> = ({
  variant,
  value,
  ...props
}) => {
  const id = useId()

  return (
    <div className={styles['textarea-wrapper']}>
      <div
        dangerouslySetInnerHTML={{__html: `${value}`}}
        id={id}
        className={`is-${variant} nes-textarea ${styles['textarea-input']}`}
        contentEditable='true'
        {...props}
      ></div>
    </div>
  )
}

export default NesTextarea
