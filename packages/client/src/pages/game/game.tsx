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
import T1 from '@/assets/tanks/T1.png'
import T2 from '@/assets/tanks/T2.png'
import T3 from '@/assets/tanks/T3.png'
import T4 from '@/assets/tanks/T4.png'
import styles from './game.module.scss'
import { useAppDispatch } from '@/hooks/redux'
import { saveGameScores } from '@/store/slices/game'
import { IGameOverData } from '@/game/core/game-engine/types'
import { fetchUserHighScore } from '@/store/slices/leaderboard'
import { leaderboardDataRequest } from '@/constants/configs/leaderboard'

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
  }, [])
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
        T: T1
      },
      {
        P1: { count: 1, total: 200 },
        P2: { count: 1, total: 200 },
        key: 1,
        T: T2
      },
      {
        P1: { count: 1, total: 300 },
        P2: { count: 1, total: 400 },
        key: 2,
        T: T3
      },
      {
        P1: { count: 1, total: 400 },
        P2: { count: 1, total: 400 },
        key: 3,
        T: T4
      }
    ]
  }
  
  const initGame = (gameMode: GameMode) => {
    console.log(`init gameMode: ${GameMode[gameMode]}`)
    
    setView(GameView.Game)
  }
  
  useEffect(() => {
    if (gameView === GameView.Game) {
      dispatch(fetchUserHighScore(leaderboardDataRequest))
      const canvas = canvasRef.current
      
      if (canvas) {
        const viewSprite = new Sprite(SpriteAtlas)
        const game = new GameEngine({
          input: new InputHandler(),
          view: new View(canvas, viewSprite),
          levels: Levels
        })
        
        
        let resolve: (value: IGameOverData | PromiseLike<IGameOverData>) => void
        
        new Promise<IGameOverData>((res, _) => {resolve = res})
        .then(response => {
          dispatch(saveGameScores(response))
          setView(GameView.GameOver)
        })
        .catch(error => console.log(error))
        
        game.init(true).then(() => game.start(resolve))
        
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
