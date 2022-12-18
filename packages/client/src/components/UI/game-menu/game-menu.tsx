import React, { useEffect, useRef, useState } from 'react'
import GameButton from '@/components/UI/game-button'
import tankIcon from '@/assets/avatarPlaceholder.png'

type Props = {
  selectItemId: number
} & React.HTMLAttributes<HTMLDivElement>

const GameMenu: React.FC<Props> = ({ selectItemId, ...props }) => {
  const [selectedId, setState] = useState<number>(selectItemId)
  const buttonsRefs = useRef<HTMLButtonElement[]>([])

  useEffect(() => {
    const listener = (e: KeyboardEvent) => changeActiveBtn(e)

    document.addEventListener('keydown', listener)

    return () => document.removeEventListener('keydown', listener)
  }, [selectedId])

  const changeActiveBtn = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      buttonsRefs.current[selectedId].click()
      return
    }

    let nextId: number = selectedId

    if (e.key === 'ArrowUp') nextId = selectedId - 1
    else if (e.key === 'ArrowDown') nextId = selectedId + 1
    else return

    if (nextId > -1 && nextId < buttonsRefs.current.length) setState(nextId)
  }

  return (
    <div {...props}>
      {React.Children.map(props.children, (child, index) => {
        if (!React.isValidElement(child) || child.type !== GameButton)
          throw new Error('Children should be of type `GameButton`.')

        return (
          <GameButton
            ref={element => {
              if (element) buttonsRefs.current[index] = element
            }}
            key={index}
            icon={index === selectedId ? tankIcon : undefined}
            {...child.props}
          />
        )
      })}
    </div>
  )
}

export default GameMenu
