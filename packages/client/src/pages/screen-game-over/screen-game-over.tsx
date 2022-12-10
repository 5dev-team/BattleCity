import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './screen-game-over.module.scss'
import T1 from '@/assets/tanks/T1.png'
import T2 from '@/assets/tanks/T2.png'
import T3 from '@/assets/tanks/T3.png'
import T4 from '@/assets/tanks/T4.png'
import arrow from '@/assets/svg/arrow.svg'

import GameButton from '@/components/UI/game-button'
import GameMenu from '@/components/UI/game-menu/game-menu'

const ScreenGameOver: React.FC = () => {
  const navigate = useNavigate()

  type Stats = Partial<{ P1: number, P2: number, key: number, T: string }>

  interface IinputProps {
    nextGame: boolean
    hiScore: number,
    stage: number,
    players: number,
    playersStats: Stats[]
  }

  const props: IinputProps = {
    nextGame: true,
    hiScore: 20000,
    stage: 1,
    players: 2,
    playersStats: [
      { P1: 0, P2: 1, key: 0, T: T1 },
      { P1: 1, P2: 1, key: 1, T: T2 },
      { P1: 1, P2: 1, key: 2, T: T3 },
      { P1: 20, P2: 4, key: 3, T: T4 }
    ]
  }

  const totalPts: Partial<{ P1: number, P2: number }> = props.players == 1 ?
    props.playersStats.reduce((acc: { P1: number }, value: Stats, index: number) => {
      if (value.P1 !== undefined) {
        acc.P1 = acc.P1 + value.P1 * (100 * (index + 1))
      }
      return acc
    }, { P1: 0 }) :
    props.playersStats.reduce((acc: { P1: number, P2: number }, value: Stats, index: number) => {
      if (value.P1 !== undefined) {
        acc.P1 = acc.P1 + value.P1 * (100 * (index + 1))
      }
      if (value.P2 != undefined) {
        acc.P2 = acc.P2 + value.P2 * (100 * (index + 1))
      }
      return acc
    }, { P1: 0, P2: 0 })


  const template = props.playersStats.map((value: Stats, index: number) => {
    return (
      <li className={`${styles['players-stats__item']} ${props.players === 1 && styles['players-stats__item_one']}`}
          key={value.key}>
        <div className={styles['players-stats__pts-wrapper']}>
          <p className={styles['players-stats__pts-count']}>{value.P1 ? (value.P1 * (100 * (index + 1))) : 0}</p>
          <p className={styles['players-stats__pts']}>PTS</p>
        </div>
        <div
          className={`${styles['players-stats__type-tank']} ${props.players === 1 && styles['players-stats__type-tank_one']}`}>
          <p className={styles['players-stats__text']}>{value.P1 ? value.P1 : 0}</p>
          <img src={arrow}  alt='arrow' className={styles['players-stats__arrow']}/>
          <img src={value.T} alt='tank' className={styles['players-stats__image-tank']} />
          {props.players === 2 &&
            <>
              <img src={arrow}  alt='arrow' className={`${styles['players-stats__arrow']} ${styles['players-stats__arrow_p2']}`}/>
              <p
                className={`${styles['players-stats__text']} ${styles['players-stats__text_p2']}`}>{value.P2 ? value.P2 : 0}</p>
            </>
          }
        </div>
        {props.players === 2 &&
          <div className={styles['players-stats__pts-wrapper']}>
            <p className={styles['players-stats__pts']}>PTS</p>
            <p
              className={`${styles['players-stats__pts-count']} ${styles['players-stats__pts-count_end']}`}>{value.P2 ? value.P2 * (100 * (index + 1)) : 0}</p>
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
          {props.players === 1 ? <h3 className={styles['players__common']}>I-Player</h3> : <><h3
            className={styles['players__common']}>I-Player</h3><h3
            className={styles['players__common']}>II-Player</h3></>}
        </div>
        <div className={styles['points-common']}>
          {props.players === 1 ?
            <p className={styles['points-common__player']}>{totalPts.P1}</p> : <> <p
              className={styles['points-common__player']}>{totalPts.P1}</p><p
              className={`${styles['points-common__player']} ${styles['points-common__player_two']}`}>{totalPts.P2}</p></>}
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
                className={`${styles['players-counting__total-count']}`}>{props.playersStats.reduce((acc: number, val: Stats) => {
                if (val.P1) {
                  return acc + val.P1
                }
                return acc
              }, 0)}</p>
            </div>
            {props.players === 2 &&
              <div className={`${styles['players-counting__player']}`}>
                <p
                  className={`${styles['players-counting__total-count']}`}>{props.playersStats.reduce((acc: number, val: Stats) => {
                  if (val.P2) {
                    return acc + val.P2
                  }
                  return acc
                }, 0)}</p>
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

export default ScreenGameOver
