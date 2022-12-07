import React from 'react'
import { useNavigate } from 'react-router-dom'
import NesButton from '@/components/UI/nes-button'
import styles from './screen-game-over.module.scss'
import T0 from '@/assets/tanks/1T.png'
import T1 from '@/assets/tanks/2T.png'
import T2 from '@/assets/tanks/3T.png'
import T3 from '@/assets/tanks/4T.png'

const ScreenGameOver: React.FC = () => {
  const navigate = useNavigate()
  type inputProps = {
    hiScore: number,
    stage: number,
    players: number,
    playersStats: { P1: number, P2: number, key: number, T: string }[];
  }

  const props: inputProps = {
    hiScore: 20000,
    stage: 1,
    players: 2,
    playersStats: [
      { P1: 10000, P2: 25000, key: 0, T: T0 },
      { P1: 0, P2: 0, key: 1, T: T1 },
      { P1: 10000, P2: 0, key: 2, T: T2 },
      { P1: 10000, P2: 0, key: 3, T: T3 }
    ]
  }

  const template = props.playersStats.map((value) => {
    return (
      <li className={styles['players-stats__item']} key={value.key}>
        <div className={styles['players-stats__pts-wrapper']}>
          <p className={styles['players-stats__pts-count']}>{value.P1}</p>
          <p className={styles['players-stats__pts']}>PTS</p>
        </div>
        <div
          className={`${styles['players-stats__type-tank']} ${props.players === 1 && styles['players-stats__type-tank_one']}`}>
          <p className={styles['players-stats__text']}>{value.P1}</p>
          <p className={styles['players-stats__arrow']}>🡄</p>
          <img src={value.T} alt='танк' className={styles['players-stats__image-tank']} />
          {props.players === 2 &&
            <>
              <p className={`${styles['players-stats__arrow']} ${styles['players-stats__arrow_p2']}`}>🡄</p>
              <p className={`${styles['players-stats__text']} ${styles['players-stats__text_p2']}`}>{value.P2}</p>
            </>
          }
        </div>
        {props.players === 2 &&
          <div className={styles['players-stats__pts-wrapper']}>
            <p className={styles['players-stats__pts']}>PTS</p>
            <p
              className={`${styles['players-stats__pts-count']} ${styles['players-stats__pts-count_end']}`}>{value.P2}</p>
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
          {props.players === 1 ? <h3 className={styles['players__common']}>I Player</h3> : <><h3
            className={styles['players__common']}>I
            Player</h3><h3 className={styles['players__common']}>II Player</h3></>}
        </div>
        <div className={styles['points-common']}>
          {props.players === 1 ?
            <p className={`${styles['points-common__player']} ${styles['points-common__player_one']}`}>0</p> : <> <p
              className={styles['points-common__player']}>0</p><p className={styles['points-common__player']}>0</p></>}
        </div>
        <div className={`${styles['players-stats']} ${props.players === 1 && styles['players-stats_one-player']}`}>
          <ul className={styles['players-stats__lists']}>
            {template}
          </ul>
        </div>
        <div className={`${styles['players-counting']}`}>
          <span className={`${styles['players-counting__line']}`}></span>
          <div className={`${styles['players-counting__wrapper']}`}>
            <div className={`${styles['players-counting__player']}`}>
              <p className={`${styles['players-counting__total']}`}>TOTAL</p>
              <p className={`${styles['players-counting__total-count']}`}>0</p>
            </div>
            {props.players === 2 &&
              <div className={`${styles['players-counting__player']}`}>
                <p className={`${styles['players-counting__total-count']}`}>0</p>
                <p className={`${styles['players-counting__total']}`}>TOTAL</p>
              </div>
            }
          </div>
        </div>
        <div className={styles['button-wrapper']}>
          <NesButton
            onClick={() => navigate('/game')}
            type='button'>
            repeat
          </NesButton>
          <NesButton
            variant='primary'
            onClick={() => navigate('/')}
            type='button'>
            exit
          </NesButton>
        </div>
      </div>
    </section>
  )
}

export default ScreenGameOver
