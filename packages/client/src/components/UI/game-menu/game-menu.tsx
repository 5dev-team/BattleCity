import React, { useState, useEffect } from 'react'
import GameButton from '@/components/UI/game-button'
import tankIcon from '@/assets/avatarPlaceholder.png'

type Props = {
  activeBtnId: number
} & React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

const GameMenu: React.FC<React.PropsWithChildren<Props>> = ({
  activeBtnId,
  ...props
}) => {
  const [activeBtn, setState] = useState(activeBtnId)
  const buttonsRefs = React.useRef<HTMLButtonElement[]>([])

  useEffect(() => {
    const listener = (e: KeyboardEvent) => changeActiveBtn(e)

    document.addEventListener('keydown', listener)

    return () => document.removeEventListener('keydown', listener)
  }, [activeBtn])

  const changeActiveBtn = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      buttonsRefs.current[activeBtn].click()
      return
    }

    let nextId: number = activeBtn

    if (e.key === 'ArrowUp') nextId = activeBtn - 1
    else if (e.key === 'ArrowDown') nextId = activeBtn + 1
    else return

    if (nextId > -1 && nextId < buttonsRefs.current.length) setState(nextId)
  }

  return (
    <div {...props}>
      {React.Children.map(props.children, (child, index) =>
        React.isValidElement<typeof GameButton>(child) ? (
          <GameButton
            ref={element => {
              if (element) buttonsRefs.current[index] = element
            }}
            key={index}
            icon={index === activeBtn ? tankIcon : undefined}
            {...child.props}
          />
        ) : null
      )}
    </div>
  )
}

export default GameMenu
