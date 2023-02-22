import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import GameMenu from '@/components/UI/game-menu/game-menu'
import '@testing-library/jest-dom'
import styles from '@/pages/game/game.module.scss'
import GameButton from '@/components/UI/game-button'

describe('Wrapper GameMenu', () => {
  const setState = jest.fn()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const useStateMock: any = (initState: number) => [initState, setState]
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Should change button on click arrow up and arrow down', async () => {
    jest.spyOn(React, 'useState').mockImplementation(useStateMock)

    const { container, rerender } = await render(
      <GameMenu
        selectItemId={1}
        className={`${styles['control-wrapper']} ${styles['control-page-buttons']}`}
      >
        <GameButton>
          1 PLAYER
        </GameButton>
        <GameButton>
          2 PLAYERS
        </GameButton>
        <GameButton>
          LEADERBOARD
        </GameButton>
        <GameButton>
          PROFILE
        </GameButton>
      </GameMenu>
    )
    expect(setState).toHaveBeenCalledTimes(0)
    fireEvent.keyDown(container, { key: 'ArrowDown', which: 40, keyCode: 40 })
    expect(setState).toHaveBeenCalledTimes(1)
    fireEvent.keyDown(container, { key: 'ArrowDown', which: 40, keyCode: 40 })
    expect(setState).toHaveBeenCalledTimes(2)
    fireEvent.keyDown(container, { key: 'ArrowUp', which: 38, keyCode: 38 })
    expect(setState).toHaveBeenCalledTimes(3)
    await rerender(
      <GameMenu
        selectItemId={0}
        className={`${styles['control-wrapper']} ${styles['control-page-buttons']}`}
      >
        <GameButton>
          1 PLAYER
        </GameButton>
        <GameButton>
          2 PLAYERS
        </GameButton>
        <GameButton>
          LEADERBOARD
        </GameButton>
        <GameButton>
          PROFILE
        </GameButton>
      </GameMenu>
    )
    fireEvent.keyDown(container, { key: 'ArrowUp', which: 38, keyCode: 38 })
    expect(setState).toHaveBeenCalledTimes(3)
    await rerender(
      <GameMenu
        selectItemId={3}
        className={`${styles['control-wrapper']} ${styles['control-page-buttons']}`}
      >
        <GameButton>
          1 PLAYER
        </GameButton>
        <GameButton>
          2 PLAYERS
        </GameButton>
        <GameButton>
          LEADERBOARD
        </GameButton>
        <GameButton>
          PROFILE
        </GameButton>
      </GameMenu>
    )
    fireEvent.keyDown(container, { key: 'ArrowDown', which: 40, keyCode: 40 })
    expect(setState).toHaveBeenCalledTimes(3)
  })
})
