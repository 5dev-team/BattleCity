import React, { HTMLAttributes, useId } from 'react'
import styles from './nes-textarea.module.scss'

interface INesTextareaProps extends HTMLAttributes<HTMLDivElement> {
  value: string
}

const NesTextarea: React.FC<INesTextareaProps> = ({
  value,
  onInput,
  className: outerClassName,
}) => {
  const id = useId()
  return (
    <div
      id={id}
      className={`${styles['textarea-input']} ${outerClassName ?? ''}`}
      dangerouslySetInnerHTML={{ __html: value }}
      contentEditable
      onInput={onInput}
    />
  )
}

export default NesTextarea
