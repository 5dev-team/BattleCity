import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '@/assets/battleCityLogo.png'
import GameMenu from '@/components/UI/game-menu/game-menu'
import GameButton from '@/components/UI/game-button'
import styles from './game.module.scss'
import ErrorBoundary from '@/components/error-boundary'
import ErrorFallback from '@/components/UI/error-fallback'
import { GameEngine } from '@/game/classesGame/Game'
import { InputHandler } from '@/game/classesGame/Input'
import View from '@/game/classesGame/View'
import SpriteAtlas from '@/game/spriteGame/sprite_1.png'
import Sprite from '@/game/classesGame/Sprite'
import { levels as Levels } from '@/game/helpersGame/levels'
import T1 from '@/assets/tanks/T1.png'
import T2 from '@/assets/tanks/T2.png'
import T3 from '@/assets/tanks/T3.png'
import T4 from '@/assets/tanks/T4.png'
import GameOver from '@/components/UI/game-over'

enum GameMode {
  Menu,
  Game,
  GameOver,
}

const Game: React.FC = () => {
  const navigate = useNavigate()
  const [mode, setMode] = useState(GameMode.Menu)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const gameOverProps = {
    nextGame: true,
    hiScore: 20000,
    stage: 1,
    players: { count: 2, totalPts: { P1: 1000, P2: 1000 } },
    playersStats: [
      {
        P1: { count: 1, total: 100 },
        P2: { count: 1, total: 100 },
        key: 0,
        T: T1,
      },
      {
        P1: { count: 1, total: 200 },
        P2: { count: 1, total: 200 },
        key: 1,
        T: T2,
      },
      {
        P1: { count: 1, total: 300 },
        P2: { count: 1, total: 400 },
        key: 2,
        T: T3,
      },
      {
        P1: { count: 1, total: 400 },
        P2: { count: 1, total: 400 },
        key: 3,
        T: T4,
      },
    ],
  }

  const initGame = (players = 1) => {
    console.log(`init game players: ${players}`)

    setMode(GameMode.Game)
  }

  useEffect(() => {
    if (mode === GameMode.Game) {
      const canvas = canvasRef.current

      console.log(canvas)

      if (canvas) {
        const viewSprite = new Sprite(SpriteAtlas)
        const game = new GameEngine({
          input: new InputHandler(),
          view: new View(canvas, viewSprite),
          levels: Levels,
        })

        game.init().then(() => game.start())

        setTimeout(() => {
          game.end()

          setMode(GameMode.GameOver)
        }, 5000)
      }
    }
  }, [mode])

  return (
    <div className={styles['game']}>
      <div className={styles['game__container']}>
        {mode === GameMode.Menu && (
          <>
            <img
              className={`${styles['logo']}`}
              src={logo}
              alt={'Battle City'}
              style={{ imageRendering: 'pixelated' }}
            />
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <GameMenu
                selectItemId={0}
                className={`${styles['control-wrapper']} ${styles['control-page-buttons']}`}
              >
                <GameButton onClick={() => initGame()}>1 PLAYER</GameButton>
                <GameButton onClick={() => initGame(2)}>2 PLAYERS</GameButton>
                <GameButton onClick={() => navigate('/leaderboard')}>
                  LEADERBOARD
                </GameButton>
                <GameButton onClick={() => navigate('/profile')}>
                  PROFILE
                </GameButton>
              </GameMenu>
            </ErrorBoundary>
            <footer className={`${styles['footer']}`}>
              <h2>© 1980 1985 5DEV LTD.</h2>
              <h2>ALL RIGHTS RESERVED</h2>
            </footer>
          </>
        )}
        {mode === GameMode.Game && (
          <canvas ref={canvasRef} width={640} height={640}></canvas>
        )}
        {mode === GameMode.GameOver && (
          <GameOver {...gameOverProps}>
            <GameMenu
              selectItemId={0}
              className={styles['game-over-page-buttons']}
            >
              {gameOverProps.nextGame ? (
                <GameButton onClick={() => console.log('load next level')}>
                  NEXT LEVEL
                </GameButton>
              ) : (
                <GameButton onClick={() => console.log('restart level')}>
                  RESTART
                </GameButton>
              )}
              <GameButton onClick={() => navigate('/leaderboard')}>
                LEADERBOARD
              </GameButton>
              <GameButton onClick={() => setMode(GameMode.Menu)}>
                MENU
              </GameButton>
            </GameMenu>
          </GameOver>
        )}
      </div>
    </div>
  )
}

export default Game
