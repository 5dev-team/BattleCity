import React, { ButtonHTMLAttributes, useState } from 'react'
import tankIcon from '@/assets/avatarPlaceholder.png'
import styles from './bc-button.module.scss'

type BCButtonProps = {
  focus?: boolean
  icon?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const BCButton: React.FC<BCButtonProps> = ({
  children,
  focus,
  icon,
  ...props
}) => {
  const [isFocused, setFocus] = useState(!!focus)
  const btnClass = 'bc-btn__button'

  const onFocus = () => {
    setFocus(true)
  }

  const onBlur = (e: React.FocusEvent) => {
    if (e.relatedTarget !== null) {
      setFocus(false)
    } else {
      const btn = e.currentTarget as HTMLButtonElement
      btn.focus()
    }
  }

  return (
    <div className={`${styles['bc-btn']}`}>
      {isFocused && (
        <img className={`${styles['bc-btn__icon']}`}
          src={icon || tankIcon}
          alt={'Pointer Icon'}
        />
      )}
      <button className={`${styles[btnClass]}`}
        autoFocus={isFocused}
        onFocus={onFocus}
        onBlur={e => onBlur(e)}
        {...props}
      >
        {children}
      </button>
    </div>
  )
}

export default BCButton
