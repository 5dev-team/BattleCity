import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '@/assets/battleCityLogo.png'
import GameMenu from '@/components/UI/game-menu/game-menu'
import GameButton from '@/components/UI/game-button'
import GameOver from '@/components/UI/game-over'
import ErrorBoundary from '@/components/error-boundary'
import ErrorFallback from '@/components/UI/error-fallback'
import GameEngine from '@/game/core/game-engine'
import { InputHandler } from '@/game/core/input'
import View from '@/game/core/view'
import SpriteAtlas from '@/game/sprites/sprite_1.png'
import Sprite from '@/game/core/sprite'
import { levels as Levels } from '@/game/helpers/levels'
import styles from './game.module.scss'

enum GameView {
  Menu,
  Game,
  GameOver,
}

enum GameMode {
  Singleplayer,
  Multiplayer,
  GameOver,
}

const Game: React.FC = () => {
  const navigate = useNavigate()
  const [gameView, setView] = useState(GameView.Menu)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [online, setOnline] = useState(true)
  useEffect(() => {
    window.addEventListener('offline', () => {
      setOnline(false)
    })

    window.addEventListener('online', () => {
      setOnline(true)
    })

    return () => {
      window.removeEventListener('offline', () => {
        setOnline(false)
      })

      window.removeEventListener('online', () => {
        setOnline(true)
      })

    }
  },[])

  const initialState = {
    nextGame: false,
    stage: 1,
    playersCount: 2,
    bestScore: 0,
    player1: {
      user: 3213213,
      scores: {
        1: { count: 2, points: 200 },
        2: { count: 3, points: 600 },
        3: { count: 4, points: 1200 },
        4: { count: 5, points: 2000 }
      },
      total: 7000
    },
    player2: {
      user: 3213123,
      scores: {
        1: { count: 2, points: 200 },
        2: { count: 3, points: 600 },
        3: { count: 4, points: 1200 },
        4: { count: 5, points: 2000 }
      },
      total: 7000
    }
  }

  const initGame = (gameMode: GameMode) => {
    console.log(`init gameMode: ${GameMode[gameMode]}`)

    setView(GameView.Game)
  }

  useEffect(() => {
    if (gameView === GameView.Game) {
      const canvas = canvasRef.current

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

          setView(GameView.GameOver)
        }, 5000)
      }
    }
  }, [gameView])

  return (
    <div className={styles['game']}>
      <div className={styles['game__container']}>
        {gameView === GameView.Menu && (
          <>
            <img
              className={`${styles['logo']}`}
              src={logo}
              alt={'Battle City'}
              style={{ imageRendering: 'pixelated' }}
            />
            {!online && <div className={`nes-container is-centered ${styles['offline-warning']} ${styles['flashing']}`}>
              <span className='nes-text is-error' style={{ color: '#f00' }}>OFFLINE</span>
            </div>}
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <GameMenu
                selectItemId={0}
                className={`${styles['control-wrapper']} ${styles['control-page-buttons']}`}
              >
                <GameButton onClick={() => initGame(GameMode.Singleplayer)}>
                  1 PLAYER
                </GameButton>
                <GameButton onClick={() => initGame(GameMode.Multiplayer)}>
                  2 PLAYERS
                </GameButton>
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
        {gameView === GameView.Game && (
          <canvas
            className={styles['game__canvas']}
            ref={canvasRef}
            width={640}
            height={640}
          ></canvas>
        )}
        {gameView === GameView.GameOver && (
          <GameOver {...initialState}>
            <GameMenu
              selectItemId={0}
              className={styles['game-over-page-buttons']}
            >
              {initialState.nextGame ? (
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
              <GameButton onClick={() => setView(GameView.Menu)}>
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
