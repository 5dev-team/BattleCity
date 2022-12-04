import BCButton from '@/components/UI/bc-button'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '@/assets/battleCityLogo.png'
import styles from './game.module.scss'

const initGame = (players = 1) => {
  console.log(`init game players: ${players}`)
}

const Game: React.FC = () => {
  const [activeBtnId, setState] = useState(-1)

  useEffect(() => {
    return () => {
      if (activeBtnId !== -1) arrowController.abort()
    }
  })

  const navigate = useNavigate()
  const arrowController = new AbortController()

  const btnListRef = (node: HTMLUListElement | null) => {
    if (node !== null) {
      const buttons = Array.from(
        node.querySelectorAll<HTMLButtonElement>('button')
      )

      const listener = (e: KeyboardEvent) => {
        changeActiveBtn(buttons, e, () => {
          arrowController.abort()
        })
      }

      node.addEventListener('keydown', listener, {
        signal: arrowController.signal,
      })
    }
  }

  const changeActiveBtn = (buttons: HTMLButtonElement[], e: KeyboardEvent, onChange: () => void): boolean => {
    e.preventDefault()

    const activeId = buttons.findIndex(btn => btn === document.activeElement)

    if (activeId !== -1) {
      let nextBtn: HTMLButtonElement | undefined
      let nextId: number = activeId
  
      if (e.key === 'ArrowUp') {
        nextBtn = buttons[(nextId = activeId - 1)]
      } 
      else if (e.key === 'ArrowDown' || e.key === 'Tab') {
        nextBtn = buttons[(nextId = activeId + 1)]
      }

      if (nextBtn !== undefined) {
        buttons[nextId].focus()
        onChange()
        setState(nextId)
        return true
      }
    }

    return false
  }

  return (
    <div className={styles['game']}>
      <div className={styles['game__container']}>
        <img className={`${styles['logo']}`}
          src={logo}
          alt={'Battle City'}
          style={{ imageRendering: 'pixelated' }}
        />
        <ul className={`${styles['control-wrapper']} ${styles['control-page-buttons']}`}
          ref={btnListRef}
        >
          <li>
            <BCButton onClick={() => initGame()} focus>
              1 PLAYER
            </BCButton>
          </li>
          <li>
            <BCButton onClick={() => initGame(2)}>2 PLAYERS</BCButton>
          </li>
          <li>
            <BCButton onClick={() => navigate('/leaderboard')}>
              LEADERBOARD
            </BCButton>
          </li>
        </ul>
        <footer className={`${styles['footer']}`}>
          <h2>© 1980 1985 5DEV LTD.</h2>
          <h2>ALL RIGHTS RESERVED</h2>
        </footer>
      </div>
    </div>
  )
}

export default Game
