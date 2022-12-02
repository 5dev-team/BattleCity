import BCButton from '@/components/UI/bc-button'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/battleCityLogo.png'

import styles from './game.module.scss'

const initGame = () => {
  console.log('init game')
}

const Game: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className={styles['game']}>
      <div className={styles['game__container']}>
        <img
          className={`${styles['logo']}`}
          src={logo}
          alt={'Battle City'}
          style={{ imageRendering: 'pixelated' }}
        />
        <div
          className={`${styles['control-wrapper']} ${styles['control-page-buttons']}`}
        >
          <BCButton onClick={initGame} focus>1 PLAYER</BCButton>
          <BCButton>2 PLAYERS</BCButton>
          <BCButton onClick={() => navigate('/leaderboard')}>LEADERBOARD</BCButton>
        </div>
        <footer className={`${styles['footer']}`}>
          <h2>© 1980 1985 5DEV LTD.</h2>
          <h2>ALL RIGHTS RESERVED</h2>
        </footer>
      </div>
    </div>
  )
}

export default Game
