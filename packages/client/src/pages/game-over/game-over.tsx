import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './game-over.module.scss'
import T1 from '@/assets/tanks/T1.png'
import T2 from '@/assets/tanks/T2.png'
import T3 from '@/assets/tanks/T3.png'
import T4 from '@/assets/tanks/T4.png'
import arrow from '@/assets/svg/arrow.svg'

import GameButton from '@/components/UI/game-button'
import GameMenu from '@/components/UI/game-menu/game-menu'

const GameOver: React.FC = () => {
  const navigate = useNavigate()
  type PlayerStatsType = { count: number, total: number }
  type StatsType = Partial<{ P1: PlayerStatsType, P2: PlayerStatsType, key: number, T: string }>

  interface IinputProps {
    nextGame: boolean
    hiScore: number,
    stage: number,
    players: { count: number, totalPts: Partial<{ P1: number, P2: number }> },
    playersStats: StatsType[]
  }

  const props: IinputProps = {
    nextGame: true,
    hiScore: 20000,
    stage: 1,
    players: { count: 2, totalPts: { P1: 1000, P2: 1000 } },
    playersStats: [
      { P1: { count: 1, total: 100 }, P2: { count: 1, total: 100 }, key: 0, T: T1 },
      { P1: { count: 1, total: 200 }, P2: { count: 1, total: 200 }, key: 1, T: T2 },
      { P1: { count: 1, total: 300 }, P2: { count: 1, total: 400 }, key: 2, T: T3 },
      { P1: { count: 1, total: 400 }, P2: { count: 1, total: 400 }, key: 3, T: T4 }
    ]
  }


  const template = props.playersStats.map((value: StatsType) => {
    return (
      <li
        className={`${styles['players-stats__item']} ${props.players.count === 1 ? styles['players-stats__item_one'] : ''} `}
        key={value.key}>
        <div className={styles['players-stats__pts-wrapper']}>
          <p className={styles['players-stats__pts-count']}>{value.P1 ? value.P1.total : 0}</p>
          <p className={styles['players-stats__pts']}>PTS</p>
        </div>
        <div
          className={`${styles['players-stats__type-tank']} ${props.players.count === 1 ? styles['players-stats__type-tank_one'] : ''}`}>
          <p className={styles['players-stats__text']}>{value.P1 ? value.P1.count : 0}</p>
          <img src={arrow} alt='arrow' className={styles['players-stats__arrow']} />
          <img src={value.T} alt='tank' className={styles['players-stats__image-tank']} />
          {props.players.count === 2 &&
            <>
              <img src={arrow} alt='arrow'
                   className={`${styles['players-stats__arrow']} ${styles['players-stats__arrow_p2']}`} />
              <p
                className={`${styles['players-stats__text']} ${styles['players-stats__text_p2']}`}>{value.P2 ? value.P2.count : 0}</p>
            </>
          }
        </div>
        {props.players.count === 2 &&
          <div className={styles['players-stats__pts-wrapper']}>
            <p className={styles['players-stats__pts']}>PTS</p>
            <p
              className={`${styles['players-stats__pts-count']} ${styles['players-stats__pts-count_end']}`}>{value.P2 ? value.P2.total : 0}</p>
          </div>
        }
      </li>
    )
  })

  return (
    <section className={styles['game-over']}>
      <div className={styles['game-over__wrapper']}>
        <div className={styles['header']}>
          <div className={styles['header__common-title']}>
            <h1 className={styles['header__title']}>HI-SCORE</h1>
            <p className={styles['header__score']}>{props.hiScore}</p>
          </div>
          <div className={styles['header__common-subtitle']}>
            <h2 className={styles['header__subtitle']}>STAGE</h2>
            <p className={styles['header__stage']}>{props.stage}</p>
          </div>
        </div>
        <div className={styles['players']}>
          {props.players.count === 1 ? <h3 className={styles['players__common']}>I-Player</h3> : <><h3
            className={styles['players__common']}>I-Player</h3><h3
            className={styles['players__common']}>II-Player</h3></>}
        </div>
        <div className={styles['points-common']}>
          {props.players.count === 1 ?
            <p className={styles['points-common__player']}>{props.players ? props.players.totalPts.P1 : 0}</p> : <> <p
              className={styles['points-common__player']}>{props.players ? props.players.totalPts.P1 : 0}</p><p
              className={`${styles['points-common__player']} ${styles['points-common__player_two']}`}>{props.players ? props.players.totalPts.P2 : 0}</p></>}
        </div>
        <div className={`${styles['players-stats']}`}>
          <ul className={styles['players-stats__lists']}>
            {template}
          </ul>
        </div>
        <div className={`${styles['players-counting']}`}>
          <span className={`${styles['players-counting__line']}`}></span>
          <div className={`${styles['players-counting__wrapper']}`}>
            <div className={`${styles['players-counting__player']}`}>
              <p className={`${styles['players-counting__total']}`}>TOTAL</p>
              <p
                className={`${styles['players-counting__total-count']}`}>{'0'}</p>
            </div>
            {props.players.count === 2 &&
              <div className={`${styles['players-counting__player']}`}>
                <p
                  className={`${styles['players-counting__total-count']}`}>{'0'}</p>
                <p className={`${styles['players-counting__total']}`}>TOTAL</p>
              </div>
            }
          </div>
        </div>
        <GameMenu selectItemId={0} className={styles['button-wrapper']}>
          {props.nextGame ?
            <GameButton onClick={() => navigate('/game')}>
              NEXT LEVEL
            </GameButton> :
            <GameButton onClick={() => navigate('/game')}>
              REPEAT
            </GameButton>
          }
          <GameButton onClick={() => navigate('/leaderboard')}>
            LEADERBOARD
          </GameButton>
          <GameButton onClick={() => navigate('/')}>EXIT</GameButton>
        </GameMenu>
      </div>
    </section>
  )
}

export default GameOver
