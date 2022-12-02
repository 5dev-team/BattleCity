import React, { ButtonHTMLAttributes, useState } from 'react'
import tankIcon from '../../../assets/avatarPlaceholder.png'
import styles from './bc-button.module.scss'

interface IBCButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  focus?: boolean
  icon?: string
}

const BCButton: React.FC<IBCButtonProps> = ({
  children,
  focus,
  icon,
  ...props
}) => {
  const [isFocused, setFocus] = useState(focus ? true : false)
  const btnClass = 'bc-btn__button'
  const arrowController = new AbortController()

  const tryChangeFocus = (element: ChildNode | null | undefined) => {
    if (element instanceof HTMLButtonElement) {
      element.focus()
      arrowController.abort()
    }
  }

  const btnRef = (node: HTMLButtonElement) => {
    const listener = (e: KeyboardEvent) => onArrow(node, e)
    node?.addEventListener('keydown', listener, {
      signal: arrowController.signal,
    })
  }

  const onArrow = (button: HTMLButtonElement, e: KeyboardEvent) => {
    if (isFocused) {
      const parent = button.parentNode
      let nextBtn: ChildNode | null | undefined

      if (e.key === 'ArrowUp') {
        nextBtn = parent?.previousSibling?.lastChild
      } 
      else if (e.key === 'ArrowDown') {
        nextBtn = parent?.nextSibling?.lastChild
      }

      tryChangeFocus(nextBtn)
    }
  }

  const onFocus = () => {
    setFocus(true)
  }
  const onBlur = () => {
    setFocus(false)
  }

  return (
    <div className={`${styles['bc-btn']}`}>
      {isFocused && (
        <img className={`${styles['bc-btn__icon']}`} src={icon || tankIcon} />
      )}
      <button
        ref={btnRef}
        className={`${styles[btnClass]}`}
        autoFocus={isFocused}
        onFocus={onFocus}
        onBlur={onBlur}
        {...props}
      >
        {children}
      </button>
    </div>
  )
}

export default BCButton
