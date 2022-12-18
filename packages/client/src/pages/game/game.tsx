import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '@/assets/battleCityLogo.png'
import GameMenu from '@/components/UI/game-menu/game-menu'
import GameButton from '@/components/UI/game-button'
import styles from './game.module.scss'
import ErrorBoundary from '@/components/error-boundary'
import ErrorFallback from '@/components/UI/error-fallback'

const initGame = (players = 1) => {
  console.log(`init game players: ${players}`)
}

const Game: React.FC = () => {

  const navigate = useNavigate()
  console.log('game')
  return (
    <div className={styles['game']}>
      <div className={styles['game__container']}>
        <img className={`${styles['logo']}`}
          src={logo}
          alt={'Battle City'}
          style={{ imageRendering: 'pixelated' }}
        />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <GameMenu selectItemId={0} className={`${styles['control-wrapper']} ${styles['control-page-buttons']}`}>
            <GameButton onClick={() => initGame()}>
              1 PLAYER
            </GameButton>
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
      </div>
    </div>
  )
}

export default Game
