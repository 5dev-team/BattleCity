import React from 'react'
import styles from './game-over.module.scss'
import T1 from '@/assets/tanks/T1.png'
import T2 from '@/assets/tanks/T2.png'
import T3 from '@/assets/tanks/T3.png'
import T4 from '@/assets/tanks/T4.png'
import arrow from '@/assets/svg/arrow.svg'

const tanks: string[] = [T1, T2, T3, T4]

type scoresType = {
  [key: number]: { count: number, points: number },
}

type playerType = { user: null | number, total: number, scores: scoresType }

interface IGameOverProps extends React.HTMLAttributes<HTMLDivElement> {
  nextGame: boolean
  bestScore: number,
  stage: number,
  playersCount: number,
  player1: playerType,
  player2?: playerType,
}


const GameOver: React.FC<IGameOverProps> = ({
                                              ...props
                                            }) => {

  const template: JSX.Element[] = []
  for (const key in props.player1.scores) {
    const item = Number(key)
    template.push(
      <li
        className={`${styles['players-stats__item']} ${props.playersCount === 1 ? styles['players-stats__item_one'] : ''} `}
        key={`${key}-${props.player1.user}`}>
        <div className={styles['players-stats__pts-wrapper']}>
          <p
            className={styles['players-stats__pts-count']}>{props.player1.scores[item] ? props.player1.scores[item].points : 0}</p>
          <p className={styles['players-stats__pts']}>PTS</p>
        </div>
        <div
          className={`${styles['players-stats__type-tank']} ${props.playersCount === 1 ? styles['players-stats__type-tank_one'] : ''}`}>
          <p
            className={styles['players-stats__text']}>{props.player1.scores[item] ? props.player1.scores[item].count : 0}</p>
          <img src={arrow} alt='arrow' className={styles['players-stats__arrow']} />
          <img src={tanks[item - 1]} alt='tank' className={styles['players-stats__image-tank']} />
          {props.playersCount === 2 &&
            <>
              <img src={arrow} alt='arrow'
                   className={`${styles['players-stats__arrow']} ${styles['players-stats__arrow_p2']}`} />
              <p
                className={`${styles['players-stats__text']} ${styles['players-stats__text_p2']}`}>{props.player2?.scores[item] ? props.player2?.scores[item].count : 0}</p>
            </>
          }
        </div>
        {props.playersCount === 2 &&
          <div className={styles['players-stats__pts-wrapper']}>
            <p className={styles['players-stats__pts']}>PTS</p>
            <p
              className={`${styles['players-stats__pts-count']} ${styles['players-stats__pts-count_end']}`}>{props.player2?.scores[item] ? props.player2?.scores[item].count : 0}</p>
          </div>
        }
      </li>
    )
  }

  return (
    <section className={styles['game-over']}>
      <div className={styles['game-over__wrapper']}>
        <div className={styles['header']}>
          <div className={styles['header__common-title']}>
            <h1 className={styles['header__title']}>HI-SCORE</h1>
            <p className={styles['header__score']}>{props.bestScore}</p>
          </div>
          <div className={styles['header__common-subtitle']}>
            <h2 className={styles['header__subtitle']}>STAGE</h2>
            <p className={styles['header__stage']}>{props.stage}</p>
          </div>
        </div>
        <div className={styles['players']}>
          {props.playersCount === 1 ? <h3 className={styles['players__common']}>I-Player</h3> : <><h3
            className={styles['players__common']}>I-Player</h3><h3
            className={styles['players__common']}>II-Player</h3></>}
        </div>
        <div className={styles['points-common']}>
          {props.playersCount === 1 ?
            <p className={styles['points-common__player']}>{props.player1 ? props.player1.total : 0}</p> : <> <p
              className={styles['points-common__player']}>{props.player1 ? props.player1.total : 0}</p><p
              className={`${styles['points-common__player']} ${styles['points-common__player_two']}`}>{props.player2 ? props.player2.total : 0}</p></>}
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
            {props.playersCount === 2 &&
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
