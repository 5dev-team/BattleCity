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
import SpriteAtlas from '@/game/sprites/sprite2.png'
import ImageLoader from '@/game/core/sprite'
import { levels as Levels } from '@/game/helpers/levels'
import styles from './game.module.scss'
import { useAppDispatch } from '@/hooks/redux'
import { saveGameScores } from '@/store/slices/game'
import { IGameOverData } from '@/game/core/game-engine/types'
import { fetchUserHighScore } from '@/store/slices/leaderboard'
import { leaderboardDataRequest } from '@/constants/configs/leaderboard'
import { ControllerType } from '@/game/core/types'
import { useAppSelector } from '@/hooks/redux'
import { selectProfile } from '@/store/slices/game/select-game'

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
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [gameView, setView] = useState(GameView.Menu)
  const [stageIndex, setStageIndex] = useState(0)
  const [controllerMode, setControllerMode] =
    useState<ControllerType>(ControllerType.Keyboard)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [online, setOnline] = useState(true)
  
  const gameOverData = useAppSelector(selectProfile)
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

  const initGame = (gameMode: GameMode) => {
    setView(GameView.Game)
  }
  useEffect(() => {
    window.addEventListener('gamepadconnected', setGamepadMode)
    window.addEventListener('gamepaddisconnected', setKeyboardMode)
    return () => {
      window.removeEventListener('gamepadconnected', setGamepadMode)
      window.removeEventListener('gamepaddisconnected', setKeyboardMode)
    }
  }, [])
  
  const setGamepadMode = () => {
    setControllerMode(ControllerType.Gamepad)
  }
  const setKeyboardMode = () => {
    setControllerMode(ControllerType.Keyboard)
  }
  
  const afterGameOver = (value: IGameOverData): void => {
    dispatch(saveGameScores(value))
    setView(GameView.GameOver)
  }
  
  
  const startGame = (game: GameEngine) => {
    game.init(false).then(() => game.start(afterGameOver, controllerMode))
  }
  
  const createGameEngine = (stageIndex: number): GameEngine | undefined => {
    const canvas = canvasRef.current
    
    const spriteAtlasLoader = new ImageLoader(SpriteAtlas)
    
    if (!canvas) {
      return
    }
    return new GameEngine({
      input: new InputHandler(controllerMode),
      view: new View(canvas, spriteAtlasLoader),
      levels: Levels,
      stageIndex: stageIndex
    })
  }
  
  useEffect(() => {
    if (gameView === GameView.Game) {
      dispatch(fetchUserHighScore(leaderboardDataRequest))
      const gameEngine = createGameEngine(stageIndex)
      if (gameEngine) {
        startGame(gameEngine)
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
            {!online && (
              <div
                className={`nes-container is-centered ${styles['offline-warning']} ${styles['flashing']}`}>
                <span className='nes-text is-error' style={{ color: '#f00' }}>
                  OFFLINE
                </span>
              </div>
            )}
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <GameMenu
                selectItemId={0}
                className={`${styles['control-wrapper']} ${styles['control-page-buttons']}`}>
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
                <GameButton onClick={() => navigate('/forum')}>
                  FORUM
                </GameButton>
                <GameButton onClick={() => navigate('/settings')}>
                  SETTINGS
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
            width={512}
            height={480}></canvas>
        )}
        {gameView === GameView.GameOver && (
          <GameOver {...gameOverData}>
            <GameMenu
              selectItemId={0}
              className={styles['game-over-page-buttons']}
            >
              {gameOverData.nextGame ? (
                <GameButton onClick={() => {
                  setStageIndex(stageIndex + 1)
                  setView(GameView.Game)
                }}>
                  NEXT LEVEL
                </GameButton>
              ) : (
                <GameButton onClick={() => {
                  setStageIndex(stageIndex)
                  setView(GameView.Game)
                }}>
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
