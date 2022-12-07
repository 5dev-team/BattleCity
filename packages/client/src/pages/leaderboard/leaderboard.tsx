import React from 'react'
import styles from './leaderboard.module.scss'
import NesButton from '../../components/UI/nes-button'
import NesAvatar from '../../components/UI/nes-avatar'
import { useNavigate } from 'react-router-dom'

const LeaderBoard: React.FC = () => {
  const tableHeadersProps = [
    {
      name: 'id',
      label: 'ID',
    },
    {
      name: 'avatar',
      label: 'AVATAR',
    },
    {
      name: 'name',
      label: 'NAME',
    },
    {
      name: 'score',
      label: 'SCORE',
    },
    {
      name: 'date',
      label: 'DATE',
    },
  ]

  const navigate = useNavigate()

  const loadNextPage = () => {
    console.log('load next page')
  }
  const loadPrevPage = () => {
    console.log('load prev page')
  }

  type UserScoreType = {
    id: number
    name: string
    avatar: string
    score: number
    date: string
  }

  const userScore: Array<UserScoreType> = [
    {
      id: 1,
      avatar: '',
      name: 'userName',
      score: 43546435,
      date: '07/10/16',
    },
    {
      id: 2,
      avatar: '',
      name: 'userName2',
      score: 32543656,
      date: '07/10/16',
    },
  ]

  const userRows = React.useMemo(
    () =>
      userScore.map((user, index) => {
        const userRow = Object.entries(user).map(([key, value]) => {
          if (key === 'avatar') {
            return (
              <div
                key={`${user.id}-${value}`}
                className={`${styles['table__col']} ${styles['table__col--second-color']} ${styles['nes-avatar-col']}`}>
                <NesAvatar
                  size={'large'}
                  alt={`аватар пользователя ${user.name}`}
                />
              </div>
            )
          }
          return (
            <div key={`${user.id}-${value}`} className={styles['table__col']}>
              {value}
            </div>
          )
        })

        const rowDarkClass = index % 2 === 1 ? 'nes-container is-dark' : ''
        return (
          <div
            key={user.id}
            className={`${styles['table__row']} ${rowDarkClass}`}>
            {userRow}
          </div>
        )
      }),
    [userScore]
  )

  const tableHeaders = tableHeadersProps.map(header => {
    return (
      <div className={`${styles['table__col']} ${styles['table-header']}`}>
        {header.label}
      </div>
    )
  })

  return (
    <div className={styles['leaderboard']}>
      <div className={styles['leaderboard__container']}>
        <div
          className={`${styles['control-wrapper']} ${styles['control-page-buttons']}`}>
          <NesButton onClick={loadPrevPage}>&lt;</NesButton>
          <NesButton onClick={loadNextPage}>&gt;</NesButton>
        </div>
        <div className={`${styles['leaderboard__table']} ${styles['table']}`}>
          {tableHeaders}
          {userRows}
        </div>
        <div className={styles['control-wrapper']}>
          <NesButton variant='primary' fullWidth onClick={() => navigate('/')}>
            exit
          </NesButton>
        </div>
      </div>
    </div>
  )
}

export default LeaderBoard