import { ButtonHTMLAttributes, forwardRef } from 'react'
import styles from './game-button.module.scss'

type Props = {
  icon?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const GameButton = forwardRef<HTMLButtonElement, Props>(({
  children,
  icon,
  ...props
}, ref) => {
  const btnClass = 'bc-btn__button'

  return (
    <div className={`${styles['bc-btn']}`}>
      {icon && (
        <img className={`${styles['bc-btn__icon']}`}
          src={icon}
          alt={'Pointer Icon'}
        />
      )}
      <button ref={ref} className={`${styles[btnClass]}`}
        {...props}
      >
        {children}
      </button>
    </div>
  )
})

export default GameButton
