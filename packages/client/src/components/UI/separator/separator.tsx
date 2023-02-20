import React, { HTMLAttributes } from 'react'
import styles from './separator.module.scss'

interface ISeparatorProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'error' | 'basic'
}

const Separator: React.FC<ISeparatorProps> = ({
  children,
  variant = 'basic',
  ...props
}) => (
  <span
    className={`${styles.separator} ${
      variant === 'error' && styles['separator-error']
    }`}
    {...props}>
    {children}
  </span>
)

export default Separator
