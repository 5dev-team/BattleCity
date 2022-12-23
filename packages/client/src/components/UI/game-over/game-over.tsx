import React from 'react'
import styles from './game-over.module.scss'
import arrow from '@/assets/svg/arrow.svg'

type PlayerStatsType = { count: number, total: number }
type StatsType = Partial<{ P1: PlayerStatsType, P2: PlayerStatsType, key: number, T: string }>

interface IGameOverProps extends React.HTMLAttributes<HTMLDivElement> {
  nextGame: boolean
  hiScore: number,
  stage: number,
  players: { count: number, totalPts: Partial<{ P1: number, P2: number }> },
  playersStats: StatsType[],
}

const GameOver: React.FC<IGameOverProps> = ({
  ...props
}) => {
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
        {props.children}
      </div>
    </section>
  )
}

export default GameOver
